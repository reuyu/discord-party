// server/src/games/ChosungQuizEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class ChosungQuizEngine extends BaseEngine {
  onStart(room: Room): any {
    const currentRound = 1;
    const totalRounds = room.settings.rounds || 5;
    const presenterIndex = 0;
    const presenter = room.players[presenterIndex];

    const scores: Record<string, number> = {};
    room.players.forEach(p => { scores[p.id] = 0; });

    room.gameState = {
      phase: 'presenting', // presenting -> guessing -> roundEnd -> gameEnd
      currentRound,
      totalRounds,
      presenterId: presenter.id,
      presenterIndex,
      category: '',
      chosung: '',
      answer: '',
      scores,
      correctPlayers: [] as string[],
      passVotes: [] as string[],
      timerSec: room.settings.timeLimitSec || 30, // 기본 30초
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 출제자가 문제 제출
    if (action.type === 'submit_quiz' && playerId === state.presenterId && state.phase === 'presenting') {
      const { category, answer } = action.payload;
      if (!category || !answer) return;

      const trimmedAnswer = answer.trim();
      const chosung = this.extractChosung(trimmedAnswer);

      state.phase = 'guessing';
      state.category = category.trim();
      state.chosung = chosung;
      state.answer = trimmedAnswer;
      state.correctPlayers = [];
      state.passVotes = [];
      state.timerSec = room.settings.timeLimitSec || 30;
      state.startedAt = Date.now();

      this.broadcastState(room, io);
      return;
    }

    // 2. 정답 채팅 입력 (풀이자)
    if (action.type === 'submit_answer' && state.phase === 'guessing') {
      if (playerId === state.presenterId) return;
      if (state.passVotes.includes(playerId)) return;
      if (state.correctPlayers.includes(playerId)) return;

      const input = (action.payload.answer || '').trim();
      if (input.toLowerCase() === state.answer.toLowerCase()) {
        state.correctPlayers.push(playerId);

        // 선착순 점수 지급 (1등 100점, 2등 80점, 3등 60점, 이후 50점)
        const rank = state.correctPlayers.length;
        const pts = rank === 1 ? 100 : rank === 2 ? 80 : rank === 3 ? 60 : 50;
        state.scores[playerId] = (state.scores[playerId] || 0) + pts;

        const guesserCount = Math.max(1, room.players.length - 1);
        if (state.correctPlayers.length >= guesserCount) {
          this.endRound(room, io);
          return;
        }

        this.broadcastState(room, io);
      }
      return;
    }

    // 3. PASS 투표 (정답을 아직 못 맞춘 사람만 투표 가능)
    if (action.type === 'vote_pass' && state.phase === 'guessing') {
      if (playerId === state.presenterId) return;
      if (state.correctPlayers.includes(playerId)) return; // 이미 맞힌 사람은 패스 불가

      if (!state.passVotes.includes(playerId)) {
        state.passVotes.push(playerId);

        // 정답을 아직 못 맞춘 참가자 수
        const remainingGuessers = (room.players.length - 1) - state.correctPlayers.length;
        // 정답 미달성자 전원이 PASS를 누르면 즉시 스킵
        if (state.passVotes.length >= remainingGuessers) {
          this.endRound(room, io, true);
          return;
        }

        this.broadcastState(room, io);
      }
      return;
    }

    // 4. 시간 초과로 라운드 종료
    if (action.type === 'timeout_round' && state.phase === 'guessing') {
      this.endRound(room, io);
      return;
    }

    // 5. 다음 라운드로 넘어가기 (자동 또는 수동)
    if (action.type === 'next_round' && state.phase === 'roundEnd') {
      if (state.currentRound >= state.totalRounds) {
        this.endGame(room, { scores: state.scores }, io);
      } else {
        state.currentRound++;
        state.presenterIndex = (state.presenterIndex + 1) % room.players.length;
        state.presenterId = room.players[state.presenterIndex].id;
        state.phase = 'presenting';
        state.category = '';
        state.chosung = '';
        state.answer = '';
        state.correctPlayers = [];
        state.passVotes = [];
        state.timerSec = 30;
        state.startedAt = Date.now();
        this.broadcastState(room, io);
      }
    }
  }

  private endRound(room: Room, io: Server, isAllPass = false) {
    const state = room.gameState;
    state.phase = 'roundEnd';

    if (!isAllPass) {
      const guesserCount = Math.max(1, room.players.length - 1);
      const ratio = state.correctPlayers.length / guesserCount;
      const presenterScore = Math.max(0, Math.round(120 * (1 - Math.abs(ratio - 0.5) * 2)));
      state.scores[state.presenterId] = (state.scores[state.presenterId] || 0) + presenterScore;
    }

    this.broadcastState(room, io);
  }

  private extractChosung(text: string): string {
    const CHOSUNG_LIST = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
      'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) - 44032;
      if (code >= 0 && code <= 11171) {
        result += CHOSUNG_LIST[Math.floor(code / 588)];
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    if (state.presenterId === playerId && state.phase === 'presenting') {
      state.presenterIndex = state.presenterIndex % Math.max(1, room.players.length);
      if (room.players[state.presenterIndex]) {
        state.presenterId = room.players[state.presenterIndex].id;
      }
      this.broadcastState(room, io);
    }
  }
}
