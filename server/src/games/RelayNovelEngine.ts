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
    const rounds = Math.max(1, room.settings.rounds || 1);
    const playerCount = Math.max(2, room.players.length);
    const totalSteps = playerCount * rounds; // 1라운드 = 모든 소설이 전원을 1번씩 거치는 스텝 수

    // 각 참가자가 시작한 고유 소설 초기화 (총 playerCount 편)
    const novels: Record<string, NovelStory> = {};
    room.players.forEach((p, idx) => {
      novels[p.id] = {
        originAuthorId: p.id,
        originAuthorName: p.name,
        originAuthorAvatar: p.avatar,
        title: `${p.name}의 기상천외 막장 소설`,
        sentences: []
      };
    });

    // 라틴 방진 기반 무작위 순환 스케줄 생성
    // schedule[novelOriginAuthorId][stepIndex] = 작성할 플레이어 ID
    // - 조건 1: 각 소설은 1라운드(playerCount 스텝) 동안 모든 참가자를 정확히 1번씩 거침
    // - 조건 2: 매 스텝마다 모든 참가자가 서로 다른 1편의 소설을 작성
    // - 조건 3: 이전 사람이 항상 고정되지 않도록 무작위 오프셋 및 셔플 적용
    const playerIds = room.players.map(p => p.id);
    const schedule: Record<string, string[]> = {};

    // 1부터 N-1까지의 오프셋 순열을 무작위 셔플 (다양한 전달 재미 보장)
    const offsets = Array.from({ length: playerCount - 1 }, (_, i) => i + 1);
    // Fisher-Yates 셔플
    for (let i = offsets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [offsets[i], offsets[j]] = [offsets[j], offsets[i]];
    }
    const stepOffsets = [0, ...offsets]; // 스텝 0은 원작자 본인(offset 0)

    playerIds.forEach((originId, pIdx) => {
      const path: string[] = [];
      for (let round = 0; round < rounds; round++) {
        for (let s = 0; s < playerCount; s++) {
          const offset = stepOffsets[s];
          const targetPlayerIndex = (pIdx + offset) % playerCount;
          path.push(playerIds[targetPlayerIndex]);
        }
      }
      schedule[originId] = path;
    });

    room.gameState = {
      phase: 'writing', // writing -> reading_showcase -> gameEnd
      step: 1,
      totalSteps,
      rounds,
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

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
