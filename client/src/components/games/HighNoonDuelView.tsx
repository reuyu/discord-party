import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { ShieldAlert, Flame, Trophy } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

interface FloatingMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface BulletTracer {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  isKilled: boolean;
}

export const HighNoonDuelView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const arenaRef = useRef<HTMLDivElement | null>(null);

  // 실시간 시간 상태 (마우스 움직임과 무관하게 애니메이션 루프 동작)
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());
  const lastTickedStepRef = useRef<number>(0);
  const clockBellPlayedRef = useRef<boolean>(false);
  const lastStartedAtRef = useRef<number>(0);

  // 로컬 마우스 및 조준 상태 (60fps 즉시 반응)
  const [localAimAngle, setLocalAimAngle] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);
  const [targetedOpponentId, setTargetedOpponentId] = useState<string | null>(null);

  // 원격 플레이어들의 실시간 조준 각도
  const [remoteAims, setRemoteAims] = useState<Record<string, { angle: number; targetPlayerId?: string }>>({});

  // 총격 및 연출 이펙트
  const [flashEffect, setFlashEffect] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [bulletTracers, setBulletTracers] = useState<BulletTracer[]>([]);
  const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>([]);
  const [muzzleFlashShooterId, setMuzzleFlashShooterId] = useState<string | null>(null);

  const lastAimEmitTimeRef = useRef<number>(0);
  const targetedOpponentIdRef = useRef<string | null>(null);
  targetedOpponentIdRef.current = targetedOpponentId;

  // 컴팩트 아레나 좌표 (480px x 480px, 중심 240, 240, 반지름 175px)
  const arenaRadius = 175;
  const centerPos = { x: 240, y: 240 };
  const playerCount = room.players.length;

  const playerPositions = room.players.map((p, idx) => {
    // 12시 방향부터 시계방향 균등 배치
    const angleRad = (idx / playerCount) * 2 * Math.PI - Math.PI / 2;
    const x = centerPos.x + arenaRadius * Math.cos(angleRad);
    const y = centerPos.y + arenaRadius * Math.sin(angleRad);
    return { id: p.id, x, y, angleRad, name: p.name, avatar: p.avatar };
  });

  const myPos = playerPositions.find(p => p.id === myPlayerId) || {
    x: centerPos.x,
    y: centerPos.y + arenaRadius,
    id: myPlayerId,
    name: '나',
    avatar: '🤠'
  };

  // 플로팅 메시지 생성 유틸
  const addFloatingMessage = useCallback((text: string, x: number, y: number, color = '#F59E0B') => {
    const id = Date.now() + Math.random();
    setFloatingMessages(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingMessages(prev => prev.filter(m => m.id !== id));
    }, 1500);
  }, []);

  // 60fps requestAnimationFrame: 마우스 미조작 시에도 시간과 초침이 실시간으로 흐름
  useEffect(() => {
    if (!state || (state.phase !== 'standoff' && state.phase !== 'shootout')) return;

    let animId: number;
    const update = () => {
      setCurrentTime(Date.now());
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [state?.phase]);

  // 12:00 정각 판정 및 실시간 타이밍 계산
  const now = currentTime;
  const startedAt = state?.startedAt || 0;
  const totalDuration = state?.delaySec || 10;
  const durationMs = totalDuration * 1000;
  const targetTime = state?.targetTime || (startedAt > 0 ? startedAt + durationMs : now + durationMs);
  const isHighNoon = now >= targetTime;

  // 라운드 변경 또는 재시작 시 틱 사운드 상태 리셋
  if (startedAt > 0 && startedAt !== lastStartedAtRef.current) {
    lastStartedAtRef.current = startedAt;
    lastTickedStepRef.current = 0;
    clockBellPlayedRef.current = false;
  }

  // 정확한 경과 시간(ms) 및 정수 초 단위 스텝 (0: 시작 위치 300도, 1: 1초 경과 306도, ..., 10: 12시 정각 360도)
  const startTime = targetTime - durationMs;
  const elapsedMs = Math.max(0, now - startTime);
  const currentStep = Math.min(totalDuration, Math.floor(elapsedMs / 1000));

  // 초침 틱-탁 끊김 회전 각도: 1초마다 정확히 6도씩 스텝 이동 (300도 -> 360도 정각)
  const steppedSecondHandAngle = 300 + currentStep * 6;

  // 1초마다 초침이 움직일 때 정확히 1회 틱/탁 사운드 재생 (1초~9초)
  useEffect(() => {
    if (state?.phase !== 'standoff') return;
    if (currentStep > 0 && currentStep < totalDuration && currentStep > lastTickedStepRef.current) {
      lastTickedStepRef.current = currentStep;
      // 홀수 초는 '틱' (1350Hz), 짝수 초는 '탁' (980Hz)으로 번갈아 재생
      const isTock = currentStep % 2 === 0;
      sounds.playTick(isTock);
    }
  }, [state?.phase, currentStep, totalDuration]);

  // 12:00 정각(10초 도달) 시 웅장한 "댕~" 종소리 1회 재생
  useEffect(() => {
    if (state?.phase !== 'standoff') {
      clockBellPlayedRef.current = false;
      return;
    }

    if (isHighNoon && !clockBellPlayedRef.current) {
      clockBellPlayedRef.current = true;
      lastTickedStepRef.current = totalDuration;
      sounds.playClockBell();
      addFloatingMessage('🔥 12:00 정각! 지금 쏴라! 🔥', centerPos.x, centerPos.y - 30, '#EF4444');
    }
  }, [state?.phase, isHighNoon, totalDuration, addFloatingMessage, centerPos.x, centerPos.y]);

  // 소켓 이벤트: player_aimed 및 shot_fired 수신
  useEffect(() => {
    const handleActionEvent = (data: any) => {
      if (!data) return;

      // 1) 다른 플레이어의 조준 동기화
      if (data.type === 'player_aimed') {
        const { playerId, angle, targetPlayerId } = data.payload || {};
        if (playerId) {
          setRemoteAims(prev => ({
            ...prev,
            [playerId]: { angle, targetPlayerId }
          }));
        }
        return;
      }

      // 2) 발사 이벤트 처리
      if (data.type === 'shot_fired') {
        const { shooterId, shooterName, targetId, victimName, angle, isEarly, killed } = data.payload || {};

        // 화면 플래시 & 쉐이크
        setFlashEffect(true);
        setScreenShake(true);
        setTimeout(() => setFlashEffect(false), 120);
        setTimeout(() => setScreenShake(false), 240);

        // 머즐 플래시
        if (shooterId) {
          setMuzzleFlashShooterId(shooterId);
          setTimeout(() => setMuzzleFlashShooterId(null), 180);
        }

        const shooter = playerPositions.find(p => p.id === shooterId);
        const victim = playerPositions.find(p => p.id === targetId);
        const sX = shooter?.x ?? centerPos.x;
        const sY = shooter?.y ?? centerPos.y;

        // 부정출발 오발 폭사
        if (isEarly) {
          sounds.playMiss();
          addFloatingMessage(`💀 ${shooterName || '총잡이'} 부정출발 폭사!`, sX, sY - 15, '#EF4444');
          return;
        }

        // 정상 발사: 트레이서 궤적 계산 및 총성
        let endX = sX;
        let endY = sY;

        sounds.playGunshot();

        if (killed && victim) {
          endX = victim.x;
          endY = victim.y;
          sounds.playCorrect();

          if (shooterId === myPlayerId) {
            sounds.playReload();
            addFloatingMessage(`🎯 ${victimName || '상대'} 사살! 재장전 완료!`, victim.x, victim.y - 15, '#10B981');
          } else {
            addFloatingMessage(`💥 ${shooterName} ➔ ${victimName} 사살!`, victim.x, victim.y - 15, '#EF4444');
          }
        } else {
          // 빗나감
          const shotAngleRad = ((angle ?? 0) * Math.PI) / 180;
          endX = sX + Math.cos(shotAngleRad) * 400;
          endY = sY + Math.sin(shotAngleRad) * 400;
          sounds.playMiss();
          addFloatingMessage(`${shooterName || '총잡이'} 빗나감! 💨`, sX, sY - 15, '#F59E0B');
        }

        // 총알 궤적 추가
        const tracerId = Date.now() + Math.random();
        setBulletTracers(prev => [...prev, {
          id: tracerId,
          startX: sX,
          startY: sY,
          endX,
          endY,
          color: killed ? '#EF4444' : '#FBBF24',
          isKilled: !!killed
        }]);

        setTimeout(() => {
          setBulletTracers(prev => prev.filter(t => t.id !== tracerId));
        }, 220);
      }
    };

    (socket as any).on('game:action_event', handleActionEvent);
    return () => {
      (socket as any).off('game:action_event', handleActionEvent);
    };
  }, [myPlayerId, playerPositions, addFloatingMessage, centerPos.x, centerPos.y]);

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const isAlive = state.alivePlayers?.includes(myPlayerId);
  const myAmmo = state.ammo?.[myPlayerId] || 0;
  const myKills = state.kills?.[myPlayerId] || 0;

  // 마우스 이동 시 실시간 레이캐스트 및 조준 계산
  const updateAim = (clientX: number, clientY: number) => {
    if (!isAlive || (state.phase !== 'standoff' && state.phase !== 'shootout')) return;
    const arena = arenaRef.current;
    if (!arena) return;

    const rect = arena.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    setMousePos({ x: mouseX, y: mouseY });

    // 내 위치 기준으로 마우스 각도 산출
    const dx = mouseX - myPos.x;
    const dy = mouseY - myPos.y;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    setLocalAimAngle(angleDeg);

    // --- 기하학적 레이캐스트 & 근접 판정 (타겟 지정) ---
    let bestTargetId: string | null = null;
    let minDistance = 999999;

    const aliveOpponents = playerPositions.filter(p => p.id !== myPlayerId && state.alivePlayers?.includes(p.id));

    for (const opp of aliveOpponents) {
      const oppDx = opp.x - myPos.x;
      const oppDy = opp.y - myPos.y;
      const oppDist = Math.hypot(oppDx, oppDy);
      const oppAngleRad = Math.atan2(oppDy, oppDx);

      // 레이저 전방 각도 오차
      const diffRad = Math.atan2(Math.sin(angleRad - oppAngleRad), Math.cos(angleRad - oppAngleRad));
      const isFacing = Math.cos(diffRad) > 0;

      // 조준선으로부터 상대 중심점까지의 수직 거리
      const perpDist = Math.abs(oppDist * Math.sin(diffRad));
      const mouseToOppDist = Math.hypot(mouseX - opp.x, mouseY - opp.y);

      // 조준선 관통(40px 이내) 또는 마우스 근접(55px 이내)
      if (isFacing && (perpDist < 40 || mouseToOppDist < 55)) {
        const score = perpDist + mouseToOppDist * 0.5;
        if (score < minDistance) {
          minDistance = score;
          bestTargetId = opp.id;
        }
      }
    }

    setTargetedOpponentId(bestTargetId);

    // 소켓 스로틀 전송 (35ms 마다 실시간 전송)
    const currentTimeMs = Date.now();
    if (currentTimeMs - lastAimEmitTimeRef.current > 35) {
      lastAimEmitTimeRef.current = currentTimeMs;
      socket.emit('game:action', {
        type: 'aim',
        payload: { angle: angleDeg, targetPlayerId: bestTargetId || undefined }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseInside(true);
    updateAim(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseInside(true);
    updateAim(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };

  // 발사 시도 (Hitscan)
  const handleFire = () => {
    if (!isAlive || myAmmo <= 0) return;
    if (state.phase !== 'standoff' && state.phase !== 'shootout') return;

    if (now < targetTime) {
      sounds.playMiss();
    } else {
      sounds.playGunshot();
    }

    socket.emit('game:action', {
      type: 'shoot',
      payload: {
        angle: localAimAngle,
        targetPlayerId: targetedOpponentId || undefined
      }
    });
  };

  // 스페이스바 퀵드로우 조작 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFire();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleNextRound = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_round' });
  };

  const handleSuddenDeath = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'sudden_death_retry' });
  };

  // 나를 조준하고 있는 플레이어 목록
  const aimingAtMePlayers = room.players.filter(p => {
    if (p.id === myPlayerId) return false;
    if (!state.alivePlayers?.includes(p.id)) return false;
    return remoteAims[p.id]?.targetPlayerId === myPlayerId || state.aims?.[p.id]?.targetPlayerId === myPlayerId;
  });


  return (
    <div
      style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        boxSizing: 'border-box',
        transform: screenShake ? 'translate(3px, -3px)' : 'none',
        transition: screenShake ? 'none' : 'transform 0.1s ease-out',
        userSelect: 'none'
      }}
    >
      {/* 화면 전체 플래시 효과 (총격 시) */}
      {flashEffect && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255, 240, 180, 0.45)', pointerEvents: 'none', zIndex: 999 }} />
      )}

      {/* 스타일 키프레임 */}
      <style>{`
        @keyframes tracerFade {
          0% { opacity: 1; stroke-width: 4px; }
          100% { opacity: 0; stroke-width: 1px; }
        }
        @keyframes floatUpFade {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -40px); opacity: 0; }
        }
      `}</style>

      {/* 중앙 정렬 래퍼 */}
      <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 컴팩트 헤더: 단판 승부 안내 & 내 탄약 현황 & 조작 안내 */}
        <div className="glass-panel" style={{
          width: '100%',
          padding: '10px 16px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-pill" style={{ background: '#D97706', color: '#FFF', fontWeight: 900, fontSize: '0.8rem', padding: '4px 10px' }}>
              🤠 단판 승부
            </span>
            <span className="badge-pill" style={{ background: '#EF4444', color: '#FFF', fontSize: '0.8rem', padding: '4px 10px' }}>
              생존: {state.alivePlayers?.length}명
            </span>
          </div>

          {/* 조작법 안내 */}
          <div style={{ fontSize: '0.82rem', color: '#CBD5E1', fontWeight: 600 }}>
            {isAlive ? (
              isHighNoon ? (
                <span style={{ color: '#EF4444', fontWeight: 800 }}>🔥 12:00 정각! 클릭 또는 Space바 발사!</span>
              ) : (
                <span>마우스 조준 ➔ 12:00 정각 발사</span>
              )
            ) : (
              <span style={{ color: '#94A3B8' }}>탈락 (관전 중)</span>
            )}
          </div>

          {/* 내 탄약 및 킬 수 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: isAlive ? (myAmmo > 0 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(239, 68, 68, 0.25)') : 'rgba(0,0,0,0.5)',
              border: isAlive ? (myAmmo > 0 ? '1.5px solid #F59E0B' : '1.5px solid #EF4444') : '1px solid #475569',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: myAmmo > 0 ? '#FBBF24' : '#F87171'
            }}>
              {isAlive ? (myAmmo > 0 ? '🔫 1발' : '💨 0발') : '💀'}
            </span>

            <span className="badge-pill" style={{ background: '#6366F1', color: '#FFF', fontWeight: 800, fontSize: '0.8rem', padding: '3px 8px' }}>
              {myKills}킬
            </span>
          </div>
        </div>

        {/* 나를 조준하고 있는 플레이어 경고 배너 */}
        {isAlive && aimingAtMePlayers.length > 0 && (
          <div style={{
            width: '100%',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            padding: '5px 12px',
            marginBottom: '8px',
            color: '#FCA5A5',
            fontWeight: 800,
            fontSize: '0.82rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            boxSizing: 'border-box',
            animation: 'pulse 1s infinite'
          }}>
            <ShieldAlert size={16} color="#EF4444" />
            <span>⚠️ {aimingAtMePlayers.map(p => p.name).join(', ')} 님이 당신을 겨누고 있습니다!</span>
          </div>
        )}

        {/* 원형 스탠드오프 아레나 (480px x 480px) */}
        <div
          ref={arenaRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleFire}
          style={{
            width: '480px',
            height: '480px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #292524 0%, #1C1917 70%, #0C0A09 100%)',
            border: isHighNoon ? '3px solid #EF4444' : '3px solid #78350F',
            boxShadow: isHighNoon ? '0 0 35px rgba(239, 68, 68, 0.4)' : '0 0 25px rgba(180, 83, 9, 0.25)',
            cursor: 'none',
            overflow: 'hidden',
            userSelect: 'none',
            transition: 'border 0.3s, box-shadow 0.3s'
          }}
        >
          {/* 아레나 바닥 장식 텍스처 */}
          <div style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px dashed rgba(217, 119, 6, 0.2)',
            pointerEvents: 'none'
          }} />

          {/* 탄환 트레이서 궤적 (SVG 렌더링) */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            {bulletTracers.map(tracer => (
              <g key={tracer.id}>
                <line
                  x1={tracer.startX}
                  y1={tracer.startY}
                  x2={tracer.endX}
                  y2={tracer.endY}
                  stroke={tracer.color}
                  strokeWidth={tracer.isKilled ? 4 : 3}
                  strokeLinecap="round"
                  style={{ animation: 'tracerFade 0.22s forwards ease-out' }}
                />
                <circle
                  cx={tracer.endX}
                  cy={tracer.endY}
                  r={tracer.isKilled ? 10 : 6}
                  fill={tracer.color}
                  opacity={0.9}
                />
              </g>
            ))}
          </svg>

          {/* 플로팅 텍스트 메시지 (킬/오발/알림) */}
          {floatingMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                position: 'absolute',
                left: `${msg.x}px`,
                top: `${msg.y}px`,
                transform: 'translate(-50%, 0)',
                color: msg.color,
                fontSize: '0.9rem',
                fontWeight: 900,
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                background: 'rgba(15, 23, 42, 0.88)',
                padding: '3px 10px',
                borderRadius: '16px',
                border: `1px solid ${msg.color}`,
                pointerEvents: 'none',
                zIndex: 50,
                whiteSpace: 'nowrap',
                animation: 'floatUpFade 1.5s forwards ease-out'
              }}
            >
              {msg.text}
            </div>
          ))}

          {/* 중앙 아날로그 시계탑 (텍스트 문구 없는 순수 고대비 아이보리 다이얼) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '144px',
            height: '144px',
            boxSizing: 'border-box',
            borderRadius: '50%',
            background: '#FFFDF7', // 순수 밝은 크림 아이보리 다이얼
            border: isHighNoon ? '5px solid #DC2626' : '5px solid #572005',
            boxShadow: isHighNoon ? '0 0 30px rgba(220, 38, 38, 0.75)' : '0 0 20px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            transition: 'border 0.2s, box-shadow 0.2s',
            pointerEvents: 'none'
          }}>
            {/* 시계 로마자 숫자 (선명한 다크 슬레이트) */}
            <div style={{ position: 'absolute', top: '7px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.85rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.5px' }}>XII</div>
            <div style={{ position: 'absolute', bottom: '7px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>VI</div>
            <div style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>IX</div>
            <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>III</div>

            {/* 시계 눈금 마크 (12, 1, 2, 4, 5, 7, 8, 10, 11) */}
            <div style={{ position: 'absolute', top: '24px', right: '28px', width: '3px', height: '3px', borderRadius: '50%', background: '#94A3B8' }} />
            <div style={{ position: 'absolute', top: '24px', left: '28px', width: '3px', height: '3px', borderRadius: '50%', background: '#94A3B8' }} />
            <div style={{ position: 'absolute', bottom: '24px', right: '28px', width: '3px', height: '3px', borderRadius: '50%', background: '#94A3B8' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '28px', width: '3px', height: '3px', borderRadius: '50%', background: '#94A3B8' }} />

            {/* 시침 (12시 정각을 가리키는 중후한 바늘) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '32px',
              marginLeft: '-2px',
              marginTop: '-28px',
              transformOrigin: '2px 28px',
              transform: 'rotate(0deg)',
              background: '#1E293B',
              borderRadius: '2px 2px 0 0',
              zIndex: 11
            }} />

            {/* 분침 (12시 정각을 가리키는 날렵한 바늘) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2.5px',
              height: '46px',
              marginLeft: '-1.25px',
              marginTop: '-42px',
              transformOrigin: '1.25px 42px',
              transform: 'rotate(0deg)',
              background: '#334155',
              borderRadius: '2px 2px 0 0',
              zIndex: 12
            }} />

            {/* 중앙 초침 (피벗이 정확히 50%, 50% 중심에 100% 정밀 앵커) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '3px',
              height: '62px',
              marginLeft: '-1.5px',
              marginTop: '-50px',
              transformOrigin: '1.5px 50px',
              transform: `rotate(${steppedSecondHandAngle}deg)`,
              background: '#DC2626',
              borderRadius: '2px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
              transition: 'transform 0.08s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
              zIndex: 13
            }} />

            {/* 중앙 피벗 핀 (초침 뿌리를 완벽히 감싸는 14px 캡) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#0F172A',
              border: '2px solid #FFFDF7',
              boxShadow: '0 2px 5px rgba(0,0,0,0.6)',
              zIndex: 15
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#F59E0B'
              }} />
            </div>

            {/* 12:00 정각 알림 (평소에는 x초 텍스트 없이 시계판만 깔끔하게 보임) */}
            {isHighNoon && (
              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#DC2626',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
                animation: 'pulse 0.6s infinite',
                zIndex: 16
              }}>
                🔥 12:00 정각!
              </div>
            )}
          </div>

          {/* 조준 레이저 라인 렌더링 (모든 생존 플레이어) */}
          {room.players.map(p => {
            const playerAlive = state.alivePlayers?.includes(p.id);
            if (!playerAlive) return null;
            const pos = playerPositions.find(pos => pos.id === p.id);
            if (!pos) return null;

            const isMe = p.id === myPlayerId;
            const aimAngle = isMe
              ? localAimAngle
              : (remoteAims[p.id]?.angle ?? state.aims?.[p.id]?.angle ?? 0);

            const isAimingAtMe = !isMe && (remoteAims[p.id]?.targetPlayerId === myPlayerId || state.aims?.[p.id]?.targetPlayerId === myPlayerId);
            const isMeTargeting = isMe && targetedOpponentId !== null;

            return (
              <div
                key={`laser-${p.id}`}
                style={{
                  position: 'absolute',
                  top: `${pos.y}px`,
                  left: `${pos.x}px`,
                  width: isMe ? '360px' : '280px',
                  height: isMe ? (isMeTargeting ? '2.5px' : '1.8px') : (isAimingAtMe ? '2.5px' : '1.2px'),
                  background: isMe
                    ? (isMeTargeting
                        ? 'linear-gradient(to right, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.15))'
                        : 'linear-gradient(to right, rgba(16, 185, 129, 0.85), rgba(16, 185, 129, 0.1))')
                    : (isAimingAtMe
                        ? 'linear-gradient(to right, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.15))'
                        : 'linear-gradient(to right, rgba(245, 158, 11, 0.5), rgba(245, 158, 11, 0.05))'),
                  transformOrigin: '0% 50%',
                  transform: `rotate(${aimAngle}deg)`,
                  pointerEvents: 'none',
                  zIndex: isMe ? 8 : (isAimingAtMe ? 7 : 5)
                }}
              />
            );
          })}

          {/* 원형 배치된 총잡이 플레이어들 */}
          {room.players.map(p => {
            const pos = playerPositions.find(pos => pos.id === p.id);
            if (!pos) return null;
            const playerAlive = state.alivePlayers?.includes(p.id);
            const isMe = p.id === myPlayerId;
            const ammo = state.ammo?.[p.id] || 0;
            const isTargetedByMe = targetedOpponentId === p.id;
            const isAimingAtMe = !isMe && playerAlive && (remoteAims[p.id]?.targetPlayerId === myPlayerId || state.aims?.[p.id]?.targetPlayerId === myPlayerId);

            const aimAngle = isMe
              ? localAimAngle
              : (remoteAims[p.id]?.angle ?? state.aims?.[p.id]?.angle ?? 0);

            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: `${pos.y}px`,
                  left: `${pos.x}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isMe ? 25 : 20,
                  pointerEvents: 'none'
                }}
              >
                {/* 총구 (리볼버 배럴 스프라이트) - 조준 각도에 맞춰 회전 */}
                {playerAlive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '30px',
                      height: '7px',
                      background: isMe ? '#10B981' : '#78350F',
                      borderRadius: '2px',
                      border: '1px solid #1C1917',
                      transformOrigin: '0% 50%',
                      transform: `rotate(${aimAngle}deg) translateY(-50%)`,
                      zIndex: 15,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.6)'
                    }}
                  >
                    {/* 머즐 플래시 효과 */}
                    {muzzleFlashShooterId === p.id && (
                      <div style={{
                        position: 'absolute',
                        right: '-12px',
                        top: '-5px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #FFF 0%, #FBBF24 50%, #EF4444 100%)',
                        boxShadow: '0 0 12px #EF4444',
                        zIndex: 30
                      }} />
                    )}
                  </div>
                )}

                {/* 상대가 나를 조준하고 있을 때 경고 원 */}
                {isAimingAtMe && (
                  <div style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '50%',
                    border: '2px solid #EF4444',
                    boxShadow: '0 0 12px rgba(239, 68, 68, 0.8)',
                    animation: 'pulse 0.8s infinite',
                    zIndex: 21
                  }} />
                )}

                {/* 플레이어 아바타 원형 박스 */}
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: playerAlive
                    ? (isMe
                        ? 'radial-gradient(circle, #10B981 0%, #064E3B 100%)'
                        : isTargetedByMe
                          ? 'radial-gradient(circle, #7F1D1D 0%, #450A0A 100%)'
                          : 'radial-gradient(circle, #451A03 0%, #1C1917 100%)')
                    : 'rgba(0,0,0,0.65)',
                  border: playerAlive
                    ? (isMe
                        ? '2.5px solid #34D399'
                        : isTargetedByMe
                          ? '2.5px solid #EF4444'
                          : isAimingAtMe
                            ? '2.5px solid #F87171'
                            : '2px solid #D97706')
                    : '2px dashed #475569',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: playerAlive ? '0 4px 12px rgba(0,0,0,0.7)' : 'none',
                  opacity: playerAlive ? 1 : 0.35,
                  transition: 'all 0.15s'
                }}>
                  <div style={{ fontSize: '1.9rem' }}>
                    {playerAlive ? p.avatar : '💀'}
                  </div>
                </div>

                {/* 이름 및 상태 태그 */}
                <div style={{ marginTop: '3px', whiteSpace: 'nowrap' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: playerAlive ? '#FFF' : '#94A3B8',
                    background: 'rgba(0,0,0,0.75)',
                    padding: '2px 6px',
                    borderRadius: '8px'
                  }}>
                    {p.name} {isMe && '(나)'}
                  </span>
                </div>

                {/* 총알 보유 표시 */}
                {playerAlive && (
                  <div style={{ marginTop: '1px' }}>
                    <span className="badge-pill" style={{
                      background: ammo > 0 ? '#F59E0B' : '#EF4444',
                      color: '#000',
                      fontSize: '0.6rem',
                      fontWeight: 900,
                      padding: '1px 5px'
                    }}>
                      {ammo > 0 ? '1발 탄약' : '탄약 없음'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* 커스텀 마우스 레티클 (깔끔한 원형 크로스헤어) */}
          {isMouseInside && mousePos && isAlive && myAmmo > 0 && (
            <div
              style={{
                position: 'absolute',
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 60
              }}
            >
              <div style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: targetedOpponentId ? '2px solid #EF4444' : '1.5px solid rgba(245, 158, 11, 0.8)',
                  boxShadow: targetedOpponentId ? '0 0 10px #EF4444' : '0 0 6px rgba(245, 158, 11, 0.4)'
                }} />
                <div style={{ position: 'absolute', width: '1.5px', height: '100%', background: targetedOpponentId ? '#EF4444' : '#F59E0B' }} />
                <div style={{ position: 'absolute', height: '1.5px', width: '100%', background: targetedOpponentId ? '#EF4444' : '#F59E0B' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: targetedOpponentId ? '#EF4444' : '#FBBF24' }} />
              </div>
            </div>
          )}

          {/* 라운드 종료 / 단판 최종 결과 오버레이 (정중앙 노출) */}
          {state.phase === 'roundEnd' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(12, 10, 9, 0.88)',
                backdropFilter: 'blur(6px)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                zIndex: 100,
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '2.4rem', marginBottom: '6px' }}>
                {state.alivePlayers?.length === 1 ? '🏆' : '💀'}
              </div>

              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 900,
                color: '#FBBF24',
                marginBottom: '14px',
                maxWidth: '360px',
                lineHeight: 1.4
              }}>
                {state.roundResultNotice || '결투가 종료되었습니다!'}
              </h3>

              {isHost ? (
                state.alivePlayers?.length === 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleNextRound}
                    style={{
                      padding: '12px 32px',
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #D97706, #B45309)',
                      boxShadow: '0 4px 20px rgba(217, 119, 6, 0.6)',
                      cursor: 'pointer'
                    }}
                  >
                    <Trophy size={18} style={{ marginRight: '6px' }} />
                    <span>최종 결과 확인 ➔</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleSuddenDeath}
                    style={{
                      padding: '12px 32px',
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                      boxShadow: '0 4px 20px rgba(239, 68, 68, 0.6)',
                      cursor: 'pointer'
                    }}
                  >
                    <Flame size={18} style={{ marginRight: '6px' }} />
                    <span>🔥 서든데스 결투 재경기 시작!</span>
                  </button>
                )
              ) : (
                <span style={{ fontSize: '0.95rem', color: '#A5B4FC', fontWeight: 700 }}>
                  방장이 결투 결과를 확인 중입니다...
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
