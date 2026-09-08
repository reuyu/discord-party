// client/src/components/GameCard.tsx
import React from 'react';
import { Users, Clock, Play, Package, Zap } from 'lucide-react';
import { GameInfo } from '../../../shared/types';
import { getLocalizedGame } from '../../../shared/gamesData';
import { useLanguage } from '../i18n/LanguageContext';

interface GameCardProps {
  game: GameInfo;
  onSelectGame: (game: GameInfo) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelectGame }) => {
  const { language, t } = useLanguage();
  const localized = getLocalizedGame(game, language);

  return (
    <div 
      className="game-card" 
      onClick={() => onSelectGame(localized)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-thumbnail-wrap">
        <img
          src={localized.thumbnail}
          alt={localized.title}
          className="card-thumbnail"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/worldcup_thumb.jpg';
          }}
        />
        <div className="card-badges-top">
          {localized.isPopular && <span className="badge-pill badge-popular">{t('hotBadge')}</span>}
          {localized.hasCustomPack ? (
            <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.85)', color: '#FFF' }}>
              <Package size={11} style={{ display: 'inline', marginRight: '3px' }} />
              {t('packBadge')}
            </span>
          ) : (
            <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.85)', color: '#FFF' }}>
              <Zap size={11} style={{ display: 'inline', marginRight: '3px' }} />
              {t('ruleBadge')}
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{localized.title}</h3>

        <div className="card-meta-row">
          <div className="meta-item">
            <Users size={14} color="#A5B4FC" />
            <span>{t('minMaxPlayers', { min: localized.minPlayers, max: localized.maxPlayers })}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} color="#FBBF24" />
            <span>{t('estimatedMinutes', { min: localized.estimatedMinutes })}</span>
          </div>
          <div className="meta-item" style={{ marginLeft: 'auto', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>{t('playCount', { count: (localized.playCount || 0).toLocaleString() })}</span>
          </div>
        </div>

        <p className="card-description">{localized.description}</p>

        <div className="card-tags">
          {localized.tags.map((tag, idx) => (
            <span key={idx} className="tag-badge">#{tag}</span>
          ))}
        </div>

        <div className="card-actions" style={{ gridTemplateColumns: '1fr' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectGame(localized);
            }}
          >
            {localized.hasCustomPack ? (
              <>
                <Package size={16} />
                <span>{t('createRoomBtn')}</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>{t('createRoomBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
