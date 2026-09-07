// server/src/games/BaseEngine.ts
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export interface GameAction {
  type: string;
  payload?: any;
}

export abstract class BaseEngine {
  abstract onStart(room: Room, customPackData?: any): any;
  abstract handleAction(room: Room, playerId: string, action: GameAction, io: Server): void;
  abstract onPlayerLeave(room: Room, playerId: string, io: Server): void;

  protected broadcastState(room: Room, io: Server) {
    io.to(room.code).emit('game:state-sync', room.gameState);
  }

  protected endGame(room: Room, results: any, io: Server) {
    room.status = 'ended';
    if (room.gameState) {
      room.gameState.phase = 'gameEnd';
      if (results) {
        Object.assign(room.gameState, results);
      }
    }
    io.to(room.code).emit('game:ended', { room, results });
    io.to(room.code).emit('game:state-sync', room.gameState);
  }
}
