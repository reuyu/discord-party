// server/src/games/GameEngineRegistry.ts
import { BaseEngine } from './BaseEngine';
import { LiarGameEngine } from './LiarGameEngine';
import { ChosungQuizEngine } from './ChosungQuizEngine';
import { WorldcupEngine } from './WorldcupEngine';
import { SnakeRoyaleEngine } from './SnakeRoyaleEngine';
import { BalanceDebateEngine } from './BalanceDebateEngine';
import { SmartMafiaEngine } from './SmartMafiaEngine';
import { StoryRouletteEngine } from './StoryRouletteEngine';
import { VoiceBattleEngine } from './VoiceBattleEngine';
import { RelayNovelEngine } from './RelayNovelEngine';
import { BombPartyEngine } from './BombPartyEngine';
import { AnonymousExposedEngine } from './AnonymousExposedEngine';
import { HighNoonDuelEngine } from './HighNoonDuelEngine';
import { ClickerClashEngine } from './ClickerClashEngine';
import { ZoomQuizEngine } from './ZoomQuizEngine';
import { BlackAndWhiteEngine } from './BlackAndWhiteEngine';
import { BlindDrawingEngine } from './BlindDrawingEngine';
import { FakeArtistEngine } from './FakeArtistEngine';
import { TabooTalkEngine } from './TabooTalkEngine';
import { FiveSecRuleEngine } from './FiveSecRuleEngine';
import { TriviaQuizEngine } from './TriviaQuizEngine';

const engines: Record<string, BaseEngine> = {
  'liar-game': new LiarGameEngine(),
  'chosung-quiz': new ChosungQuizEngine(),
  'worldcup': new WorldcupEngine(),
  'snake-royale': new SnakeRoyaleEngine(),
  'balance-debate': new BalanceDebateEngine(),
  'smart-mafia': new SmartMafiaEngine(),
  'story-roulette': new StoryRouletteEngine(),
  'voice-battle': new VoiceBattleEngine(),
  'relay-novel': new RelayNovelEngine(),
  'bomb-party': new BombPartyEngine(),
  'anonymous-exposed': new AnonymousExposedEngine(),
  'high-noon-duel': new HighNoonDuelEngine(),
  'clicker-clash': new ClickerClashEngine(),
  'zoom-quiz': new ZoomQuizEngine(),
  'black-and-white': new BlackAndWhiteEngine(),
  'blind-drawing': new BlindDrawingEngine(),
  'fake-artist': new FakeArtistEngine(),
  'taboo-talk': new TabooTalkEngine(),
  'five-sec-rule': new FiveSecRuleEngine(),
  'trivia-quiz': new TriviaQuizEngine()
};

export function getGameEngine(gameId: string): BaseEngine {
  return engines[gameId] || engines['trivia-quiz'];
}
