// server/src/games/ClickerClashEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class ClickerClashEngine extends BaseEngine {
  private battleTimeouts: Map<string, NodeJS.Timeout> = new Map();

  onStart(room: Room): any {
    if (this.battleTimeouts.has(room.code)) {
      clearTimeout(this.battleTimeouts.get(room.code)!);
      this.battleTimeouts.delete(room.code);
    }

    const clicks: Record<string, number> = {};
    room.players.forEach(p => { clicks[p.id] = 0; });

    const timeLimitSec = 10; // 10초 스피드 연타
    const countdownSec = 3; // 3, 2, 1 시스템 카운트다운

    room.gameState = {
      phase: 'countdown', // countdown -> battle -> gameEnd
      clicks,
      countdownSec,
      timeLimitSec,
      winnerId: null as string | null,
      startedAt: Date.now() + 3000
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 배틀 시작 (카운트다운 완료 시)
    if (action.type === 'start_battle' && state.phase === 'countdown') {
      state.phase = 'battle';
      state.startedAt = Date.now();

      // 서버 자체 10.5초 자동 만료 안전 타이머
      if (this.battleTimeouts.has(room.code)) {
        clearTimeout(this.battleTimeouts.get(room.code)!);
      }
      const timeout = setTimeout(() => {
        if (room.gameState?.phase === 'battle') {
          this.finishBattle(room, io);
        }
      }, (state.timeLimitSec + 0.5) * 1000);
      this.battleTimeouts.set(room.code, timeout);

      this.broadcastState(room, io);
      return;
    }

    // 2. 스페이스바 / 마우스 연타 액션
    if (action.type === 'click' && state.phase === 'battle') {
      state.clicks[playerId] = (state.clicks[playerId] || 0) + 1;
      this.broadcastState(room, io);
      return;
    }

    // 3. 10초 타이머 만료 -> 최종 승자 판정
    if (action.type === 'timeout_battle' && state.phase === 'battle') {
      this.finishBattle(room, io);
    }
  }

  private finishBattle(room: Room, io: Server) {
    const state = room.gameState;
    if (!state || state.phase === 'gameEnd') return;

    if (this.battleTimeouts.has(room.code)) {
      clearTimeout(this.battleTimeouts.get(room.code)!);
      this.battleTimeouts.delete(room.code);
    }

    let maxClicks = -1;
    let winnerId = room.players[0]?.id;

    Object.entries(state.clicks || {}).forEach(([pId, count]: [string, any]) => {
      if (count > maxClicks) {
        maxClicks = count;
        winnerId = pId;
      }
    });

    state.phase = 'gameEnd';
    state.winnerId = winnerId;
    this.endGame(room, { winnerId, clicks: state.clicks }, io);
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
