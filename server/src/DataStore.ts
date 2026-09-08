// server/src/DataStore.ts
import fs from 'fs';
import path from 'path';
import { CustomPack } from '../../shared/types';
import { INITIAL_GAMES } from '../../shared/gamesData';

export interface PersistedStoreData {
  gamePlayCounts: Record<string, number>;
  customPacks: CustomPack[];
  packLikes: Record<string, number>;
}

export class DataStore {
  private static instance: DataStore;
  private filePath: string;
  private data: PersistedStoreData;
  private saveTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.filePath = this.resolveStorePath();
    this.data = this.loadData();
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private resolveStorePath(): string {
    const candidates = [
      path.resolve(process.cwd(), 'server/data/persisted_store.json'),
      path.resolve(process.cwd(), 'data/persisted_store.json'),
      path.resolve(__dirname, '../data/persisted_store.json'),
      path.resolve(__dirname, '../../data/persisted_store.json')
    ];

    for (const p of candidates) {
      if (fs.existsSync(p)) {
        return p;
      }
    }

    // 기본 경로로 지정하고 디렉토리 생성
    const defaultPath = candidates[0];
    const dir = path.dirname(defaultPath);
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch {
        // Fallback to local data dir
      }
    }
    return defaultPath;
  }

  private getInitialData(): PersistedStoreData {
    // 22종 게임 초기 플레이 횟수 시드 (상위 5개 HOT 게임: worldcup, liar-game, zoom-quiz, chosung-quiz, voice-battle)
    const counts: Record<string, number> = {
      'worldcup': 1580,
      'liar-game': 1420,
      'zoom-quiz': 1260,
      'chosung-quiz': 1130,
      'voice-battle': 1050,
      'smart-mafia': 890,
      'trivia-quiz': 820,
      'balance-debate': 780,
      'relay-novel': 740,
      'high-noon-duel': 690,
      'five-sec-rule': 640,
      'bomb-party': 590,
      'snake-royale': 550,
      'clicker-clash': 510,
      'taboo-talk': 480,
      'fake-artist': 450,
      'blind-drawing': 420,
      'story-roulette': 390,
      'black-and-white': 370,
      'anonymous-exposed': 350,
      'short-trpg': 330,
      'ox-survival': 310
    };

    INITIAL_GAMES.forEach(g => {
      if (counts[g.id] === undefined) {
        counts[g.id] = g.playCount || 300;
      }
    });

    return {
      gamePlayCounts: counts,
      customPacks: [],
      packLikes: {}
    };
  }

  private loadData(): PersistedStoreData {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.gamePlayCounts === 'object') {
          // INITIAL_GAMES에 있는 모든 게임이 누락되지 않도록 보충
          const initial = this.getInitialData();
          const mergedCounts = { ...initial.gamePlayCounts, ...parsed.gamePlayCounts };
          return {
            gamePlayCounts: mergedCounts,
            customPacks: Array.isArray(parsed.customPacks) ? parsed.customPacks : [],
            packLikes: typeof parsed.packLikes === 'object' ? parsed.packLikes : {}
          };
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not load persisted_store.json, creating new store:', e);
    }

    const initialData = this.getInitialData();
    this.saveDataImmediately(initialData);
    return initialData;
  }

  private saveDataImmediately(dataToSave: PersistedStoreData) {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('❌ Failed to save persisted_store.json:', e);
    }
  }

  private scheduleSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveDataImmediately(this.data);
      this.saveTimeout = null;
    }, 500);
  }

  // ===== Play Counts =====
  public getPlayCounts(): Record<string, number> {
    return { ...this.data.gamePlayCounts };
  }

  public getPlayCount(gameId: string): number {
    return this.data.gamePlayCounts[gameId] || 0;
  }

  public incrementPlayCount(gameId: string): number {
    const current = this.data.gamePlayCounts[gameId] || 0;
    const next = current + 1;
    this.data.gamePlayCounts[gameId] = next;
    this.scheduleSave();
    return next;
  }

  // ===== Custom Packs =====
  public getCustomPacks(gameId?: string): CustomPack[] {
    const packs = gameId
      ? this.data.customPacks.filter(p => p.gameId === gameId)
      : this.data.customPacks;

    // packLikes 병합
    return packs.map(p => ({
      ...p,
      likes: this.data.packLikes[p.id] ?? p.likes ?? 0
    }));
  }

  public addCustomPack(pack: CustomPack): void {
    // 중복 제거 후 추가
    this.data.customPacks = [
      pack,
      ...this.data.customPacks.filter(p => p.id !== pack.id)
    ];
    if (pack.likes) {
      this.data.packLikes[pack.id] = pack.likes;
    }
    this.scheduleSave();
  }

  // ===== Pack Likes =====
  public getLikes(packId: string): number {
    return this.data.packLikes[packId] || 0;
  }

  public toggleLike(packId: string, increment: boolean = true): number {
    const current = this.data.packLikes[packId] || 0;
    const next = increment ? current + 1 : Math.max(0, current - 1);
    this.data.packLikes[packId] = next;

    // customPack 객체 내부 likes도 동기화
    const targetPack = this.data.customPacks.find(p => p.id === packId);
    if (targetPack) {
      targetPack.likes = next;
    }

    this.scheduleSave();
    return next;
  }
}
