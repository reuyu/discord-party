// client/src/components/LobbyView.tsx
import React, { useState, useMemo } from 'react';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { GameCard } from './GameCard';
import { AdBanner } from './AdBanner';
import { Footer } from './Footer';
import { PackSelectModal } from './PackSelectModal';
import { GameInfo, GameCategory, PlayerCountFilter, SortOption } from '../../../shared/types';
import { INITIAL_GAMES } from '../../../shared/gamesData';
import { Sparkles } from 'lucide-react';

interface LobbyViewProps {
  onCreateRoom: (data: { gameId: string; packId?: string; packTitle?: string; customPackData?: any; playerName: string; avatar: string }) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({ onCreateRoom }) => {
  // 필터 & 정렬 상태
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<PlayerCountFilter>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');

  // 팩 선택 모달 상태 (게임 카드 클릭 시 오픈)
  const [selectedGameForPack, setSelectedGameForPack] = useState<GameInfo | null>(null);

  // 로컬 및 서버 플레이 횟수 상태
  const [playCountOverrides, setPlayCountOverrides] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('partyhub_game_play_counts') || '{}');
    } catch {
      return {};
    }
  });

  // 서버 최신 playCount 동기화
  React.useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => {
        if (data?.games && Array.isArray(data.games)) {
          setPlayCountOverrides(prev => {
            const next = { ...prev };
            data.games.forEach((g: GameInfo) => {
              if (g.playCount) {
                next[g.id] = Math.max(next[g.id] || 0, g.playCount);
              }
            });
            localStorage.setItem('partyhub_game_play_counts', JSON.stringify(next));
            return next;
          });
        }
      })
      .catch(() => {});
  }, []);

  // 모든 게임에 최신 playCount 병합
  const gamesWithStats = useMemo(() => {
    return INITIAL_GAMES.map(g => ({
      ...g,
      playCount: playCountOverrides[g.id] ?? g.playCount ?? 0
    }));
  }, [playCountOverrides]);

  // 플레이 횟수 기준 실시간 상위 5개 게임 ID 추출 (상위 5개만 동적으로 '인기' 태그 획득)
  const top5PopularGameIds = useMemo(() => {
    return [...gamesWithStats]
      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
      .slice(0, 5)
      .map(g => g.id);
  }, [gamesWithStats]);

  // 상위 5개에만 동적으로 isPopular = true 적용 및 NEW 태그는 완전 제거(false)
  const activeGames = useMemo(() => {
    return gamesWithStats.map(g => ({
      ...g,
      isPopular: top5PopularGameIds.includes(g.id),
      isNew: false
    }));
  }, [gamesWithStats, top5PopularGameIds]);

  // 게임 필터링 및 정렬 로직
  const filteredGames = useMemo(() => {
    return activeGames.filter((game) => {
      // 1. 카테고리 필터
      if (selectedCategory !== 'all' && game.category !== selectedCategory) {
        return false;
      }
      // 2. 인원수 필터
      if (selectedPlayerCount === '2-4' && !(game.minPlayers <= 4 && game.maxPlayers >= 2)) {
        return false;
      }
      if (selectedPlayerCount === '5-8' && !(game.maxPlayers >= 5 && game.minPlayers <= 8)) {
        return false;
      }
      if (selectedPlayerCount === '9+' && game.maxPlayers < 9) {
        return false;
      }
      // 3. 검색어 필터
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesDesc = game.description.toLowerCase().includes(query);
        const matchesTags = game.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'popular') {
        return (b.playCount || 0) - (a.playCount || 0);
      }
      if (selectedSort === 'newest') {
        return b.id.localeCompare(a.id);
      }
      if (selectedSort === 'quickest') {
        return a.estimatedMinutes - b.estimatedMinutes;
      }
      return 0;
    });
  }, [activeGames, selectedCategory, selectedPlayerCount, selectedSort, searchQuery]);

  const handleCreateRoom = (data: { gameId: string; packId?: string; packTitle?: string; customPackData?: any; playerName: string; avatar: string }) => {
    // 해당 게임 플레이 카운트 즉시 +1 반영
    setPlayCountOverrides(prev => {
      const current = prev[data.gameId] ?? (INITIAL_GAMES.find(g => g.id === data.gameId)?.playCount || 100);
      const next = { ...prev, [data.gameId]: current + 1 };
      localStorage.setItem('partyhub_game_play_counts', JSON.stringify(next));
      return next;
    });
    onCreateRoom(data);
  };

  return (
    <div className="app-container">
      <Header onGoHome={() => {}} />

      <main className="main-content">
        {/* 상단 프로모션 배너 */}
        <div
          className="glass-panel"
          style={{
            padding: '24px 30px',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={20} color="#F59E0B" />
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                디스코드 친구들과 함께하는 파티 타임! 🎙️🎮
              </h1>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              설치 없이 웹 초대 링크로 전원 즉시 참가! 원하는 게임을 누르고 팩을 선택하여 방을 만드세요.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setSelectedGameForPack(INITIAL_GAMES[0])}
          >
            🔥 인기 게임 바로 시작
          </button>
        </div>

        {/* 상단 광고 슬롯 */}
        <AdBanner slotId="lobby-top" />

        {/* 필터 & 컨트롤 바 */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPlayerCount={selectedPlayerCount}
          onSelectPlayerCount={setSelectedPlayerCount}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 게임 카드 그리드 목록 */}
        <div className="game-grid">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelectGame={(g) => setSelectedGameForPack(g)}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div
            className="glass-panel"
            style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}
          >
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>🔍 조건에 맞는 게임이 없습니다.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPlayerCount('all');
                setSearchQuery('');
              }}
            >
              필터 초기화
            </button>
          </div>
        )}

        {/* 하단 광고 슬롯 */}
        <AdBanner slotId="lobby-bottom" />
      </main>

      {/* 하단 정책 및 정보 푸터 (애드센스 심사 필수 요건) */}
      <Footer />

      {/* 게임 선택 시 열리는 팩 선택 & 방 개설 모달 */}
      <PackSelectModal
        isOpen={Boolean(selectedGameForPack)}
        onClose={() => setSelectedGameForPack(null)}
        game={selectedGameForPack}
        onConfirmCreateRoom={(data) => {
          setSelectedGameForPack(null);
          handleCreateRoom(data);
        }}
      />
    </div>
  );
};
