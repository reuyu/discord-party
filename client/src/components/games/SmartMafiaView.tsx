import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Sun, Moon, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const SmartMafiaView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const myRole = state.roles?.[myPlayerId] || 'citizen';
  const isAlive = state.alivePlayers?.includes(myPlayerId);
  const isNight = state.phase === 'night';
  const isDayAnnounce = state.phase === 'day_announce';
  const isDayDebate = state.phase === 'day_debate';
  const isVoteTrial = state.phase === 'vote_trial';
  const isExecutionVote = state.phase === 'execution_vote';
  const isDayResult = state.phase === 'day_result';

  // 1. 밤 행동
  const handleNightAction = (targetPlayerId: string) => {
    if (!isAlive || !isNight) return;
    setSelectedTarget(targetPlayerId);
    sounds.playClick();

    if (myRole === 'mafia') {
      socket.emit('game:action', { type: 'mafia_kill', payload: { targetId: targetPlayerId } });
    } else if (myRole === 'doctor') {
      socket.emit('game:action', { type: 'doctor_heal', payload: { targetId: targetPlayerId } });
    } else if (myRole === 'police') {
      socket.emit('game:action', { type: 'police_inspect', payload: { targetId: targetPlayerId } });
    }
  };

  // 2. 밤 30초 만료 시 자동 낮 전환
  const handleNightTimeout = () => {
    if (isHost && isNight) {
      sounds.playClick();
      socket.emit('game:action', { type: 'finish_night' });
    }
  };

  // 3. 1차 재판 지목 투표
  const handleTrialVote = (targetPlayerId: string) => {
    if (!isAlive || !isVoteTrial) return;
    setSelectedTarget(targetPlayerId);
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_trial_vote',
      payload: { targetId: targetPlayerId }
    });
  };

  // 4. 단두대 찬반 투표
  const handleExecutionVote = (vote: 'execute' | 'spare') => {
    if (!isAlive || !isExecutionVote) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_execution_vote',
      payload: { vote }
    });
  };

  const policeReport = state.nightActions?.policeResults?.[myPlayerId];
  const trialTargetPlayer = room.players.find(p => p.id === state.trialTarget);
  const victimPlayer = room.players.find(p => p.id === state.lastNightVictim);
  const executedPlayer = room.players.find(p => p.id === state.lastExecuted);

  return (
    <div className="game-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 낮/밤 상태 바 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isNight ? 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))' : 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(29,26,56,0.95))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isNight ? <Moon size={28} color="#A5B4FC" /> : <Sun size={28} color="#FBBF24" />}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFF' }}>
              {state.dayNumber}일차 {isNight ? '🌙 밤 (비밀 직업 활동)' : '☀️ 낮 (토론 & 재판)'}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              생존자: {state.alivePlayers?.length} / {room.players.length}명
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* 내 역할 배지 */}
          <div className="badge-pill" style={{ background: myRole === 'mafia' ? '#EF4444' : myRole === 'doctor' ? '#10B981' : myRole === 'police' ? '#3B82F6' : '#8B5CF6', color: '#FFF', padding: '8px 16px', fontSize: '0.95rem' }}>
            {myRole === 'mafia' && '🔪 마피아'}
            {myRole === 'doctor' && '💉 의사'}
            {myRole === 'police' && '🔍 경찰'}
            {myRole === 'citizen' && '🧑‍🌾 시민'}
            {!isAlive && ' (사망 💀)'}
          </div>

          {isNight && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 30}
              onTimeout={handleNightTimeout}
            />
          )}
        </div>
      </div>

      {/* 경찰 조사 결과 팝업 */}
      {myRole === 'police' && policeReport && (
        <div style={{ background: 'rgba(59, 130, 246, 0.25)', border: '1px solid #3B82F6', padding: '14px 20px', borderRadius: '12px', marginBottom: '16px', color: '#93C5FD', fontWeight: 800 }}>
          🔍 경찰 긴급 조사 결과: [{policeReport.targetName}] 님은 {policeReport.isMafia ? '🚨 [마피아]' : '🛡️ [선량한 시민]'} 입니다!
        </div>
      )}

      {/* 1. 밤 페이즈 */}
      {isNight && (
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '16px' }}>
            {myRole === 'mafia' && '🔪 오늘 밤 제거할 시민을 선택하세요.'}
            {myRole === 'doctor' && '💉 오늘 밤 보호할 대상을 선택하세요.'}
            {myRole === 'police' && '🔍 마피아 여부를 조사할 대상을 선택하세요.'}
            {myRole === 'citizen' && '🌙 조용히 밤이 지나가기를 기다리세요... (30초 후 자동으로 낮이 밝아옵니다)'}
          </h3>

          {/* 타겟 선택 그리드 (마피아/의사/경찰만) */}
          {(myRole === 'mafia' || myRole === 'doctor' || myRole === 'police') && isAlive && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {room.players.map((p) => {
                const targetAlive = state.alivePlayers?.includes(p.id);
                const isSelected = selectedTarget === p.id;
                const isMe = p.id === myPlayerId;
                if (!targetAlive) return null;

                return (
                  <button
                    key={p.id}
                    className="btn"
                    onClick={() => handleNightAction(p.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px 10px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(239, 68, 68, 0.3)' : 'var(--bg-surface-elevated)',
                      border: isSelected ? '2px solid #EF4444' : '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{p.avatar}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>
                      {p.name} {isMe && '(나)'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. 낮 브리핑 페이즈 */}
      {isDayAnnounce && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '14px', color: '#FBBF24' }}>
            ☀️ 날이 밝았습니다! 지난 밤의 사건 보고
          </h2>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: victimPlayer ? '#EF4444' : '#10B981', margin: '20px 0' }}>
            {victimPlayer
              ? `💀 지난 밤 [${victimPlayer.name}] 님이 마피아의 습격으로 사망했습니다!`
              : '🕊️ 의사의 헌신적인 치료로 지난 밤 아무도 사망하지 않았습니다!'}
          </div>

          {isHost && (
            <button className="btn btn-primary" onClick={() => socket.emit('game:action', { type: 'start_day_debate' })} style={{ padding: '12px 32px' }}>
              <span>마피아 색출 토론 시작 ➔</span>
            </button>
          )}
        </div>
      )}

      {/* 3. 낮 토론 & 재판 투표 페이즈 */}
      {isDayDebate && (
        <div className="glass-panel" style={{ padding: '30px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '8px' }}>
            🗣️ 마피아 용의자를 지목하고 토론하세요!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            의심스러운 참가자의 행적을 추궁하고 재판에 넘길 대상을 결정하세요.
          </p>

          {isHost && (
            <button className="btn btn-primary" onClick={() => socket.emit('game:action', { type: 'start_vote_trial' })} style={{ background: '#EF4444', borderColor: '#EF4444', padding: '12px 32px' }}>
              <span>⚖️ 단두대 용의자 지목 투표 시작</span>
            </button>
          )}
        </div>
      )}

      {/* 4. 1차 재판 지목 투표 */}
      {isVoteTrial && (
        <div className="glass-panel" style={{ padding: '30px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F87171', marginBottom: '16px' }}>
            ⚖️ 단두대에 올릴 최다 의심 용의자를 지목하세요!
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
            {room.players.map((p) => {
              const targetAlive = state.alivePlayers?.includes(p.id);
              const isSelected = selectedTarget === p.id;
              const isMe = p.id === myPlayerId;
              if (!targetAlive) return null;

              return (
                <button
                  key={p.id}
                  className="btn"
                  onClick={() => handleTrialVote(p.id)}
                  disabled={!isAlive}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 10px',
                    borderRadius: '14px',
                    background: isSelected ? 'rgba(239, 68, 68, 0.3)' : 'var(--bg-surface-elevated)',
                    border: isSelected ? '2px solid #EF4444' : '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{p.avatar}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>
                    {p.name} {isMe && '(나)'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. 단두대 찬반 투표 */}
      {isExecutionVote && trialTargetPlayer && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EF4444', marginBottom: '8px' }}>
            ⚔️ [{trialTargetPlayer.name}] 님의 최후 변론 및 단두대 처형 찬반 투표
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            과반수 이상 찬성 시 즉시 처형됩니다.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button className="btn btn-primary" onClick={() => handleExecutionVote('execute')} disabled={!isAlive} style={{ padding: '16px 40px', background: '#EF4444', borderColor: '#EF4444', fontSize: '1.1rem' }}>
              <ThumbsUp size={20} />
              <span>처형 찬성 (Execute)</span>
            </button>
            <button className="btn btn-secondary" onClick={() => handleExecutionVote('spare')} disabled={!isAlive} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              <ThumbsDown size={20} />
              <span>처형 반대 (Spare)</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. 재판 결과 & 다음 밤 */}
      {isDayResult && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '14px', color: '#FFF' }}>
            {executedPlayer
              ? `⚖️ [${executedPlayer.name}] 님이 단두대에서 처형되었습니다!`
              : '🕊️ 과반수 미달로 처형이 부결되었습니다!'}
          </h2>

          {isHost && (
            <button className="btn btn-primary" onClick={() => socket.emit('game:action', { type: 'start_next_night' })} style={{ padding: '12px 32px', background: '#3B82F6' }}>
              <span>다음 밤으로 이동 ➔</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
