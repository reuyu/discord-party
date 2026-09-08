// client/src/components/games/ZoomQuizView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const ZoomQuizView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  const [guess, setGuess] = useState('');
  const [zoomScale, setZoomScale] = useState(15); // 1500% -> 100%
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [state?.roundIndex]);

  useEffect(() => {
    // 1500% -> 100% 줌아웃 애니메이션
    const interval = setInterval(() => {
      if (state?.phase === 'zooming') {
        const elapsed = (Date.now() - state.startedAt) / 1000;
        const total = state.timerSec || 15;
        const progress = Math.min(1, Math.max(0, elapsed / total));
        // 15.0에서 1.0으로 점진 축소
        setZoomScale(15.0 - progress * 14.0);
      } else if (state?.phase === 'reveal') {
        setZoomScale(1.0);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [state?.phase, state?.startedAt, state?.timerSec]);

  if (!state) return null;

  const currentItem = state.currentItem;
  const isHost = room.hostId === myPlayerId;
  const hasMyCorrect = state.correctPlayers?.some((p: any) => p.id === myPlayerId);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || state.phase !== 'zooming' || hasMyCorrect) return;

    socket.emit('game:action', {
      type: 'submit_answer',
      payload: { answer: guess }
    });
    setGuess('');
  };

  const handleTimeout = () => {
    if (isHost && state.phase === 'zooming') {
      socket.emit('game:action', { type: 'timeout_zoom' });
    }
  };

  const handleNextItem = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_item' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#06B6D4', color: '#FFF' }}>
            {t('inGameQuestion', { current: state.roundIndex + 1, total: state.totalRounds })}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.15rem', fontWeight: 800 }}>🔍 {t('zoomQuiz') || 'Zoom Quiz'}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ color: '#FBBF24', fontWeight: 700 }}>
            {t('inGameScore', { score: state.scores?.[myPlayerId] || 0 })}
          </div>

          {state.phase === 'zooming' && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 15}
              onTimeout={handleTimeout}
            />
          )}
        </div>
      </div>

      {/* 줌아웃 캔버스 영역 (초근접 1500% 줌 및 로드 전 차단막) */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            background: '#0B0E14'
          }}
        >
          {/* 이미지 로딩 중 검은 가림막 오버레이 (전체 사진 깜빡임 100% 차단) */}
          {!imageLoaded && (
            <div style={{ position: 'absolute', inset: 0, background: '#0B0E14', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 700 }}>
              <span>🔍 초근접 줌인 이미지 로딩 중...</span>
            </div>
          )}

          <img
            src={currentItem?.image}
            alt="Quiz item"
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoomScale})`,
              transformOrigin: `${currentItem?.focusX || 50}% ${currentItem?.focusY || 50}%`,
              transition: state.phase === 'reveal' ? 'transform 0.5s ease' : 'none',
              filter: state.phase === 'reveal' ? 'none' : 'contrast(1.15)',
              opacity: imageLoaded ? 1 : 0
            }}
          />

          {/* 줌 배율 HUD */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'rgba(0,0,0,0.7)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#06B6D4',
              fontWeight: 800,
              fontSize: '0.85rem',
              backdropFilter: 'blur(4px)',
              zIndex: 5
            }}
          >
            줌 배율: {Math.round(zoomScale * 100)}%
          </div>
        </div>
      </div>

      {/* 정답 입력 폼 or 정답 공개 안내 */}
      {state.phase === 'zooming' ? (
        <div>
          {hasMyCorrect ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '16px', color: '#6EE7B7', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle2 size={24} />
              <span>{t('inGameCorrect')} {t('inGameWaiting')}</span>
            </div>
          ) : (
            <form onSubmit={handleGuessSubmit} style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                autoFocus
                required
                style={{ flex: 1, padding: '14px 18px', fontSize: '1.05rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 28px', background: '#06B6D4', borderColor: '#06B6D4', fontSize: '1rem', fontWeight: 700 }}>
                <Send size={18} />
                <span>{t('inGameSubmit')}</span>
              </button>
            </form>
          )}

          {/* 선착순 정답자 목록 */}
          {state.correctPlayers?.length > 0 && (
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {state.correctPlayers.map((p: any, idx: number) => (
                <span key={p.id} className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.3)', color: '#A7F3D0', border: '1px solid #10B981' }}>
                  #{idx + 1}: {p.name} (+{p.score})
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 정답 공개 화면 */
        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(6, 182, 212, 0.15)', borderColor: '#06B6D4' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFF', marginBottom: '14px' }}>
            🎉 <span style={{ color: '#FDE047' }}>[{currentItem?.answer}]</span>
          </h2>

          {isHost && (
            <button className="btn btn-primary" onClick={handleNextItem} style={{ padding: '12px 32px', background: '#06B6D4', borderColor: '#06B6D4' }}>
              <span>{t('inGameNext')}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
