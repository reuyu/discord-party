// client/src/components/games/TabooTalkView.tsx
import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Send, ShieldAlert, Check } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const TabooTalkView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [createdTaboo, setCreatedTaboo] = useState('');

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const isAlive = state.alivePlayers?.includes(myPlayerId);

  // 내가 금기어를 지어줘야 하는 대상 플레이어
  const myTargetId = Object.entries(state.tabooAssignments || {}).find(([_, creatorId]) => creatorId === myPlayerId)?.[0];
  const myTargetPlayer = room.players.find(p => p.id === myTargetId);
  const hasSubmittedMyTaboo = !!state.currentRoundSubmissions?.[myPlayerId];

  // 1. 금기어 작성 제출
  const handleSubmitTaboo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdTaboo.trim() || !myTargetId) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_custom_taboo',
      payload: { targetPlayerId: myTargetId, word: createdTaboo.trim() }
    });
    setCreatedTaboo('');
  };

  // 2. 상대방 금기어 적발 신고
  const handleReport = (victimPlayerId: string, word: string) => {
    sounds.playGunshot();
    socket.emit('game:action', {
      type: 'report_taboo',
      payload: { victimPlayerId, word }
    });
  };

  // 3. 시간 만료 시
  const handleTimeout = () => {
    if (isHost && state.phase === 'talking') {
      socket.emit('game:action', { type: 'timeout_talk' });
    }
  };

  return (
    <div className="game-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF' }}>
            생존: {state.alivePlayers?.length} / {room.players.length}명 (1회 적발 시 즉사)
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🤐 절대 금기어 서바이벌</h3>
        </div>

        {state.phase === 'talking' && (
          <CountdownTimer
            startedAt={state.startedAt}
            durationSec={state.timeLimitSec || 90}
            onTimeout={handleTimeout}
          />
        )}
      </div>

      {/* 1. 상호 금기어 부여 페이즈 */}
      {state.phase === 'setting' && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✍️</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
            {state.round > 1 ? `[라운드 ${state.round}] 추가 금기어를 직접 정해주세요!` : '친구에게 쥐어줄 치명적인 금기어를 직접 정해주세요!'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            당신이 금기어를 지정할 대상: <strong style={{ color: '#F472B6', fontSize: '1.1rem' }}>{myTargetPlayer?.name || '동료'}</strong>
          </p>

          {!hasSubmittedMyTaboo ? (
            <form onSubmit={handleSubmitTaboo} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder={`'${myTargetPlayer?.name || '상대방'}' 님이 자주 쓰는 말버릇/단어 입력...`}
                value={createdTaboo}
                onChange={(e) => setCreatedTaboo(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', background: '#EC4899', borderColor: '#EC4899' }}>
                <Send size={18} />
                <span>지정 완료</span>
              </button>
            </form>
          ) : (
            <div style={{ color: '#6EE7B7', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Check size={20} />
              <span>금기어 지정을 완료했습니다! 다른 참가자들이 지정을 마칠 때까지 대기하세요...</span>
            </div>
          )}
        </div>
      )}

      {/* 2. 실시간 일상 대화 & 적발 페이즈 */}
      {state.phase === 'talking' && (
        <div>
          {/* 내 상태 안내 */}
          <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '20px', textAlign: 'center', background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.4)' }}>
            <div style={{ fontSize: '0.9rem', color: '#FCA5A5', fontWeight: 700 }}>
              ⚠️ 주의: 당신에게 지정된 금기어는 나만 볼 수 없습니다!
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
              자유롭게 대화하면서 상대방이 금기어를 말하도록 유도하고, 상대가 말하는 순간 즉시 [적발 🚨] 버튼을 누르세요!
            </div>
          </div>

          {/* 참가자 카드 그리드 (나를 제외한 다른 사람의 금기어 표시) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {room.players.map((p) => {
              const pAlive = state.alivePlayers?.includes(p.id);
              const isMe = p.id === myPlayerId;
              const pTaboos = state.userTaboos?.[p.id] || [];

              return (
                <div
                  key={p.id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    textAlign: 'left',
                    opacity: pAlive ? 1 : 0.45,
                    border: pAlive ? '1px solid var(--border-glass)' : '1px dashed #475569',
                    background: isMe ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '2rem' }}>{p.avatar}</span>
                      <div>
                        <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1.05rem' }}>
                          {p.name} {isMe && '(나)'}
                        </div>
                        <span className="badge-pill" style={{ background: pAlive ? '#10B981' : '#475569', color: '#FFF', fontSize: '0.65rem' }}>
                          {pAlive ? '🟢 생존' : '💀 탈락'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 금기어 목록 (본인은 비공개 ???) */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#A5B4FC', fontWeight: 700, marginBottom: '6px' }}>
                      {isMe ? '내 금기어 (비공개)' : `${p.name}님의 금기어 (말하면 즉시 적발 클릭!)`}
                    </div>

                    {isMe ? (
                      <div style={{ color: '#EF4444', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>
                        ❓ ❓ ❓ (절대 비밀)
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {pTaboos.map((taboo: string, idx: number) => (
                          <button
                            key={idx}
                            className="btn"
                            onClick={() => handleReport(p.id, taboo)}
                            disabled={!isAlive || !pAlive}
                            style={{
                              background: '#EF4444',
                              color: '#FFF',
                              fontSize: '0.85rem',
                              fontWeight: 800,
                              padding: '6px 12px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <ShieldAlert size={14} />
                            <span>"{taboo}" 적발!</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 적발 히스토리 로그 */}
          {state.caughtHistory?.length > 0 && (
            <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#F87171', fontWeight: 800, marginBottom: '8px' }}>
                🚨 실시간 금기어 처형 로그
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {state.caughtHistory.map((h: any, idx: number) => {
                  const victim = room.players.find(p => p.id === h.victimId);
                  const reporter = room.players.find(p => p.id === h.reporterId);
                  return (
                    <div key={idx} style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                      💀 <strong style={{ color: '#FFF' }}>{victim?.name}</strong> 님이 금기어 <strong style={{ color: '#FDE047' }}>[{h.word}]</strong>(을)를 말하여 <strong style={{ color: '#60A5FA' }}>{reporter?.name}</strong> 님에게 적발되어 탈락했습니다!
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
