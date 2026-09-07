// client/src/components/JoinModal.tsx
import React, { useState } from 'react';
import { X, ArrowRight, User } from 'lucide-react';
import { GameInfo } from '../../../shared/types';
import { DEFAULT_AVATARS } from '../../../shared/gamesData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  game?: GameInfo | null;
  roomCode?: string; // 특정 방 코드로 입장하는 경우
  isCreating?: boolean; // 방 만들기 모드 vs 참가 모드
  onSubmit: (data: { playerName: string; avatar: string; roomCode?: string; gameId?: string }) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  game,
  roomCode,
  isCreating = false,
  onSubmit
}) => {
  if (!isOpen) return null;

  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(() => DEFAULT_AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      alert('참가할 닉네임을 입력해주세요!');
      return;
    }

    onSubmit({
      playerName: playerName.trim(),
      avatar: selectedAvatar,
      roomCode,
      gameId: game?.id
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900 }}>
            {isCreating ? `🚀 ${game?.title} 방 만들기` : `🎮 방 참가하기 (${roomCode})`}
          </h2>
          <button className="btn btn-secondary" style={{ padding: '6px', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 아바타 선택 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              프로필 이모지 선택
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {DEFAULT_AVATARS.map((av, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  style={{
                    width: '44px',
                    height: '44px',
                    fontSize: '1.5rem',
                    borderRadius: '12px',
                    background: selectedAvatar === av ? 'rgba(139, 92, 246, 0.4)' : 'var(--bg-surface-elevated)',
                    border: selectedAvatar === av ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* 닉네임 수동 입력 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              닉네임 입력 (직접 입력)
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="input-field"
                placeholder="사용할 닉네임을 입력하세요..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{ paddingLeft: '40px' }}
                autoFocus
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', marginTop: '10px' }}
          >
            <span>{isCreating ? '방 생성하기' : '대기실 입장하기'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
