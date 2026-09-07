// client/src/components/FilterBar.tsx
import React from 'react';
import { Users, Tag, ArrowDownWideNarrow, Search } from 'lucide-react';
import { GameCategory, PlayerCountFilter, SortOption } from '../../../shared/types';
import { GENRE_FILTERS, PLAYER_COUNT_FILTERS } from '../../../shared/gamesData';

interface FilterBarProps {
  selectedCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  selectedPlayerCount: PlayerCountFilter;
  onSelectPlayerCount: (count: PlayerCountFilter) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPlayerCount,
  onSelectPlayerCount,
  selectedSort,
  onSelectSort,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="glass-panel filter-bar-container">
      {/* 1. 인원수 필터 */}
      <div className="filter-row">
        <div className="filter-label">
          <Users size={16} color="#A5B4FC" />
          <span>인원수:</span>
        </div>
        <div className="pill-group">
          {PLAYER_COUNT_FILTERS.map((item) => (
            <button
              key={item.id}
              className={`filter-pill ${selectedPlayerCount === item.id ? 'active' : ''}`}
              onClick={() => onSelectPlayerCount(item.id as PlayerCountFilter)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 장르 태그 필터 */}
      <div className="filter-row">
        <div className="filter-label">
          <Tag size={16} color="#EC4899" />
          <span>장르:</span>
        </div>
        <div className="pill-group">
          {GENRE_FILTERS.map((item) => (
            <button
              key={item.id}
              className={`filter-pill ${selectedCategory === item.category ? 'active' : ''}`}
              onClick={() => onSelectCategory(item.category)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 검색 및 정렬 바 */}
      <div className="filter-row" style={{ justifyContent: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '14px' }}>
        <div style={{ position: 'relative', flex: '1', maxWidth: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '36px', width: '100%', fontSize: '0.88rem' }}
            placeholder="게임 이름 또는 키워드 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowDownWideNarrow size={16} color="var(--text-secondary)" />
          <select
            className="sort-select"
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
          >
            <option value="popular">🔥 인기순</option>
            <option value="newest">✨ 최신순</option>
            <option value="quickest">⏱️ 소요시간 짧은순</option>
          </select>
        </div>
      </div>
    </div>
  );
};
