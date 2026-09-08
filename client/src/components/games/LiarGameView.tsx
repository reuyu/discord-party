// client/src/components/games/LiarGameView.tsx
import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { Send } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const LiarGameView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  const [liarGuessText, setLiarGuessText] = useState('');

  if (!state) return null;

  const isLiar = state.liarId === myPlayerId;
  const isMyTurnToSpeak = state.currentSpeakerId === myPlayerId;
  const currentSpeaker = room.players.find(p => p.id === state.currentSpeakerId);
  const myVote = state.votes?.[myPlayerId];

  // 1. 질문 대상 지목
  const handleSelectTarget = (targetPlayerId: string) => {
    if (!isMyTurnToSpeak || targetPlayerId === myPlayerId || state.phase !== 'discussing') return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'pass_turn',
      payload: { targetPlayerId }
    });
  };

  // 2. 라이어 지목 투표
  const handleVotePlayer = (targetPlayerId: string) => {
    if (state.phase !== 'voting' || myVote) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_vote',
      payload: { targetPlayerId }
    });
  };

  // 3. 라이어 정답 제출
  const handleLiarGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liarGuessText.trim()) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'liar_guess',
      payload: { guess: liarGuessText }
    });
  };

  return (
    <div className="game-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 라운드 정보 & 질문 진행도 게이지 */}
      <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <span className="badge-pill" style={{ background: '#8B5CF6', color: '#FFF' }}>
              {t('categoryLabel', { category: state.category })}
            </span>
            <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🕵️ {t('liarGame') || 'Liar Game'}</h3>
          </div>

          {/* 질문 진행 횟수 */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>질문 릴레이 진행도</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FBBF24' }}>
              {state.questionTurnCount} / {state.maxQuestionTurns}회 (완료 시 자동 투표)
            </div>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.min(100, (state.questionTurnCount / state.maxQuestionTurns) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* 내 역할 및 제시어 확인 카드 (제시어 즉시 표시) */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px', textAlign: 'center', background: isLiar ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(29,26,56,0.9))' : 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(29,26,56,0.9))' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>내 비밀 정보</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: isLiar ? '#EF4444' : '#6EE7B7' }}>
          {isLiar ? '🎭 당신은 라이어입니다! (제시어를 모릅니다)' : `🔑 제시어: ${state.secretWord}`}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          {isLiar ? '정체를 숨기고 시민들의 질문과 답변을 통해 제시어를 유추하세요.' : '라이어가 눈치채지 못하도록 알쏭달쏭한 힌트로 대화하세요.'}
        </p>
      </div>

      {/* 1. 질문 릴레이 페이즈 (원탁 탑뷰 레이아웃) */}
      {state.phase === 'discussing' && (
        <div className="glass-panel" style={{ padding: '30px 20px', marginBottom: '20px', textAlign: 'center' }}>
          {/* 현재 발언자 안내 배너 */}
          <div style={{ background: isMyTurnToSpeak ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.06)', border: isMyTurnToSpeak ? '1px solid #EC4899' : '1px solid var(--border-glass)', padding: '14px', borderRadius: '12px', marginBottom: '24px' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isMyTurnToSpeak ? '#F472B6' : '#FFF' }}>
              {isMyTurnToSpeak
                ? '🎙️ 당신이 현재 질문자입니다! 질문할 상대를 아래에서 클릭하고 질문하세요!'
                : `⏳ ${currentSpeaker?.name} 님이 질문할 대상을 선택하고 있습니다...`}
            </div>
          </div>

          {/* 원탁 플레이어 그리드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
            {room.players.map((p) => {
              const isSpeaker = p.id === state.currentSpeakerId;
              const isMe = p.id === myPlayerId;
              return (
                <button
                  key={p.id}
                  className="btn"
                  onClick={() => handleSelectTarget(p.id)}
                  disabled={!isMyTurnToSpeak || isMe}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 10px',
                    borderRadius: '16px',
                    background: isSpeaker ? 'rgba(236,72,153,0.3)' : 'var(--bg-surface-elevated)',
                    border: isSpeaker ? '2px solid #EC4899' : '1px solid var(--border-glass)',
                    cursor: isMyTurnToSpeak && !isMe ? 'pointer' : 'default',
                    transform: isSpeaker ? 'scale(1.05)' : 'none',
                    boxShadow: isSpeaker ? '0 0 20px rgba(236,72,153,0.4)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{p.avatar}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>
                    {p.name} {isMe && t('inGameMe')}
                  </div>
                  {isSpeaker && (
                    <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF', marginTop: '6px', fontSize: '0.72rem' }}>
                      {t('inGameSpeaking')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. 라이어 지목 투표 페이즈 */}
      {state.phase === 'voting' && (
        <div className="glass-panel" style={{ padding: '30px 20px', marginBottom: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '8px', color: '#FBBF24' }}>
            🗳️ {t('inGameVote')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            {t('inGameVote')}: {Object.keys(state.votes || {}).length} / {room.players.length}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
            {room.players.map((p) => {
              const isSelected = myVote === p.id;
              const isMe = p.id === myPlayerId;
              return (
                <button
                  key={p.id}
                  className="btn"
                  onClick={() => handleVotePlayer(p.id)}
                  disabled={!!myVote || isMe}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 10px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(245, 158, 11, 0.3)' : 'var(--bg-surface-elevated)',
                    border: isSelected ? '2px solid #F59E0B' : '1px solid var(--border-glass)',
                    cursor: !myVote && !isMe ? 'pointer' : 'default'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{p.avatar}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>
                    {p.name} {isMe && t('inGameMe')}
                  </div>
                  {isSelected && (
                    <span className="badge-pill" style={{ background: '#F59E0B', color: '#000', marginTop: '6px', fontSize: '0.72rem' }}>
                      ✓ {t('inGameVoted')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. 라이어 역전 정답 시도 페이즈 */}
      {state.phase === 'liarGuess' && (
        <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '20px', textAlign: 'center', background: 'rgba(239,68,68,0.15)', borderColor: '#EF4444' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F87171', marginBottom: '8px' }}>
            🚨 {state.liarId ? room.players.find(p => p.id === state.liarId)?.name : 'Liar'}
          </h2>

          {isLiar ? (
            <form onSubmit={handleLiarGuess} style={{ maxWidth: '460px', margin: '0 auto', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="..."
                value={liarGuessText}
                onChange={(e) => setLiarGuessText(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', background: '#EF4444', borderColor: '#EF4444' }}>
                <Send size={18} />
                <span>{t('inGameSubmit')}</span>
              </button>
            </form>
          ) : (
            <div style={{ color: '#A5B4FC', fontWeight: 700 }}>
              {t('inGameWaiting')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
