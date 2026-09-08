// client/src/components/FilterBar.tsx
import React from 'react';
import { Users, Tag, ArrowDownWideNarrow, Search } from 'lucide-react';
import { GameCategory, PlayerCountFilter, SortOption } from '../../../shared/types';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();

  const categoryOptions: { category: GameCategory; label: string }[] = [
    { category: 'all', label: t('allGames') },
    { category: 'deduction', label: t('catPsychological') },
    { category: 'casual', label: t('catCasual') },
    { category: 'quiz', label: t('catSpeed') },
  ];

  const playerCountOptions: { id: PlayerCountFilter; label: string }[] = [
    { id: 'all', label: t('langAll') },
    { id: '2-4', label: '2~4' },
    { id: '5-8', label: '5~8' },
    { id: '9+', label: '9+' },
  ];

  return (
    <div className="glass-panel filter-bar-container">
      {/* 1. 인원수 필터 */}
      <div className="filter-row">
        <div className="filter-label">
          <Users size={16} color="#A5B4FC" />
          <span>{t('filterPlayerCount')}:</span>
        </div>
        <div className="pill-group">
          {playerCountOptions.map((item) => (
            <button
              key={item.id}
              className={`filter-pill ${selectedPlayerCount === item.id ? 'active' : ''}`}
              onClick={() => onSelectPlayerCount(item.id)}
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
          <span>{t('filterCategory')}:</span>
        </div>
        <div className="pill-group">
          {categoryOptions.map((item) => (
            <button
              key={item.category}
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
            placeholder={t('searchPlaceholder')}
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
            <option value="popular">{t('catPopular')}</option>
            <option value="newest">{t('catNew')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
