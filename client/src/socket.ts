// client/src/socket.ts
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../shared/types';

// 개발 환경에서는 Vite 프록시(/socket.io) 또는 상대 경로로 연결
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('/', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});
