// client/src/components/games/ChosungQuizView.tsx
import React, { useState, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Award, AlertCircle, Send, CheckCircle2, Ban } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const ChosungQuizView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  const [presentCategory, setPresentCategory] = useState('');
  const [presentAnswer, setPresentAnswer] = useState('');
  const [chatGuess, setChatGuess] = useState('');
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const isPresenter = state?.presenterId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const hasAnswered = state?.correctPlayers?.includes(myPlayerId);
  const hasVotedPass = state?.passVotes?.includes(myPlayerId);

  // 초성만 입력했는지 검사하는 헬퍼 함수
  const isOnlyChosung = (text: string) => {
    return /^[\u3131-\u314E\u314F-\u3163\s]+$/.test(text);
  };

  // 라운드 종료(roundEnd) 시 방장이 3.5초 뒤 자동으로 다음 라운드 격발
  useEffect(() => {
    if (state?.phase === 'roundEnd' && isHost) {
      const timer = setTimeout(() => {
        socket.emit('game:action', { type: 'next_round' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state?.phase, isHost]);

  if (!state) return null;

  // 1. 출제자 문제 등록
  const handlePresenterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presentCategory.trim() || !presentAnswer.trim()) return;

    if (isOnlyChosung(presentAnswer.trim())) {
      sounds.playWrong();
      setWarningMsg('⚠️ 정답 단어에는 초성이 아닌 완성된 전체 단어(예: 치킨, 야스오)를 입력해주세요!');
      setTimeout(() => setWarningMsg(null), 3000);
      return;
    }

    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_quiz',
      payload: { category: presentCategory, answer: presentAnswer }
    });
    setPresentCategory('');
    setPresentAnswer('');
  };

  // 2. 풀이자 정답 채팅 제출
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = chatGuess.trim();
    if (!input) return;

    // 초성만 적었을 경우 경고!
    if (isOnlyChosung(input)) {
      sounds.playWrong();
      setWarningMsg('⚠️ 초성이 아닌 완성된 전체 단어를 입력해주세요!');
      setTimeout(() => setWarningMsg(null), 2500);
      return;
    }

    if (input.toLowerCase() === state.answer.toLowerCase()) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }

    socket.emit('game:action', {
      type: 'submit_answer',
      payload: { answer: input }
    });
    setChatGuess('');
  };

  // 3. PASS 투표
  const handleVotePass = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'vote_pass' });
  };

  // 4. 타이머 만료 시 자동 라운드 종료
  const handleTimeout = () => {
    if (isHost && state.phase === 'guessing') {
      socket.emit('game:action', { type: 'timeout_round' });
    }
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 라운드 & 출제자 정보 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: 'var(--primary)', color: '#FFF' }}>
            {t('inGameRound', { current: state.currentRound, total: state.totalRounds })}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.15rem', fontWeight: 800 }}>⏱️ {t('chosungQuiz') || 'Chosung Quiz'}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FBBF24', fontWeight: 700 }}>
            <Award size={18} />
            <span>{t('inGameScore', { score: state.scores?.[myPlayerId] || 0 })}</span>
          </div>

          {state.phase === 'guessing' && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 30}
              onTimeout={handleTimeout}
            />
          )}
        </div>
      </div>

      {/* 경고 알림 팝업 */}
      {warningMsg && (
        <div style={{ background: 'rgba(239, 68, 68, 0.9)', color: '#FFF', padding: '12px 20px', borderRadius: '12px', marginBottom: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', animation: 'slideUp 0.2s ease' }}>
          <AlertCircle size={20} />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* 1. 출제자 문제 입력 페이즈 */}
      {state.phase === 'presenting' && (
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
          {isPresenter ? (
            <form onSubmit={handlePresenterSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✍️</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>당신이 이번 턴의 출제자입니다!</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                카테고리와 정답 단어를 입력하세요. 참가자들의 50%가 맞힐 때 최고 점수를 얻습니다.
              </p>

              <input
                type="text"
                className="input-field"
                placeholder="카테고리 (예: 한국 영화, 음식, 롤 챔피언)"
                value={presentCategory}
                onChange={(e) => setPresentCategory(e.target.value)}
                required
              />

              <input
                type="text"
                className="input-field"
                placeholder="정답 단어 (초성이 아닌 '전체 단어'를 입력하세요)"
                value={presentAnswer}
                onChange={(e) => setPresentAnswer(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1.05rem', fontWeight: 800 }}>
                <span>🎯 초성 퀴즈 출제하기</span>
              </button>
            </form>
          ) : (
            <div style={{ padding: '40px 20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⏳</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {room.players.find(p => p.id === state.presenterId)?.name} 님이 문제를 출제하고 있습니다...
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                잠시만 기다려주세요! 출제가 완료되면 초성이 공개됩니다.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. 초성 풀이 페이즈 */}
      {state.phase === 'guessing' && (
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px', textAlign: 'center' }}>
          <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#A5B4FC', fontSize: '0.9rem', padding: '6px 16px' }}>
            카테고리: {state.category}
          </span>

          <div style={{ fontSize: '3.8rem', fontWeight: 900, letterSpacing: '14px', margin: '24px 0', color: '#6EE7B7', textShadow: '0 0 20px rgba(110, 231, 183, 0.5)' }}>
            {state.chosung}
          </div>

          {/* 풀이자 정답 입력 폼 */}
          {!isPresenter ? (
            <div style={{ maxWidth: '540px', margin: '0 auto' }}>
              {hasAnswered ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '14px', borderRadius: '10px', color: '#6EE7B7', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} />
                  <span>🎉 정답을 맞혔습니다! 선착순 점수를 획득했습니다.</span>
                </div>
              ) : hasVotedPass ? (
                <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', padding: '14px', borderRadius: '10px', color: '#FCA5A5', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Ban size={20} />
                  <span>🚨 PASS 투표 완료 (정답 미달성자 전원 PASS 시 스킵)</span>
                </div>
              ) : (
                <form onSubmit={handleGuessSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="완성된 전체 정답 단어를 입력하세요..."
                    value={chatGuess}
                    onChange={(e) => setChatGuess(e.target.value)}
                    autoFocus
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
                    <Send size={18} />
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleVotePass} title="난해한 문제일 때 PASS 투표">
                    <Ban size={16} color="#EF4444" />
                    <span>PASS ({state.passVotes?.length || 0})</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              출제자님은 정답(<strong>{state.answer}</strong>)을 지켜보고 있습니다. (정답자: {state.correctPlayers?.length || 0}명)
            </div>
          )}
        </div>
      )}

      {/* 3. 라운드 종료 결과 (자동 진행 안내) */}
      {state.phase === 'roundEnd' && (
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'var(--primary)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
            🎉 정답 공개: <span style={{ color: '#6EE7B7' }}>{state.answer}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px' }}>
            정답 맞힌 인원: {state.correctPlayers?.length || 0}명 / 3초 후 자동으로 다음으로 진행됩니다...
          </p>
        </div>
      )}

      {/* 실시간 점수 순위표 */}
      <div className="glass-panel" style={{ padding: '18px 24px', marginTop: '20px' }}>
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
