// server/src/games/BombPartyEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';

export class BombPartyEngine extends BaseEngine {
  private SYLLABLES = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하', '고', '노', '도', '로', '모', '보', '소', '오', '조', '초', '포', '호', '수', '루', '무', '부', '주', '쿠', '투', '푸', '후', '산', '물', '달', '별', '불', '김', '밥', '치', '피', '햄', '라', '면', '상', '자'];

  onStart(room: Room): any {
    const lives: Record<string, number> = {};
    const alivePlayers: string[] = [];

    room.players.forEach(p => {
      lives[p.id] = 1; // 목숨 1개 즉사 서바이벌!
      alivePlayers.push(p.id);
    });

    const currentHolderIndex = 0;
    const currentHolderId = alivePlayers[currentHolderIndex];
    const currentSyllable = this.getRandomSyllable();
    const totalTurnsCount = 0;
    const bombDurationSec = 10.0; // 초기 10초에서 시작

    room.gameState = {
      phase: 'playing', // playing -> gameEnd
      lives,
      alivePlayers,
      eliminatedPlayers: [] as string[],
      currentHolderId,
      currentHolderIndex,
      currentSyllable,
      lastWord: '',
      lastWordSubmitterId: '',
      challengeVotes: [] as string[], // 억지 단어 이의제기 투표
      usedWords: [] as string[],
      totalTurnsCount,
      bombDurationSec,
      startedAt: Date.now()
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state || state.phase !== 'playing') return;

    // 1. 단어 제출 (현재 폭탄 소지자만)
    if (action.type === 'submit_word' && playerId === state.currentHolderId) {
      const word = (action.payload.word || '').trim();
      if (word.length < 2) return;

      // 글자 포함 여부 및 중복 검사
      if (!word.includes(state.currentSyllable)) return;
      if (state.usedWords.includes(word)) return;

      state.usedWords.push(word);
      state.lastWord = word;
      state.lastWordSubmitterId = playerId;
      state.challengeVotes = [];

      // 다음 살아있는 플레이어에게 폭탄 패스
      this.passToNextPlayer(room, io);
      return;
    }

    // 2. 억지 단어 이의제기 (생존자 & 탈락자 모두 신고 가능!)
    if (action.type === 'challenge_word') {
      if (!state.lastWordSubmitterId || state.lastWordSubmitterId === playerId) return;
      if (state.challengeVotes.includes(playerId)) return;

      state.challengeVotes.push(playerId);
      const voterCount = Math.max(1, room.players.length - 1);

      // 과반수 이상 의심 시 -> 제출자 폭탄 강제 반환 및 즉시 탈락!
      if (state.challengeVotes.length >= Math.ceil(voterCount / 2)) {
        const punishedId = state.lastWordSubmitterId;
        state.lives[punishedId] = 0;
        state.challengeVotes = [];
        this.eliminatePlayer(room, punishedId, io);
        return;
      }

      this.broadcastState(room, io);
      return;
    }

    // 3. 폭탄 타이머 만료 (폭발 -> 즉시 탈락)
    if (action.type === 'explode_bomb') {
      const victimId = state.currentHolderId;
      state.lives[victimId] = 0;
      this.eliminatePlayer(room, victimId, io);
    }
  }

  private passToNextPlayer(room: Room, io: Server): void {
    const state = room.gameState;
    if (state.alivePlayers.length <= 1) {
      this.finishGame(room, io);
      return;
    }

    state.totalTurnsCount = (state.totalTurnsCount || 0) + 1;
    state.currentHolderIndex = (state.currentHolderIndex + 1) % state.alivePlayers.length;
    state.currentHolderId = state.alivePlayers[state.currentHolderIndex];
    state.currentSyllable = this.getRandomSyllable();
    // 턴마다 0.5초씩 계속 감소 (최저치 없이 0.5초 극한까지 가속)
    state.bombDurationSec = Math.max(0.5, +(10.0 - state.totalTurnsCount * 0.5).toFixed(1));
    state.startedAt = Date.now();

    this.broadcastState(room, io);
  }

  private eliminatePlayer(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state.eliminatedPlayers.includes(playerId)) {
      state.eliminatedPlayers.push(playerId);
    }
    state.alivePlayers = state.alivePlayers.filter((id: string) => id !== playerId);

    if (state.alivePlayers.length <= 1) {
      this.finishGame(room, io);
      return;
    }

    // 다음 생존자에게 폭탄 전달
    state.totalTurnsCount = (state.totalTurnsCount || 0) + 1;
    state.currentHolderIndex = state.currentHolderIndex % state.alivePlayers.length;
    state.currentHolderId = state.alivePlayers[state.currentHolderIndex];
    state.currentSyllable = this.getRandomSyllable();
    state.bombDurationSec = Math.max(0.5, +(10.0 - state.totalTurnsCount * 0.5).toFixed(1));
    state.startedAt = Date.now();

    this.broadcastState(room, io);
  }

  private finishGame(room: Room, io: Server): void {
    const state = room.gameState;
    state.phase = 'gameEnd';
    const winnerId = state.alivePlayers[0] || room.players[0].id;
    state.winnerId = winnerId;
    const scores: Record<string, number> = {};
    scores[winnerId] = 100;
    this.endGame(room, { winnerId, scores }, io);
  }

  private getRandomSyllable(): string {
    return this.SYLLABLES[Math.floor(Math.random() * this.SYLLABLES.length)];
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    const state = room.gameState;
    if (!state) return;
    if (state.alivePlayers.includes(playerId)) {
      this.eliminatePlayer(room, playerId, io);
    }
  }
}
