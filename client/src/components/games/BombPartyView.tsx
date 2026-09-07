// client/src/components/games/BombPartyView.tsx
import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Heart, Send, Skull, ShieldAlert } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const BombPartyView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [wordInput, setWordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!state) return null;

  const isHolder = state.currentHolderId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const currentHolder = room.players.find(p => p.id === state.currentHolderId);
  const myLives = state.lives?.[myPlayerId] || 0;
  const isAlive = myLives > 0;
  const lastSubmitter = room.players.find(p => p.id === state.lastWordSubmitterId);

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHolder) return;

    const trimmed = wordInput.trim();
    if (trimmed.length < 2) {
      sounds.playWrong();
      setErrorMsg('⚠️ 2글자 이상의 단어를 입력해주세요!');
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }

    if (!trimmed.includes(state.currentSyllable)) {
      sounds.playWrong();
      setErrorMsg(`⚠️ 반드시 제시된 글자 [${state.currentSyllable}]를 포함해야 합니다!`);
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }

    if (state.usedWords?.includes(trimmed)) {
      sounds.playWrong();
      setErrorMsg('⚠️ 이미 이번 판에 사용된 단어입니다!');
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }

    sounds.playCorrect();
    socket.emit('game:action', {
      type: 'submit_word',
      payload: { word: trimmed }
    });
    setWordInput('');
  };

  const handleTimeout = () => {
    if (isHost) {
      sounds.playExplosion();
      socket.emit('game:action', { type: 'explode_bomb' });
    }
  };

  const handleChallengeWord = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'challenge_word' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 생존자 현황 및 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#EF4444', color: '#FFF' }}>
            생존: {state.alivePlayers?.length}명 / 탈락: {state.eliminatedPlayers?.length || 0}명
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.15rem', fontWeight: 800 }}>💣 폭탄 돌리기 단어 폭파 배틀</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>내 상태:</span>
            {isAlive ? (
              <span className="badge-pill" style={{ background: '#10B981', color: '#FFF' }}>
                <Heart size={14} fill="#FFF" /> 목숨 1개 생존
              </span>
            ) : (
              <span className="badge-pill" style={{ background: '#475569', color: '#FFF' }}>
                <Skull size={14} /> 탈락 (관전중)
              </span>
            )}
          </div>

          <CountdownTimer
            startedAt={state.startedAt}
            durationSec={state.bombDurationSec || 10}
            onTimeout={handleTimeout}
          />
        </div>
      </div>

      {/* 에러 경고 메시지 */}
      {errorMsg && (
        <div style={{ background: 'rgba(239, 68, 68, 0.25)', border: '1px solid #EF4444', padding: '10px 16px', borderRadius: '12px', marginBottom: '16px', color: '#FCA5A5', fontWeight: 700 }}>
          {errorMsg}
        </div>
      )}

      {/* 중앙 시한폭탄 & 제시 글자 영역 */}
      <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '24px', background: isHolder ? 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(18,16,38,0.95) 75%)' : 'var(--bg-surface)' }}>
        <div style={{ fontSize: '4.5rem', animation: isHolder ? 'bounce 0.6s infinite' : 'none' }}>
          💣
        </div>

        <div style={{ margin: '14px 0' }}>
          <span className="badge-pill" style={{ background: isHolder ? '#EF4444' : 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: '0.95rem', padding: '6px 16px' }}>
            {isHolder ? '🔥 당신이 폭탄을 들고 있습니다! 빨리 단어를 입력하세요!' : `⏳ [${currentHolder?.name}] 님이 폭탄을 쥐고 있습니다...`}
          </span>
        </div>

        {/* 제시된 글자 */}
        <div style={{ margin: '20px auto', background: 'rgba(0,0,0,0.4)', border: '2px solid #F59E0B', borderRadius: '20px', padding: '16px 36px', display: 'inline-block' }}>
          <div style={{ fontSize: '0.85rem', color: '#FBBF24', marginBottom: '4px', fontWeight: 700 }}>포함해야 할 글자</div>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FFF', letterSpacing: '4px' }}>
            [{state.currentSyllable}]
          </div>
        </div>

        {/* 단어 입력 폼 (폭탄 소지자 전용) */}
        {isHolder ? (
          <form onSubmit={handleWordSubmit} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="input-field"
              placeholder={`'${state.currentSyllable}' 글자가 들어간 단어 입력...`}
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              autoFocus
              required
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', background: '#EF4444', borderColor: '#EF4444' }}>
              <Send size={18} />
              <span>패스!</span>
            </button>
          </form>
        ) : (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {isAlive ? (
              <span>⚡ 가속 중! 현재 턴 제한 시간: <strong style={{ color: '#EF4444' }}>{state.bombDurationSec || 10}초</strong> (진행 턴: {state.totalTurnsCount || 0}회)</span>
            ) : (
              '관전 중입니다. 억지 단어가 나오면 아래에서 이의제기를 누르세요!'
            )}
          </div>
        )}
      </div>

      {/* 억지 단어 이의제기 (신고) 배너 */}
      {state.lastWord && (
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.8rem', color: '#FDE68A' }}>방금 통과된 단어:</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
              "{state.lastWord}" <span style={{ fontSize: '0.85rem', color: '#A5B4FC' }}>({lastSubmitter?.name} 제출)</span>
            </div>
          </div>

          <button
            className="btn"
            onClick={handleChallengeWord}
            disabled={state.challengeVotes?.includes(myPlayerId) || state.lastWordSubmitterId === myPlayerId}
            style={{
              background: state.challengeVotes?.includes(myPlayerId) ? 'rgba(239,68,68,0.4)' : '#EF4444',
              color: '#FFF',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: 800
            }}
          >
            <ShieldAlert size={16} />
            <span>🚨 억지 단어 의심/신고 ({state.challengeVotes?.length || 0}표)</span>
          </button>
        </div>
      )}

      {/* 실시간 참가자 순서 및 생존/탈락 현황 */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '14px', textAlign: 'left' }}>
          👥 참가자 턴 순서 & 생존 현황
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {room.players.map((p) => {
            const isHolding = p.id === state.currentHolderId;
            const playerAlive = state.alivePlayers?.includes(p.id);
            const isMe = p.id === myPlayerId;

            return (
              <div
                key={p.id}
                style={{
                  background: isHolding ? 'rgba(239,68,68,0.25)' : playerAlive ? 'var(--bg-surface-elevated)' : 'rgba(0,0,0,0.5)',
                  border: isHolding ? '2px solid #EF4444' : playerAlive ? '1px solid var(--border-glass)' : '1px dashed #475569',
                  borderRadius: '14px',
                  padding: '14px 10px',
                  opacity: playerAlive ? 1 : 0.45,
                  transform: isHolding ? 'scale(1.05)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
                  {playerAlive ? p.avatar : '💀'}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>
                  {p.name} {isMe && '(나)'}
                </div>
                <div style={{ marginTop: '6px' }}>
                  {isHolding ? (
                    <span className="badge-pill" style={{ background: '#EF4444', color: '#FFF', fontSize: '0.7rem' }}>
                      💣 폭탄 턴
                    </span>
                  ) : playerAlive ? (
                    <span className="badge-pill" style={{ background: 'rgba(16,185,129,0.2)', color: '#6EE7B7', fontSize: '0.7rem' }}>
                      생존
                    </span>
                  ) : (
                    <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontSize: '0.7rem' }}>
                      탈락(관전)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
