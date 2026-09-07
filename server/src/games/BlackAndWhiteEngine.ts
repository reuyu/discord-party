// server/src/games/BlackAndWhiteEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class BlackAndWhiteEngine extends BaseEngine {
  onStart(room: Room): any {
    const player1 = room.players[0];
    const player2 = room.players[1] || room.players[0];

    const tiles: Record<string, number[]> = {
      [player1.id]: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [player2.id]: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    };

    const scores: Record<string, number> = {
      [player1.id]: 0,
      [player2.id]: 0
    };

    room.gameState = {
      phase: 'first_turn', // first_turn (선공 제출) -> second_turn (후공 제출) -> round_result -> game_end
      roundNumber: 1,
      maxRounds: 9,
      player1Id: player1.id,
      player2Id: player2.id,
      leadPlayerId: player1.id, // 선공
      followPlayerId: player2.id,
      tiles,
      scores,
      leadPlayedTile: null as { num: number; color: 'black' | 'white' } | null,
      followPlayedTile: null as { num: number; color: 'black' | 'white' } | null,
      lastWinnerId: null as string | 'tie' | null,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 선공 타일 제출
    if (action.type === 'play_lead_tile' && playerId === state.leadPlayerId && state.phase === 'first_turn') {
      const tileNum = Number(action.payload.tileNum);
      const playerTiles = state.tiles[playerId] || [];
      if (!playerTiles.includes(tileNum)) return;

      // 타일 제거
      state.tiles[playerId] = playerTiles.filter((n: number) => n !== tileNum);
      // 색상 판정: 짝수(0,2,4,6,8) -> 흑(black) / 홀수(1,3,5,7) -> 백(white)
      const color = tileNum % 2 === 0 ? 'black' : 'white';

      state.leadPlayedTile = { num: tileNum, color };
      state.phase = 'second_turn';
      this.broadcastState(room, io);
      return;
    }

    // 2. 후공 타일 제출
    if (action.type === 'play_follow_tile' && playerId === state.followPlayerId && state.phase === 'second_turn') {
      const tileNum = Number(action.payload.tileNum);
      const playerTiles = state.tiles[playerId] || [];
      if (!playerTiles.includes(tileNum)) return;

      state.tiles[playerId] = playerTiles.filter((n: number) => n !== tileNum);
      const color = tileNum % 2 === 0 ? 'black' : 'white';
      state.followPlayedTile = { num: tileNum, color };

      // 승패 판정 (더 큰 숫자가 승리)
      const leadNum = state.leadPlayedTile.num;
      const followNum = state.followPlayedTile.num;

      if (leadNum > followNum) {
        state.scores[state.leadPlayerId] = (state.scores[state.leadPlayerId] || 0) + 1;
        state.lastWinnerId = state.leadPlayerId;
        // 승자가 다음 라운드 선공 유지
      } else if (followNum > leadNum) {
        state.scores[state.followPlayerId] = (state.scores[state.followPlayerId] || 0) + 1;
        state.lastWinnerId = state.followPlayerId;
        // 후공이 승리하면 선공/후공 교체
        const temp = state.leadPlayerId;
        state.leadPlayerId = state.followPlayerId;
        state.followPlayerId = temp;
      } else {
        state.lastWinnerId = 'tie';
      }

      state.phase = 'round_result';

      // 5승 먼저 달성 시 즉시 게임 종료
      if (state.scores[state.player1Id] >= 5 || state.scores[state.player2Id] >= 5 || state.roundNumber >= state.maxRounds) {
        this.endGame(room, { scores: state.scores }, io);
        return;
      }

      this.broadcastState(room, io);
      return;
    }

    // 3. 다음 라운드 시작
    if (action.type === 'next_round' && state.phase === 'round_result') {
      state.roundNumber++;
      state.leadPlayedTile = null;
      state.followPlayedTile = null;
      state.phase = 'first_turn';
      this.broadcastState(room, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
