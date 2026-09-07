// server/src/games/ZoomQuizEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class ZoomQuizEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['zoom-quiz']?.[0]?.data || [];
    const items = customPackData?.length ? customPackData : defaultData;

    // 문제 순서 무작위 셔플
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    const scores: Record<string, number> = {};
    room.players.forEach(p => { scores[p.id] = 0; });

    const totalRounds = Math.min(room.settings.rounds || 5, shuffledItems.length);

    room.gameState = {
      phase: 'zooming', // zooming -> reveal -> roundEnd -> gameEnd
      roundIndex: 0,
      totalRounds,
      items: shuffledItems,
      currentItem: shuffledItems[0],
      correctPlayers: [] as { id: string; name: string; score: number }[],
      scores,
      timerSec: room.settings.timeLimitSec || 15,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 텍스트 정답 시도 (이미 맞힌 플레이어 제외, 시간 종료까지 누구나 도전 가능)
    if (action.type === 'submit_answer' && state.phase === 'zooming') {
      const alreadyCorrect = state.correctPlayers.some((p: any) => p.id === playerId);
      if (alreadyCorrect) return;

      const input = (action.payload.answer || '').trim().toLowerCase().replace(/\s+/g, '');
      const item = state.currentItem;
      const targetAnswer = item.answer.trim().toLowerCase().replace(/\s+/g, '');
      const aliases = (item.aliases || []).map((a: string) => a.trim().toLowerCase().replace(/\s+/g, ''));

      if (input === targetAnswer || aliases.includes(input)) {
        const elapsedSec = (Date.now() - state.startedAt) / 1000;
        const timeRemaining = Math.max(0, state.timerSec - elapsedSec);

        const rank = state.correctPlayers.length + 1;
        const score = rank === 1
          ? Math.round(timeRemaining * 15) + 100
          : rank === 2
          ? Math.round(timeRemaining * 10) + 70
          : 50;

        const player = room.players.find(p => p.id === playerId);
        state.correctPlayers.push({
          id: playerId,
          name: player?.name || '익명',
          score
        });

        state.scores[playerId] = (state.scores[playerId] || 0) + score;

        // 전원 다 맞혔으면 타이머 기다리지 않고 즉시 공개
        if (state.correctPlayers.length >= room.players.length) {
          state.phase = 'reveal';
        }

        this.broadcastState(room, io);
      }
      return;
    }

    // 2. 타이머 만료 (사진 100% 줌아웃 완료)
    if (action.type === 'timeout_zoom' && state.phase === 'zooming') {
      state.phase = 'reveal';
      this.broadcastState(room, io);
      return;
    }

    // 3. 다음 문제
    if (action.type === 'next_item' && state.phase === 'reveal') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        this.endGame(room, { scores: state.scores }, io);
      } else {
        state.roundIndex++;
        state.currentItem = state.items[state.roundIndex];
        state.correctPlayers = [];
        state.phase = 'zooming';
        state.startedAt = Date.now();
        this.broadcastState(room, io);
      }
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
