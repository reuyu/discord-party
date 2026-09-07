// server/src/games/TabooTalkEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class TabooTalkEngine extends BaseEngine {
  onStart(room: Room): any {
    const alivePlayers = room.players.map(p => p.id);
    const tabooAssignments: Record<string, string> = {}; // targetId -> creatorId
    alivePlayers.forEach((pId, idx) => {
      const nextPlayerId = alivePlayers[(idx + 1) % alivePlayers.length];
      tabooAssignments[nextPlayerId] = pId; // pId가 nextPlayerId의 금기어를 지정
    });

    const userTaboos: Record<string, string[]> = {};
    alivePlayers.forEach(id => { userTaboos[id] = []; });

    room.gameState = {
      phase: 'setting', // setting -> talking -> gameEnd
      round: 1,
      tabooAssignments,
      userTaboos,
      currentRoundSubmissions: {} as Record<string, string>, // creatorId -> word
      alivePlayers,
      caughtHistory: [] as { victimId: string; reporterId: string; word: string }[],
      startedAt: Date.now(),
      timeLimitSec: 90 // 1분 30초
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 유저가 지정 상대방의 금기어 작성 제출
    if (action.type === 'submit_custom_taboo' && state.phase === 'setting') {
      const word = (action.payload.word || '').trim();
      const targetId = action.payload.targetPlayerId;
      if (!word || !targetId) return;

      if (!state.userTaboos[targetId]) {
        state.userTaboos[targetId] = [];
      }
      state.userTaboos[targetId].push(word);
      state.currentRoundSubmissions[playerId] = word;

      // 생존한 모든 플레이어가 이번 라운드 금기어 설정을 완료했는지 확인
      const allSubmitted = state.alivePlayers.every((pId: string) => !!state.currentRoundSubmissions[pId]);
      if (allSubmitted) {
        state.phase = 'talking';
        state.startedAt = Date.now();
        state.currentRoundSubmissions = {};
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 금기어 적발 신고 -> 1회 적발 즉사(탈락)!
    if (action.type === 'report_taboo' && state.phase === 'talking') {
      const victimId = action.payload.victimPlayerId;
      const reportedWord = (action.payload.word || '').trim();
      if (!victimId || victimId === playerId) return;

      const victimTaboos = state.userTaboos[victimId] || [];
      const matched = victimTaboos.find((t: string) => t.toLowerCase() === reportedWord.toLowerCase());

      if (matched) {
        state.caughtHistory.push({
          victimId,
          reporterId: playerId,
          word: matched
        });

        // 즉사 탈락 처리!
        state.alivePlayers = state.alivePlayers.filter((id: string) => id !== victimId);

        // 최후의 1인 확인
        if (state.alivePlayers.length <= 1) {
          state.phase = 'gameEnd';
          const winnerId = state.alivePlayers[0] || playerId;
          this.endGame(room, { winnerId, caughtHistory: state.caughtHistory }, io);
          return;
        }

        // 남은 생존자들로 지정 관계 재편
        state.tabooAssignments = {};
        state.alivePlayers.forEach((pId: string, idx: number) => {
          const nextPlayerId = state.alivePlayers[(idx + 1) % state.alivePlayers.length];
          state.tabooAssignments[nextPlayerId] = pId;
        });

        this.broadcastState(room, io);
      }
      return;
    }

    // 3. 시간 초과로 추가 금기어 페이즈 발동
    if (action.type === 'timeout_talk' && state.phase === 'talking') {
      state.round++;
      state.phase = 'setting';
      state.currentRoundSubmissions = {};
      state.startedAt = Date.now();
      this.broadcastState(room, io);
      return;
    }

    // 4. 게임 수동 종료
    if (action.type === 'finish_game') {
      state.phase = 'gameEnd';
      const winnerId = state.alivePlayers[0] || room.players[0].id;
      this.endGame(room, { winnerId, caughtHistory: state.caughtHistory }, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);
    if (state.alivePlayers.length <= 1 && state.phase !== 'gameEnd') {
      state.phase = 'gameEnd';
      const winnerId = state.alivePlayers[0] || playerId;
      this.endGame(room, { winnerId, caughtHistory: state.caughtHistory }, io);
    } else {
      this.broadcastState(room, io);
    }
  }
}
