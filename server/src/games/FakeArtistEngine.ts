// server/src/games/FakeArtistEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class FakeArtistEngine extends BaseEngine {
  private PROMPTS = ['에펠탑', '코끼리', '피자', '자전거', '선글라스', '우산', '눈사람', '축구공', '스마트폰', '자동차'];

  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['fake-artist']?.[0]?.data || this.PROMPTS;
    const prompts = customPackData?.length ? customPackData : defaultData;
    const secretWord = prompts[Math.floor(Math.random() * prompts.length)];

    const fakeIndex = Math.floor(Math.random() * room.players.length);
    const fakeArtistId = room.players[fakeIndex].id;

    room.gameState = {
      phase: 'drawing', // drawing -> voting -> fake_guess -> gameEnd
      targetWord: secretWord,
      secretWord,
      category: '일상 사물 & 동물',
      fakeArtistId,
      currentDrawerId: room.players[0].id,
      currentTurnPlayerIndex: 0,
      currentRound: 1,
      maxRounds: room.settings.rounds || 3, // 3바퀴
      turnDurationSec: 10, // 턴당 10초
      turnStartedAt: Date.now(),
      strokes: [] as any[], // { playerId: string, color: string, points: [number, number][] }
      votes: {} as Record<string, string>,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 한 획 완료 제출 또는 10초 턴 타임아웃
    if ((action.type === 'finish_stroke' || action.type === 'draw_stroke' || action.type === 'timeout_turn') && state.phase === 'drawing') {
      // 드로잉 제출인 경우 (현재 턴인 플레이어만 제출 가능, 타임아웃은 호스트/본인 가능)
      if (action.type !== 'timeout_turn' && playerId !== state.currentDrawerId) {
        return;
      }

      if (action.payload?.stroke) {
        state.strokes.push(action.payload.stroke);
      }

      state.currentTurnPlayerIndex++;
      const totalTurns = room.players.length * state.maxRounds;

      if (state.currentTurnPlayerIndex >= totalTurns) {
        // 모든 라운드 종료 -> 투표 페이즈
        state.phase = 'voting';
        state.votes = {};
      } else {
        const nextPlayer = room.players[state.currentTurnPlayerIndex % room.players.length];
        state.currentDrawerId = nextPlayer.id;
        state.currentRound = Math.floor(state.currentTurnPlayerIndex / room.players.length) + 1;
        state.turnStartedAt = Date.now();
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 가짜 화가 투표
    if ((action.type === 'vote_fake' || action.type === 'submit_vote') && state.phase === 'voting') {
      const targetId = action.payload?.targetPlayerId || action.payload?.targetId;
      if (targetId) {
        state.votes[playerId] = targetId;
      }

      if (Object.keys(state.votes).length >= room.players.length) {
        // 투표 집계
        const counts: Record<string, number> = {};
        Object.values(state.votes as Record<string, string>).forEach(tId => {
          counts[tId] = (counts[tId] || 0) + 1;
        });

        let maxV = 0;
        let suspectedId = '';
        Object.entries(counts).forEach(([tId, count]) => {
          if (count > maxV) {
            maxV = count;
            suspectedId = tId;
          }
        });

        state.suspectedId = suspectedId;
        const isSuspectFake = suspectedId === state.fakeArtistId;

        if (isSuspectFake) {
          // 가짜 화가가 지목됨 -> 가짜 화가에게 역전 기회 (정답 단어 맞추기)
          state.phase = 'fake_guess';
        } else {
          // 시민이 억울하게 지목됨 -> 가짜 화가 즉시 승리!
          state.phase = 'gameEnd';
          state.winner = 'fake';
          const scores: Record<string, number> = {};
          scores[state.fakeArtistId] = 100;
          this.endGame(room, { winnerId: state.fakeArtistId, scores, winnerTeam: 'fake', suspectedId }, io);
        }
      }

      this.broadcastState(room, io);
      return;
    }

    // 3. 가짜 화가의 마지막 단어 역전 추리
    if ((action.type === 'fake_guess' || action.type === 'guess_word') && (state.phase === 'fake_guess' || state.phase === 'fakeGuess')) {
      const guess = (action.payload?.guess || '').trim();
      const target = (state.secretWord || state.targetWord || '').trim();
      const isWordCorrect = guess.toLowerCase() === target.toLowerCase();

      state.phase = 'gameEnd';
      const scores: Record<string, number> = {};

      if (isWordCorrect) {
        // 가짜 화가가 정답을 맞춰서 역전승!
        state.winner = 'fake';
        scores[state.fakeArtistId] = 100;
        this.endGame(room, { winnerId: state.fakeArtistId, scores, winnerTeam: 'fake', guessedCorrectly: true }, io);
      } else {
        // 시민 승리!
        state.winner = 'artists';
        room.players.forEach(p => {
          if (p.id !== state.fakeArtistId) {
            scores[p.id] = 50;
          }
        });
        const firstCitizenId = room.players.find(p => p.id !== state.fakeArtistId)?.id || room.players[0].id;
        this.endGame(room, { winnerId: firstCitizenId, scores, winnerTeam: 'artists', guessedCorrectly: false }, io);
      }
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
