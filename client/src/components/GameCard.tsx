// client/src/components/GameCard.tsx
import React from 'react';
import { Users, Clock, Play, Package, Zap } from 'lucide-react';
import { GameInfo } from '../../../shared/types';

interface GameCardProps {
  game: GameInfo;
  onSelectGame: (game: GameInfo) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelectGame }) => {
  return (
    <div 
      className="game-card" 
      onClick={() => onSelectGame(game)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-thumbnail-wrap">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="card-thumbnail"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/worldcup_thumb.jpg';
          }}
        />
        <div className="card-badges-top">
          {game.isPopular && <span className="badge-pill badge-popular">🔥 인기</span>}
          {game.hasCustomPack ? (
            <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.85)', color: '#FFF' }}>
              <Package size={11} style={{ display: 'inline', marginRight: '3px' }} />
              팩 지원
            </span>
          ) : (
            <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.85)', color: '#FFF' }}>
              <Zap size={11} style={{ display: 'inline', marginRight: '3px' }} />
              시스템 룰
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{game.title}</h3>

        <div className="card-meta-row">
          <div className="meta-item">
            <Users size={14} color="#A5B4FC" />
            <span>{game.minPlayers}~{game.maxPlayers}명</span>
          </div>
          <div className="meta-item">
            <Clock size={14} color="#FBBF24" />
            <span>약 {game.estimatedMinutes}분</span>
          </div>
          <div className="meta-item" style={{ marginLeft: 'auto', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>🎮 {(game.playCount || 0).toLocaleString()}회</span>
          </div>
        </div>

        <p className="card-description">{game.description}</p>

        <div className="card-tags">
          {game.tags.map((tag, idx) => (
            <span key={idx} className="tag-badge">#{tag}</span>
          ))}
        </div>

        <div className="card-actions" style={{ gridTemplateColumns: '1fr' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectGame(game);
            }}
          >
            {game.hasCustomPack ? (
              <>
                <Package size={16} />
                <span>팩 선택 & 방 만들기</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>바로 방 만들기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
