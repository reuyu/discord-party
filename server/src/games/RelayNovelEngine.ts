// server/src/games/RelayNovelEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export interface NovelSentence {
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  step: number;
}

export interface NovelStory {
  originAuthorId: string;
  originAuthorName: string;
  originAuthorAvatar: string;
  title: string;
  sentences: NovelSentence[];
}

export class RelayNovelEngine extends BaseEngine {
  onStart(room: Room): any {
    const playerCount = Math.max(2, room.players.length);
    const totalSteps = playerCount; // 1사이클: 모든 플레이어가 한 번씩 작성하여 결말까지 완성

    // 각 참가자가 시작한 고유 소설 초기화 (총 playerCount 편)
    const novels: Record<string, NovelStory> = {};
    room.players.forEach((p) => {
      novels[p.id] = {
        originAuthorId: p.id,
        originAuthorName: p.name,
        originAuthorAvatar: p.avatar,
        title: `${p.name}의 기상천외 막장 소설`,
        sentences: []
      };
    });

    const playerIds = room.players.map(p => p.id);
    const schedule = this.generateDiverseSchedule(playerIds);

    room.gameState = {
      phase: 'writing', // writing -> reading_showcase -> gameEnd
      step: 1,
      totalSteps,
      rounds: 1,
      playerCount,
      novels,
      schedule, // 소설별 스텝 배정 경로
      currentSubmissions: {} as Record<string, string>, // playerId -> sentence
      currentShowcaseAuthorId: room.players[0].id, // 낭독쇼에서 현재 선택된 원작자 ID
      timerSec: 40,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 문장 제출
    if (action.type === 'submit_sentence' && state.phase === 'writing') {
      const sentence = (action.payload?.sentence || '').trim();
      if (!sentence) return;

      state.currentSubmissions[playerId] = sentence;

      // 모든 참가자가 제출 완료했는지 확인
      const allSubmitted = room.players.every(p => !!state.currentSubmissions[p.id]);
      if (allSubmitted) {
        this.advanceNextStep(room, io);
      } else {
        this.broadcastState(room, io);
      }
      return;
    }

    // 2. 제출 취소 및 다시 수정하기
    if (action.type === 'cancel_submission' && state.phase === 'writing') {
      delete state.currentSubmissions[playerId];
      this.broadcastState(room, io);
      return;
    }

    // 3. 제한시간 초과 시 미제출자 기상천외한 기본 문장 자동 배정
    if (action.type === 'timeout_step' && state.phase === 'writing') {
      const fallbackSentences = [
        '...그때 갑자기 하늘에서 정체불명의 황금 오리가 떨어져 노래를 부르기 시작했다.',
        '...하지만 이것은 온 세상이 뒤집힐 충격적인 반전의 서막에 불과했으니...',
        '...알고 보니 이 모든 것은 시뮬레이션이었고, 주인공은 슈퍼히어로 슈트를 입고 있었다.',
        '...아무도 예상하지 못한 전개로, 두 사람은 갑자기 댄스 배틀을 시작했다.'
      ];

      room.players.forEach(p => {
        if (!state.currentSubmissions[p.id]) {
          const randomFallback = fallbackSentences[Math.floor(Math.random() * fallbackSentences.length)];
          state.currentSubmissions[p.id] = randomFallback;
        }
      });
      this.advanceNextStep(room, io);
      return;
    }

    // 4. 최종 낭독쇼에서 방장이 특정 참가자의 소설 선택 시 전원 화면 동기화
    if (action.type === 'select_showcase_author' && state.phase === 'reading_showcase') {
      const targetAuthorId = action.payload?.authorId;
      if (targetAuthorId && state.novels[targetAuthorId]) {
        state.currentShowcaseAuthorId = targetAuthorId;
        this.broadcastState(room, io);
      }
      return;
    }

    // 5. 다음 소설로 넘기기
    if (action.type === 'next_showcase' && state.phase === 'reading_showcase') {
      const playerIds = room.players.map(p => p.id);
      const currentIndex = playerIds.indexOf(state.currentShowcaseAuthorId);
      const nextIndex = (currentIndex + 1) % playerIds.length;
      state.currentShowcaseAuthorId = playerIds[nextIndex];
      this.broadcastState(room, io);
      return;
    }

    // 6. 최종 게임 종료 및 결과 화면 이동 (방장 전용)
    if (action.type === 'finish_game') {
      if (playerId !== room.hostId) return;
      state.phase = 'gameEnd';
      this.endGame(room, { novels: state.novels }, io);
    }
  }

  private advanceNextStep(room: Room, io: Server): void {
    const state = room.gameState;
    const currentStepIdx = state.step - 1; // 0-indexed

    // 각 소설에 대해 현재 스텝의 담당 플레이어가 작성한 문장을 누적 기록
    Object.keys(state.novels).forEach(originAuthorId => {
      const assignedPlayerId = state.schedule[originAuthorId]?.[currentStepIdx];
      const author = room.players.find(p => p.id === assignedPlayerId);
      const text = state.currentSubmissions[assignedPlayerId] || '...';

      state.novels[originAuthorId].sentences.push({
        authorId: assignedPlayerId,
        authorName: author?.name || '익명 작가',
        authorAvatar: author?.avatar || '✍️',
        text,
        step: state.step
      });
    });

    state.currentSubmissions = {};

    if (state.step >= state.totalSteps) {
      // 모든 스텝 완료 -> 최종 낭독쇼 페이즈로 전환!
      state.phase = 'reading_showcase';
      state.currentShowcaseAuthorId = room.players[0].id;
    } else {
      state.step++;
      state.startedAt = Date.now();
    }

    this.broadcastState(room, io);
  }

  private generateDiverseSchedule(playerIds: string[]): Record<string, string[]> {
    const n = playerIds.length;
    if (n <= 3) {
      const s: Record<string, string[]> = {};
      playerIds.forEach((originId, i) => {
        s[originId] = [];
        for (let step = 0; step < n; step++) {
          s[originId].push(playerIds[(i + step) % n]);
        }
      });
      return s;
    }

    // N >= 4: 매 스텝마다 직전 작성자가 겹치지 않도록 동적 스케줄링
    for (let trial = 0; trial < 1000; trial++) {
      const matrix: number[][] = Array.from({ length: n }, (_, i) => [i]);
      const prevAuthorsForPlayer: number[][] = Array.from({ length: n }, () => []);

      let success = true;
      for (let step = 1; step < n; step++) {
        let stepDone = false;
        for (let pTry = 0; pTry < 200; pTry++) {
          const perm = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
          let valid = true;
          for (let nov = 0; nov < n; nov++) {
            const p = perm[nov];
            if (matrix[nov].includes(p)) { valid = false; break; }
            const prev = matrix[nov][step - 1];
            if (prevAuthorsForPlayer[p].length > 0 && prevAuthorsForPlayer[p][prevAuthorsForPlayer[p].length - 1] === prev) {
              valid = false;
              break;
            }
          }
          if (valid) {
            for (let nov = 0; nov < n; nov++) {
              const p = perm[nov];
              matrix[nov].push(p);
              prevAuthorsForPlayer[p].push(matrix[nov][step - 1]);
            }
            stepDone = true;
            break;
          }
        }
        if (!stepDone) {
          success = false;
          break;
        }
      }

      if (success) {
        const schedule: Record<string, string[]> = {};
        playerIds.forEach((originId, i) => {
          schedule[originId] = matrix[i].map(pIdx => playerIds[pIdx]);
        });
        return schedule;
      }
    }

    // 기본 시프트 폴백
    const fallback: Record<string, string[]> = {};
    playerIds.forEach((originId, i) => {
      fallback[originId] = [];
      for (let step = 0; step < n; step++) {
        fallback[originId].push(playerIds[(i + step) % n]);
      }
    });
    return fallback;
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
