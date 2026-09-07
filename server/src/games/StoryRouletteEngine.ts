// server/src/games/StoryRouletteEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class StoryRouletteEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['story-roulette']?.[0]?.data || {
      topics: ['내 인생 최대 흑역사', '소름 돋는 실화 썰', '첫사랑 썰'],
      penalties: ['디코 프사 엽사로 24시간 변경', '노래 한 곡 완창']
    };
    const pack = customPackData || defaultData;
    const topics = pack.topics || ['흑역사 썰'];
    const penalties = pack.penalties || ['벌칙 1'];

    // 모든 참가자가 공평하게 썰을 풀도록 셔플된 플레이어 큐 생성
    const speakerQueue = [...room.players.map(p => p.id)].sort(() => Math.random() - 0.5);
    const totalRounds = Math.min(room.settings.rounds || 5, speakerQueue.length);

    const firstSpeakerId = speakerQueue[0];
    const firstTopic = topics[Math.floor(Math.random() * topics.length)];

    room.gameState = {
      phase: 'spinning', // spinning -> telling -> voting -> penaltySpin -> roundEnd -> gameEnd
      roundIndex: 0,
      totalRounds,
      speakerQueue,
      speakerId: firstSpeakerId,
      topic: firstTopic,
      topics,
      penalties,
      penalty: '',
      votes: {} as Record<string, 'fun' | 'boring'>,
      scores: {} as Record<string, number>
    };

    room.players.forEach(p => { room.gameState.scores[p.id] = 0; });

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 룰렛 회전 완료 -> 썰풀기 시작
    if (action.type === 'start_telling' && state.phase === 'spinning') {
      state.phase = 'telling';
      this.broadcastState(room, io);
      return;
    }

    // 2. 썰 종료 -> 꿀잼/노잼 투표 전환
    if (action.type === 'finish_story' && (playerId === state.speakerId || playerId === room.hostId)) {
      state.phase = 'voting';
      state.votes = {};
      this.broadcastState(room, io);
      return;
    }

    // 3. 청중 투표
    if (action.type === 'vote_story' && state.phase === 'voting') {
      const vote = action.payload.vote as 'fun' | 'boring';
      state.votes[playerId] = vote;

      const voterCount = Math.max(1, room.players.length - 1);
      if (Object.keys(state.votes).length >= voterCount) {
        const funCount = Object.values(state.votes).filter(v => v === 'fun').length;
        const boringCount = Object.values(state.votes).filter(v => v === 'boring').length;

        if (boringCount > funCount) {
          // 노잼 판정 -> 벌칙 룰렛 발동!
          state.phase = 'penaltySpin';
          state.penalty = state.penalties[Math.floor(Math.random() * state.penalties.length)];
        } else {
          // 꿀잼 인정 (+50점)
          state.scores[state.speakerId] = (state.scores[state.speakerId] || 0) + 50;
          state.phase = 'roundEnd';
        }
      }

      this.broadcastState(room, io);
      return;
    }

    // 4. 벌칙 확인 후 다음 라운드 진행 (무한 진행 버그 해결!)
    if (action.type === 'next_round') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        this.endGame(room, { scores: state.scores }, io);
      } else {
        state.roundIndex++;
        state.speakerId = state.speakerQueue[state.roundIndex] || room.players[state.roundIndex % room.players.length].id;
        state.topic = state.topics[Math.floor(Math.random() * state.topics.length)];
        state.penalty = '';
        state.votes = {};
        state.phase = 'spinning';
        this.broadcastState(room, io);
      }
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
