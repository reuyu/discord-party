// server/src/games/AnonymousExposedEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class AnonymousExposedEngine extends BaseEngine {
  private DEFAULT_QUESTIONS = [
    '우리 중 겉과 속이 가장 다를 것 같은 사람은?',
    '돈 1억을 빌려달라고 하면 절대 안 빌려줄 것 같은 사람은?',
    '새벽 3시에 술 마시자고 전화하면 바로 나올 것 같은 사람은?',
    '나중에 가장 크게 성공해서 호화롭게 살 것 같은 사람은?',
    '만약 무인도에 단둘이 갇힌다면 절대 같이 가기 싫은 사람은?',
    '카톡이나 디스코드 연락을 가장 안 볼 것 같은 읽씹 장인은?',
    '비밀을 털어놓으면 10분 만에 온 세상에 소문낼 것 같은 사람은?',
    '평소에 가장 엉뚱하고 4차원 같은 행동을 많이 하는 사람은?',
    '술자리에서 가장 먼저 취해서 뻗을 것 같은 사람은?',
    '소개팅에 나가면 첫 만남에 바로 차일 것 같은 사람은?'
  ];

  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['anonymous-exposed']?.[0]?.data || this.DEFAULT_QUESTIONS;
    const questions = customPackData?.length ? customPackData : defaultData;
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const totalRounds = Math.min(room.settings.rounds || 5, shuffledQuestions.length);

    room.gameState = {
      phase: 'submitting', // submitting -> revealing -> gameEnd
      roundIndex: 0,
      totalRounds,
      questions: shuffledQuestions,
      currentQuestion: shuffledQuestions[0],
      submissions: {} as Record<string, { targetId: string; reason: string }>,
      voteCounts: {} as Record<string, number>,
      shuffledReasons: [] as string[],
      shuffledExposes: [] as { targetId: string; targetName: string; targetAvatar: string; reason: string }[],
      timerSec: 45,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 무기명 지목 및 이유 제출
    if ((action.type === 'submit_expose' || action.type === 'submit_exposed') && state.phase === 'submitting') {
      const targetId = action.payload?.targetId;
      const reason = action.payload?.reason || action.payload?.comment || '이유 없음';
      if (!targetId) return;

      state.submissions[playerId] = {
        targetId,
        reason: reason.trim()
      };

      if (Object.keys(state.submissions).length >= room.players.length) {
        this.revealExposed(room, io);
        return;
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 타임아웃
    if (action.type === 'timeout_submitting' && state.phase === 'submitting') {
      this.revealExposed(room, io);
      return;
    }

    // 3. 다음 라운드 진행
    if ((action.type === 'next_round' || action.type === 'next_question') && state.phase === 'revealing') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        state.phase = 'gameEnd';
        this.endGame(room, { completed: true }, io);
      } else {
        state.roundIndex++;
        state.currentQuestion = state.questions[state.roundIndex];
        state.submissions = {};
        state.voteCounts = {};
        state.shuffledReasons = [];
        state.shuffledExposes = [];
        state.phase = 'submitting';
        state.startedAt = Date.now();
        this.broadcastState(room, io);
      }
    }
  }

  private revealExposed(room: Room, io: Server) {
    const state = room.gameState;
    state.phase = 'revealing';

    const voteCounts: Record<string, number> = {};
    const exposes: { targetId: string; targetName: string; targetAvatar: string; reason: string }[] = [];

    Object.values(state.submissions as Record<string, { targetId: string; reason: string }>).forEach(sub => {
      voteCounts[sub.targetId] = (voteCounts[sub.targetId] || 0) + 1;
      const targetPlayer = room.players.find(p => p.id === sub.targetId);
      if (sub.reason && sub.reason !== '이유 없음') {
        exposes.push({
          targetId: sub.targetId,
          targetName: targetPlayer?.name || '익명 대상',
          targetAvatar: targetPlayer?.avatar || '👤',
          reason: sub.reason
        });
      }
    });

    state.voteCounts = voteCounts;
    state.shuffledExposes = exposes.sort(() => Math.random() - 0.5);
    state.shuffledReasons = state.shuffledExposes.map((e: any) => e.reason);

    this.broadcastState(room, io);
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
