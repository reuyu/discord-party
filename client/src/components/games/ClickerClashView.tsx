// client/src/components/games/ClickerClashView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Flame, Keyboard, MousePointerClick } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const ClickerClashView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [countdown, setCountdown] = useState(3);

  // 시스템 3 2 1 카운트다운
  useEffect(() => {
    if (state?.phase === 'countdown') {
      sounds.playCountdown(false);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            sounds.playCountdown(true);
            // 방장이 배틀 시작 액션 전송
            if (room.hostId === myPlayerId) {
              socket.emit('game:action', { type: 'start_battle' });
            }
            return 0;
          }
          sounds.playCountdown(false);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state?.phase, room.hostId, myPlayerId]);

  // 스페이스바 전용 키보드 리스너 바인딩
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && state?.phase === 'battle') {
        e.preventDefault();
        sounds.playClick();
        socket.emit('game:action', { type: 'click' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state?.phase]);

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const myClicks = state.clicks?.[myPlayerId] || 0;

  const handleTimeout = () => {
    if (isHost && state.phase === 'battle') {
      sounds.playVictory();
      socket.emit('game:action', { type: 'timeout_battle' });
    }
  };

  const handleManualClick = () => {
    if (state.phase === 'battle') {
      sounds.playClick();
      socket.emit('game:action', { type: 'click' });
    }
  };

  // 최대 클릭 수 기준 프로그레스 계산
  const maxClicks = Math.max(1, ...Object.values(state.clicks || {}).map((v: any) => Number(v) || 0));

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#EF4444', color: '#FFF' }}>
            10초 광속 스피드전
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>⚡ 초광속 연타 배틀</h3>
        </div>

        {state.phase === 'battle' && (
          <CountdownTimer
            startedAt={state.startedAt}
            durationSec={state.timeLimitSec || 10}
            onTimeout={handleTimeout}
          />
        )}
      </div>

      {/* 1. 카운트다운 페이즈 */}
      {state.phase === 'countdown' && (
        <div className="glass-panel" style={{ padding: '60px 20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            키보드 <strong style={{ color: '#FBBF24' }}>[스페이스바 (Spacebar)]</strong> 혹은 화면 클릭 준비!
          </div>
          <div style={{ fontSize: '7rem', fontWeight: 900, color: '#EF4444', animation: 'pulse 1s infinite' }}>
            {countdown > 0 ? countdown : 'GO!'}
          </div>
        </div>
      )}

      {/* 2. 배틀 페이즈 */}
      {state.phase === 'battle' && (
        <div>
          {/* 내 연타 점수 & 스페이스바/화면 클릭 버튼 */}
          <div
            className="glass-panel"
            onClick={handleManualClick}
            style={{
              padding: '40px 20px',
              marginBottom: '24px',
              cursor: 'pointer',
              background: 'radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(18,16,38,0.95) 80%)',
              border: '2px solid #EF4444',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#F87171', fontWeight: 800 }}>
              <Flame size={24} />
              <span>내 실시간 연타 횟수</span>
            </div>

            <div style={{ fontSize: '5.5rem', fontWeight: 900, color: '#FFF', margin: '10px 0' }}>
              {myClicks}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', color: '#A5B4FC', fontSize: '1rem', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Keyboard size={18} /> [SPACEBAR 연타]
              </span>
              <span>또는</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MousePointerClick size={18} /> [이 영역 마구 클릭!]
              </span>
            </div>
          </div>

          {/* 실시간 전체 랭킹 게이지 바 */}
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '16px' }}>
              📊 실시간 연타 순위
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {room.players
                .sort((a, b) => (state.clicks?.[b.id] || 0) - (state.clicks?.[a.id] || 0))
                .map((p, idx) => {
                  const clicks = state.clicks?.[p.id] || 0;
                  const ratio = Math.min(100, Math.round((clicks / maxClicks) * 100));
                  const isMe = p.id === myPlayerId;

                  return (
                    <div key={p.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, marginBottom: '4px' }}>
                        <span style={{ color: isMe ? '#FBBF24' : '#FFF' }}>
                          {idx + 1}위: {p.avatar} {p.name} {isMe && '(나)'}
                        </span>
                        <span style={{ color: '#EF4444' }}>{clicks}회 (CPS: {(clicks / 10).toFixed(1)})</span>
                      </div>
                      <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${ratio}%`,
                            height: '100%',
                            background: isMe ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : '#6366F1',
                            transition: 'width 0.1s ease'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
