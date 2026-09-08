// client/src/components/JoinModal.tsx
import React, { useState } from 'react';
import { X, ArrowRight, User } from 'lucide-react';
import { GameInfo } from '../../../shared/types';
import { DEFAULT_AVATARS, getLocalizedGame } from '../../../shared/gamesData';
import { useLanguage } from '../i18n/LanguageContext';

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

  const { language, t } = useLanguage();
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem('partyhub_player_name') || '';
    } catch {
      return '';
    }
  });
  const [selectedAvatar, setSelectedAvatar] = useState(() => DEFAULT_AVATARS[0]);

  const locGame = game ? getLocalizedGame(game, language) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      return;
    }

    try {
      localStorage.setItem('partyhub_player_name', playerName.trim());
    } catch {}

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
            {isCreating 
              ? `🚀 ${locGame?.title || ''} ${t('createRoomBtn')}` 
              : `🎮 ${t('joinModalTitle')} (${roomCode || ''})`}
          </h2>
          <button className="btn btn-secondary" style={{ padding: '6px', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 아바타 선택 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {t('selectAvatar')}
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
              {t('hostPlayerName')}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="input-field"
                placeholder={t('namePlaceholder')}
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
            <span>{isCreating ? t('createRoomBtn') : t('joinSubmitBtn')}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
