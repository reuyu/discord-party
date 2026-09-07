// server/src/games/LiarGameEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class LiarGameEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['liar-game']?.[0]?.data || {
      category: '음식/야식',
      words: ['치킨', '피자', '떡볶이', '삼겹살']
    };
    const pack = customPackData || defaultData;
    const category = pack.category || '일반';
    const words = pack.words || ['치킨', '피자'];
    const secretWord = words[Math.floor(Math.random() * words.length)];

    // 1. 라이어 무작위 선정
    const liarIndex = Math.floor(Math.random() * room.players.length);
    const liarId = room.players[liarIndex].id;

    // 2. 첫 질문자 무작위 선정 (라이어와 완전 독립!)
    const firstSpeakerIndex = Math.floor(Math.random() * room.players.length);
    const currentSpeakerId = room.players[firstSpeakerIndex].id;

    // 질문 릴레이 총 횟수: 플레이어 수 * 2회 (충분한 토론 후 자동 투표 전환)
    const maxQuestionTurns = Math.max(4, room.players.length * 2);

    room.gameState = {
      phase: 'discussing', // discussing -> voting -> liarGuess -> gameEnd
      category,
      secretWord,
      liarId,
      currentSpeakerId,
      questionTurnCount: 0,
      maxQuestionTurns,
      questionHistory: [] as { fromId: string; toId: string; turn: number }[],
      votes: {} as Record<string, string>,
      winner: null as 'citizens' | 'liar' | null,
      winReason: ''
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 질문 상대 지목 릴레이
    if (action.type === 'pass_turn' && state.phase === 'discussing') {
      if (playerId !== state.currentSpeakerId) return;
      const targetId = action.payload.targetPlayerId;
      if (!targetId || targetId === playerId) return;

      state.questionTurnCount++;
      state.questionHistory.push({
        fromId: playerId,
        toId: targetId,
        turn: state.questionTurnCount
      });

      // 지목받은 사람이 다음 질문 발언자가 됨!
      state.currentSpeakerId = targetId;

      // 정해진 질문 횟수에 도달하면 자동으로 투표 페이즈로 전환!
      if (state.questionTurnCount >= state.maxQuestionTurns) {
        state.phase = 'voting';
        state.votes = {};
      }

      this.broadcastState(room, io);
      return;
    }

    // 2. 라이어 지목 투표
    if (action.type === 'submit_vote' && state.phase === 'voting') {
      const targetId = action.payload.targetPlayerId;
      if (!targetId) return;

      state.votes[playerId] = targetId;

      // 전원 투표 완료 확인
      if (Object.keys(state.votes).length >= room.players.length) {
        const tally: Record<string, number> = {};
        Object.values(state.votes).forEach((tId: any) => {
          tally[tId] = (tally[tId] || 0) + 1;
        });

        let mostVotedId = '';
        let maxVotes = -1;
        let isTie = false;

        Object.entries(tally).forEach(([pId, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            mostVotedId = pId;
            isTie = false;
          } else if (count === maxVotes) {
            isTie = true;
          }
        });

        if (isTie || mostVotedId !== state.liarId) {
          // 동점 또는 무고한 시민 지목 -> 라이어 즉시 승리!
          state.winner = 'liar';
          state.winReason = isTie ? '투표 동점으로 인해 라이어가 탈출에 성공했습니다!' : '시민들이 억울한 시민을 지목하여 라이어가 승리했습니다!';
          this.endGame(room, { winner: 'liar', winReason: state.winReason, liarId: state.liarId }, io);
        } else {
          // 라이어 지목 성공 -> 라이어의 마지막 역전 정답 기회 페이즈로 이동!
          state.phase = 'liarGuess';
          this.broadcastState(room, io);
        }
      } else {
        this.broadcastState(room, io);
      }
      return;
    }

    // 3. 라이어의 정답 역전 시도
    if (action.type === 'liar_guess' && state.phase === 'liarGuess' && playerId === state.liarId) {
      const guess = (action.payload.guess || '').trim().toLowerCase().replace(/\s+/g, '');
      const actual = state.secretWord.toLowerCase().replace(/\s+/g, '');

      if (guess === actual) {
        state.winner = 'liar';
        state.winReason = `라이어가 제시어 '${state.secretWord}'를 완벽하게 맞혀 대역전승을 거두었습니다!`;
      } else {
        state.winner = 'citizens';
        state.winReason = `라이어가 정답(제시어: '${state.secretWord}')을 맞히지 못해 시민들이 승리했습니다!`;
      }

      this.endGame(room, { winner: state.winner, winReason: state.winReason, liarId: state.liarId }, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    if (state.currentSpeakerId === playerId && state.phase === 'discussing') {
      const remaining = room.players.filter(p => p.id !== playerId);
      if (remaining.length > 0) {
        state.currentSpeakerId = remaining[0].id;
      }
      this.broadcastState(room, io);
    }
  }
}
