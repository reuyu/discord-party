// server/src/games/SnakeRoyaleEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class SnakeRoyaleEngine extends BaseEngine {
  private tickIntervals: Map<string, NodeJS.Timeout> = new Map();
  private countdownTimers: Map<string, NodeJS.Timeout> = new Map();

  onStart(room: Room): any {
    // 기존 타이머들 정리
    this.clearRoomTimers(room.code);

    const gridSize = 26;
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#EAB308'];

    const snakes: Record<string, any> = {};
    const alivePlayers: string[] = [];
    const appleStats: Record<string, number> = {};
    const N = Math.max(1, room.players.length);

    // 안전 원형 분산 스폰 알고리즘
    // 중심 (13, 13) 기준 반경 R = 8에서 원형 배치하여 즉시 충돌 및 벽 충돌 100% 방지
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);
    const radius = 8;

    room.players.forEach((p, idx) => {
      alivePlayers.push(p.id);
      appleStats[p.id] = 0;

      const angle = (2 * Math.PI * idx) / N;
      const headX = Math.max(3, Math.min(gridSize - 4, Math.round(centerX + radius * Math.cos(angle))));
      const headY = Math.max(3, Math.min(gridSize - 4, Math.round(centerY + radius * Math.sin(angle))));

      // 반시계 방향 접선 벡터를 향하도록 초기 이동 방향 설정
      const tangentX = -Math.sin(angle);
      const tangentY = Math.cos(angle);

      let initDir = 'RIGHT';
      if (Math.abs(tangentX) > Math.abs(tangentY)) {
        initDir = tangentX > 0 ? 'RIGHT' : 'LEFT';
      } else {
        initDir = tangentY > 0 ? 'DOWN' : 'UP';
      }

      // 꼬리 2칸은 진행 방향의 반대 방향으로 안전하게 배치
      const oppositeOffsetX = initDir === 'RIGHT' ? -1 : initDir === 'LEFT' ? 1 : 0;
      const oppositeOffsetY = initDir === 'DOWN' ? -1 : initDir === 'UP' ? 1 : 0;

      snakes[p.id] = {
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        color: colors[idx % colors.length],
        body: [
          { x: headX, y: headY },
          { x: headX + oppositeOffsetX, y: headY + oppositeOffsetY },
          { x: headX + oppositeOffsetX * 2, y: headY + oppositeOffsetY * 2 }
        ],
        direction: initDir,
        nextDirection: initDir,
        alive: true
      };
    });

    const apples: { x: number; y: number }[] = [];
    for (let i = 0; i < Math.max(4, room.players.length + 2); i++) {
      apples.push({
        x: Math.floor(Math.random() * (gridSize - 4)) + 2,
        y: Math.floor(Math.random() * (gridSize - 4)) + 2
      });
    }

    room.gameState = {
      phase: 'countdown', // countdown -> playing -> gameEnd
      countdownSec: 3,
      gridSize,
      snakes,
      apples,
      alivePlayers,
      appleStats,
      winnerId: null as string | null,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  // 게임 시작 후 3초 카운트다운 타이머 구동
  startCountdown(room: Room, io: Server): void {
    if (this.countdownTimers.has(room.code)) {
      clearInterval(this.countdownTimers.get(room.code)!);
    }

    const timer = setInterval(() => {
      const state = room.gameState;
      if (!state || state.phase !== 'countdown') {
        clearInterval(timer);
        this.countdownTimers.delete(room.code);
        return;
      }

      state.countdownSec--;
      if (state.countdownSec <= 0) {
        state.phase = 'playing';
        state.startedAt = Date.now();
        clearInterval(timer);
        this.countdownTimers.delete(room.code);
      }

      this.broadcastState(room, io);
    }, 1000);

    this.countdownTimers.set(room.code, timer);
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 카운트다운 시작 트리거 (필요 시)
    if (action.type === 'start_countdown' && state.phase === 'countdown') {
      this.startCountdown(room, io);
      return;
    }

    if (state.phase !== 'playing') {
      // 카운트다운 중 방향 전환 예약은 허용
      if (action.type === 'change_dir' || action.type === 'change_direction' || action.type === 'move_dir') {
        const newDir = action.payload?.direction || action.payload?.dir;
        const snake = state.snakes[playerId];
        if (snake && newDir) snake.nextDirection = newDir;
      }
      return;
    }

    // 1. 방향 전환 처리
    if (action.type === 'change_dir' || action.type === 'change_direction' || action.type === 'move_dir') {
      const newDir = action.payload?.direction || action.payload?.dir;
      const snake = state.snakes[playerId];
      if (!snake || !snake.alive || !newDir) return;

      const opposites: Record<string, string> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      };

      if (opposites[newDir] !== snake.direction) {
        snake.nextDirection = newDir;
      }
      return;
    }

    // 2. 서버 틱 (호스트 또는 클라이언트가 호출)
    if (action.type === 'game_tick' || action.type === 'tick') {
      this.updateSnakePhysics(room, io);
    }
  }

  private updateSnakePhysics(room: Room, io: Server): void {
    const state = room.gameState;
    if (!state || state.phase !== 'playing') return;

    const gridSize = state.gridSize || 26;
    const aliveSnakes = Object.values(state.snakes).filter((s: any) => s.alive) as any[];

    if (aliveSnakes.length === 0) return;

    const deadThisTick: string[] = [];

    // 1. 머리 위치 전진
    aliveSnakes.forEach(snake => {
      snake.direction = snake.nextDirection;
      const head = snake.body[0];
      let newHead = { ...head };

      if (snake.direction === 'UP') newHead.y -= 1;
      else if (snake.direction === 'DOWN') newHead.y += 1;
      else if (snake.direction === 'LEFT') newHead.x -= 1;
      else if (snake.direction === 'RIGHT') newHead.x += 1;

      // 벽 충돌 검사
      if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize) {
        deadThisTick.push(snake.id);
        return;
      }

      // 사과 섭취 검사
      const appleIndex = state.apples.findIndex((a: any) => a.x === newHead.x && a.y === newHead.y);
      const ateApple = appleIndex !== -1;

      if (ateApple) {
        state.apples.splice(appleIndex, 1);
        state.appleStats[snake.id] = (state.appleStats[snake.id] || 0) + 1;

        // 새 사과 리스폰
        state.apples.push({
          x: Math.floor(Math.random() * (gridSize - 4)) + 2,
          y: Math.floor(Math.random() * (gridSize - 4)) + 2
        });
      }

      snake.body.unshift(newHead);
      if (!ateApple) {
        snake.body.pop();
      }
    });

    // 2. 다른 지렁이 및 자기 자신 몸통 충돌 검사
    aliveSnakes.forEach(snake => {
      if (deadThisTick.includes(snake.id)) return;
      const head = snake.body[0];

      // 자기 몸통 충돌
      for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
          deadThisTick.push(snake.id);
          return;
        }
      }

      // 다른 지렁이 몸통 충돌
      aliveSnakes.forEach(otherSnake => {
        if (otherSnake.id === snake.id) return;
        for (let i = 0; i < otherSnake.body.length; i++) {
          if (head.x === otherSnake.body[i].x && head.y === otherSnake.body[i].y) {
            deadThisTick.push(snake.id);
            return;
          }
        }
      });
    });

    // 사망 처리
    deadThisTick.forEach(dId => {
      if (state.snakes[dId]) {
        state.snakes[dId].alive = false;
      }
      state.alivePlayers = state.alivePlayers.filter((id: string) => id !== dId);
    });

    // 승자 판정 (1명 이하 생존 시 종료)
    const currentAlive = Object.values(state.snakes).filter((s: any) => s.alive) as any[];
    if (currentAlive.length <= 1 && room.players.length >= 2) {
      state.phase = 'gameEnd';
      state.winnerId = currentAlive[0]?.id || null;
      this.clearRoomTimers(room.code);
      this.endGame(room, {
        winnerId: state.winnerId,
        appleStats: state.appleStats
      }, io);
      return;
    } else if (currentAlive.length === 0) {
      state.phase = 'gameEnd';
      state.winnerId = null;
      this.clearRoomTimers(room.code);
      this.endGame(room, {
        winnerId: null,
        appleStats: state.appleStats
      }, io);
      return;
    }

    this.broadcastState(room, io);
  }

  private clearRoomTimers(roomCode: string): void {
    if (this.tickIntervals.has(roomCode)) {
      clearInterval(this.tickIntervals.get(roomCode)!);
      this.tickIntervals.delete(roomCode);
    }
    if (this.countdownTimers.has(roomCode)) {
      clearInterval(this.countdownTimers.get(roomCode)!);
      this.countdownTimers.delete(roomCode);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (state && state.snakes[playerId]) {
      state.snakes[playerId].alive = false;
      state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
    }
    this.broadcastState(room, io);
  }
}
