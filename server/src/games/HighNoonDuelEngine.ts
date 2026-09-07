// server/src/games/HighNoonDuelEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class HighNoonDuelEngine extends BaseEngine {
  onStart(room: Room): any {
    const scores: Record<string, number> = {};
    const kills: Record<string, number> = {};
    const alivePlayers: string[] = [];
    const ammo: Record<string, number> = {};
    const aims: Record<string, { angle: number; targetPlayerId?: string }> = {};

    room.players.forEach((p, idx) => {
      scores[p.id] = 0;
      kills[p.id] = 0;
      alivePlayers.push(p.id);
      ammo[p.id] = 1; // 1발 장전
      // 초기 조준 각도 (중앙을 향함)
      const angle = (idx / room.players.length) * 360;
      aims[p.id] = { angle };
    });

    const totalRounds = 1; // 단판 승부 (무조건 1라운드)
    const delaySec = 10; // 10초 시계탑 카운트다운
    const targetTime = Date.now() + delaySec * 1000;

    room.gameState = {
      phase: 'standoff', // standoff -> shootout -> roundEnd -> gameEnd
      currentRound: 1,
      totalRounds,
      delaySec,
      targetTime,
      startedAt: Date.now(),
      alivePlayers,
      eliminatedPlayers: [] as string[],
      ammo,
      aims,
      kills,
      scores,
      shotEvents: [] as any[],
      roundWinnerId: null as string | null,
      roundResultNotice: ''
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 실시간 마우스 조준 동기화 (눈치 싸움)
    if (action.type === 'aim' && (state.phase === 'standoff' || state.phase === 'shootout')) {
      if (!state.alivePlayers.includes(playerId)) return;
      const angle = Number(action.payload?.angle) || 0;
      const targetPlayerId = action.payload?.targetPlayerId;
      state.aims[playerId] = { angle, targetPlayerId };

      // 조준 브로드캐스트
      io.to(room.code).emit('game:action_event', {
        type: 'player_aimed',
        payload: { playerId, angle, targetPlayerId }
      });
      return;
    }

    // 2. 발사 (방아쇠 당기기)
    if ((action.type === 'shoot' || action.type === 'shoot_gun') && (state.phase === 'standoff' || state.phase === 'shootout')) {
      if (!state.alivePlayers.includes(playerId)) return;
      if ((state.ammo[playerId] || 0) <= 0) return; // 잔여 총알 없음

      const now = Date.now();
      const isEarly = now < state.targetTime;
      const player = room.players.find(p => p.id === playerId);
      const targetId = action.payload?.targetPlayerId || state.aims[playerId]?.targetPlayerId;

      // 1) 12:00 정각 이전 부정출발(Early shot) -> 총알 빗나가며 오발 폭사 탈락!
      if (isEarly) {
        state.ammo[playerId] = 0;
        state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
        state.eliminatedPlayers.push(playerId);

        state.shotEvents.push({
          type: 'misfire',
          shooterId: playerId,
          shooterName: player?.name,
          time: now
        });

        io.to(room.code).emit('game:action_event', {
          type: 'shot_fired',
          payload: {
            shooterId: playerId,
            shooterName: player?.name,
            angle: action.payload?.angle ?? state.aims[playerId]?.angle ?? 0,
            isEarly: true,
            killed: false
          }
        });

        this.checkRoundEndCondition(room, io);
        this.broadcastState(room, io);
        return;
      }

      // 2) 12:00 정각 이후 정상 발사
      state.phase = 'shootout';
      state.ammo[playerId]--; // 총알 1발 소모

      let hitSuccess = false;
      let victimPlayer = null;

      if (targetId && targetId !== playerId && state.alivePlayers.includes(targetId)) {
        // 유효한 상대 히트스캔 사살 성공!
        hitSuccess = true;
        victimPlayer = room.players.find(p => p.id === targetId);

        // 피해자 사망
        state.alivePlayers = state.alivePlayers.filter((id: string) => id !== targetId);
        state.eliminatedPlayers.push(targetId);

        // 사살자 킬 수 증가 및 즉시 1발 재장전 (RELOAD)!
        state.kills[playerId] = (state.kills[playerId] || 0) + 1;
        state.ammo[playerId] = 1; // 사살 즉시 재장전!

        state.shotEvents.push({
          type: 'kill',
          shooterId: playerId,
          shooterName: player?.name,
          victimId: targetId,
          victimName: victimPlayer?.name,
          time: now
        });
      } else {
        // 허공에 쏨 (Miss) -> 탄약 소진
        state.shotEvents.push({
          type: 'miss',
          shooterId: playerId,
          shooterName: player?.name,
          time: now
        });
      }

      io.to(room.code).emit('game:action_event', {
        type: 'shot_fired',
        payload: {
          shooterId: playerId,
          shooterName: player?.name,
          targetId,
          victimName: victimPlayer?.name,
          angle: action.payload?.angle ?? state.aims[playerId]?.angle ?? 0,
          isEarly: false,
          killed: hitSuccess
        }
      });

      this.checkRoundEndCondition(room, io);
      this.broadcastState(room, io);
      return;
    }

    // 3. 다음 라운드 또는 서든데스 시작
    if (action.type === 'next_round' && state.phase === 'roundEnd') {
      if (state.currentRound >= state.totalRounds) {
        // 최종 게임 종료
        state.phase = 'gameEnd';
        const sorted = [...room.players].sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0));
        const winnerId = sorted[0]?.id || room.players[0].id;
        this.endGame(room, { winnerId, scores: state.scores }, io);
      } else {
        this.startNextRound(room, io, false);
      }
    }

    // 4. 서든데스 재경기 (무승부/전원 탄약 소진 시)
    if (action.type === 'sudden_death_retry' && state.phase === 'roundEnd') {
      this.startNextRound(room, io, true);
    }
  }

  private checkRoundEndCondition(room: Room, io: Server): void {
    const state = room.gameState;

    // 1) 생존자 1명 남음 -> 단독 라운드 승리!
    if (state.alivePlayers.length === 1) {
      const winnerId = state.alivePlayers[0];
      const winner = room.players.find(p => p.id === winnerId);
      state.phase = 'roundEnd';
      state.roundWinnerId = winnerId;
      state.scores[winnerId] = (state.scores[winnerId] || 0) + 100;
      state.roundResultNotice = `🤠 [최후의 생존자] ${winner?.name} 총잡이가 배틀로얄에서 최후까지 살아남아 승리했습니다! (+100점)`;
      return;
    }

    // 2) 생존자가 0명 (전원 사망) -> 서든데스 재경기!
    if (state.alivePlayers.length === 0) {
      state.phase = 'roundEnd';
      state.roundWinnerId = null;
      state.roundResultNotice = '💀 전원 사망! 서든데스(Sudden Death) 재경기를 진행합니다!';
      return;
    }

    // 3) 생존자 2명 이상인데 전원 총알(ammo)을 소진하여 더 이상 쏠 수 없는 경우 -> 서든데스!
    const anyAmmoLeft = state.alivePlayers.some((id: string) => (state.ammo[id] || 0) > 0);
    if (!anyAmmoLeft) {
      state.phase = 'roundEnd';
      state.roundWinnerId = null;
      state.roundResultNotice = '🤝 생존 총잡이들의 탄약이 모두 소진되었습니다! 서든데스 재경기를 진행합니다!';
    }
  }

  private startNextRound(room: Room, io: Server, isSuddenDeath: boolean): void {
    const state = room.gameState;
    if (!isSuddenDeath) {
      state.currentRound++;
    }

    state.alivePlayers = room.players.map(p => p.id);
    state.eliminatedPlayers = [];
    state.ammo = {};
    state.aims = {};
    state.shotEvents = [];
    state.roundWinnerId = null;
    state.roundResultNotice = isSuddenDeath ? '🔥 서든데스 결투! 방아쇠에 손을 얹으세요!' : '';

    room.players.forEach((p, idx) => {
      state.ammo[p.id] = 1;
      state.aims[p.id] = { angle: (idx / room.players.length) * 360 };
    });

    state.delaySec = 10;
    state.targetTime = Date.now() + state.delaySec * 1000;
    state.startedAt = Date.now();
    state.phase = 'standoff';

    this.broadcastState(room, io);
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
    this.checkRoundEndCondition(room, io);
    this.broadcastState(room, io);
  }
}
