// client/src/components/games/WorldcupView.tsx
import React from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { RefreshCw, Crown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const WorldcupView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const candA = state.candidateA;
  const candB = state.candidateB;
  const myVote = state.votes?.[myPlayerId];

  const handleVote = (choice: 'A' | 'B') => {
    if (state.phase !== 'match') return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_candidate',
      payload: { choice }
    });
  };

  const handleConfirmWinner = (choice: 'A' | 'B') => {
    if (!isHost) return;
    sounds.playVictory();
    socket.emit('game:action', {
      type: 'confirm_match_winner',
      payload: { choice }
    });
  };

  const votesA = Object.values(state.votes || {}).filter(v => v === 'A').length;
  const votesB = Object.values(state.votes || {}).filter(v => v === 'B').length;
  const totalVotes = Math.max(1, votesA + votesB);
  const percentA = Math.round((votesA / totalVotes) * 100);
  const percentB = 100 - percentA;

  return (
    <div className="game-container" style={{ maxWidth: '950px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF' }}>
            {state.totalRoundName} ({state.matchIndex + 1} / {state.totalMatchesInRound})
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🏆 {t('worldcup') || 'World Cup'}</h3>
        </div>

        <div style={{ color: '#FBBF24', fontWeight: 800, fontSize: '0.95rem' }}>
          {t('inGameVote')}: {Object.keys(state.votes || {}).length} / {room.players.length}
        </div>
      </div>

      {/* 1:1 후보 매치업 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* 후보 A */}
        <div
          className="glass-panel"
          style={{
            padding: '20px',
            borderRadius: '20px',
            border: myVote === 'A' ? '3px solid #6366F1' : '1px solid var(--border-glass)',
            background: myVote === 'A' ? 'rgba(99, 102, 241, 0.25)' : 'var(--bg-surface)'
          }}
        >
          <div style={{ width: '100%', height: '240px', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px', background: '#000' }}>
            <img src={candA?.image} alt={candA?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>{candA?.name}</h2>

          <button
            className="btn"
            onClick={() => handleVote('A')}
            style={{
              width: '100%',
              padding: '14px',
              background: myVote === 'A' ? '#6366F1' : 'var(--bg-surface-elevated)',
              color: '#FFF',
              border: myVote === 'A' ? '2px solid #A5B4FC' : '1px solid var(--border-glass)',
              fontSize: '1rem',
              fontWeight: 800
            }}
          >
            <RefreshCw size={16} />
            <span>{myVote === 'A' ? `✓ (${t('inGameVoted')})` : `A (${t('inGameVote')})`}</span>
          </button>

          {isHost && (
            <button
              className="btn btn-primary"
              onClick={() => handleConfirmWinner('A')}
              style={{ width: '100%', marginTop: '10px', padding: '12px', background: '#6366F1' }}
            >
              <Crown size={16} />
              <span>👑 A ({t('inGameWinner')})</span>
            </button>
          )}
        </div>

        {/* 후보 B */}
        <div
          className="glass-panel"
          style={{
            padding: '20px',
            borderRadius: '20px',
            border: myVote === 'B' ? '3px solid #EC4899' : '1px solid var(--border-glass)',
            background: myVote === 'B' ? 'rgba(236, 72, 153, 0.25)' : 'var(--bg-surface)'
          }}
        >
          <div style={{ width: '100%', height: '240px', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px', background: '#000' }}>
            <img src={candB?.image} alt={candB?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>{candB?.name}</h2>

          <button
            className="btn"
            onClick={() => handleVote('B')}
            style={{
              width: '100%',
              padding: '14px',
              background: myVote === 'B' ? '#EC4899' : 'var(--bg-surface-elevated)',
              color: '#FFF',
              border: myVote === 'B' ? '2px solid #F472B6' : '1px solid var(--border-glass)',
              fontSize: '1rem',
              fontWeight: 800
            }}
          >
            <RefreshCw size={16} />
            <span>{myVote === 'B' ? `✓ (${t('inGameVoted')})` : `B (${t('inGameVote')})`}</span>
          </button>

          {isHost && (
            <button
              className="btn btn-primary"
              onClick={() => handleConfirmWinner('B')}
              style={{ width: '100%', marginTop: '10px', padding: '12px', background: '#EC4899' }}
            >
              <Crown size={16} />
              <span>👑 B ({t('inGameWinner')})</span>
            </button>
          )}
        </div>
      </div>

      {/* 실시간 득표율 게이지 바 */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, marginBottom: '6px' }}>
          <span style={{ color: '#6366F1' }}>{candA?.name} ({percentA}%, {votesA}표)</span>
          <span style={{ color: '#EC4899' }}>{candB?.name} ({percentB}%, {votesB}표)</span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${percentA}%`, background: '#6366F1', transition: 'width 0.3s ease' }} />
          <div style={{ width: `${percentB}%`, background: '#EC4899', transition: 'width 0.3s ease' }} />
        </div>
      </div>
    </div>
  );
};
