// client/src/components/games/BalanceDebateView.tsx
import React from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const BalanceDebateView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  if (!state) return null;

  const currentQ = state.currentQuestion;
  const isHost = room.hostId === myPlayerId;
  const myVote1 = state.votesPhase1?.[myPlayerId];
  const myVote2 = state.votesPhase2?.[myPlayerId];

  const handleVote1 = (choice: 'A' | 'B') => {
    if (state.phase !== 'vote1') return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_phase1',
      payload: { choice }
    });
  };

  const handleVote2 = (choice: 'A' | 'B') => {
    if (state.phase !== 'vote2' && state.phase !== 'debate') return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_phase2',
      payload: { choice }
    });
  };

  const handleStartVote2 = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'start_vote2' });
  };

  const handleFinishRound = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'finish_round' });
  };

  const handleNextRound = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_round' });
  };

  // 실시간 지지자 명단 계산
  const activeVotes = (state.phase === 'vote2' || state.phase === 'roundEnd' || state.phase === 'debate')
    ? state.votesPhase2
    : state.votesPhase1;

  const supportersA = room.players.filter(p => activeVotes?.[p.id] === 'A');
  const supportersB = room.players.filter(p => activeVotes?.[p.id] === 'B');

  const countA = supportersA.length;
  const countB = supportersB.length;
  const winnerOption = countA > countB ? 'A' : countB > countA ? 'B' : 'TIE';

  return (
    <div className="game-container" style={{ maxWidth: '950px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#8B5CF6', color: '#FFF' }}>
            {t('inGameRound', { current: state.roundIndex + 1, total: state.totalRounds })}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>⚖️ {t('balanceDebate') || 'Balance Debate'}</h3>
        </div>

        {state.phase === 'debate' && (
          <CountdownTimer
            startedAt={state.startedAt}
            durationSec={state.debateTimerSec || 45}
            onTimeout={handleStartVote2}
          />
        )}
      </div>

      {/* 1차 실시간 투표자 수 (X / Y명) 표출 배너 */}
      {state.phase === 'vote1' && (
        <div className="glass-panel" style={{ padding: '14px 20px', marginBottom: '20px', textAlign: 'center', background: 'rgba(139, 92, 246, 0.15)', borderColor: '#8B5CF6' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#DDD6FE' }}>
            🗳️ 1차 실시간 비밀 투표: <strong style={{ color: '#FFF' }}>{Object.keys(state.votesPhase1 || {}).length} / {room.players.length}명 완료</strong>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#C4B5FD', marginTop: '4px' }}>
            {myVote1 ? '✓ 투표 완료! 다른 참가자들의 선택을 기다리는 중입니다...' : '마음에 드는 쪽을 하나 골라 투표하세요.'}
          </div>
        </div>
      )}

      {/* 2차 토론 & 상대 진영 설득 강조 배너 */}
      {(state.phase === 'debate' || state.phase === 'vote2') && (
        <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '20px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(99,102,241,0.25))', borderColor: '#EC4899' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#F472B6', marginBottom: '6px' }}>
            🗣️ [2차 설득 & 진영 변경 토론] 상대 진영을 설득하여 표를 가져오세요!
          </h4>
          <p style={{ color: '#E2E8F0', fontSize: '0.95rem', margin: 0 }}>
            디스코드 마이크를 켜고 내 선택지의 장점을 어필하세요! 언제든 [진영 변경하기] 버튼으로 마음을 바꿀 수 있습니다.
          </p>
        </div>
      )}

      {/* 라운드 최종 승리 진영 발표 배너 */}
      {state.phase === 'roundEnd' && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(18,16,38,0.95))', borderColor: '#F59E0B' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 900, color: '#FBBF24' }}>
            <Trophy size={24} />
            <span>
              {winnerOption === 'A'
                ? `🏆 [A 선택지] "${currentQ?.optionA}" 과반수 승리! (${countA}표)`
                : winnerOption === 'B'
                ? `🏆 [B 선택지] "${currentQ?.optionB}" 과반수 승리! (${countB}표)`
                : `🤝 팽팽한 황금 밸런스 무승부! (${countA} : ${countB})`}
            </span>
          </div>
        </div>
      )}

      {/* A vs B 밸런스 카드 매치업 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* A 카드 */}
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            borderRadius: '20px',
            textAlign: 'center',
            background: (myVote2 === 'A' || myVote1 === 'A') ? 'rgba(99, 102, 241, 0.3)' : 'var(--bg-surface)',
            border: (myVote2 === 'A' || myVote1 === 'A') ? '2px solid #6366F1' : '1px solid var(--border-glass)',
            transition: 'all 0.3s ease'
          }}
        >
          <span className="badge-pill" style={{ background: '#6366F1', color: '#FFF', fontSize: '1rem', padding: '6px 16px', fontWeight: 900 }}>
            옵션 A
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '20px 0', lineHeight: 1.4, minHeight: '80px' }}>
            {currentQ?.optionA}
          </h2>

          {/* 1차 투표 버튼 */}
          {state.phase === 'vote1' && (
            <button
              className="btn btn-primary"
              onClick={() => handleVote1('A')}
              style={{ width: '100%', padding: '14px', background: '#6366F1', borderColor: '#6366F1' }}
              disabled={!!myVote1}
            >
              {myVote1 === 'A' ? '✓ 내 선택 완료' : 'A 선택하기'}
            </button>
          )}

          {/* 2차 마음바꾸기 버튼 */}
          {(state.phase === 'debate' || state.phase === 'vote2') && (
            <button
              className="btn"
              onClick={() => handleVote2('A')}
              style={{
                width: '100%',
                padding: '14px',
                background: myVote2 === 'A' ? '#6366F1' : 'var(--bg-surface-elevated)',
                color: '#FFF',
                border: myVote2 === 'A' ? '2px solid #A5B4FC' : '1px solid var(--border-glass)'
              }}
            >
              <RefreshCw size={16} />
              <span>{myVote2 === 'A' ? '✓ A 진영 지지 중' : 'A로 진영 변경하기'}</span>
            </button>
          )}

          {/* A 지지자 실시간 아바타 명단 */}
          {state.phase !== 'vote1' && (
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', color: '#A5B4FC', fontWeight: 700, marginBottom: '8px' }}>
                👥 A 진영 지지자 ({countA}명)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {supportersA.map(p => (
                  <span key={p.id} className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.4)', color: '#FFF' }}>
                    {p.avatar} {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* B 카드 */}
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            borderRadius: '20px',
            textAlign: 'center',
            background: (myVote2 === 'B' || myVote1 === 'B') ? 'rgba(236, 72, 153, 0.3)' : 'var(--bg-surface)',
            border: (myVote2 === 'B' || myVote1 === 'B') ? '2px solid #EC4899' : '1px solid var(--border-glass)',
            transition: 'all 0.3s ease'
          }}
        >
          <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF', fontSize: '1rem', padding: '6px 16px', fontWeight: 900 }}>
            옵션 B
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '20px 0', lineHeight: 1.4, minHeight: '80px' }}>
            {currentQ?.optionB}
          </h2>

          {/* 1차 투표 버튼 */}
          {state.phase === 'vote1' && (
            <button
              className="btn btn-primary"
              onClick={() => handleVote1('B')}
              style={{ width: '100%', padding: '14px', background: '#EC4899', borderColor: '#EC4899' }}
              disabled={!!myVote1}
            >
              {myVote1 === 'B' ? '✓ 내 선택 완료' : 'B 선택하기'}
            </button>
          )}

          {/* 2차 마음바꾸기 버튼 */}
          {(state.phase === 'debate' || state.phase === 'vote2') && (
            <button
              className="btn"
              onClick={() => handleVote2('B')}
              style={{
                width: '100%',
                padding: '14px',
                background: myVote2 === 'B' ? '#EC4899' : 'var(--bg-surface-elevated)',
                color: '#FFF',
                border: myVote2 === 'B' ? '2px solid #F472B6' : '1px solid var(--border-glass)'
              }}
            >
              <RefreshCw size={16} />
              <span>{myVote2 === 'B' ? '✓ B 진영 지지 중' : 'B로 진영 변경하기'}</span>
            </button>
          )}

          {/* B 지지자 실시간 아바타 명단 */}
          {state.phase !== 'vote1' && (
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', color: '#F472B6', fontWeight: 700, marginBottom: '8px' }}>
                👥 B 진영 지지자 ({countB}명)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {supportersB.map(p => (
                  <span key={p.id} className="badge-pill" style={{ background: 'rgba(236, 72, 153, 0.4)', color: '#FFF' }}>
                    {p.avatar} {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 방장 컨트롤 바 */}
      {isHost && (
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {state.phase === 'debate' && (
            <button className="btn btn-primary" onClick={handleStartVote2}>
              <span>2차 마음바꾸기 투표로 전환</span>
              <ArrowRight size={16} />
            </button>
          )}
          {state.phase === 'vote2' && (
            <button className="btn btn-primary" onClick={handleFinishRound}>
              <span>투표 마감 & 라운드 결과 발표</span>
              <ArrowRight size={16} />
            </button>
          )}
          {state.phase === 'roundEnd' && (
            <button className="btn btn-primary" onClick={handleNextRound}>
              <span>{t('inGameNext')}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
