// client/src/components/RoomView.tsx
import React, { useState } from 'react';
import { 
  Copy, 
  LogOut, 
  Crown, 
  CheckCircle2, 
  Clock, 
  Settings, 
  Play, 
  X, 
  Sparkles,
  Layers,
  Users,
  Dices,
  Gamepad2,
  FolderOpen
} from 'lucide-react';
import { Room } from '../../../shared/types';
import { INITIAL_GAMES, getLocalizedGame } from '../../../shared/gamesData';
import { getDefaultPacksForGame } from '../../../shared/multilingualPacks';
import { socket } from '../socket';
import { sounds } from '../utils/audio';
import { AdBanner } from './AdBanner';
import { PackSelectModal } from './PackSelectModal';
import { useLanguage } from '../i18n/LanguageContext';

interface RoomViewProps {
  room: Room;
  myPlayerId: string;
  onToggleReady: () => void;
  onStartGame: () => void;
  onUpdateSettings: (settings: any) => void;
  onKickPlayer: (playerId: string) => void;
  onLeaveRoom: () => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  room,
  myPlayerId,
  onToggleReady,
  onStartGame,
  onUpdateSettings,
  onKickPlayer,
  onLeaveRoom,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGameSelectModalOpen, setIsGameSelectModalOpen] = useState(false);
  const [isPackSelectModalOpen, setIsPackSelectModalOpen] = useState(false);
  const [isRollingRandom, setIsRollingRandom] = useState(false);

  const { language, t } = useLanguage();
  const localizedGame = getLocalizedGame(room.gameInfo, language);

  const me = room.players.find((p) => p.id === myPlayerId);
  const isHost = me?.isHost ?? false;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 초대 링크 복사
  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}/room/${room.code}`;
    navigator.clipboard.writeText(inviteUrl);
    showToast(`🔗 ${t('linkCopied')}`);
  };

  // 1. 게임 직접 변경 (방장 전용)
  const handleChangeGame = (gameId: string) => {
    const selectedGame = INITIAL_GAMES.find(g => g.id === gameId);
    if (!selectedGame) return;

    sounds.playClick();
    const defaultPacks = getDefaultPacksForGame(gameId, language);
    const defaultPackData = defaultPacks[0]?.data || null;
    const defaultPackTitle = defaultPacks[0]?.title || undefined;

    socket.emit('room:change-game', {
      gameId,
      packTitle: defaultPackTitle,
      customPackData: defaultPackData
    });

    setIsGameSelectModalOpen(false);
    const locGame = getLocalizedGame(selectedGame, language);
    showToast(`🎮 ${locGame.title}`);
  };

  // 2. 🎲 인원 수 맞춤 랜덤 게임 추첨 (방장 전용)
  const handleRollRandomGame = () => {
    if (!isHost || isRollingRandom) return;
    setIsRollingRandom(true);
    sounds.playClick();

    const currentCount = room.players.length;
    let candidates = INITIAL_GAMES.filter(g => g.minPlayers <= currentCount && currentCount <= g.maxPlayers);
    if (candidates.length === 0) {
      candidates = INITIAL_GAMES;
    }
    const otherCandidates = candidates.filter(g => g.id !== room.gameId);
    const pool = otherCandidates.length > 0 ? otherCandidates : candidates;

    setTimeout(() => {
      const picked = pool[Math.floor(Math.random() * pool.length)];
      setIsRollingRandom(false);
      sounds.playVictory();

      const defaultPacks = getDefaultPacksForGame(picked.id, language);
      const defaultPackData = defaultPacks[0]?.data || null;
      const defaultPackTitle = defaultPacks[0]?.title || undefined;

      socket.emit('room:change-game', {
        gameId: picked.id,
        packTitle: defaultPackTitle,
        customPackData: defaultPackData
      });

      const locPicked = getLocalizedGame(picked, language);
      showToast(`🎲 ${locPicked.title}`);
    }, 900);
  };

  // 3. 커스텀 팩 변경 적용
  const handlePackSelected = (data: { packId?: string; packTitle?: string; customPackData?: any }) => {
    socket.emit('room:update-settings', {
      customPackId: data.packId,
      customPackTitle: data.packTitle,
      extraOptions: {
        ...(room.settings.extraOptions || {}),
        customPackData: data.customPackData
      }
    });
    setIsPackSelectModalOpen(false);
    showToast(`📦 ${data.packTitle || 'Default Pack'}`);
  };

  const allGuestsReady = room.players.filter((p) => !p.isHost).every((p) => p.isReady);
  const canStart = isHost && room.players.length >= localizedGame.minPlayers && allGuestsReady;

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <div className="room-container">
        {/* 상단 파티 룸 헤더 패널 */}
        <div className="glass-panel room-header-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={localizedGame.thumbnail}
              alt={localizedGame.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/worldcup_thumb.jpg';
              }}
              style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{localizedGame.title}</h2>
                <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#A5B4FC' }}>
                  {room.players.length} / {room.settings.maxPlayers}
                </span>
                <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7' }}>
                  {t('roomCode')}: <strong>{room.code}</strong>
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {room.settings.customPackTitle ? `📦 ${room.settings.customPackTitle}` : localizedGame.subtitle}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* 방장 전용: 게임 변경 & 랜덤 게임 추첨 버튼 */}
            {isHost && (
              <>
                <button
                  className="btn btn-secondary"
                  style={{ background: 'rgba(99, 102, 241, 0.25)', border: '1px solid #6366F1', color: '#FFF' }}
                  onClick={() => setIsGameSelectModalOpen(true)}
                  title="Change Game"
                >
                  <Gamepad2 size={16} />
                  <span>{t('changePackBtn') ? t('changePackBtn').replace(/^[^\s]+\s*/, '') : '게임 변경'}</span>
                </button>

                <button
                  className="btn btn-secondary"
                  style={{
                    background: isRollingRandom ? '#EF4444' : 'rgba(245, 158, 11, 0.25)',
                    border: '1px solid #F59E0B',
                    color: '#FDE047',
                    animation: isRollingRandom ? 'pulse 0.3s infinite' : 'none'
                  }}
                  onClick={handleRollRandomGame}
                  disabled={isRollingRandom}
                  title="Random Game Roll"
                >
                  <Dices size={16} />
                  <span>{isRollingRandom ? '...' : '🎲 Random'}</span>
                </button>
              </>
            )}

            <button className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.95rem' }} onClick={handleCopyLink}>
              <Copy size={16} />
              <span>{t('copyLinkBtn')}</span>
            </button>

            <button className="btn btn-secondary" onClick={onLeaveRoom} title={t('leaveRoomBtn')}>
              <LogOut size={16} />
              <span>{t('leaveRoomBtn')}</span>
            </button>
          </div>
        </div>

        {/* 상단 미니 광고 */}
        <AdBanner slotId="room-top" />

        {/* 대기방 메인 레이아웃 */}
        <div className="room-grid-layout">
          {/* 1. 좌측: 참가자 목록 그리드 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#6366F1" />
                <span>{t('playersCount', { count: room.players.length })}</span>
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                * {t('minMaxPlayers', { min: localizedGame.minPlayers, max: localizedGame.maxPlayers })}
              </span>
            </div>

            <div className="players-grid">
              {room.players.map((p) => {
                const isThisPlayerMe = p.id === myPlayerId;
                return (
                  <div
                    key={p.id}
                    className={`player-card ${isThisPlayerMe ? 'is-me' : ''} ${p.isReady || p.isHost ? 'is-ready' : ''}`}
                  >
                    {isHost && !p.isHost && (
                      <button
                        title="Kick"
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                        onClick={() => onKickPlayer(p.id)}
                      >
                        <X size={14} />
                      </button>
                    )}

                    <div className="player-avatar-circle">
                      {p.avatar}
                    </div>

                    <div className="player-name">
                      {p.name}
                      {isThisPlayerMe && <span style={{ fontSize: '0.75rem', color: '#A5B4FC' }}> ({t('meBadge')})</span>}
                    </div>

                    <div>
                      {p.isHost ? (
                        <span className="ready-badge ready" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Crown size={13} color="#FBBF24" />
                          <span>{t('hostBadge')}</span>
                        </span>
                      ) : p.isReady ? (
                        <span className="ready-badge ready" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={13} />
                          <span>{t('readyBadge')}</span>
                        </span>
                      ) : (
                        <span className="ready-badge waiting" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} />
                          <span>{t('waitingBadge')}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. 우측: 게임 설정 및 시작 버튼 패널 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'center', alignItems: 'center', gap: '8px' }}>
                <Settings size={18} color="#A5B4FC" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t('rulesTitle')}</h3>
              </div>

              {/* 팩 변경 버튼 (팩 지원 게임만) */}
              {localizedGame.hasCustomPack && isHost && (
                <button
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)' }}
                  onClick={() => setIsPackSelectModalOpen(true)}
                >
                  <FolderOpen size={14} />
                  <span>{t('changePackBtn')}</span>
                </button>
              )}
            </div>

            {/* 적용된 팩 정보 */}
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px', color: '#A5B4FC' }}>
                <Layers size={15} />
                <span>{localizedGame.hasCustomPack ? t('packSupportedGame') : t('systemRuleGame')}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {room.settings.customPackTitle || 'Default Pack'}
              </div>
            </div>

            {/* 게임 룰 요약 */}
            {localizedGame.rulesOverview && (
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: '10px', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', color: '#A5B4FC' }}>📖 {t('rulesTitle')}</div>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
                  {localizedGame.rulesOverview.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 방 설정 옵션 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* 월드컵 전용: 몇 강 토너먼트 선택 */}
              {room.gameId === 'worldcup' && (
                <div className="form-group">
                  <label className="form-label" style={{ marginBottom: '8px' }}>
                    🏆 Tournament Size
                  </label>
                  {isHost ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {[4, 8, 16].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className="btn"
                          onClick={() => onUpdateSettings({ rounds: size, extraOptions: { ...room.settings.extraOptions, tournamentSize: size } })}
                          style={{
                            padding: '8px',
                            background: (room.settings.rounds || 8) === size ? '#EC4899' : 'var(--bg-surface-elevated)',
                            color: '#FFF',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}
                        >
                          Round of {size}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.9rem', color: '#F472B6', fontWeight: 700 }}>
                      Round of {room.settings.rounds || 8}
                    </div>
                  )}
                </div>
              )}

              {/* 라운드 수가 유의미한 게임만 라운드 설정 슬라이더 노출 */}
              {['relay-novel', 'trivia-quiz', 'zoom-quiz', 'chosung-quiz', 'blind-drawing', 'voice-battle', 'anonymous-exposed', 'five-sec-rule'].includes(room.gameId) && (() => {
                let packItemsCount = 20;
                if (room.settings.extraOptions?.customPackData && Array.isArray(room.settings.extraOptions.customPackData)) {
                  packItemsCount = room.settings.extraOptions.customPackData.length;
                } else if (room.settings.customPackId) {
                  const defaultPacks = getDefaultPacksForGame(room.gameId, language);
                  const found = defaultPacks.find(p => p.id === room.settings.customPackId);
                  if (found && Array.isArray(found.data)) packItemsCount = found.data.length;
                } else {
                  const defaultPacks = getDefaultPacksForGame(room.gameId, language);
                  if (defaultPacks[0]?.data?.length) {
                    packItemsCount = defaultPacks[0].data.length;
                  }
                }

                const maxLimit = room.gameId === 'relay-novel' ? 5 : Math.max(1, Math.min(20, packItemsCount));
                const currentVal = Math.min(room.settings.rounds || 3, maxLimit);

                return (
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        {t('inGameRound', { current: currentVal, total: maxLimit })}
                      </span>
                      {room.gameId !== 'relay-novel' && (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                          ({t('itemCountText', { count: packItemsCount })})
                        </span>
                      )}
                    </label>
                    {isHost ? (
                      <input
                        type="range"
                        min={1}
                        max={maxLimit}
                        value={currentVal}
                        onChange={(e) => onUpdateSettings({ rounds: Math.min(Number(e.target.value), maxLimit) })}
                      />
                    ) : (
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {currentVal} Rounds
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* 거대 액션 버튼 */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              {isHost ? (
                <button
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1.1rem',
                    background: canStart ? 'linear-gradient(135deg, #10B981, #059669)' : undefined,
                    opacity: canStart ? 1 : 0.7
                  }}
                  disabled={!canStart}
                  onClick={onStartGame}
                >
                  <Play size={20} />
                  <span>
                    {!allGuestsReady
                      ? t('waitingForReady')
                      : room.players.length < localizedGame.minPlayers
                      ? `Min ${localizedGame.minPlayers} players required`
                      : t('startGameBtn')}
                  </span>
                </button>
              ) : (
                <button
                  className={`btn ${me?.isReady ? 'btn-accent' : 'btn-primary'}`}
                  style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                  onClick={onToggleReady}
                >
                  <CheckCircle2 size={20} />
                  <span>{me?.isReady ? t('cancelReadyBtn') : t('toggleReadyBtn')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1. 게임 변경 모달 (22개 전 게임 브라우저) */}
      {isGameSelectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsGameSelectModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gamepad2 size={22} color="#6366F1" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t('heroBrowseGames')}</h3>
              </div>
              <button className="btn-close" onClick={() => setIsGameSelectModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {t('brandSubtitle')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
              {INITIAL_GAMES.map((game) => {
                const locG = getLocalizedGame(game, language);
                const isSelected = game.id === room.gameId;
                const isPlayersFit = game.minPlayers <= room.players.length && room.players.length <= game.maxPlayers;
                return (
                  <div
                    key={game.id}
                    onClick={() => handleChangeGame(game.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.3)' : 'var(--bg-surface-elevated)',
                      border: isSelected ? '2px solid #6366F1' : '1px solid var(--border-glass)',
                      borderRadius: '14px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ height: '100px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={locG.thumbnail}
                        alt={locG.title}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/worldcup_thumb.jpg';
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span className="badge-pill" style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(0,0,0,0.7)', fontSize: '0.72rem', color: '#FFF' }}>
                        {t('minMaxPlayers', { min: locG.minPlayers, max: locG.maxPlayers })}
                      </span>
                      {isSelected && (
                        <span className="badge-pill" style={{ position: 'absolute', top: '6px', right: '6px', background: '#6366F1', color: '#FFF', fontSize: '0.72rem' }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>{locG.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>{locG.subtitle}</div>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                      <span style={{ color: isPlayersFit ? '#10B981' : '#EF4444', fontWeight: 700 }}>
                        {isPlayersFit ? '✓ OK' : `⚠️ Min ${locG.minPlayers}`}
                      </span>
                      <span style={{ color: '#A5B4FC' }}>{t('estimatedMinutes', { min: locG.estimatedMinutes })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. 커스텀 팩 변경 모달 */}
      {isPackSelectModalOpen && (
        <PackSelectModal
          isOpen={isPackSelectModalOpen}
          onClose={() => setIsPackSelectModalOpen(false)}
          game={localizedGame}
          initialPackTitle={room.settings.customPackTitle}
          onConfirmSelectPack={handlePackSelected}
        />
      )}

      {/* 토스트 알림 */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <Sparkles size={18} color="#F59E0B" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
