// shared/types.ts

export type GameCategory = 
  | 'all'
  | 'tournament' // 투표/월드컵
  | 'deduction'  // 추리/심리 (라이어 게임, 마피아 등)
  | 'quiz'       // 퀴즈/초성/상식/줌아웃
  | 'drawing'    // 드로잉/창작
  | 'action'     // 피지컬/액션 (스네이크, 서부결투, 연타)
  | 'roleplay'   // TRPG/상황극
  | 'casual';    // 토론/토크/눈치/예능

export type PlayerCountFilter = 'all' | '2-4' | '5-8' | '9+';
export type SortOption = 'popular' | 'newest' | 'quickest';

export interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  icon?: string;
  bannerImage?: string;
  minPlayers: number;
  maxPlayers: number;
  estimatedMinutes: number;
  category: GameCategory;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
  playCount?: number;
  hasCustomPack: boolean; // 커스텀 팩 지원 여부 (true: 커스텀 팩 지원 / false: 시스템 자체 룰 기반)
  accentColor?: string;
  rulesOverview?: string[];
  defaultSettings?: {
    rounds?: number;
    timeLimitSec?: number;
    [key: string]: any;
  };
}

export interface Player {
  id: string;          // 유저 고유 세션 ID
  socketId: string;    // 현재 웹소켓 소켓 ID
  name: string;        // 닉네임
  avatar: string;      // 아바타 아이콘/이모지/SVG 키
  isHost: boolean;     // 방장 여부
  isReady: boolean;    // 준비 완료 여부
  isOnline: boolean;   // 접속 중 여부
  joinedAt: number;    // 입장 타임스탬프
}

export interface RoomSettings {
  maxPlayers: number;
  rounds: number;
  timeLimitSec: number;
  mapSize?: 'small' | 'medium' | 'large';
  customPackId?: string;
  customPackTitle?: string;
  isPublic: boolean;
  extraOptions?: Record<string, any>;
}

export type RoomStatus = 'waiting' | 'playing' | 'ended';

export interface Room {
  code: string;             // 6자리 방 코드 (초대 URL 식별자)
  gameId: string;           // 선택된 게임 ID
  gameInfo: GameInfo;       // 게임 메타 정보
  hostId: string;           // 방장 player id
  status: RoomStatus;       // 방 상태
  players: Player[];        // 참가 플레이어 목록
  settings: RoomSettings;   // 방 설정
  gameState?: any;          // 진행 중인 게임 전용 상태 (플러그인별)
  createdAt: number;
}

export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh-TW' | 'de' | 'pt' | 'es' | 'fr';

export interface CustomPack {
  id: string;
  gameId: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  itemCount: number;
  isPublic: boolean;
  likes: number;
  createdAt: number;
  data: any;
  language?: SupportedLanguage | 'all';
  isKoreanCultureOnly?: boolean;
}

// 실시간 소켓 이벤트 정의
export interface ServerToClientEvents {
  'room:joined': (data: { room: Room; myPlayerId: string }) => void;
  'room:updated': (room: Room) => void;
  'room:player-joined': (data: { player: Player; room: Room }) => void;
  'room:player-left': (data: { playerId: string; newHostId?: string; room: Room }) => void;
  'room:error': (message: string) => void;
  'game:started': (data: { room: Room; gameState: any }) => void;
  'game:state-sync': (gameState: any) => void;
  'game:ended': (data: { room: Room; results: any }) => void;
  'game:returned-to-lobby': () => void;
  'game:play-count-updated': (data: { gameId: string; playCount: number; topGames: GameInfo[] }) => void;
  'packs:updated': (data: { gameId: string; pack?: CustomPack; packs?: CustomPack[] }) => void;
}

export interface ClientToServerEvents {
  'room:create': (data: { gameId: string; packId?: string; packTitle?: string; playerName: string; avatar: string }, callback: (response: { success: boolean; room?: Room; error?: string }) => void) => void;
  'room:join': (data: { roomCode: string; playerName: string; avatar: string }, callback: (response: { success: boolean; room?: Room; error?: string }) => void) => void;
  'room:leave': () => void;
  'room:toggle-ready': () => void;
  'room:update-settings': (settings: Partial<RoomSettings>) => void;
  'room:kick-player': (targetPlayerId: string) => void;
  'room:start-game': () => void;
  'room:change-game': (data: { gameId: string; packId?: string; packTitle?: string; customPackData?: any }) => void;
  'room:return-to-waiting': () => void;
  'game:action': (action: { type: string; payload?: any }) => void;
  'pack:upload': (pack: CustomPack, callback: (response: { success: boolean; pack?: CustomPack; error?: string }) => void) => void;
  'pack:like': (data: { packId: string; gameId: string }, callback: (response: { success: boolean; likes: number }) => void) => void;
  'packs:get': (gameId: string, callback: (response: { success: boolean; packs: CustomPack[] }) => void) => void;
}
