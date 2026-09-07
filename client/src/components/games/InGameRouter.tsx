// client/src/components/games/InGameRouter.tsx
import React from 'react';
import { Room } from '../../../../shared/types';
import { GameResultScreen } from '../common/GameResultScreen';
import { TriviaQuizView } from './TriviaQuizView';
import { ChosungQuizView } from './ChosungQuizView';
import { LiarGameView } from './LiarGameView';
import { WorldcupView } from './WorldcupView';
import { SnakeRoyaleView } from './SnakeRoyaleView';
import { BalanceDebateView } from './BalanceDebateView';
import { HighNoonDuelView } from './HighNoonDuelView';
import { ZoomQuizView } from './ZoomQuizView';
import { ClickerClashView } from './ClickerClashView';
import { BombPartyView } from './BombPartyView';
import { StoryRouletteView } from './StoryRouletteView';
import { TabooTalkView } from './TabooTalkView';
import { SmartMafiaView } from './SmartMafiaView';
import { VoiceBattleView } from './VoiceBattleView';
import { RelayNovelView } from './RelayNovelView';
import { AnonymousExposedView } from './AnonymousExposedView';
import { BlackAndWhiteView } from './BlackAndWhiteView';
import { BlindDrawingView } from './BlindDrawingView';
import { FakeArtistView } from './FakeArtistView';
import { FiveSecRuleView } from './FiveSecRuleView';

interface Props {
  room: Room;
  myPlayerId: string;
  onLeaveRoom: () => void;
  onReturnToWaiting?: () => void;
}

export const InGameRouter: React.FC<Props> = ({ room, myPlayerId, onLeaveRoom, onReturnToWaiting }) => {
  // 게임이 종료되었으면 최종 결과 화면(GameResultScreen) 표출!
  if (room.status === 'ended' || room.gameState?.phase === 'gameEnd') {
    return (
      <GameResultScreen
        room={room}
        myPlayerId={myPlayerId}
        onLeaveRoom={onLeaveRoom}
        onReturnToWaiting={onReturnToWaiting}
      />
    );
  }

  const gameId = room.gameId;

  // 21개 게임별 뷰 분기
  switch (gameId) {
    case 'trivia-quiz':
      return <TriviaQuizView room={room} myPlayerId={myPlayerId} />;
    case 'chosung-quiz':
      return <ChosungQuizView room={room} myPlayerId={myPlayerId} />;
    case 'liar-game':
      return <LiarGameView room={room} myPlayerId={myPlayerId} />;
    case 'worldcup':
      return <WorldcupView room={room} myPlayerId={myPlayerId} />;
    case 'snake-royale':
      return <SnakeRoyaleView room={room} myPlayerId={myPlayerId} />;
    case 'balance-debate':
      return <BalanceDebateView room={room} myPlayerId={myPlayerId} />;
    case 'high-noon-duel':
      return <HighNoonDuelView room={room} myPlayerId={myPlayerId} />;
    case 'zoom-quiz':
      return <ZoomQuizView room={room} myPlayerId={myPlayerId} />;
    case 'clicker-clash':
      return <ClickerClashView room={room} myPlayerId={myPlayerId} />;
    case 'bomb-party':
      return <BombPartyView room={room} myPlayerId={myPlayerId} />;
    case 'story-roulette':
      return <StoryRouletteView room={room} myPlayerId={myPlayerId} />;
    case 'taboo-talk':
      return <TabooTalkView room={room} myPlayerId={myPlayerId} />;
    case 'smart-mafia':
      return <SmartMafiaView room={room} myPlayerId={myPlayerId} />;
    case 'voice-battle':
      return <VoiceBattleView room={room} myPlayerId={myPlayerId} />;
    case 'relay-novel':
      return <RelayNovelView room={room} myPlayerId={myPlayerId} />;
    case 'anonymous-exposed':
      return <AnonymousExposedView room={room} myPlayerId={myPlayerId} />;
    case 'black-and-white':
      return <BlackAndWhiteView room={room} myPlayerId={myPlayerId} />;
    case 'blind-drawing':
      return <BlindDrawingView room={room} myPlayerId={myPlayerId} />;
    case 'fake-artist':
      return <FakeArtistView room={room} myPlayerId={myPlayerId} />;
    case 'five-sec-rule':
      return <FiveSecRuleView room={room} myPlayerId={myPlayerId} />;
    default:
      return <TriviaQuizView room={room} myPlayerId={myPlayerId} />;
  }
};
