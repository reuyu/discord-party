// server/src/games/FiveSecRuleEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class FiveSecRuleEngine extends BaseEngine {
  private turnTimeout: NodeJS.Timeout | null = null;
  private typingTimeout: NodeJS.Timeout | null = null;

  onStart(room: Room, customPackData?: any): any {
    if (this.turnTimeout) {
      clearTimeout(this.turnTimeout);
      this.turnTimeout = null;
    }
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }

    const defaultMissions = REAL_DEFAULT_PACKS['five-sec-rule']?.[0]?.data || [];
    const rawMissions = customPackData?.length ? customPackData : defaultMissions;
    const missions = [...rawMissions].sort(() => Math.random() - 0.5);

    const scores: Record<string, number> = {};
    room.players.forEach(p => { scores[p.id] = 0; });

    const totalRounds = Math.min(room.settings.rounds || 5, missions.length);

    room.gameState = {
      phase: 'typing', // typing (동시 제출) -> voting (3초 게이지) -> typing (자동 전환) -> gameEnd
      roundIndex: 0,
      totalRounds,
      missions,
      currentMission: missions[0],
      firstAnswer: null as { playerId: string; playerName: string; playerAvatar: string; text: string } | null,
      votingStartedAt: 0,
      votingDurationSec: 3,
      votes: {} as Record<string, 'pass' | 'fail'>,
      scores,
      lastResultNotice: '',
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 전원 동시 타이핑 중 가장 먼저 제출된 답변 접수
    if (action.type === 'submit_answer' && state.phase === 'typing') {
      const text = (action.payload?.answer || '').trim();
      if (!text || state.firstAnswer) return; // 이미 선착순 답변 접수됨

      const player = room.players.find(p => p.id === playerId);
      state.firstAnswer = {
        playerId,
        playerName: player?.name || '익명',
        playerAvatar: player?.avatar || '⚡',
        text
      };

      // 3초 카운트다운 투표 페이즈 즉시 전환!
      state.phase = 'voting';
      state.votes = {};
      state.votingStartedAt = Date.now();
      state.votingDurationSec = 3;

      this.broadcastState(room, io);

      // 정확히 3.2초 뒤 수동 조작 없이 자동으로 다음 문제 진행!
      if (this.turnTimeout) clearTimeout(this.turnTimeout);
      this.turnTimeout = setTimeout(() => {
        this.finishVotingAndAdvance(room, io);
      }, 3200);

      return;
    }

    // 2. 3초 게이지 카운트다운 동안 [인정] vs [노인정] 투표
    if (action.type === 'vote_speech' && state.phase === 'voting') {
      const vote = action.payload?.vote as 'pass' | 'fail';
      if (!vote) return;
      state.votes[playerId] = vote;
      this.broadcastState(room, io);
      return;
    }

    // 3. 타이머 만료 콜백 (클라이언트 트리거)
    if (action.type === 'timeout_voting' && state.phase === 'voting') {
      if (this.turnTimeout) clearTimeout(this.turnTimeout);
      this.finishVotingAndAdvance(room, io);
      return;
    }

    // 4. 타이핑 단계 시간 초과 시 자동 패스
    if (action.type === 'timeout_typing' && state.phase === 'typing') {
      this.skipToNextMission(room, io);
    }
  }

  private finishVotingAndAdvance(room: Room, io: Server): void {
    const state = room.gameState;
    if (!state || state.phase !== 'voting') return;

    if (this.turnTimeout) {
      clearTimeout(this.turnTimeout);
      this.turnTimeout = null;
    }

    // 투표 집계
    const passCount = Object.values(state.votes as Record<string, 'pass' | 'fail'>).filter(v => v === 'pass').length;
    const failCount = Object.values(state.votes as Record<string, 'pass' | 'fail'>).filter(v => v === 'fail').length;
    const isApproved = passCount >= failCount; // 동점이어도 인정

    if (isApproved && state.firstAnswer) {
      state.scores[state.firstAnswer.playerId] = (state.scores[state.firstAnswer.playerId] || 0) + 10;
      state.lastResultNotice = `🎉 [인정 성공 (+10점)] ${state.firstAnswer.playerName} 님의 답변 인정! (인정 ${passCount}표 vs 땡 ${failCount}표)`;
    } else if (state.firstAnswer) {
      state.lastResultNotice = `❌ [노인정 땡 (0점)] ${state.firstAnswer.playerName} 님의 답변 탈락! (인정 ${passCount}표 vs 땡 ${failCount}표)`;
    }

    // 다음 라운드 또는 최종 결과 확인
    if (state.roundIndex + 1 >= state.totalRounds) {
      state.phase = 'gameEnd';
      this.endGame(room, { scores: state.scores }, io);
    } else {
      state.roundIndex++;
      state.currentMission = state.missions[state.roundIndex % state.missions.length];
      state.phase = 'typing';
      state.firstAnswer = null;
      state.votes = {};
      state.startedAt = Date.now();
      this.broadcastState(room, io);
    }
  }

  private skipToNextMission(room: Room, io: Server): void {
    const state = room.gameState;
    if (!state || state.phase !== 'typing') return;

    if (state.roundIndex + 1 >= state.totalRounds) {
      state.phase = 'gameEnd';
      this.endGame(room, { scores: state.scores }, io);
    } else {
      state.roundIndex++;
      state.currentMission = state.missions[state.roundIndex % state.missions.length];
      state.firstAnswer = null;
      state.votes = {};
      state.startedAt = Date.now();
      state.lastResultNotice = '⏳ 시간 초과로 다음 문제가 출제되었습니다!';
      this.broadcastState(room, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
