// server/src/RoomManager.ts
import { Room, Player, RoomSettings } from '../../shared/types';
import { INITIAL_GAMES } from '../../shared/gamesData';

export class RoomManager {
  private rooms: Map<string, Room> = new Map();
  private socketToPlayerMap: Map<string, { roomCode: string; playerId: string }> = new Map();
  private gamePlayCounts: Map<string, number> = new Map();

  constructor() {
    INITIAL_GAMES.forEach(g => {
      this.gamePlayCounts.set(g.id, g.playCount || 0);
    });
  }

  public incrementPlayCount(gameId: string): number {
    const current = this.gamePlayCounts.get(gameId) || 0;
    const next = current + 1;
    this.gamePlayCounts.set(gameId, next);
    return next;
  }

  public getGamesWithPlayCounts() {
    return INITIAL_GAMES.map(g => ({
      ...g,
      playCount: this.gamePlayCounts.get(g.id) || g.playCount || 0
    }));
  }

  // 고유한 6자리 방 코드 생성 (초대 링크 URL 식별용)
  private generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    let attempts = 0;
    
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      attempts++;
    } while (this.rooms.has(code) && attempts < 100);

    return code;
  }

  // 방 생성
  public createRoom(
    gameId: string, 
    hostPlayer: { name: string; avatar: string; socketId: string },
    packInfo?: { packId?: string; packTitle?: string; customPackData?: any }
  ): { room: Room; hostId: string } {
    const game = INITIAL_GAMES.find(g => g.id === gameId) || INITIAL_GAMES[0];
    const roomCode = this.generateRoomCode();
    const hostId = `p_${Math.random().toString(36).substring(2, 9)}`;

    const host: Player = {
      id: hostId,
      socketId: hostPlayer.socketId,
      name: hostPlayer.name.trim() || '방장',
      avatar: hostPlayer.avatar || '👑',
      isHost: true,
      isReady: true,
      isOnline: true,
      joinedAt: Date.now()
    };

    const defaultSettings: RoomSettings = {
      maxPlayers: game.maxPlayers,
      rounds: game.defaultSettings?.rounds || 10,
      timeLimitSec: game.defaultSettings?.timeLimitSec || 30,
      customPackId: packInfo?.packId,
      customPackTitle: packInfo?.packTitle,
      isPublic: true,
      extraOptions: { ...game.defaultSettings, customPackData: packInfo?.customPackData }
    };

    const room: Room = {
      code: roomCode,
      gameId: game.id,
      gameInfo: game,
      hostId: host.id,
      status: 'waiting',
      players: [host],
      settings: defaultSettings,
      createdAt: Date.now()
    };

    this.rooms.set(roomCode, room);
    this.socketToPlayerMap.set(hostPlayer.socketId, { roomCode, playerId: hostId });
    this.incrementPlayCount(game.id);

    return { room, hostId };
  }

  // 방 조회
  public getRoom(roomCode: string): Room | undefined {
    return this.rooms.get(roomCode.toUpperCase());
  }

  // 플레이어 입장
  public joinRoom(roomCode: string, playerInfo: { name: string; avatar: string; socketId: string }): { success: boolean; room?: Room; player?: Player; error?: string } {
    const code = roomCode.toUpperCase();
    const room = this.rooms.get(code);

    if (!room) {
      return { success: false, error: '존재하지 않거나 이미 종료된 방입니다.' };
    }

    if (room.status !== 'waiting') {
      return { success: false, error: '이미 게임이 진행 중인 방입니다.' };
    }

    if (room.players.length >= room.settings.maxPlayers) {
      return { success: false, error: `방 인원이 가득 찼습니다. (최대 ${room.settings.maxPlayers}명)` };
    }

    // 닉네임 중복 처리
    let finalName = playerInfo.name.trim() || '게스트';
    const existingCount = room.players.filter(p => p.name === finalName).length;
    if (existingCount > 0) {
      finalName = `${finalName} (${existingCount + 1})`;
    }

    const playerId = `p_${Math.random().toString(36).substring(2, 9)}`;
    const newPlayer: Player = {
      id: playerId,
      socketId: playerInfo.socketId,
      name: finalName,
      avatar: playerInfo.avatar || '🎮',
      isHost: false,
      isReady: false,
      isOnline: true,
      joinedAt: Date.now()
    };

    room.players.push(newPlayer);
    this.socketToPlayerMap.set(playerInfo.socketId, { roomCode: code, playerId });

    return { success: true, room, player: newPlayer };
  }

  // 플레이어 퇴장 또는 소켓 연결 해제
  public handleDisconnect(socketId: string): { room?: Room; leftPlayer?: Player; newHostId?: string; isRoomClosed: boolean } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) {
      return { isRoomClosed: false };
    }

    this.socketToPlayerMap.delete(socketId);
    const room = this.rooms.get(session.roomCode);
    if (!room) {
      return { isRoomClosed: false };
    }

    const playerIndex = room.players.findIndex(p => p.id === session.playerId);
    if (playerIndex === -1) {
      return { isRoomClosed: false };
    }

    const leftPlayer = room.players[playerIndex];
    room.players.splice(playerIndex, 1);

    // 방에 아무도 없으면 방 제거
    if (room.players.length === 0) {
      this.rooms.delete(session.roomCode);
      return { isRoomClosed: true, leftPlayer };
    }

    let newHostId: string | undefined;
    // 나간 사람이 방장이었다면 다음 사람에게 방장 위임
    if (leftPlayer.isHost && room.players.length > 0) {
      room.players[0].isHost = true;
      room.players[0].isReady = true;
      room.hostId = room.players[0].id;
      newHostId = room.hostId;
    }

    return { room, leftPlayer, newHostId, isRoomClosed: false };
  }

  // 레디 상태 토글
  public toggleReady(socketId: string): { room?: Room; player?: Player } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return {};

    const room = this.rooms.get(session.roomCode);
    if (!room) return {};

    const player = room.players.find(p => p.id === session.playerId);
    if (!player || player.isHost) return {};

    player.isReady = !player.isReady;
    return { room, player };
  }

  // 방 설정 변경 (방장 전용)
  public updateSettings(socketId: string, newSettings: Partial<RoomSettings>): { success: boolean; room?: Room; error?: string } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return { success: false, error: '세션을 찾을 수 없습니다.' };

    const room = this.rooms.get(session.roomCode);
    if (!room) return { success: false, error: '방을 찾을 수 없습니다.' };

    const player = room.players.find(p => p.id === session.playerId);
    if (!player || !player.isHost) {
      return { success: false, error: '방 설정은 방장만 변경할 수 있습니다.' };
    }

    room.settings = {
      ...room.settings,
      ...newSettings
    };

    return { success: true, room };
  }

  // 플레이어 강퇴 (방장 전용)
  public kickPlayer(socketId: string, targetPlayerId: string): { success: boolean; room?: Room; kickedSocketId?: string; error?: string } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return { success: false, error: '세션을 찾을 수 없습니다.' };

    const room = this.rooms.get(session.roomCode);
    if (!room) return { success: false, error: '방을 찾을 수 없습니다.' };

    const host = room.players.find(p => p.id === session.playerId);
    if (!host || !host.isHost) {
      return { success: false, error: '방장만 플레이어를 내보낼 수 있습니다.' };
    }

    const targetIndex = room.players.findIndex(p => p.id === targetPlayerId);
    if (targetIndex === -1) return { success: false, error: '대상을 찾을 수 없습니다.' };

    const kickedPlayer = room.players[targetIndex];
    if (kickedPlayer.isHost) return { success: false, error: '방장은 강퇴할 수 없습니다.' };

    room.players.splice(targetIndex, 1);
    this.socketToPlayerMap.delete(kickedPlayer.socketId);

    return { success: true, room, kickedSocketId: kickedPlayer.socketId };
  }

  // 게임 시작 (방장 전용)
  public startGame(socketId: string): { success: boolean; room?: Room; error?: string } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return { success: false, error: '세션을 찾을 수 없습니다.' };

    const room = this.rooms.get(session.roomCode);
    if (!room) return { success: false, error: '방을 찾을 수 없습니다.' };

    const host = room.players.find(p => p.id === session.playerId);
    if (!host || !host.isHost) {
      return { success: false, error: '방장만 게임을 시작할 수 있습니다.' };
    }

    if (room.players.length < room.gameInfo.minPlayers) {
      return { success: false, error: `최소 ${room.gameInfo.minPlayers}명 이상 참여해야 시작할 수 있습니다.` };
    }

    const unreadyPlayers = room.players.filter(p => !p.isHost && !p.isReady);
    if (unreadyPlayers.length > 0) {
      return { success: false, error: '아직 준비를 마치지 않은 플레이어가 있습니다.' };
    }

    this.incrementPlayCount(room.gameId);
    room.status = 'playing';
    return { success: true, room };
  }

  // 지속형 파티 룸: 대기실에서 게임 변경 (방장 전용)
  public changeGame(socketId: string, gameId: string, customPackTitle?: string, customPackData?: any): { success: boolean; room?: Room; error?: string } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return { success: false, error: '세션을 찾을 수 없습니다.' };

    const room = this.rooms.get(session.roomCode);
    if (!room) return { success: false, error: '방을 찾을 수 없습니다.' };

    const host = room.players.find(p => p.id === session.playerId);
    if (!host || !host.isHost) {
      return { success: false, error: '방장만 게임을 변경할 수 있습니다.' };
    }

    const newGameInfo = INITIAL_GAMES.find(g => g.id === gameId);
    if (!newGameInfo) {
      return { success: false, error: '유효하지 않은 게임입니다.' };
    }

    room.gameId = gameId;
    room.gameInfo = newGameInfo;
    room.settings = {
      maxPlayers: newGameInfo.maxPlayers,
      rounds: newGameInfo.defaultSettings?.rounds || 3,
      timeLimitSec: newGameInfo.defaultSettings?.timeLimitSec || 45,
      isPublic: true,
      customPackTitle: customPackTitle || undefined,
      extraOptions: {
        ...(newGameInfo.defaultSettings || {}),
        customPackData: customPackData || undefined
      }
    };

    // 게임 변경 시 모든 게스트의 레디 상태를 안전하게 초기화
    room.players.forEach(p => {
      p.isReady = false;
    });

    room.gameState = null;
    room.status = 'waiting';

    return { success: true, room };
  }

  // 지속형 파티 룸: 게임 종료 후 다 함께 대기실로 복귀
  public returnToWaiting(socketId: string): { success: boolean; room?: Room; error?: string } {
    const session = this.socketToPlayerMap.get(socketId);
    if (!session) return { success: false, error: '세션을 찾을 수 없습니다.' };

    const room = this.rooms.get(session.roomCode);
    if (!room) return { success: false, error: '방을 찾을 수 없습니다.' };

    room.status = 'waiting';
    room.gameState = null;

    // 모든 게스트 레디 상태 초기화 (호스트 제외)
    room.players.forEach(p => {
      p.isReady = false;
    });

    return { success: true, room };
  }

  public getSession(socketId: string) {
    return this.socketToPlayerMap.get(socketId);
  }

  public getAllRooms(): Room[] {
    return Array.from(this.rooms.values());
  }
}
