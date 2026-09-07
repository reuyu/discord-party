// server/src/games/BalanceDebateEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class BalanceDebateEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['balance-debate']?.[0]?.data || [];
    const items = customPackData?.length ? customPackData : defaultData;

    // 무작위 셔플 보장!
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    const totalRounds = Math.min(room.settings.rounds || 5, shuffledItems.length);

    room.gameState = {
      phase: 'vote1', // vote1 -> debate -> vote2 -> roundEnd -> gameEnd
      roundIndex: 0,
      totalRounds,
      items: shuffledItems,
      currentQuestion: shuffledItems[0],
      votesPhase1: {} as Record<string, 'A' | 'B'>,
      votesPhase2: {} as Record<string, 'A' | 'B'>,
      debateTimerSec: 45,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 1차 비밀투표
    if (action.type === 'vote_phase1' && state.phase === 'vote1') {
      const choice = action.payload.choice as 'A' | 'B';
      if (choice !== 'A' && choice !== 'B') return;

      state.votesPhase1[playerId] = choice;

      if (Object.keys(state.votesPhase1).length >= room.players.length) {
        state.phase = 'debate';
        state.startedAt = Date.now();
        // 2차 투표 초기값은 1차 투표값으로 복사
        state.votesPhase2 = { ...state.votesPhase1 };
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 토론 종료 -> 2차 마음바꾸기
    if (action.type === 'start_vote2' && state.phase === 'debate') {
      state.phase = 'vote2';
      this.broadcastState(room, io);
      return;
    }

    // 3. 2차 마음바꾸기 (실시간 진영 변경 동기화!)
    if (action.type === 'vote_phase2' && (state.phase === 'vote2' || state.phase === 'debate')) {
      const choice = action.payload.choice as 'A' | 'B';
      if (choice !== 'A' && choice !== 'B') return;

      state.votesPhase2[playerId] = choice;
      this.broadcastState(room, io);
      return;
    }

    // 4. 2차 투표 확정 & 라운드 종료
    if (action.type === 'finish_round' && state.phase === 'vote2') {
      state.phase = 'roundEnd';
      this.broadcastState(room, io);
      return;
    }

    // 5. 다음 라운드
    if (action.type === 'next_round' && state.phase === 'roundEnd') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        this.endGame(room, { finalResults: 'complete' }, io);
      } else {
        state.roundIndex++;
        state.currentQuestion = state.items[state.roundIndex];
        state.phase = 'vote1';
        state.votesPhase1 = {};
        state.votesPhase2 = {};
        state.startedAt = Date.now();
        this.broadcastState(room, io);
      }
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
