// server/src/index.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { RoomManager } from './RoomManager';
import { INITIAL_GAMES, GENRE_FILTERS, PLAYER_COUNT_FILTERS } from '../../shared/gamesData';
import { ClientToServerEvents, ServerToClientEvents } from '../../shared/types';
import { getGameEngine } from './games/GameEngineRegistry';

const app = express();
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const roomManager = new RoomManager();

// ================= REST API =================

// 1. 게임 목록 및 필터 데이터 조회
app.get('/api/games', (req, res) => {
  res.json({
    games: roomManager.getGamesWithPlayCounts(),
    genres: GENRE_FILTERS,
    playerFilters: PLAYER_COUNT_FILTERS
  });
});

// 2. 단일 게임 상세 정보 조회
app.get('/api/games/:id', (req, res) => {
  const game = INITIAL_GAMES.find(g => g.id === req.params.id);
  if (!game) {
    return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
  }
  res.json(game);
});

// 3. 방 유효성 검사 (초대 링크 접속 시 사전 체크)
app.get('/api/rooms/:code', (req, res) => {
  const room = roomManager.getRoom(req.params.code);
  if (!room) {
    return res.status(404).json({ exists: false, error: '존재하지 않거나 종료된 방입니다.' });
  }
  res.json({
    exists: true,
    code: room.code,
    gameTitle: room.gameInfo.title,
    gameThumbnail: room.gameInfo.thumbnail,
    playerCount: room.players.length,
    maxPlayers: room.settings.maxPlayers,
    status: room.status
  });
});

app.get('/api/active-rooms', (req, res) => {
  res.json(roomManager.getAllRooms().map(r => ({
    code: r.code,
    gameId: r.gameId,
    status: r.status,
    players: r.players.length
  })));
});

// ================= SOCKET.IO 실시간 이벤트 =================

io.on('connection', (socket) => {
  // 1. 방 생성 (방장 - 팩 선택 후)
  socket.on('room:create', ({ gameId, packId, packTitle, customPackData, playerName, avatar }: any, callback) => {
    try {
      const { room, hostId } = roomManager.createRoom(
        gameId, 
        { name: playerName, avatar, socketId: socket.id },
        { packId, packTitle, customPackData }
      );

      socket.join(room.code);
      socket.emit('room:joined', { room, myPlayerId: hostId });

      if (callback) {
        callback({ success: true, room });
      }
    } catch (err: any) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  // 2. 방 참가 (게스트 - 초대 링크 접속)
  socket.on('room:join', ({ roomCode, playerName, avatar }, callback) => {
    try {
      const result = roomManager.joinRoom(roomCode, {
        name: playerName,
        avatar,
        socketId: socket.id
      });

      if (!result.success || !result.room || !result.player) {
        if (callback) callback({ success: false, error: result.error || '입장에 실패했습니다.' });
        return;
      }

      socket.join(result.room.code);

      // 본인에게 입장 완료 알림
      socket.emit('room:joined', { room: result.room, myPlayerId: result.player.id });

      // 방 전체에 새 플레이어 입장 브로드캐스트
      socket.to(result.room.code).emit('room:player-joined', {
        player: result.player,
        room: result.room
      });

      if (callback) {
        callback({ success: true, room: result.room });
      }
    } catch (err: any) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  // 3. 레디 상태 토글
  socket.on('room:toggle-ready', () => {
    const { room } = roomManager.toggleReady(socket.id);
    if (room) {
      io.to(room.code).emit('room:updated', room);
    }
  });

  // 4. 방 설정 변경 (방장 전용)
  socket.on('room:update-settings', (newSettings) => {
    const result = roomManager.updateSettings(socket.id, newSettings);
    if (result.success && result.room) {
      io.to(result.room.code).emit('room:updated', result.room);
    } else if (result.error) {
      socket.emit('room:error', result.error);
    }
  });

  // 5. 플레이어 강퇴 (방장 전용)
  socket.on('room:kick-player', (targetPlayerId) => {
    const result = roomManager.kickPlayer(socket.id, targetPlayerId);
    if (result.success && result.room && result.kickedSocketId) {
      io.to(result.kickedSocketId).emit('room:error', '방장에 의해 방에서 퇴장되었습니다.');
      io.sockets.sockets.get(result.kickedSocketId)?.leave(result.room.code);
      
      io.to(result.room.code).emit('room:updated', result.room);
    } else if (result.error) {
      socket.emit('room:error', result.error);
    }
  });

  // 6. 게임 시작 (방장 전용)
  socket.on('room:start-game', () => {
    const session = roomManager.getSession(socket.id);
    if (!session) return;
    const room = roomManager.getRoom(session.roomCode);
    if (!room) return;

    const result = roomManager.startGame(socket.id);
    if (result.success && result.room) {
      const engine = getGameEngine(result.room.gameId);
      const initialGameState = engine.onStart(result.room, result.room.settings.extraOptions?.customPackData);

      io.to(result.room.code).emit('game:started', {
        room: result.room,
        gameState: initialGameState
      });

      if (result.room.gameId === 'snake-royale' && typeof (engine as any).startCountdown === 'function') {
        (engine as any).startCountdown(result.room, io);
      }
    } else if (result.error) {
      socket.emit('room:error', result.error);
    }
  });

  // 6-1. 실시간 인게임 액션 전달
  socket.on('game:action', (action) => {
    const session = roomManager.getSession(socket.id);
    if (!session) return;
    const room = roomManager.getRoom(session.roomCode);
    if (!room || room.status !== 'playing') return;

    const engine = getGameEngine(room.gameId);
    engine.handleAction(room, session.playerId, action, io);
  });

  // 6-2. 지속형 파티 룸: 대기실 게임 변경 (방장 전용)
  socket.on('room:change-game', (data) => {
    const result = roomManager.changeGame(socket.id, data.gameId, data.packTitle, data.customPackData);
    if (result.success && result.room) {
      io.to(result.room.code).emit('room:updated', result.room);
    } else if (result.error) {
      socket.emit('room:error', result.error);
    }
  });

  // 6-3. 지속형 파티 룸: 게임 종료 후 다 함께 대기실로 복귀
  socket.on('room:return-to-waiting', () => {
    const result = roomManager.returnToWaiting(socket.id);
    if (result.success && result.room) {
      io.to(result.room.code).emit('room:updated', result.room);
      io.to(result.room.code).emit('game:returned-to-lobby');
    }
  });

  // 7. 방 나가기 (명시적 퇴장 또는 뒤로가기)
  socket.on('room:leave', () => {
    const { room, leftPlayer, newHostId, isRoomClosed } = roomManager.handleDisconnect(socket.id);
    if (!isRoomClosed && room && leftPlayer) {
      socket.leave(room.code);
      io.to(room.code).emit('room:player-left', {
        playerId: leftPlayer.id,
        newHostId,
        room
      });
    }
  });

  // 8. 연결 종료 (새로고침, 탭 닫기 등)
  socket.on('disconnect', () => {
    const { room, leftPlayer, newHostId, isRoomClosed } = roomManager.handleDisconnect(socket.id);
    if (!isRoomClosed && room && leftPlayer) {
      io.to(room.code).emit('room:player-left', {
        playerId: leftPlayer.id,
        newHostId,
        room
      });
    }
  });
});

// 프로덕션 환경에서 프론트엔드 정적 파일 서빙
const clientDistCandidates = [
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(__dirname, '../../../client/dist'),
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../client/dist')
];

let clientBuildPath = clientDistCandidates[0];
for (const cand of clientDistCandidates) {
  if (require('fs').existsSync(cand)) {
    clientBuildPath = cand;
    break;
  }
}

app.use('/audio', express.static(path.resolve(process.cwd(), 'client/public/audio')));
app.use('/audio', express.static(path.resolve(__dirname, '../../client/public/audio')));
app.use('/images', express.static(path.resolve(process.cwd(), 'client/public/images')));
app.use('/images', express.static(path.resolve(__dirname, '../../client/public/images')));
app.use(express.static(clientBuildPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
    if (err) next();
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🎮 PartyHub Server running on http://localhost:${PORT}`);
});
