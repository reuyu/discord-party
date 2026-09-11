// server/src/games/BlindDrawingEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class BlindDrawingEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['blind-drawing']?.[0]?.data || [
      '스케이트보드 타는 기린', '선글라스 낀 피카츄', '우주복 입은 고양이', '피자 먹는 티라노사우루스', '춤추는 눈사람',
      '햄버거 먹는 펭귄', '선풍기 앞의 판다', '서핑보드 타는 토끼', '역도하는 햄스터', '커피 마시는 사자'
    ];
    const rawPrompts = customPackData?.length ? customPackData : defaultData;
    const prompts = [...rawPrompts].sort(() => Math.random() - 0.5);

    const scores: Record<string, number> = {};
    room.players.forEach(p => { scores[p.id] = 0; });

    const totalRounds = room.settings.rounds || Math.min(5, room.players.length);
    const drawerIndex = 0;
    const drawerId = room.players[drawerIndex].id;

    room.gameState = {
      phase: 'drawing', // drawing -> round_result -> gameEnd
      roundIndex: 0,
      totalRounds,
      drawerIndex,
      drawerId,
      targetWord: prompts[0],
      prompts,
      drawPaths: [] as { fromX: number; fromY: number; toX: number; toY: number }[],
      correctPlayerId: null as string | null,
      scores,
      timerSec: room.settings.timeLimitSec || 45,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 드로잉 선분 추가 (출제자 -> 전체 브로드캐스트)
    if (action.type === 'draw_line' && playerId === state.drawerId && state.phase === 'drawing') {
      const line = action.payload.line;
      if (line) {
        state.drawPaths.push(line);
        this.broadcastState(room, io);
      }
      return;
    }

    // 2. 캔버스 전체 지우기
    if (action.type === 'clear_canvas' && playerId === state.drawerId && state.phase === 'drawing') {
      state.drawPaths = [];
      this.broadcastState(room, io);
      return;
    }

    // 3. 정답 제출
    if (action.type === 'submit_guess' && playerId !== state.drawerId && state.phase === 'drawing') {
      const guess = (action.payload.guess || '').trim().toLowerCase().replace(/\s+/g, '');
      const target = (state.targetWord || '').trim().toLowerCase().replace(/\s+/g, '');

      if (guess === target) {
        state.correctPlayerId = playerId;
        state.scores[playerId] = (state.scores[playerId] || 0) + 100;
        state.scores[state.drawerId] = (state.scores[state.drawerId] || 0) + 80;
        state.phase = 'round_result';
        this.broadcastState(room, io);
      }
      return;
    }

    // 4. 타이머 만료 (정답자 없이 시간 종료 시 라운드 결과로 정상 전이)
    if ((action.type === 'timeout_drawing' || action.type === 'timeout_round') && state.phase === 'drawing') {
      state.correctPlayerId = null;
      state.phase = 'round_result';
      this.broadcastState(room, io);
      return;
    }

    // 5. 다음 라운드
    if (action.type === 'next_round' && state.phase === 'round_result') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        state.phase = 'gameEnd';
        this.endGame(room, { scores: state.scores }, io);
      } else {
        state.roundIndex++;
        state.drawerIndex = (state.drawerIndex + 1) % room.players.length;
        state.drawerId = room.players[state.drawerIndex].id;
        state.targetWord = state.prompts[state.roundIndex % state.prompts.length];
        state.drawPaths = [];
        state.correctPlayerId = null;
        state.phase = 'drawing';
        state.startedAt = Date.now();
        this.broadcastState(room, io);
      }
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
