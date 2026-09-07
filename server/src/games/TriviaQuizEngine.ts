// server/src/games/TriviaQuizEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class TriviaQuizEngine extends BaseEngine {
  private questionTimeouts: Map<string, NodeJS.Timeout> = new Map();

  onStart(room: Room, customPackData?: any): any {
    if (this.questionTimeouts.has(room.code)) {
      clearTimeout(this.questionTimeouts.get(room.code)!);
      this.questionTimeouts.delete(room.code);
    }

    const defaultData = REAL_DEFAULT_PACKS['trivia-quiz']?.[0]?.data || [];
    const rawQuestions = customPackData?.length ? customPackData : defaultData;

    // 문제 순서 무작위 셔플
    const shuffledQuestions = [...rawQuestions].sort(() => Math.random() - 0.5);

    const scores: Record<string, number> = {};
    const teamMap: Record<string, 'red' | 'blue'> = {};

    room.players.forEach((p, idx) => {
      scores[p.id] = 0;
      teamMap[p.id] = idx % 2 === 0 ? 'red' : 'blue';
    });

    const totalQuestions = Math.min(room.settings.rounds || 10, shuffledQuestions.length);
    const timerSec = 5; // 최대 5초 선택 제한시간

    room.gameState = {
      phase: 'question', // question -> answer_reveal -> gameEnd
      mode: room.settings.extraOptions?.mode || 'individual',
      questionIndex: 0,
      totalQuestions,
      questions: shuffledQuestions,
      currentQuestion: shuffledQuestions[0],
      answers: {} as Record<string, { choice: number; timeSec: number; isCorrect: boolean }>,
      submittedPlayerIds: [] as string[],
      scores,
      teamMap,
      timerSec,
      startedAt: Date.now()
    };

    this.scheduleQuestionTimeout(room, ioFallback => this.revealAnswer(room, ioFallback));

    return room.gameState;
  }

  private scheduleQuestionTimeout(room: Room, onTimeoutCallback: (io: Server) => void) {
    if (this.questionTimeouts.has(room.code)) {
      clearTimeout(this.questionTimeouts.get(room.code)!);
    }
    // 5.2초 후 자동 타임아웃
    const timeout = setTimeout(() => {
      if (room.gameState?.phase === 'question') {
        onTimeoutCallback((global as any).ioInstance);
      }
    }, (room.gameState?.timerSec || 5) * 1000 + 200);
    this.questionTimeouts.set(room.code, timeout);
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    (global as any).ioInstance = io;

    // 1. 답안 제출 (4지선다 0~3, 5초 동안은 정답 미공개)
    if (action.type === 'submit_choice' && state.phase === 'question') {
      const choice = Number(action.payload.choice);
      const isCorrect = choice === state.currentQuestion.answerIndex;
      const elapsedSec = (Date.now() - state.startedAt) / 1000;
      const timeRemaining = Math.max(0, state.timerSec - elapsedSec);

      // 5초 내에서는 번복 선택 가능
      state.answers[playerId] = {
        choice,
        timeSec: elapsedSec,
        isCorrect
      };

      if (!state.submittedPlayerIds.includes(playerId)) {
        state.submittedPlayerIds.push(playerId);
      }

      // 전원 선택 완료 시 ➔ 즉시 5초 기다릴 것 없이 모두가 선택한 결과 및 정답 공개
      if (state.submittedPlayerIds.length >= room.players.length) {
        this.revealAnswer(room, io);
        return;
      }

      this.broadcastQuestionState(room, io);
      return;
    }

    // 2. 타이머 만료로 정답 공개
    if (action.type === 'timeout_question' && state.phase === 'question') {
      this.revealAnswer(room, io);
      return;
    }

    // 3. 다음 문제 넘어가기
    if (action.type === 'next_question' && state.phase === 'answer_reveal') {
      if (state.questionIndex + 1 >= state.totalQuestions) {
        state.phase = 'gameEnd';
        if (this.questionTimeouts.has(room.code)) {
          clearTimeout(this.questionTimeouts.get(room.code)!);
          this.questionTimeouts.delete(room.code);
        }
        this.endGame(room, { scores: state.scores, teamMap: state.teamMap }, io);
      } else {
        state.questionIndex++;
        state.currentQuestion = state.questions[state.questionIndex];
        state.answers = {};
        state.submittedPlayerIds = [];
        state.phase = 'question';
        state.startedAt = Date.now();

        this.scheduleQuestionTimeout(room, ioFallback => this.revealAnswer(room, ioFallback));
        this.broadcastQuestionState(room, io);
      }
    }
  }

  // question 페이즈에서는 누가 무슨 보기를 골랐는지 숨기고 제출 여부만 브로드캐스트
  private broadcastQuestionState(room: Room, io: Server) {
    const state = room.gameState;
    if (!io || !state) return;
    io.to(room.code).emit('game:state-sync', state);
  }

  // 5초 경과 혹은 전원 선택 완료 시: 미선택자 오답 처리 + 점수 합산 + 정답 및 각자 선택 공개!
  private revealAnswer(room: Room, io: Server) {
    const state = room.gameState;
    if (!state || state.phase === 'answer_reveal' || state.phase === 'gameEnd') return;

    if (this.questionTimeouts.has(room.code)) {
      clearTimeout(this.questionTimeouts.get(room.code)!);
      this.questionTimeouts.delete(room.code);
    }

    state.phase = 'answer_reveal';

    // 미선택자 오답 처리 & 점수 계산
    room.players.forEach(p => {
      const ans = state.answers[p.id];
      if (!ans) {
        // 미선택자 오답
        state.answers[p.id] = {
          choice: -1,
          timeSec: state.timerSec,
          isCorrect: false
        };
      } else if (ans.isCorrect) {
        // 기본 100점 + 남은 시간(초) x 10점 보너스
        const timeRemaining = Math.max(0, state.timerSec - ans.timeSec);
        const points = 100 + Math.round(timeRemaining * 10);
        state.scores[p.id] = (state.scores[p.id] || 0) + points;
      }
    });

    if (io) {
      io.to(room.code).emit('game:state-sync', state);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
