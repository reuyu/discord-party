// server/src/games/WorldcupEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class WorldcupEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['worldcup']?.[0]?.data || [];
    const items = customPackData?.length ? customPackData : defaultData;

    // 토너먼트 크기 설정 (8강, 16강, 32강 등)
    let tournamentSize = Number(room.settings.extraOptions?.tournamentSize || room.settings.rounds || 8);
    if (![4, 8, 16, 32].includes(tournamentSize)) {
      tournamentSize = 8;
    }
    // 데이터 수에 맞게 보정
    const maxAvailable = Math.min(items.length, tournamentSize);
    const validSize = maxAvailable >= 16 ? 16 : maxAvailable >= 8 ? 8 : 4;

    // 무작위 셔플
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const roundCandidates = shuffled.slice(0, validSize);

    const rName = validSize === 16 ? '16강' : validSize === 8 ? '8강' : '4강 준결승';

    room.gameState = {
      phase: 'match', // match -> finalWinner -> gameEnd
      totalRoundName: rName,
      currentCandidates: roundCandidates,
      nextRoundCandidates: [] as any[],
      matchIndex: 0,
      totalMatchesInRound: validSize / 2,
      candidateA: roundCandidates[0],
      candidateB: roundCandidates[1],
      votes: {} as Record<string, 'A' | 'B'>,
      winnerCandidate: null as any
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. 자유 투표 및 선택 변경 (방장 확정 전까지 무제한 변경 가능!)
    if (action.type === 'vote_candidate' && state.phase === 'match') {
      const choice = action.payload.choice as 'A' | 'B';
      if (choice !== 'A' && choice !== 'B') return;
      state.votes[playerId] = choice;
      this.broadcastState(room, io);
      return;
    }

    // 2. 방장의 [최종 선택 확정] (토론 후 결정)
    if (action.type === 'confirm_match_winner' && playerId === room.hostId && state.phase === 'match') {
      const choice = action.payload.choice as 'A' | 'B';
      const winner = choice === 'A' ? state.candidateA : state.candidateB;
      state.nextRoundCandidates.push(winner);

      const nextMatchIdx = state.matchIndex + 1;
      const totalMatches = state.totalMatchesInRound;

      if (nextMatchIdx < totalMatches) {
        // 다음 매치업
        state.matchIndex = nextMatchIdx;
        state.candidateA = state.currentCandidates[nextMatchIdx * 2];
        state.candidateB = state.currentCandidates[nextMatchIdx * 2 + 1];
        state.votes = {};
      } else {
        // 라운드 종료 (16강 -> 8강 -> 4강 -> 결승 -> 최종 우승)
        if (state.nextRoundCandidates.length === 1) {
          // 최종 우승!
          state.phase = 'finalWinner';
          state.winnerCandidate = state.nextRoundCandidates[0];
          this.endGame(room, { winnerCandidate: state.winnerCandidate }, io);
          return;
        } else {
          // 다음 라운드 편성
          state.currentCandidates = [...state.nextRoundCandidates];
          state.nextRoundCandidates = [];
          state.matchIndex = 0;
          state.totalMatchesInRound = state.currentCandidates.length / 2;
          const rName = state.totalMatchesInRound === 4 ? '8강' : state.totalMatchesInRound === 2 ? '4강 준결승' : '결승전';
          state.totalRoundName = rName;
          state.candidateA = state.currentCandidates[0];
          state.candidateB = state.currentCandidates[1];
          state.votes = {};
        }
      }

      this.broadcastState(room, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
