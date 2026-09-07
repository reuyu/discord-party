import React, { useState } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { Dices, Crown, Check } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

const JOBS = [
  { id: 'warrior', name: '전사 (Warrior)', icon: '⚔️', skill: '방패 강타 (상대 무력화)', item: '룬 강철 대검', initStats: { str: 5, dex: 3, int: 2, cha: 2 }, desc: '강인한 체력과 근력으로 정면 돌파하는 파이터' },
  { id: 'mage', name: '마법사 (Mage)', icon: '🧙', skill: '비전 마나 폭발 (원거리 타격)', item: '고대 비전 마도서', initStats: { str: 2, dex: 2, int: 6, cha: 2 }, desc: '높은 지능으로 고대 주문과 수수께끼를 해결하는 학자' },
  { id: 'rogue', name: '도적 (Rogue)', icon: '🗡️', skill: '그림자 숨기 (은신 & 기습)', item: '치명적인 독단검', initStats: { str: 2, dex: 6, int: 2, cha: 2 }, desc: '민첩한 손재주와 자물쇠 해제, 함정 회피의 달인' },
  { id: 'cleric', name: '성직자 (Cleric)', icon: '🌿', skill: '신성한 치유 (부상 회복)', item: '빛의 수호 성물', initStats: { str: 3, dex: 2, int: 3, cha: 4 }, desc: '매력과 신앙심으로 동료들을 치료하고 설득하는 리더' }
];

const DC_DIFFICULTIES = [
  { name: '매우 쉬움', dc: 5, color: '#10B981' },
  { name: '쉬움', dc: 8, color: '#3B82F6' },
  { name: '보통', dc: 12, color: '#F59E0B' },
  { name: '어려움', dc: 15, color: '#F97316' },
  { name: '매우 어려움', dc: 18, color: '#EF4444' }
];

export const ShortTrpgView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const [selectedJobId, setSelectedJobId] = useState('warrior');
  const [charName, setCharName] = useState('');
  const [charConcept] = useState('과거의 기억을 잃은 생존자');
  const [stats, setStats] = useState({ str: 5, dex: 3, int: 2, cha: 2 });

  // GM 주사위 판정 폼
  const [selectedTargetCharId, setSelectedTargetCharId] = useState('');
  const [selectedStatType, setSelectedStatType] = useState<'str' | 'dex' | 'int' | 'cha'>('str');
  const [selectedDifficulty, setSelectedDifficulty] = useState(DC_DIFFICULTIES[2]); // 보통 (12)

  if (!state) return null;

  const isGM = state.gmId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const isVolunteered = state.gmVolunteers?.includes(myPlayerId);
  const myCharacter = state.characters?.[myPlayerId];

  // 직업 선택 시 스탯 초기화
  const handleSelectJob = (job: typeof JOBS[0]) => {
    setSelectedJobId(job.id);
    setStats({ ...job.initStats });
  };

  // 총 포인트 계산 (기본 12점)
  const totalPoints = stats.str + stats.dex + stats.int + stats.cha;
  const maxPoints = 14;
  const remainingPoints = maxPoints - totalPoints;

  const handleStatChange = (statKey: 'str' | 'dex' | 'int' | 'cha', delta: number) => {
    if (delta > 0 && remainingPoints <= 0) return;
    if (delta < 0 && stats[statKey] <= 1) return;
    setStats(prev => ({ ...prev, [statKey]: prev[statKey] + delta }));
  };

  // 1. GM 자원 토글
  const handleToggleVolunteer = () => {
    sounds.playClick();
    socket.emit('game:action', {
      type: 'volunteer_gm',
      payload: { isVolunteer: !isVolunteered }
    });
  };

  // 2. GM 확정 & 캐릭터 생성 시작
  const handleConfirmRoles = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'confirm_roles' });
  };

  // 3. 캐릭터 생성 제출
  const handleSubmitCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) return;
    const currentJob = JOBS.find(j => j.id === selectedJobId) || JOBS[0];
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_character',
      payload: {
        name: charName.trim(),
        job: currentJob.name,
        skill: currentJob.skill,
        item: currentJob.item,
        concept: charConcept,
        stats
      }
    });
  };

  // 4. GM 주사위 판정 굴리기
  const handleRollDice = () => {
    if (!isGM || !selectedTargetCharId) return;
    sounds.playDiceRoll();
    socket.emit('game:action', {
      type: 'roll_dice_check',
      payload: {
        targetPlayerId: selectedTargetCharId,
        statType: selectedStatType,
        targetDc: selectedDifficulty.dc,
        difficultyName: selectedDifficulty.name
      }
    });
  };

  const handleFinishGame = () => {
    if (!isGM) return;
    sounds.playVictory();
    socket.emit('game:action', { type: 'finish_game' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '950px', margin: '0 auto', padding: '20px' }}>
      {/* 상단 타이틀 & GM 안내 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#8B5CF6', color: '#FFF' }}>
            시나리오: {state.script?.title || '심야 고립 산장의 괴생명체'}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🎲 숏폼 스마트 TRPG</h3>
        </div>

        <div className="badge-pill" style={{ background: isGM ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'rgba(255,255,255,0.08)', color: '#FFF', padding: '8px 16px' }}>
          {isGM ? '👑 게임 마스터 (GM)' : '🛡️ 플레이어'}
        </div>
      </div>

      {/* 1. GM 자원 페이즈 */}
      {state.phase === 'roleSelection' && (
        <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>👑</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
            게임 마스터(GM)로 이야기를 이끌어가시겠습니까?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            GM은 전체 스토리와 플레이어들의 비밀 지령을 확인하고 난이도 판정을 내립니다.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '28px' }}>
            <button
              className="btn btn-primary"
              onClick={handleToggleVolunteer}
              style={{
                padding: '14px 32px',
                background: isVolunteered ? '#10B981' : '#6366F1'
              }}
            >
              <Crown size={18} />
              <span>{isVolunteered ? '✓ GM 지원 완료 (취소 가능)' : '👑 GM 지원하기'}</span>
            </button>
          </div>

          {isHost && (
            <button className="btn btn-primary" onClick={handleConfirmRoles} style={{ padding: '12px 32px', background: '#F59E0B', color: '#000', fontWeight: 800 }}>
              <span>역할 확정 & 캐릭터 생성 시작 ➔</span>
            </button>
          )}
        </div>
      )}

      {/* 2. 캐릭터 생성 페이즈 */}
      {state.phase === 'characterCreation' && (
        <div className="glass-panel" style={{ padding: '30px 24px' }}>
          {isGM ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👑</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FBBF24', marginBottom: '8px' }}>
                당신이 이번 게임의 [게임 마스터 (GM)]로 선정되었습니다!
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                플레이어들이 각자의 직업과 스탯을 설정하고 있습니다. 잠시 대기하세요...
              </p>

              {/* GM 전용 시나리오 전체 인트로 미리보기 */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #F59E0B', borderRadius: '14px', padding: '20px', textAlign: 'left', lineHeight: 1.6 }}>
                <h4 style={{ color: '#FDE68A', marginBottom: '6px', fontWeight: 800 }}>📖 GM 전용 시나리오 브리핑</h4>
                <div style={{ color: '#FFF', fontSize: '0.95rem' }}>{state.script?.intro}</div>
              </div>
            </div>
          ) : !myCharacter ? (
            <form onSubmit={handleSubmitCharacter} style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF', marginBottom: '16px', textAlign: 'center' }}>
                🛡️ 당신의 모험가 캐릭터를 생성하세요
              </h2>

              {/* 1) 직업 선택 카드 */}
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                1. 직업 선택 (고유 스킬 & 시그니처 아이템)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {JOBS.map(job => (
                  <div
                    key={job.id}
                    onClick={() => handleSelectJob(job)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: selectedJobId === job.id ? 'rgba(99, 102, 241, 0.3)' : 'var(--bg-surface-elevated)',
                      border: selectedJobId === job.id ? '2px solid #6366F1' : '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1.05rem', marginBottom: '4px' }}>
                      {job.icon} {job.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#A5B4FC', marginBottom: '2px' }}>
                      ⚡ 스킬: {job.skill}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#FDE68A' }}>
                      🎒 장비: {job.item}
                    </div>
                  </div>
                ))}
              </div>

              {/* 2) 이름 및 콘셉트 */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  2. 캐릭터 이름
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="예: 섀도우헌터 카엘, 대마법사 로엔..."
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                  required
                />
              </div>

              {/* 3) 스탯 포인트 배분 슬라이더 */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 800, color: '#FFF' }}>3. 능력치 포인트 배분</span>
                  <span className="badge-pill" style={{ background: remainingPoints === 0 ? '#10B981' : '#F59E0B', color: '#FFF' }}>
                    남은 배분 포인트: {remainingPoints}점
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { key: 'str' as const, name: '💪 근력 (STR)', desc: '물리 공격 / 격파' },
                    { key: 'dex' as const, name: '🏃 민첩 (DEX)', desc: '회피 / 잠입 / 순발력' },
                    { key: 'int' as const, name: '🧠 지능 (INT)', desc: '마법 / 고대어 / 지식' },
                    { key: 'cha' as const, name: '🗣️ 매력 (CHA)', desc: '설득 / 위협 / 지휘' }
                  ].map(st => (
                    <div key={st.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>{st.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.desc}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => handleStatChange(st.key, -1)} style={{ width: '28px', height: '28px', padding: 0 }}>-</button>
                        <span style={{ fontWeight: 900, fontSize: '1.1rem', width: '20px', textAlign: 'center', color: '#FBBF24' }}>{stats[st.key]}</span>
                        <button type="button" className="btn btn-secondary" onClick={() => handleStatChange(st.key, 1)} style={{ width: '28px', height: '28px', padding: 0 }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}>
                <Check size={18} />
                <span>캐릭터 생성 완료</span>
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px', color: '#6EE7B7' }}>
              <Check size={36} style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>캐릭터 작성이 완료되었습니다!</h3>
              <p style={{ color: '#A7F3D0', marginTop: '6px' }}>다른 플레이어들이 생성을 마칠 때까지 대기하세요...</p>
            </div>
          )}
        </div>
      )}

      {/* 3. 어드벤처 인게임 페이즈 */}
      {state.phase === 'adventure' && (
        <div style={{ display: 'grid', gridTemplateColumns: isGM ? '1.2fr 1fr' : '1fr', gap: '20px' }}>
          {/* 스토리 & 참가자 상태 보드 */}
          <div>
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px', textAlign: 'left', lineHeight: 1.7 }}>
              <div style={{ fontSize: '0.85rem', color: '#FBBF24', fontWeight: 800, marginBottom: '6px' }}>
                📖 시나리오 스토리 인트로
              </div>
              <div style={{ fontSize: '1.05rem', color: '#FFF' }}>
                {state.script?.intro}
              </div>

              {/* 내 캐릭터 카드 & 비밀 지령문 */}
              {!isGM && myCharacter && (
                <div style={{ marginTop: '20px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#FCA5A5', fontWeight: 800, marginBottom: '4px' }}>
                    🤫 나만 알고 있는 극비 지령문 (절대 타인에게 들키지 마세요)
                  </div>
                  <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>
                    "{myCharacter.secretMission}"
                  </div>
                </div>
              )}
            </div>

            {/* 참가자 캐릭터 명단 */}
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '14px' }}>
                👥 모험가 일행 현황
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {Object.entries(state.characters || {}).map(([pId, char]: [string, any]) => {
                  const player = room.players.find(p => p.id === pId);
                  return (
                    <div key={pId} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#FFF' }}>
                        <span>{player?.avatar}</span>
                        <span>{player?.name} ({char.name})</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#A5B4FC', marginTop: '4px' }}>
                        {char.job} · ⚡ {char.skill}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#FDE68A', marginTop: '2px' }}>
                        STR {char.stats?.str} | DEX {char.stats?.dex} | INT {char.stats?.int} | CHA {char.stats?.cha}
                      </div>
                      {/* GM에게는 모든 참가자의 시크릿 미션 노출 */}
                      {isGM && (
                        <div style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4px' }}>
                          비밀: {char.secretMission}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GM 전용 DC 판정 패널 or 플레이어 주사위 로그 보드 */}
          <div>
            {isGM ? (
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'left', background: 'rgba(245,158,11,0.15)', borderColor: '#F59E0B' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FBBF24', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Dices size={22} />
                  <span>GM 주사위 DC 판정 컨트롤</span>
                </h3>

                {/* 1) 판정 대상 플레이어 */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    1. 판정 대상 모험가
                  </label>
                  <select
                    className="input-field"
                    value={selectedTargetCharId}
                    onChange={(e) => setSelectedTargetCharId(e.target.value)}
                  >
                    <option value="">-- 대상 선택 --</option>
                    {Object.keys(state.characters || {}).map(pId => {
                      const p = room.players.find(pl => pl.id === pId);
                      return <option key={pId} value={pId}>{p?.name} ({state.characters[pId].name})</option>;
                    })}
                  </select>
                </div>

                {/* 2) 판정 스탯 */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    2. 요구 능력치
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {(['str', 'dex', 'int', 'cha'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        className="btn"
                        onClick={() => setSelectedStatType(st)}
                        style={{
                          padding: '8px 4px',
                          background: selectedStatType === st ? '#6366F1' : 'var(--bg-surface-elevated)',
                          fontSize: '0.85rem',
                          fontWeight: 800
                        }}
                      >
                        {st.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3) DC 목표 난이도 선택 라디오 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    3. 수행 난이도 (DC 목표치)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {DC_DIFFICULTIES.map(diff => (
                      <button
                        key={diff.name}
                        type="button"
                        className="btn"
                        onClick={() => setSelectedDifficulty(diff)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: selectedDifficulty.name === diff.name ? 'rgba(255,255,255,0.15)' : 'var(--bg-surface)',
                          border: selectedDifficulty.name === diff.name ? `2px solid ${diff.color}` : '1px solid var(--border-glass)',
                          color: '#FFF'
                        }}
                      >
                        <span style={{ fontWeight: 800 }}>{diff.name}</span>
                        <span style={{ color: diff.color, fontWeight: 900 }}>DC {diff.dc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRollDice}
                  disabled={!selectedTargetCharId}
                  style={{ width: '100%', padding: '14px', background: '#F59E0B', color: '#000', fontWeight: 900, fontSize: '1.05rem', marginBottom: '14px' }}
                >
                  <Dices size={20} />
                  <span>d20 주사위 굴려 판정하기!</span>
                </button>

                <button type="button" className="btn btn-secondary" onClick={handleFinishGame} style={{ width: '100%', padding: '10px' }}>
                  <span>엔딩 및 모험 종료</span>
                </button>
              </div>
            ) : null}

            {/* 주사위 판정 실시간 로그 */}
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'left', marginTop: isGM ? '0' : '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FBBF24', marginBottom: '12px' }}>
                📜 주사위 판정 실시간 로그
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto' }}>
                {(state.diceLogs || []).length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>아직 판정 기록이 없습니다.</div>
                ) : (
                  state.diceLogs.map((log: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: log.isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: log.isSuccess ? '1px solid #10B981' : '1px solid #EF4444',
                        fontSize: '0.88rem',
                        color: '#FFF',
                        lineHeight: 1.4
                      }}
                    >
                      {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
