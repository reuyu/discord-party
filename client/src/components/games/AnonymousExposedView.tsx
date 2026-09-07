// client/src/components/games/AnonymousExposedView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Send, ArrowRight, MessageSquareQuote, Check } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const AnonymousExposedView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [anonymousReason, setAnonymousReason] = useState<string>('');

  // 다음 라운드 진입 시 입력창 및 타겟 자동 초기화!
  useEffect(() => {
    setSelectedTarget('');
    setAnonymousReason('');
  }, [state?.roundIndex]);

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const hasSubmitted = !!state.submissions?.[myPlayerId];
  const submissionCount = Object.keys(state.submissions || {}).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTarget || !anonymousReason.trim() || hasSubmitted) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_expose',
      payload: { targetId: selectedTarget, reason: anonymousReason.trim() }
    });
  };

  const handleTimeout = () => {
    if (isHost && state.phase === 'submitting') {
      socket.emit('game:action', { type: 'timeout_submitting' });
    }
  };

  const handleNextQuestion = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_round' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 질문 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#6366F1', color: '#FFF' }}>
            질문 {state.roundIndex + 1} / {state.totalRounds}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🤫 익명 속마음 폭로 배틀</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#A5B4FC' }}>
            🔒 100% 무기명 보장
          </div>

          {state.phase === 'submitting' && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 45}
              onTimeout={handleTimeout}
            />
          )}
        </div>
      </div>

      {/* 중앙 질문 전광판 */}
      <div className="glass-panel" style={{ padding: '36px 24px', marginBottom: '24px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(18,16,38,0.95) 80%)' }}>
        <div style={{ fontSize: '0.95rem', color: '#A5B4FC', marginBottom: '10px' }}>이번 라운드 폭로 질문</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', lineHeight: 1.4 }}>
          "{state.currentQuestion}"
        </h1>
      </div>

      {/* 1. 무기명 지목 및 이유 작성 페이즈 */}
      {state.phase === 'submitting' && (
        <div className="glass-panel" style={{ padding: '30px 24px', marginBottom: '20px' }}>
          {!hasSubmitted ? (
            <form onSubmit={handleSubmit} style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                1. 질문에 가장 부합하는 플레이어 선택
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
                {room.players.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className="btn"
                    onClick={() => setSelectedTarget(p.id)}
                    style={{
                      padding: '12px 6px',
                      borderRadius: '12px',
                      background: selectedTarget === p.id ? 'rgba(99, 102, 241, 0.4)' : 'var(--bg-surface-elevated)',
                      border: selectedTarget === p.id ? '2px solid #6366F1' : '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem' }}>{p.avatar}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>{p.name}</div>
                  </button>
                ))}
              </div>

              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '8px' }}>
                2. 익명으로 전달할 솔직한 이유 작성 (100% 익명)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="왜 이 사람을 지목했는지 솔직한 이유를 적어주세요..."
                value={anonymousReason}
                onChange={(e) => setAnonymousReason(e.target.value)}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  현재 제출 완료: {submissionCount} / {room.players.length}명
                </span>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!selectedTarget || !anonymousReason.trim()}
                  style={{ padding: '12px 32px' }}
                >
                  <Send size={18} />
                  <span>익명 제출하기</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '16px', color: '#6EE7B7', fontWeight: 800, fontSize: '1.1rem' }}>
              <Check size={28} style={{ margin: '0 auto 8px auto' }} />
              <div>익명 제출을 완료했습니다!</div>
              <div style={{ fontSize: '0.85rem', color: '#A7F3D0', marginTop: '6px', fontWeight: 600 }}>
                모든 참가자가 제출하면 실시간 전광판이 열립니다 ({submissionCount} / {room.players.length}명 완료)
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. 전광판 공개 페이즈 */}
      {state.phase === 'revealing' && (
        <div>
          {/* 지목 결과 현황 */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', color: '#FBBF24' }}>
              🏆 최다 득표 플레이어
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {room.players.map(p => {
                const count = state.voteCounts?.[p.id] || 0;
                return (
                  <div
                    key={p.id}
                    style={{
                      background: count > 0 ? 'rgba(99, 102, 241, 0.25)' : 'var(--bg-surface-elevated)',
                      border: count > 0 ? '2px solid #6366F1' : '1px solid var(--border-glass)',
                      borderRadius: '14px',
                      padding: '16px 10px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem' }}>{p.avatar}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF', margin: '4px 0' }}>{p.name}</div>
                    <span className="badge-pill" style={{ background: count > 0 ? '#6366F1' : 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: '0.8rem' }}>
                      {count}표 획득
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 익명 코멘트 롤링 목록 (대상자 이름 및 아바타 명확히 표시!) */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', color: '#A5B4FC', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquareQuote size={20} />
              <span>도착한 익명 속마음 폭로 메시지들</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {((state.shuffledExposes && state.shuffledExposes.length > 0)
                ? state.shuffledExposes
                : (state.shuffledReasons || []).map((r: string) => ({ targetName: '지목된 플레이어', targetAvatar: '🎯', reason: r }))
              ).map((item: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#C7D2FE', fontSize: '0.82rem', fontWeight: 700, border: '1px solid #6366F1' }}>
                      🎯 대상: {item.targetAvatar} {item.targetName}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.1rem', color: '#FFF', lineHeight: 1.5, fontWeight: 600, paddingLeft: '4px' }}>
                    💬 "{item.reason}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <button className="btn btn-primary" onClick={handleNextQuestion} style={{ padding: '14px 36px', fontSize: '1.05rem' }}>
              <span>다음 폭로 질문으로 이동 ➔</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
