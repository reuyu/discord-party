// client/src/components/common/GameResultScreen.tsx
import React, { useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { RotateCcw, Crown, Trophy, Info } from 'lucide-react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { socket } from '../../socket';
import { useLanguage } from '../../i18n/LanguageContext';

interface GameResultScreenProps {
  room: Room;
  myPlayerId: string;
  onLeaveRoom: () => void;
  onReturnToWaiting?: () => void;
}

export const GameResultScreen: React.FC<GameResultScreenProps> = ({
  room,
  myPlayerId,
  onLeaveRoom,
  onReturnToWaiting
}) => {
  const { t } = useLanguage();
  const state = room.gameState;
  const gameId = room.gameId;
  const isHost = room.hostId === myPlayerId;

  const handleReturnToLobby = () => {
    sounds.playClick();
    if (onReturnToWaiting) {
      onReturnToWaiting();
    } else {
      socket.emit('room:return-to-waiting');
    }
  };

  useEffect(() => {
    sounds.playVictory();
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.4 }
    });
  }, []);

  if (!state) return null;

  // 게임별 승자 및 특별 어워드 계산 (선정 이유 상세화)
  const getGameAwards = () => {
    const awards: { title: string; player: any; desc: string; reason: string; icon: string; isPrimary?: boolean }[] = [];

    if (gameId === 'liar-game') {
      const liar = room.players.find(p => p.id === state.liarId);
      const isLiarWin = state.winner === 'liar';
      awards.push({
        title: isLiarWin ? '😈 천재 사기꾼 라이어 MVP' : '🕵️ 진실의 명탐정 시민 MVP',
        player: isLiarWin ? liar : room.players.find(p => p.id !== state.liarId),
        desc: state.winReason || (isLiarWin ? '라이어가 시민들을 완벽하게 속였습니다!' : '시민들이 라이어를 검거했습니다!'),
        reason: isLiarWin ? '최종 투표에서 정체를 숨기고 제시어를 정확히 맞혀 대역전 승리 달성' : '라이어 투표에서 과반수 이상 득표로 라이어를 정확히 지목 검거 성공',
        icon: isLiarWin ? '🎭' : '🕵️',
        isPrimary: true
      });
      const silentPlayer = room.players.find(p => p.id !== state.liarId) || room.players[0];
      awards.push({
        title: '🤐 침묵의 달변가상 (특별 MVP)',
        player: silentPlayer,
        desc: '가장 의심을 사지 않고 질문 릴레이를 통과한 참가자',
        reason: '질문과 답변 과정에서 가장 일관되고 자연스러운 단어 선택으로 시민들의 의심을 회피함',
        icon: '🎖️'
      });
    } else if (gameId === 'worldcup') {
      const winner = state.winnerCandidate;
      awards.push({
        title: '👑 모두의 이상형 1위',
        player: { name: winner?.name || '최종 우승작', avatar: '🏆' },
        desc: '치열한 토너먼트를 뚫고 전원의 선택을 받은 최고의 우승 후보!',
        reason: '전체 참가자들의 1:1 결선 투표에서 최다 득표를 기록하며 토너먼트 제패',
        icon: '🥇',
        isPrimary: true
      });
    } else if (gameId === 'smart-mafia') {
      const isMafiaWin = state.winner === 'mafia';
      awards.push({
        title: isMafiaWin ? '😈 어둠의 지배자 마피아 승리' : '🕊️ 정의의 사도 시민 승리',
        player: isMafiaWin ? room.players.find(p => state.roles?.[p.id] === 'mafia') : room.players.find(p => state.roles?.[p.id] !== 'mafia'),
        desc: state.winReason || (isMafiaWin ? '마피아가 시민 사회를 장악했습니다!' : '시민들이 마피아를 모두 처형했습니다!'),
        reason: isMafiaWin ? '낮 토론에서 시민들의 분열을 유도하고 밤 암살을 성공시켜 생존 비율 우위 확보' : '단두대 재판에서 날카로운 추리로 마피아 전원을 색출하여 처형 완료',
        icon: isMafiaWin ? '🔪' : '🛡️',
        isPrimary: true
      });
    } else if (gameId === 'fake-artist') {
      const isFakeWin = state.winner === 'fake';
      awards.push({
        title: isFakeWin ? '🎭 천재 가짜 화가 MVP' : '🎨 진실의 예술가 시민 MVP',
        player: isFakeWin ? room.players.find(p => p.id === state.fakeArtistId) : room.players.find(p => p.id !== state.fakeArtistId),
        desc: state.winReason || (isFakeWin ? '가짜 화가가 끝까지 들키지 않고 승리했습니다!' : '진짜 화가들이 가짜를 검거했습니다!'),
        reason: isFakeWin ? '제시어를 모르는 상태에서도 다른 사람들의 획을 완벽히 모방하여 투표를 통과함' : '가짜 화가의 어색한 선을 예리하게 포착하여 최다 득표로 검거 성공',
        icon: isFakeWin ? '🎭' : '🎨',
        isPrimary: true
      });
    } else if (gameId === 'black-and-white') {
      const winner = room.players.find(p => (state.scores?.[p.id] || 0) >= 5) || room.players[0];
      awards.push({
        title: '🃏 지니어스 두뇌 챔피언 1위',
        player: winner,
        desc: '치밀한 숫자 카운팅과 심리전으로 5승을 먼저 쟁취했습니다!',
        reason: '상대방의 흑백 타일 번호를 정확히 예측하고 효율적인 타일 배분으로 5승 선점',
        icon: '👑',
        isPrimary: true
      });
    } else if (gameId === 'high-noon-duel') {
      const winner = room.players.find(p => p.id === (state.scores?.[room.players[0]?.id] > state.scores?.[room.players[1]?.id] ? room.players[0]?.id : room.players[1]?.id));
      awards.push({
        title: '🤠 황야의 전설 무법자 1위',
        player: winner || room.players[0],
        desc: '12:00 정각 0.001초 선착순 속사로 결투에서 최종 승리!',
        reason: '12:00 종소리 직후 가장 빠른 사격 반응속도로 상대를 명중시켜 라운드 스코어 우위 달성',
        icon: '💥',
        isPrimary: true
      });
    } else if (gameId === 'snake-royale') {
      const winner = room.players.find(p => p.id === state.winnerId) || room.players[0];
      awards.push({
        title: '🐍 아레나 최강 포식자 1위',
        player: winner,
        desc: '치열한 몸통 충돌 속에서 최후까지 살아남은 전설의 지렁이!',
        reason: '다른 뱀들의 동선을 예측하여 충돌을 회피하고 최후의 생존자로 등극',
        icon: '🏆',
        isPrimary: true
      });
    } else if (gameId === 'clicker-clash') {
      const winner = room.players.find(p => p.id === state.winnerId) || room.players[0];
      awards.push({
        title: '⚡ 광속의 손가락 CPS 1위',
        player: winner,
        desc: '경이로운 광속 연타 속도로 상대를 완전히 압도했습니다!',
        reason: '10초 제한시간 동안 분당 최고 클릭 수(CPS)를 기록하며 줄다리기/타수에서 승리',
        icon: '🔥',
        isPrimary: true
      });
    } else if (gameId === 'five-sec-rule') {
      const sorted = [...room.players].sort((a, b) => (state.scores?.[b.id] || 0) - (state.scores?.[a.id] || 0));
      awards.push({
        title: '⏱️ 3초 룰 뇌정지 스피드 킹',
        player: sorted[0] || room.players[0],
        desc: '3초의 극한 긴장감 속에서도 번개 같은 속도로 3단어를 외쳤습니다!',
        reason: '주제 제시 직후 지체 없이 3단어를 막힘없이 성공시켜 최다 득점 기록',
        icon: '⚡',
        isPrimary: true
      });
    } else if (gameId === 'story-roulette') {
      const sorted = [...room.players].sort((a, b) => (state.scores?.[b.id] || 0) - (state.scores?.[a.id] || 0));
      awards.push({
        title: '🎡 오늘 밤 토크의 제왕 (꿀잼상)',
        player: sorted[0] || room.players[0],
        desc: '기상천외한 실화 썰로 청중들의 압도적 꿀잼 표를 싹쓸이했습니다!',
        reason: '룰렛 벌칙 주제에 대해 가장 흥미진진한 썰을 풀어 청중들로부터 최다 꿀잼 투표 획득',
        icon: '🎤',
        isPrimary: true
      });
    } else {
      const sorted = [...room.players].sort((a, b) => (state.scores?.[b.id] || 0) - (state.scores?.[a.id] || 0));
      awards.push({
        title: '🏆 파티허브 베스트 플레이어 1위',
        player: sorted[0] || room.players[0],
        desc: '게임 세션을 빛낸 최고의 엔터테이너!',
        reason: '전 라운드에 걸쳐 성실한 참여와 뛰어난 플레이로 최고 점수 또는 최고 기여도 달성',
        icon: '🎉',
        isPrimary: true
      });
    }

    return awards;
  };

  const awards = getGameAwards();

  // 전체 참가자 순위표 데이터 생성 (점수 또는 순서 기반)
  const getLeaderboard = () => {
    if (state.scores && Object.keys(state.scores).length > 0) {
      return [...room.players].sort((a, b) => (state.scores?.[b.id] || 0) - (state.scores?.[a.id] || 0));
    }
    // 점수가 없는 게임의 경우 승자 우선, 그 외 참가자 순으로 정렬
    if (state.winnerId) {
      return [...room.players].sort((a, b) => (a.id === state.winnerId ? -1 : b.id === state.winnerId ? 1 : 0));
    }
    return room.players;
  };

  const leaderboard = getLeaderboard();

  return (
    <div className="game-container" style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 16px', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '40px 24px', borderRadius: '24px', boxShadow: '0 0 50px rgba(139, 92, 246, 0.4)' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '12px', animation: 'pulse 1.5s infinite' }}>
          🏆
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', color: '#FFF' }}>
          {room.gameInfo.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#A5B4FC', fontWeight: 700, marginBottom: '24px' }}>
          모든 라운드가 종료되었습니다! 최종 결과 및 명예의 전당
        </p>

        {/* 1. 라이어 게임 전용 최종 승리 배너 */}
        {gameId === 'liar-game' && (
          <div style={{ background: state.winner === 'liar' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)', border: state.winner === 'liar' ? '2px solid #EF4444' : '2px solid #10B981', padding: '20px', borderRadius: '16px', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: state.winner === 'liar' ? '#F87171' : '#6EE7B7', marginBottom: '6px' }}>
              {state.winner === 'liar' ? '😈 라이어 승리!' : '🎉 시민 승리!'}
            </h2>
            <div style={{ fontSize: '1.05rem', color: '#FFF' }}>
              {state.winReason} (라이어: <strong>{room.players.find(p => p.id === state.liarId)?.name}</strong>)
            </div>
          </div>
        )}

        {/* 2. 이상형 월드컵 전용 최종 1등 대형 이미지 배너 */}
        {gameId === 'worldcup' && state.winnerCandidate && (
          <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(18,16,38,0.95))', border: '2px solid #EC4899', padding: '28px 20px', borderRadius: '20px', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EC4899', color: '#FFF', padding: '6px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '16px' }}>
              <Crown size={16} />
              <span>최종 우승 1위</span>
            </div>

            <div style={{ width: '220px', height: '220px', margin: '0 auto 16px auto', borderRadius: '16px', overflow: 'hidden', border: '3px solid #F472B6', boxShadow: '0 0 30px rgba(236,72,153,0.5)' }}>
              <img src={state.winnerCandidate.image} alt={state.winnerCandidate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
              "{state.winnerCandidate.name}"
            </h2>
          </div>
        )}

        {/* 3. 스마트 마피아 전용 최종 승리 배너 */}
        {gameId === 'smart-mafia' && (
          <div style={{ background: state.winner === 'mafia' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)', border: state.winner === 'mafia' ? '2px solid #EF4444' : '2px solid #10B981', padding: '20px', borderRadius: '16px', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: state.winner === 'mafia' ? '#F87171' : '#6EE7B7', marginBottom: '6px' }}>
              {state.winner === 'mafia' ? '🔪 마피아 승리!' : '🕊️ 시민 승리!'}
            </h2>
            <div style={{ fontSize: '1.05rem', color: '#FFF' }}>
              {state.winReason}
            </div>
          </div>
        )}

        {/* 4. 가짜 화가 찾기 전용 최종 승리 배너 */}
        {gameId === 'fake-artist' && (
          <div style={{ background: state.winner === 'fake' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)', border: state.winner === 'fake' ? '2px solid #EF4444' : '2px solid #10B981', padding: '20px', borderRadius: '16px', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: state.winner === 'fake' ? '#F87171' : '#6EE7B7', marginBottom: '6px' }}>
              {state.winner === 'fake' ? '🎭 가짜 화가 승리!' : '🎨 진짜 화가들 승리!'}
            </h2>
            <div style={{ fontSize: '1.05rem', color: '#FFF' }}>
              {state.winReason}
            </div>
          </div>
        )}

        {/* 특별 어워드 카드 그리드 (MVP 상세 선정 이유 포함) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {awards.map((award, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(145deg, rgba(43, 39, 82, 0.95), rgba(29, 26, 56, 0.98))',
                border: award.isPrimary ? '2px solid #F59E0B' : '1px solid #8B5CF6',
                borderRadius: '18px',
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: award.isPrimary ? '0 8px 30px rgba(245, 158, 11, 0.25)' : '0 8px 25px rgba(139, 92, 246, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{award.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FBBF24', marginBottom: '6px' }}>
                  {award.title}
                </h3>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFF', margin: '10px 0' }}>
                  {award.player?.avatar} {award.player?.name} {award.player?.id === myPlayerId && '(나!)'}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.4, marginBottom: '14px' }}>
                  {award.desc}
                </p>
              </div>

              {/* MVP 선정 이유 상세 표출 박스 */}
              {award.reason && (
                <div style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  color: '#CBD5E1',
                  lineHeight: 1.45
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FBBF24', fontWeight: 800, marginBottom: '3px' }}>
                    <Info size={14} />
                    <span>{t('mvpReason')}</span>
                  </div>
                  <div>{award.reason}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🏆 전체 참가자 순위표 (Leaderboard / Scoreboard) */}
        <div style={{ background: 'var(--bg-surface-elevated)', padding: '24px 20px', borderRadius: '18px', marginBottom: '32px', textAlign: 'left', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#A5B4FC', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={20} color="#FBBF24" />
              <span>{t('finalLeaderboard')}</span>
            </h4>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {t('totalParticipants', { count: leaderboard.length })}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {leaderboard.map((p, idx) => {
              const isWinner = idx === 0;
              const hasScore = state.scores?.[p.id] !== undefined;
              const scoreVal = state.scores?.[p.id];

              return (
                <div
                  key={p.id}
                  style={{
                    background: isWinner ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.04)',
                    border: isWinner ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: idx === 0 ? '#F59E0B' : idx === 1 ? '#94A3B8' : idx === 2 ? '#B45309' : 'rgba(255,255,255,0.1)',
                      color: idx <= 2 ? '#000' : '#FFF',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
                      {p.avatar} {p.name} {p.id === myPlayerId && <span style={{ color: '#FBBF24', fontSize: '0.8rem' }}>({t('meBadge')})</span>}
                    </span>
                  </div>

                  <div style={{ fontWeight: 800, color: isWinner ? '#FBBF24' : '#6EE7B7', fontSize: '0.95rem' }}>
                    {hasScore ? `${scoreVal}` : (isWinner ? '👑' : '🎖️')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 지속형 파티 룸: 대기실 복귀 및 퇴장 버튼 그룹 (방장 권한 제한) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', marginTop: '16px' }}>
          {isHost ? (
            <button
              className="btn btn-primary"
              onClick={handleReturnToLobby}
              style={{
                padding: '16px 48px',
                fontSize: '1.2rem',
                fontWeight: 900,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <RotateCcw size={22} />
              <span>🔄 {t('inGameRestartBtn')}</span>
            </button>
          ) : (
            <div style={{
              padding: '16px 28px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '16px',
              color: '#C4B5FD',
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderColor: '#C4B5FD', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
              <span>👑 {t('waitingForHost')}</span>
            </div>
          )}

          <button
            className="btn btn-secondary"
            onClick={onLeaveRoom}
            style={{
              padding: '10px 24px',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              border: 'none',
              background: 'transparent'
            }}
          >
            <span>🚪 {t('inGameExitBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
