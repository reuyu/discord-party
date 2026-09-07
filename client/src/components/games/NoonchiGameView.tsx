// client/src/components/games/NoonchiGameView.tsx
import React from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const NoonchiGameView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  if (!state) return null;

  const isAlive = state.alivePlayers?.includes(myPlayerId);
  const myLives = state.lives?.[myPlayerId] || 0;
  const isHost = room.hostId === myPlayerId;

  // 숫자 외치기
  const handleCallNumber = () => {
    if (state.phase !== 'playing' || !isAlive) return;
    socket.emit('game:action', { type: 'call_number' });
  };

  // 다음 라운드
  const handleNextRound = () => {
    if (!isHost) return;
    socket.emit('game:action', { type: 'next_round' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 생존자 & 내 목숨 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#F97316', color: '#FFF' }}>
            생존자: {state.alivePlayers?.length} / {room.players.length}명
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.15rem', fontWeight: 800 }}>🔢 실시간 눈치게임 1! 2! 3!</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>내 하트:</span>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Heart key={idx} size={18} fill={idx < myLives ? '#EF4444' : 'none'} color="#EF4444" />
          ))}
        </div>
      </div>

      {/* 중앙 메인 넘버 & 외치기 버튼 */}
      <div className="glass-panel" style={{ padding: '50px 20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '1.1rem', color: '#A5B4FC', fontWeight: 700, marginBottom: '8px' }}>
          지금 외쳐야 할 다음 숫자
        </div>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: '#F97316', letterSpacing: '4px', margin: '16px 0' }}>
          {state.currentNumber} !
        </div>

        {/* 거대 숫자 외치기 버튼 */}
        {state.phase === 'playing' && isAlive && (
          <div style={{ marginTop: '30px' }}>
            <button
              className="btn btn-primary"
              onClick={handleCallNumber}
              style={{
                padding: '22px 60px',
                fontSize: '1.4rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #F97316, #EF4444)',
                borderColor: '#F97316',
                boxShadow: '0 0 35px rgba(249, 115, 22, 0.5)',
                borderRadius: '20px'
              }}
            >
              <Sparkles size={24} />
              <span>💥 {state.currentNumber} ! 외치기!</span>
            </button>
            <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ⚠️ 동시에 누르면 동시 폭사 탈락! 마지막까지 안 누르고 남은 꼴찌도 탈락!
            </p>
          </div>
        )}

        {/* 충돌 폭사 결과 안내 */}
        {(state.phase === 'clash' || state.phase === 'round_end') && (
          <div style={{ marginTop: '24px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', padding: '16px', borderRadius: '12px', color: '#FCA5A5', fontWeight: 700 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>💥 폭발 발생!</div>
            <div>
              {state.lastClashPlayers?.map((id: string) => room.players.find(p => p.id === id)?.name).join(', ')} 님이 하트 1개를 잃었습니다!
            </div>

            {isHost && (
              <button className="btn btn-primary" onClick={handleNextRound} style={{ marginTop: '14px', background: '#F97316', borderColor: '#F97316' }}>
                <span>다음 라운드 시작</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* 실시간 생존 플레이어 카드 그리드 */}
      <div className="glass-panel" style={{ padding: '18px 24px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#A5B4FC' }}>
          👥 참가자 생존 현황
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {room.players.map(p => {
            const lives = state.lives?.[p.id] || 0;
            const isEliminated = lives <= 0;
            return (
              <div
                key={p.id}
                className="badge-pill"
                style={{
                  background: isEliminated ? 'rgba(255,255,255,0.05)' : 'var(--bg-surface-elevated)',
                  border: isEliminated ? '1px dashed #666' : '1px solid var(--border-glass)',
                  padding: '8px 14px',
                  color: isEliminated ? 'var(--text-muted)' : '#FFF'
                }}
              >
                {p.avatar} <strong>{p.name}</strong> ({lives}목숨) {isEliminated ? '💀 탈락' : '🟢 생존'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
