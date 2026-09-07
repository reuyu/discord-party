// server/src/games/VoiceBattleEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class VoiceBattleEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['voice-battle']?.[0]?.data || [
      { character: '타짜 곽철용', line: '묻고 더블로 가!', hint: '중후하고 카리스마 넘치는 보이스' },
      { character: '롤 야스오', line: '죽음은 바람과 같지, 늘 내 곁에 있으니.', hint: '고독한 검객' },
      { character: '보노보노', line: '포로리야~ 나 때릴 거야?', hint: '혀 짧고 귀여운 목소리' },
      { character: '아이언맨', line: 'I am Iron Man (핑거 스냅).', hint: '비장하고 낮게 깔린 톤' },
      { character: '스펀지밥', line: '월요일 좋아~ 최고로 좋아~', hint: '하이톤의 긍정적인 웃음소리' }
    ];
    const rawMissions = customPackData?.length ? customPackData : defaultData;
    // 중복 방지를 위한 셔플 덱
    const shuffledMissions = [...rawMissions].sort(() => Math.random() - 0.5);

    // 4인 이상 공평 라운드로빈 매치 페어 생성
    const pairs: [string, string][] = [];
    const n = room.players.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        pairs.push([room.players[i].id, room.players[j].id]);
      }
    }
    const matchPairs = pairs.length > 0 ? pairs.sort(() => Math.random() - 0.5) : [[room.players[0].id, (room.players[1] || room.players[0]).id]];

    const firstPair = matchPairs[0];
    const playerA = room.players.find(p => p.id === firstPair[0]) || room.players[0];
    const playerB = room.players.find(p => p.id === firstPair[1]) || room.players[1] || room.players[0];
    const currentMission = shuffledMissions[0];

    const scores: Record<string, number> = {};
    room.players.forEach(p => { scores[p.id] = 0; });

    room.gameState = {
      phase: 'battle', // battle -> voting -> result -> gameEnd
      roundIndex: 0,
      totalRounds: room.settings.rounds || 3,
      playerAId: playerA.id,
      playerBId: playerB.id,
      matchPairs,
      currentMission,
      missions: shuffledMissions,
      usedMissionIndices: [0],
      currentTurn: 'A' as 'A' | 'B',
      votes: {} as Record<string, 'A' | 'B'>,
      scores
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 발언 턴 넘기기 (현재 턴인 당사자 본인만 가능!)
    if (action.type === 'finish_voice' && state.phase === 'battle') {
      const isMyTurn = (state.currentTurn === 'A' && playerId === state.playerAId) ||
                       (state.currentTurn === 'B' && playerId === state.playerBId);
      if (!isMyTurn) return;

      if (state.currentTurn === 'A') {
        state.currentTurn = 'B';
      } else {
        // 둘 다 발언 완료 -> 청중 투표 전환
        state.phase = 'voting';
        state.votes = {};
      }
      this.broadcastState(room, io);
      return;
    }

    // 2. 청중 투표 (대결 당사자 제외)
    if (action.type === 'vote_voice' && state.phase === 'voting') {
      if (playerId === state.playerAId || playerId === state.playerBId) return;
      const choice = action.payload.choice as 'A' | 'B';
      state.votes[playerId] = choice;

      const voterCount = Math.max(1, room.players.length - 2);
      if (Object.keys(state.votes).length >= voterCount) {
        const votesA = Object.values(state.votes).filter(v => v === 'A').length;
        const votesB = Object.values(state.votes).filter(v => v === 'B').length;

        if (votesA === votesB) {
          // 동점/무승부 시 새로운 중복되지 않는 미션으로 재승부(Rematch)!
          state.phase = 'battle';
          state.currentTurn = 'A';
          state.votes = {};
          state.currentMission = this.getUnusedMission(state);
          state.rematchNotice = '🤝 무승부 발생! 새로운 미션으로 즉시 재승부를 시작합니다!';
        } else {
          const winnerId = votesA > votesB ? state.playerAId : state.playerBId;
          state.scores[winnerId] = (state.scores[winnerId] || 0) + 100;
          state.phase = 'result';
          state.winnerId = winnerId;
        }
      }

      this.broadcastState(room, io);
      return;
    }

    // 3. 다음 매치 진행
    if (action.type === 'next_match' && state.phase === 'result') {
      if (state.roundIndex + 1 >= state.totalRounds) {
        state.phase = 'gameEnd';
        this.endGame(room, { scores: state.scores }, io);
      } else {
        state.roundIndex++;
        // 공평 라운드로빈 큐에서 다음 1:1 대진 선택
        const matchPairs = state.matchPairs || [];
        const nextPair = matchPairs[state.roundIndex % matchPairs.length] || [room.players[0].id, room.players[1].id];
        state.playerAId = nextPair[0];
        state.playerBId = nextPair[1];
        state.currentMission = this.getUnusedMission(state);
        state.phase = 'battle';
        state.currentTurn = 'A';
        state.votes = {};
        state.rematchNotice = null;
        this.broadcastState(room, io);
      }
    }
  }

  private getUnusedMission(state: any): any {
    const missions = state.missions;
    let nextIdx = (state.usedMissionIndices[state.usedMissionIndices.length - 1] + 1) % missions.length;
    state.usedMissionIndices.push(nextIdx);
    return missions[nextIdx];
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
