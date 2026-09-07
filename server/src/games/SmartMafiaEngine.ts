// server/src/games/SmartMafiaEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class SmartMafiaEngine extends BaseEngine {
  onStart(room: Room): any {
    const players = [...room.players];
    const roles: Record<string, 'mafia' | 'doctor' | 'police' | 'citizen'> = {};

    // 역할 분배 (마피아 1~2명, 의사 1명, 경찰 1명, 나머지 시민)
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const mafiaCount = players.length >= 6 ? 2 : 1;

    shuffled.forEach((p, idx) => {
      if (idx < mafiaCount) roles[p.id] = 'mafia';
      else if (idx === mafiaCount) roles[p.id] = 'doctor';
      else if (idx === mafiaCount + 1) roles[p.id] = 'police';
      else roles[p.id] = 'citizen';
    });

    const alivePlayers = players.map(p => p.id);

    room.gameState = {
      phase: 'night', // night -> day_announce -> day_debate -> vote_trial -> execution_vote -> day_result -> gameEnd
      dayNumber: 1,
      roles,
      alivePlayers,
      nightActions: {
        mafiaTarget: '',
        doctorTarget: '',
        policeTarget: '',
        policeResults: {} as Record<string, { targetName: string; isMafia: boolean }>
      },
      lastNightVictim: null as string | null,
      trialTarget: null as string | null,
      trialVotes: {} as Record<string, string>, // 1차 지목
      executionVotes: {} as Record<string, 'execute' | 'spare'>, // 단두대 찬반
      lastExecuted: null as string | null,
      timerSec: 30,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    const role = state.roles[playerId];
    const isAlive = state.alivePlayers.includes(playerId);

    // 1. 밤 액션 처리
    if (state.phase === 'night' && isAlive) {
      if (action.type === 'mafia_kill' && role === 'mafia') {
        state.nightActions.mafiaTarget = action.payload.targetId;
      } else if (action.type === 'doctor_heal' && role === 'doctor') {
        state.nightActions.doctorTarget = action.payload.targetId;
      } else if (action.type === 'police_inspect' && role === 'police') {
        const targetId = action.payload.targetId;
        state.nightActions.policeTarget = targetId;
        const targetPlayer = room.players.find(p => p.id === targetId);
        const targetRole = state.roles[targetId];
        state.nightActions.policeResults[playerId] = {
          targetName: targetPlayer?.name || '익명',
          isMafia: targetRole === 'mafia'
        };
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 밤 종료 -> 낮 전환 (30초 만료 시 자동 호출)
    if (action.type === 'finish_night' && state.phase === 'night') {
      const { mafiaTarget, doctorTarget } = state.nightActions;
      let victim: string | null = null;

      if (mafiaTarget && mafiaTarget !== doctorTarget) {
        victim = mafiaTarget;
        state.alivePlayers = state.alivePlayers.filter((id: string) => id !== victim);
      }

      state.lastNightVictim = victim;
      state.phase = 'day_announce';
      state.nightActions = {
        mafiaTarget: '',
        doctorTarget: '',
        policeTarget: '',
        policeResults: state.nightActions.policeResults
      };

      if (this.checkWinConditions(room, io)) return;

      this.broadcastState(room, io);
      return;
    }

    // 3. 낮 토론 시작
    if (action.type === 'start_day_debate' && state.phase === 'day_announce') {
      state.phase = 'day_debate';
      state.timerSec = 60;
      state.startedAt = Date.now();
      this.broadcastState(room, io);
      return;
    }

    // 4. 1차 재판 지목 투표 시작
    if (action.type === 'start_vote_trial' && (state.phase === 'day_debate' || state.phase === 'day_announce')) {
      state.phase = 'vote_trial';
      state.trialVotes = {};
      this.broadcastState(room, io);
      return;
    }

    // 5. 1차 지목 투표 제출
    if (action.type === 'submit_trial_vote' && state.phase === 'vote_trial' && isAlive) {
      state.trialVotes[playerId] = action.payload.targetId;

      if (Object.keys(state.trialVotes).length >= state.alivePlayers.length) {
        // 최다 득표자 선정
        const counts: Record<string, number> = {};
        Object.values(state.trialVotes as Record<string, string>).forEach(tId => {
          counts[tId] = (counts[tId] || 0) + 1;
        });

        let maxV = 0;
        let candidate = '';
        Object.entries(counts).forEach(([tId, count]) => {
          if (count > maxV) {
            maxV = count;
            candidate = tId;
          }
        });

        state.trialTarget = candidate;
        state.phase = 'execution_vote';
        state.executionVotes = {};
      }

      this.broadcastState(room, io);
      return;
    }

    // 6. 단두대 찬반 투표 제출
    if (action.type === 'submit_execution_vote' && state.phase === 'execution_vote' && isAlive) {
      state.executionVotes[playerId] = action.payload.vote; // 'execute' | 'spare'

      if (Object.keys(state.executionVotes).length >= state.alivePlayers.length) {
        const executeCount = Object.values(state.executionVotes).filter(v => v === 'execute').length;
        const isExecuted = executeCount > Math.floor(state.alivePlayers.length / 2);

        if (isExecuted && state.trialTarget) {
          state.alivePlayers = state.alivePlayers.filter((id: string) => id !== state.trialTarget);
        }

        state.lastExecuted = isExecuted ? state.trialTarget : null;
        state.phase = 'day_result';

        if (this.checkWinConditions(room, io)) return;
      }

      this.broadcastState(room, io);
      return;
    }

    // 7. 다음 밤으로 넘어가기
    if (action.type === 'start_next_night' && state.phase === 'day_result') {
      state.dayNumber++;
      state.phase = 'night';
      state.trialTarget = null;
      state.trialVotes = {};
      state.executionVotes = {};
      state.timerSec = 30;
      state.startedAt = Date.now();
      this.broadcastState(room, io);
    }
  }

  private checkWinConditions(room: Room, io: Server): boolean {
    const state = room.gameState;
    const mafiaAlive = state.alivePlayers.filter((id: string) => state.roles[id] === 'mafia').length;
    const citizensAlive = state.alivePlayers.length - mafiaAlive;

    if (mafiaAlive === 0) {
      state.phase = 'gameEnd';
      this.endGame(room, { winner: 'citizens', winReason: '시민들이 모든 마피아를 처형했습니다!' }, io);
      return true;
    } else if (mafiaAlive >= citizensAlive) {
      state.phase = 'gameEnd';
      this.endGame(room, { winner: 'mafia', winReason: '마피아가 시민 사회를 완전히 장악했습니다!' }, io);
      return true;
    }
    return false;
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
    this.checkWinConditions(room, io);
    this.broadcastState(room, io);
  }
}
