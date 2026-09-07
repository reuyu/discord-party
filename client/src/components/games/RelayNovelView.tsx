// client/src/components/games/RelayNovelView.tsx
import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Send, ArrowRight, Check, Edit3, BookOpen, Sparkles } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const RelayNovelView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [sentenceInput, setSentenceInput] = useState('');

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const currentStepIdx = (state.step || 1) - 1;
  const totalSteps = state.totalSteps || room.players.length;
  const playerCount = room.players.length;

  // 현재 스텝에서 내가 작성해야 할 소설 탐색
  const myAssignedNovelOriginId = Object.keys(state.schedule || {}).find(
    originId => state.schedule[originId]?.[currentStepIdx] === myPlayerId
  );
  const myAssignedNovel = myAssignedNovelOriginId ? state.novels?.[myAssignedNovelOriginId] : null;

  // 현재 라운드 및 스텝 계산
  const currentRound = Math.floor(currentStepIdx / playerCount) + 1;
  const stepInRound = (currentStepIdx % playerCount) + 1;

  const mySubmission = state.currentSubmissions?.[myPlayerId];
  const isSubmitted = !!mySubmission;

  const handleSubmitSentence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentenceInput.trim()) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_sentence',
      payload: { sentence: sentenceInput.trim() }
    });
    setSentenceInput('');
  };

  const handleCancelSubmission = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'cancel_submission' });
  };

  const handleTimeout = () => {
    if (isHost) {
      socket.emit('game:action', { type: 'timeout_step' });
    }
  };

  // 낭독쇼에서 참가자 탭 클릭 시 (방장이면 전원 동기화)
  const handleSelectAuthor = (authorId: string) => {
    sounds.playClick();
    if (isHost) {
      socket.emit('game:action', {
        type: 'select_showcase_author',
        payload: { authorId }
      });
    } else {
      // 일반 참가자도 로컬에서 탭 클릭 시 자유 탐색 가능
      socket.emit('game:action', {
        type: 'select_showcase_author',
        payload: { authorId }
      });
    }
  };

  const handleNextShowcase = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'next_showcase' });
  };

  const handleFinishGame = () => {
    if (!isHost) return;
    sounds.playVictory();
    socket.emit('game:action', { type: 'finish_game' });
  };

  // 낭독쇼에서 현재 선택된 소설
  const activeShowcaseAuthorId = state.currentShowcaseAuthorId || room.players[0]?.id;
  const currentShowcaseNovel = state.novels?.[activeShowcaseAuthorId];

  return (
    <div className="game-container" style={{ maxWidth: '880px', margin: '0 auto', padding: '20px 16px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge-pill" style={{ background: '#14B8A6', color: '#FFF' }}>
              {state.phase === 'writing'
                ? `제 ${currentRound}라운드 · ${stepInRound}/${playerCount}번째 릴레이`
                : '📖 막장 릴레이 완성작 낭독쇼'}
            </span>
            <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#A5B4FC' }}>
              총 {totalSteps}단계 완주 도전
            </span>
          </div>
          <h3 style={{ marginTop: '6px', fontSize: '1.25rem', fontWeight: 800, textAlign: 'left' }}>
            ✍️ 릴레이 막장 소설
          </h3>
        </div>

        {state.phase === 'writing' && (
          <CountdownTimer
            startedAt={state.startedAt}
            durationSec={state.timerSec || 40}
            onTimeout={handleTimeout}
          />
        )}
      </div>

      {/* 1. 문장 작성 페이즈: 시작부터 지금까지 누적된 전체 이야기 표시 */}
      {state.phase === 'writing' && myAssignedNovel && (
        <div className="glass-panel" style={{ padding: '30px 24px', textAlign: 'left' }}>
          {/* 소설 원작자 및 정보 헤더 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>{myAssignedNovel.originAuthorAvatar}</span>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#14B8A6', fontWeight: 800 }}>
                  {myAssignedNovel.originAuthorName} 님이 처음 시작한 소설
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: '2px 0 0 0' }}>
                  "{myAssignedNovel.title}"
                </h4>
              </div>
            </div>

            <span className="badge-pill" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#2DD4BF', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
              누적 구절: {myAssignedNovel.sentences.length}개 작성됨
            </span>
          </div>

          {/* 시작부터 지금까지 누적된 전체 이야기 스크롤 뷰 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="#14B8A6" />
              <span>{myAssignedNovel.sentences.length === 0 ? '✨ 소설의 첫 문장을 작성하세요' : '📖 시작부터 지금까지 누적된 전체 이야기 (읽고 이어쓰기)'}</span>
            </div>

            {myAssignedNovel.sentences.length === 0 ? (
              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px dashed rgba(20, 184, 166, 0.4)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
                💡 당신이 이 소설의 <strong>최초 시작자</strong>입니다!<br />
                흥미진진하고 기상천외한 첫 도입부 문장을 자유롭게 열어주세요!
              </div>
            ) : (
              <div style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                padding: '20px',
                borderRadius: '16px',
                maxHeight: '260px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.4)'
              }}>
                {myAssignedNovel.sentences.map((st: any, idx: number) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #14B8A6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#14B8A6', fontWeight: 800, marginBottom: '4px' }}>
                      <span>#{idx + 1}구절</span>
                      <span>·</span>
                      <span>{st.authorAvatar} {st.authorName} 작가</span>
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#F1F5F9', lineHeight: 1.5 }}>
                      "{st.text}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 내가 이어쓸 문장 입력 폼 */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmitSentence}>
              <div style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#FBBF24', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={16} />
                  <span>위 이야기의 흐름을 이어받아 다음 문장을 작성하세요:</span>
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
                  {sentenceInput.length}자 입력 중
                </span>
              </div>
              <textarea
                className="input-field"
                placeholder="다음으로 펼쳐질 기상천외하고 흥미진진한 문장을 작성하세요... (소설 분량 자유)"
                value={sentenceInput}
                onChange={(e) => setSentenceInput(e.target.value)}
                style={{ width: '100%', height: '115px', padding: '16px', resize: 'vertical', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '14px', borderRadius: '14px' }}
                autoFocus
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  현재 제출 완료: <strong style={{ color: '#14B8A6' }}>{Object.keys(state.currentSubmissions || {}).length} / {room.players.length}명</strong>
                </span>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px', background: '#14B8A6', borderColor: '#14B8A6', fontWeight: 800 }}>
                  <Send size={18} />
                  <span>문장 작성 완료</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="badge-pill" style={{ background: '#10B981', color: '#FFF' }}>
                  <Check size={14} /> 내가 작성한 문장 (제출 완료)
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelSubmission}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  <Edit3 size={14} />
                  <span>다시 수정하기</span>
                </button>
              </div>

              <div style={{ fontSize: '1.1rem', color: '#FFF', lineHeight: 1.6, background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                "{mySubmission}"
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#6EE7B7', textAlign: 'right' }}>
                모든 참가자가 제출하거나 제한시간이 끝나면 다음 소설로 자동 전환됩니다! ({Object.keys(state.currentSubmissions || {}).length} / {room.players.length}명 완료)
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. 최종 낭독쇼 페이즈: 참가자별 소설 탭 & 누가 작성했는지 명확한 표출 */}
      {state.phase === 'reading_showcase' && currentShowcaseNovel && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge-pill" style={{ background: '#14B8A6', color: '#FFF', marginBottom: '10px' }}>
              📖 대환장 막장 소설 전편 낭독쇼
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>
              우리들이 완성한 {Object.keys(state.novels).length}편의 걸작 소설집
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#A5B4FC' }}>
              {isHost
                ? '👑 방장 권한: 아래 참가자 버튼을 클릭하여 함께 감상할 소설을 전환하세요!'
                : '아래 참가자 버튼을 클릭하여 각자가 시작한 완성 소설을 읽어보세요!'}
            </p>
          </div>

          {/* 탭 바: 참가자별 시작 소설 선택 버튼들 */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
            {room.players.map(p => {
              const isSelected = p.id === activeShowcaseAuthorId;

              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectAuthor(p.id)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '14px',
                    background: isSelected ? 'linear-gradient(135deg, #14B8A6, #0D9488)' : 'rgba(255,255,255,0.06)',
                    border: isSelected ? '2px solid #2DD4BF' : '1px solid var(--border-glass)',
                    color: '#FFF',
                    fontWeight: isSelected ? 900 : 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 4px 20px rgba(20, 184, 166, 0.4)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{p.avatar}</span>
                  <span>{p.name}의 소설</span>
                  {isSelected && <span style={{ fontSize: '0.75rem', background: '#FFF', color: '#0D9488', padding: '2px 6px', borderRadius: '10px', fontWeight: 900 }}>감상 중</span>}
                </button>
              );
            })}
          </div>

          {/* 현재 선택된 완성 소설 본문 뷰 */}
          <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(20, 184, 166, 0.3)', borderRadius: '20px', padding: '28px 24px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
              <span style={{ fontSize: '2rem' }}>{currentShowcaseNovel.originAuthorAvatar}</span>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FBBF24', margin: 0 }}>
                  "{currentShowcaseNovel.title}"
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#A5B4FC' }}>
                  시작자: <strong>{currentShowcaseNovel.originAuthorName}</strong> · 총 {currentShowcaseNovel.sentences.length}개의 구절로 완성됨
                </span>
              </div>
            </div>

            {/* 누적 구절 리스트 (각 문장의 작성자 아바타/닉네임 명확 표출) */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '6px' }}>
              {currentShowcaseNovel.sentences.map((st: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    padding: '14px 18px',
                    borderLeft: '4px solid #14B8A6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#2DD4BF', fontWeight: 800 }}>
                      <span className="badge-pill" style={{ background: 'rgba(20, 184, 166, 0.2)', padding: '2px 8px', fontSize: '0.75rem' }}>
                        #{idx + 1}구절
                      </span>
                      <span>{st.authorAvatar} {st.authorName} 작가</span>
                      {st.authorId === myPlayerId && <span style={{ color: '#FBBF24', fontSize: '0.75rem' }}>(내가 씀!)</span>}
                    </div>
                  </div>

                  <div style={{ fontSize: '1.1rem', color: '#F8FAFC', lineHeight: 1.6 }}>
                    "{st.text}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 하단 네비게이션 컨트롤 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <button
              className="btn btn-secondary"
              onClick={handleNextShowcase}
              style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>다음 참가자 소설 보기 ➔</span>
            </button>

            {isHost ? (
              <button
                className="btn btn-primary"
                onClick={handleFinishGame}
                style={{
                  padding: '14px 32px',
                  background: '#14B8A6',
                  borderColor: '#14B8A6',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  boxShadow: '0 4px 20px rgba(20, 184, 166, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🏆 최종 결과 & 명예의 전당 (게임 종료)</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                👑 방장이 최종 결과 화면으로 전환할 수 있습니다.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
