// client/src/components/games/FiveSecRuleView.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { ThumbsUp, ThumbsDown, Send, Zap, Clock, Sparkles } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const FiveSecRuleView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [answerInput, setAnswerInput] = useState('');
  const [gaugePercent, setGaugePercent] = useState<number>(100);
  const [timeLeftSec, setTimeLeftSec] = useState<string>('5.0');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 미션이 바뀔 때 인풋창 자동 포커스 & 텍스트 초기화
  useEffect(() => {
    setAnswerInput('');
    if (state?.phase === 'typing') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [state?.roundIndex, state?.phase]);

  // 3초 투표 카운트다운 실시간 게이지 (RequestAnimationFrame / 50ms interval)
  useEffect(() => {
    if (state?.phase !== 'voting' || !state?.votingStartedAt) {
      setGaugePercent(100);
      return;
    }

    const duration = (state.votingDurationSec || 5) * 1000; // 5초 투표
    const startTime = state.votingStartedAt;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const percent = Math.max(0, (remaining / duration) * 100);
      setGaugePercent(percent);
      setTimeLeftSec((remaining / 1000).toFixed(1));

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [state?.phase, state?.votingStartedAt]);

  if (!state) return null;

  const myVote = state.votes?.[myPlayerId];
  const isFirstSubmitter = state.firstAnswer?.playerId === myPlayerId;
  const firstAnswerPlayer = room.players.find(p => p.id === state.firstAnswer?.playerId);

  // 단어 동시 제출
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = answerInput.trim();
    if (!trimmed || state.phase !== 'typing') return;

    sounds.playCorrect();
    socket.emit('game:action', {
      type: 'submit_answer',
      payload: { answer: trimmed }
    });
    setAnswerInput('');
  };

  // 3초 내 인정 / 노인정 투표
  const handleVote = (vote: 'pass' | 'fail') => {
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_speech',
      payload: { vote }
    });
  };

  const passCount = Object.values(state.votes || {}).filter(v => v === 'pass').length;
  const failCount = Object.values(state.votes || {}).filter(v => v === 'fail').length;

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 & 점수 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="badge-pill" style={{ background: '#3B82F6', color: '#FFF', fontWeight: 900 }}>
              미션 {state.roundIndex + 1} / {state.totalRounds}
            </span>
            <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#A5B4FC' }}>
              ⚡ 초스피드 3초 룰
            </span>
          </div>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>⏱️ 3초 룰 뇌정지 스피드</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #F59E0B',
            padding: '6px 16px',
            borderRadius: '14px',
            color: '#FBBF24',
            fontWeight: 800,
            fontSize: '0.95rem'
          }}>
            내 점수: {state.scores?.[myPlayerId] || 0}점
          </div>
        </div>
      </div>

      {/* 직전 라운드 결과 알림 */}
      {state.lastResultNotice && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.2)',
          border: '1px solid #3B82F6',
          borderRadius: '12px',
          padding: '10px 16px',
          marginBottom: '16px',
          color: '#93C5FD',
          fontWeight: 800,
          fontSize: '0.95rem'
        }}>
          {state.lastResultNotice}
        </div>
      )}

      {/* 1. 전원 동시 스피드 타이핑 페이즈 */}
      {state.phase === 'typing' && (
        <div className="glass-panel" style={{ padding: '40px 24px', marginBottom: '20px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(18,16,38,0.95) 75%)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#3B82F6', color: '#FFF', padding: '6px 18px', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '16px' }}>
            <Zap size={16} />
            <span>전원 동시 스피드 배틀! 가장 먼저 3가지를 적으세요!</span>
          </div>

          {/* 미션 텍스트 */}
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF', margin: '20px 0', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
            "{state.currentMission}"
          </h1>

          <p style={{ color: '#94A3B8', fontSize: '1rem', marginBottom: '24px' }}>
            가장 먼저 올바른 3가지를 입력하고 엔터를 누르면 전광판에 즉시 박제됩니다!
          </p>

          {/* 전원 동시 입력 폼 */}
          <form onSubmit={handleSubmitAnswer} style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              className="input-field"
              placeholder="예: 굽네, 교촌, BBQ (3가지 단어 연속 입력)"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '16px 20px', borderRadius: '14px' }}
              autoFocus
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0 28px', background: '#3B82F6', borderColor: '#3B82F6', fontWeight: 900, fontSize: '1.05rem' }}
            >
              <Send size={18} />
              <span>제출!</span>
            </button>
          </form>
        </div>
      )}

      {/* 2. 최선착 답변에 대한 3초 카운트다운 게이지 & 인정/노인정 투표 페이즈 */}
      {state.phase === 'voting' && state.firstAnswer && (
        <div className="glass-panel" style={{ padding: '36px 24px', marginBottom: '20px', background: 'rgba(245, 158, 11, 0.12)', border: '2px solid #F59E0B' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F59E0B', color: '#000', padding: '6px 18px', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>선착순 1위 제출 성공! 3초 안에 판정하세요!</span>
          </div>

          <div style={{ fontSize: '1.1rem', color: '#CBD5E1', marginBottom: '8px' }}>
            제시어: <strong style={{ color: '#FFF' }}>"{state.currentMission}"</strong>
          </div>

          {/* 선착순 1위 제출자의 답변 강조 박스 */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(245, 158, 11, 0.5)', borderRadius: '20px', padding: '24px', margin: '20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '2rem' }}>{firstAnswerPlayer?.avatar || state.firstAnswer.playerAvatar}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FBBF24' }}>
                {firstAnswerPlayer?.name || state.firstAnswer.playerName} 님의 스피드 답변
              </span>
              {isFirstSubmitter && <span style={{ color: '#10B981', fontWeight: 800 }}>(나!)</span>}
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFF', letterSpacing: '1px' }}>
              "{state.firstAnswer.text}"
            </div>
          </div>

          {/* 3초 카운트다운 실시간 게이지 프로그레스 바 */}
          <div style={{ maxWidth: '500px', margin: '0 auto 24px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} /> 판정 남은 시간: {timeLeftSec}초
              </span>
              <span style={{ fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 700 }}>
                (5초 종료 즉시 자동 다음 턴 전환)
              </span>
            </div>
            <div style={{ height: '14px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', overflow: 'hidden', border: '1px solid #78350F' }}>
              <div style={{
                height: '100%',
                width: `${gaugePercent}%`,
                background: gaugePercent < 30 ? '#EF4444' : 'linear-gradient(90deg, #F59E0B, #EF4444)',
                transition: 'width 0.04s linear'
              }} />
            </div>
          </div>

          {/* 인정 vs 노인정 투표 버튼들 */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', maxWidth: '440px', margin: '0 auto' }}>
            <button
              className="btn"
              onClick={() => handleVote('pass')}
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '16px',
                background: myVote === 'pass' ? '#10B981' : 'rgba(16, 185, 129, 0.25)',
                border: myVote === 'pass' ? '2px solid #FFF' : '1px solid #10B981',
                color: '#FFF',
                fontWeight: 900,
                fontSize: '1.15rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transform: myVote === 'pass' ? 'scale(1.05)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              <ThumbsUp size={22} />
              <span>👍 인정 ({passCount}표)</span>
            </button>

            <button
              className="btn"
              onClick={() => handleVote('fail')}
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '16px',
                background: myVote === 'fail' ? '#EF4444' : 'rgba(239, 68, 68, 0.25)',
                border: myVote === 'fail' ? '2px solid #FFF' : '1px solid #EF4444',
                color: '#FFF',
                fontWeight: 900,
                fontSize: '1.15rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transform: myVote === 'fail' ? 'scale(1.05)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              <ThumbsDown size={22} />
              <span>👎 땡! ({failCount}표)</span>
            </button>
          </div>
        </div>
      )}

      {/* 참가자 순위 및 실시간 점수 */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '12px', textAlign: 'left' }}>
          🏆 실시간 스피드 득점 현황
        </h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {room.players.map((p) => {
            const score = state.scores?.[p.id] || 0;
            const isMe = p.id === myPlayerId;
            return (
              <div
                key={p.id}
                style={{
                  background: isMe ? 'rgba(59,130,246,0.3)' : 'var(--bg-surface-elevated)',
                  border: isMe ? '1px solid #3B82F6' : '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{p.avatar}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>{p.name}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FBBF24', marginLeft: '4px' }}>
                  {score}점
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
