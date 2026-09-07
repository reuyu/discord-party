// server/src/games/NoonchiGameEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class NoonchiGameEngine extends BaseEngine {
  onStart(room: Room): any {
    const lives: Record<string, number> = {};
    const alivePlayers: string[] = [];

    room.players.forEach(p => {
      lives[p.id] = 3;
      alivePlayers.push(p.id);
    });

    room.gameState = {
      phase: 'playing', // playing -> clash -> round_end -> game_end
      currentNumber: 1,
      targetMaxNumber: alivePlayers.length,
      alivePlayers,
      lives,
      calledHistory: [] as { playerId: string; num: number; timestamp: number }[],
      lastClashPlayers: [] as string[],
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state || state.phase !== 'playing') return;

    if (!state.alivePlayers.includes(playerId)) return;

    // 1. 플레이어가 [숫자 외치기] 버튼 클릭
    if (action.type === 'call_number') {
      const now = Date.now();
      const calledNumber = state.currentNumber;

      // 최근 300ms 이내에 같은 번호를 누른 사람이 있는지 충돌 검사
      const recentCalls = state.calledHistory.filter((c: any) => c.num === calledNumber && (now - c.timestamp) < 350);

      if (recentCalls.length > 0) {
        // 동시 외침 충돌(Clash) 발생!
        const clashPlayerIds = [...recentCalls.map((c: any) => c.playerId), playerId];
        state.lastClashPlayers = clashPlayerIds;

        clashPlayerIds.forEach(id => {
          state.lives[id] = Math.max(0, (state.lives[id] || 3) - 1);
        });

        state.phase = 'clash';
        this.checkEliminations(room, io);
        return;
      }

      state.calledHistory.push({
        playerId,
        num: calledNumber,
        timestamp: now
      });

      // 마지막 숫자까지 다 외쳐졌을 때 -> 아직 안 누른 꼴찌 1인 판정
      if (calledNumber >= state.targetMaxNumber - 1) {
        const calledIds = state.calledHistory.map((c: any) => c.playerId);
        const loser = state.alivePlayers.find((id: string) => !calledIds.includes(id));

        if (loser) {
          state.lives[loser] = Math.max(0, (state.lives[loser] || 3) - 1);
          state.lastClashPlayers = [loser];
        }

        state.phase = 'round_end';
        this.checkEliminations(room, io);
        return;
      }

      state.currentNumber++;
      this.broadcastState(room, io);
      return;
    }

    // 2. 충돌 또는 라운드 종료 후 다음 라운드 시작
    if (action.type === 'next_round' && (state.phase === 'clash' || state.phase === 'round_end')) {
      state.currentNumber = 1;
      state.targetMaxNumber = state.alivePlayers.length;
      state.calledHistory = [];
      state.lastClashPlayers = [];
      state.phase = 'playing';
      state.startedAt = Date.now();
      this.broadcastState(room, io);
    }
  }

  private checkEliminations(room: Room, io: Server) {
    const state = room.gameState;
    state.alivePlayers = state.alivePlayers.filter((id: string) => (state.lives[id] || 0) > 0);

    if (state.alivePlayers.length <= 1) {
      const winnerId = state.alivePlayers[0] || null;
      this.endGame(room, { winnerId, lives: state.lives }, io);
      return;
    }

    this.broadcastState(room, io);
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
    this.checkEliminations(room, io);
  }
}
