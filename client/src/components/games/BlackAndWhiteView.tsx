// client/src/components/games/BlackAndWhiteView.tsx
import React from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const BlackAndWhiteView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  if (!state) return null;

  const isPlayer1 = room.players[0]?.id === myPlayerId;
  const isPlayer2 = room.players[1]?.id === myPlayerId;
  const myTiles = state.playerTiles?.[myPlayerId] || [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const isMyTurn = state.turnPlayerId === myPlayerId;
  const turnPlayer = room.players.find(p => p.id === state.turnPlayerId);

  const handlePlayTile = (tile: number) => {
    if (!isMyTurn || state.phase !== 'playing') return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'play_tile',
      payload: { tile }
    });
  };

  const isBlack = (num: number) => num % 2 === 0;

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 & 점수판 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#475569', color: '#FFF' }}>
            라운드 {state.roundIndex + 1} / 9 (먼저 5승 시 승리)
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🃏 더 지니어스: 흑과 백</h3>
        </div>

        {/* 1:1 스코어 */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            {room.players[0]?.avatar} {room.players[0]?.name}: <span style={{ color: '#FBBF24' }}>{state.scores?.[room.players[0]?.id] || 0}승</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>VS</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            {room.players[1]?.avatar} {room.players[1]?.name}: <span style={{ color: '#FBBF24' }}>{state.scores?.[room.players[1]?.id] || 0}승</span>
          </div>
        </div>
      </div>

      {/* 중앙 배틀 테이블 (상대방 타일 색상 정보 비대칭 공개) */}
      <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '20px', background: 'radial-gradient(circle, rgba(71,85,105,0.3) 0%, rgba(18,16,38,0.95) 80%)' }}>
        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isMyTurn ? '#F472B6' : '#A5B4FC', marginBottom: '16px' }}>
          {isMyTurn ? '👉 당신의 턴입니다! 타일을 선택해 제출하세요.' : `⏳ ${turnPlayer?.name} 님의 타일 제출을 기다리고 있습니다...`}
        </div>

        {/* 제출된 선공 타일의 색상 힌트 */}
        {state.firstPlayColor && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '20px', background: state.firstPlayColor === 'BLACK' ? '#0F172A' : '#F8FAFC', color: state.firstPlayColor === 'BLACK' ? '#FFF' : '#000', border: '2px solid #94A3B8', fontWeight: 900, fontSize: '1.2rem', marginBottom: '20px' }}>
            <span>선공이 제출한 타일 색상:</span>
            <span>{state.firstPlayColor === 'BLACK' ? '⬛ 흑(짝수: 0,2,4,6,8)' : '⬜ 백(홀수: 1,3,5,7)'}</span>
          </div>
        )}

        {/* 직전 라운드 결과 */}
        {state.lastRoundResult && (
          <div style={{ color: '#6EE7B7', fontWeight: 800, fontSize: '1.1rem', marginTop: '10px' }}>
            {state.lastRoundResult}
          </div>
        )}
      </div>

      {/* 내 보유 타일 카드 덱 (0~8) */}
      {(isPlayer1 || isPlayer2) && (
        <div className="glass-panel" style={{ padding: '24px 20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '16px' }}>
            내 보유 타일 (남은 타일: {myTiles.length}개)
          </h4>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {myTiles.map((tile: number) => {
              const black = isBlack(tile);
              return (
                <button
                  key={tile}
                  className="btn"
                  onClick={() => handlePlayTile(tile)}
                  disabled={!isMyTurn || state.phase !== 'playing'}
                  style={{
                    width: '64px',
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    background: black ? '#0F172A' : '#F8FAFC',
                    color: black ? '#FFF' : '#0F172A',
                    border: black ? '2px solid #334155' : '2px solid #CBD5E1',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    cursor: isMyTurn ? 'pointer' : 'default',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transform: isMyTurn ? 'translateY(-4px)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{tile}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.7 }}>
                    {black ? '흑(짝)' : '백(홀)'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
