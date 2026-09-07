// client/src/components/games/StoryRouletteView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { ThumbsUp, ThumbsDown, ArrowRight, Mic } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const StoryRouletteView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  useEffect(() => {
    if (state?.phase === 'spinning') {
      setIsWheelSpinning(true);
      sounds.playCountdown(false);
      const timer = setTimeout(() => {
        setIsWheelSpinning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state?.phase, state?.roundIndex]);

  if (!state) return null;

  const isSpeaker = state.speakerId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const speaker = room.players.find(p => p.id === state.speakerId);
  const myVote = state.votes?.[myPlayerId];

  const handleStartTelling = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'start_telling' });
  };

  const handleFinishStory = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'finish_story' });
  };

  const handleVote = (vote: 'fun' | 'boring') => {
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_story',
      payload: { vote }
    });
  };

  const handleNextRound = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'next_round' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF' }}>
            썰풀기 {state.roundIndex + 1} / {state.totalRounds}라운드
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🎡 썰풀기 룰렛 & 벌칙</h3>
        </div>

        <div style={{ color: '#FBBF24', fontWeight: 800 }}>
          내 점수: {state.scores?.[myPlayerId] || 0}점
        </div>
      </div>

      {/* 1. 룰렛 회전 & 주인공/주제 추첨 페이즈 */}
      {state.phase === 'spinning' && (
        <div className="glass-panel" style={{ padding: '50px 20px', marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '5rem',
              display: 'inline-block',
              animation: isWheelSpinning ? 'spin 0.6s linear infinite' : 'none'
            }}
          >
            🎡
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '20px 0' }}>
            {isWheelSpinning ? '룰렛이 돌아가고 있습니다...' : `🎯 당첨된 썰풀러: ${speaker?.name}!`}
          </h2>

          {!isWheelSpinning && (
            <div>
              <div style={{ background: 'rgba(236,72,153,0.2)', border: '1px solid #EC4899', padding: '16px', borderRadius: '14px', maxWidth: '500px', margin: '0 auto 20px' }}>
                <div style={{ fontSize: '0.85rem', color: '#A5B4FC', marginBottom: '4px' }}>뽑힌 썰 주제:</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFF' }}>"{state.topic}"</div>
              </div>

              {(isSpeaker || isHost) && (
                <button className="btn btn-primary" onClick={handleStartTelling} style={{ padding: '14px 36px', fontSize: '1.05rem', background: '#EC4899' }}>
                  <Mic size={18} />
                  <span>마이크 켜고 썰풀기 시작!</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. 썰풀기 진행 중 페이즈 */}
      {state.phase === 'telling' && (
        <div className="glass-panel" style={{ padding: '40px 20px', marginBottom: '20px', background: isSpeaker ? 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(18,16,38,0.95) 70%)' : undefined }}>
          <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF', fontSize: '0.9rem', padding: '6px 14px' }}>
            🎙️ 현재 발언자: {speaker?.name} {isSpeaker && '(나!)'}
          </span>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFF', margin: '20px 0' }}>
            "{state.topic}"
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>
            {isSpeaker ? '생생하고 재미있게 썰을 풀어주세요! 끝나면 아래 버튼을 누르세요.' : `${speaker?.name} 님의 흥미진진한 썰을 경청해주세요.`}
          </p>

          {(isSpeaker || isHost) && (
            <button className="btn btn-primary" onClick={handleFinishStory} style={{ padding: '14px 32px' }}>
              <span>썰풀기 완료 & 청중 평가 받기</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* 3. 꿀잼 vs 노잼 투표 페이즈 */}
      {state.phase === 'voting' && (
        <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '24px', color: '#FBBF24' }}>
            {speaker?.name} 님의 썰, 어떠셨나요?
          </h2>

          {!isSpeaker ? (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => handleVote('fun')}
                style={{ padding: '16px 36px', fontSize: '1.1rem', background: myVote === 'fun' ? '#10B981' : 'rgba(16,185,129,0.3)', borderColor: '#10B981' }}
              >
                <ThumbsUp size={22} />
                <span>꿀잼! (+50점)</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => handleVote('boring')}
                style={{ padding: '16px 36px', fontSize: '1.1rem', background: myVote === 'boring' ? '#EF4444' : 'rgba(239,68,68,0.3)', borderColor: '#EF4444' }}
              >
                <ThumbsDown size={22} />
                <span>노잼 (벌칙 룰렛)</span>
              </button>
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>청중들이 꿀잼/노잼을 판정하고 있습니다...</p>
          )}
        </div>
      )}

      {/* 4. 벌칙 룰렛 페이즈 */}
      {state.phase === 'penaltySpin' && (
        <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '20px', background: 'rgba(239,68,68,0.2)', borderColor: '#EF4444' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>💀</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F87171', marginBottom: '12px' }}>
            노잼 판정! 벌칙이 당첨되었습니다!
          </h2>

          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', background: '#000', padding: '16px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto 20px', border: '2px solid #EF4444' }}>
            벌칙: "{state.penalty}"
          </div>

          <button className="btn btn-primary" onClick={handleNextRound} style={{ padding: '12px 28px' }}>
            <span>벌칙 수행 확인 & 다음 라운드</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* 5. 꿀잼 라운드 종료 */}
      {state.phase === 'roundEnd' && (
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px', background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#6EE7B7', marginBottom: '16px' }}>
            🎉 만장일치 꿀잼 인정! (+50점 획득)
          </h2>
          <button className="btn btn-primary" onClick={handleNextRound} style={{ padding: '12px 28px' }}>
            <span>다음 라운드 진행</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
