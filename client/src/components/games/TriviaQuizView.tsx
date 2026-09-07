// client/src/components/games/TriviaQuizView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { CheckCircle2, XCircle, Award, BookOpen, ArrowRight, Lock, Users } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const TriviaQuizView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // 문제 인덱스가 바뀔 때 선택값 초기화
  useEffect(() => {
    setSelectedChoice(null);
  }, [state?.questionIndex]);

  // answer_reveal 페이즈 진입 시 효과음 1회 재생
  useEffect(() => {
    if (state?.phase === 'answer_reveal') {
      const myAns = state.answers?.[myPlayerId];
      if (myAns && myAns.isCorrect) {
        sounds.playCorrect();
      } else {
        sounds.playWrong();
      }
    }
  }, [state?.phase, myPlayerId]);

  if (!state) return null;

  const currentQ = state.currentQuestion;
  const myAnswer = state.answers?.[myPlayerId];
  const isHost = room.hostId === myPlayerId;
  const isRevealed = state.phase === 'answer_reveal';
  const submittedCount = (state.submittedPlayerIds || []).length;

  // 5초 동안 보기를 클릭 (선택 즉시 정답 공개 X, 선택 상태만 유지)
  const handleSelectChoice = (index: number) => {
    if (state.phase !== 'question') return;
    setSelectedChoice(index);
    sounds.playClick();

    socket.emit('game:action', {
      type: 'submit_choice',
      payload: { choice: index }
    });
  };

  const handleTimeout = () => {
    if (isHost && state.phase === 'question') {
      socket.emit('game:action', { type: 'timeout_question' });
    }
  };

  const handleNextQuestion = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_question' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 진행 바 및 점수 현황 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: 'var(--primary)', color: '#FFF' }}>
            문제 {state.questionIndex + 1} / {state.totalQuestions}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.15rem', fontWeight: 800 }}>🎓 서바이벌 상식 퀴즈 쇼</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FBBF24', fontWeight: 700 }}>
            <Award size={18} />
            <span>내 점수: {state.scores?.[myPlayerId] || 0}점</span>
          </div>

          {state.phase === 'question' && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 5}
              onTimeout={handleTimeout}
            />
          )}
        </div>
      </div>

      {/* 문제 카드 및 선택 안내 */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99, 102, 241, 0.15)', color: '#A5B4FC', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>
          {state.phase === 'question' ? (
            <>
              <Users size={16} />
              <span>⏱️ 5초 제한시간! 모두가 선택하면 정답과 각자의 선택이 공개됩니다 ({submittedCount} / {room.players.length}명 선택 완료)</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} color="#10B981" />
              <span>결과 공개: 각자 선택한 보기와 정답을 확인하세요!</span>
            </>
          )}
        </div>

        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.5 }}>
          {currentQ?.question}
        </h2>

        {/* 4지선다 보기 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {currentQ?.options?.map((option: string, idx: number) => {
            const isMySelected = selectedChoice === idx || myAnswer?.choice === idx;
            const isCorrect = idx === currentQ.answerIndex;

            // 해당 보기를 선택한 모든 플레이어 목록
            const playersWhoPickedThis = isRevealed
              ? room.players.filter(p => state.answers?.[p.id]?.choice === idx)
              : [];

            let bgColor = 'var(--bg-surface-elevated)';
            let borderColor = 'var(--border-glass)';
            let textColor = 'var(--text-primary)';

            if (isRevealed) {
              if (isCorrect) {
                bgColor = 'rgba(16, 185, 129, 0.25)';
                borderColor = '#10B981';
                textColor = '#6EE7B7';
              } else if (isMySelected && !isCorrect) {
                bgColor = 'rgba(239, 68, 68, 0.25)';
                borderColor = '#EF4444';
                textColor = '#FCA5A5';
              }
            } else if (isMySelected) {
              bgColor = 'rgba(139, 92, 246, 0.35)';
              borderColor = 'var(--primary)';
            }

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: bgColor,
                    borderColor: borderColor,
                    color: textColor,
                    padding: '16px 20px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    cursor: state.phase === 'question' ? 'pointer' : 'default',
                    boxShadow: isMySelected ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none'
                  }}
                  disabled={state.phase !== 'question'}
                  onClick={() => handleSelectChoice(idx)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong>{idx + 1}.</strong> {option}
                  </span>

                  {/* question 페이즈에서 내가 선택했을 때는 자물쇠 표시 */}
                  {!isRevealed && isMySelected && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#C4B5FD' }}>
                      <Lock size={14} /> 선택완료
                    </span>
                  )}

                  {/* reveal 페이즈에서 정답/오답 결과 아이콘 */}
                  {isRevealed && isCorrect && <CheckCircle2 size={22} color="#10B981" />}
                  {isRevealed && isMySelected && !isCorrect && <XCircle size={22} color="#EF4444" />}
                </button>

                {/* reveal 페이즈: 이 보기를 선택한 플레이어들의 아바타 뱃지 공개! */}
                {isRevealed && playersWhoPickedThis.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '0 4px', justifyContent: 'flex-start' }}>
                    {playersWhoPickedThis.map(p => (
                      <span
                        key={p.id}
                        className="badge-pill"
                        style={{
                          background: isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          border: isCorrect ? '1px solid #10B981' : '1px solid #EF4444',
                          color: '#FFF',
                          fontSize: '0.78rem',
                          padding: '3px 8px'
                        }}
                      >
                        {p.avatar} {p.name} {p.id === myPlayerId && '(나)'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 미선택자(시간 초과 오답자) 표시 */}
        {isRevealed && (() => {
          const timedOutPlayers = room.players.filter(p => !state.answers?.[p.id] || state.answers?.[p.id]?.choice === -1);
          if (timedOutPlayers.length === 0) return null;
          return (
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>⚠️ 시간 초과 미제출 (오답 처리):</span>
              {timedOutPlayers.map(p => (
                <span key={p.id} className="badge-pill" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', fontSize: '0.75rem' }}>
                  {p.avatar} {p.name}
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* 정답 공개 및 상식 해설 */}
      {isRevealed && (
        <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#6EE7B7' }}>
            <BookOpen size={18} />
            <h4 style={{ fontWeight: 800, fontSize: '1.05rem' }}>정답 & 상식 해설</h4>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {currentQ?.explanation || `정답은 '${currentQ?.options?.[currentQ?.answerIndex]}'입니다.`}
          </p>

          {isHost && (
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                <span>다음 문제로 이동</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 실시간 랭킹 리더보드 */}
      <div className="glass-panel" style={{ padding: '18px 24px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#A5B4FC' }}>
          🏆 실시간 점수 순위
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {room.players
            .sort((a, b) => (state.scores?.[b.id] || 0) - (state.scores?.[a.id] || 0))
            .map((p, rank) => (
              <div key={p.id} className="badge-pill" style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glass)', padding: '6px 12px', fontSize: '0.85rem' }}>
                <span>{rank + 1}위</span> {p.avatar} <strong>{p.name}</strong>: {state.scores?.[p.id] || 0}점
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
