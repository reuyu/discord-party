// client/src/components/games/FakeArtistView.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { CountdownTimer } from '../common/CountdownTimer';
import { Send, Droplet, Clock } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

const PLAYER_COLORS = [
  '#EC4899', '#3B82F6', '#10B981', '#F59E0B', 
  '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#EAB308', '#A855F7'
];

const MAX_INK = 450; // 1획당 최대 잉크 픽셀 길이

export const FakeArtistView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 드로잉 상태
  const [isDrawing, setIsDrawing] = useState(false);
  const [inkLeft, setInkLeft] = useState<number>(MAX_INK);
  const currentStrokePoints = useRef<[number, number][]>([]);
  const lastPoint = useRef<[number, number] | null>(null);

  // 가짜 화가 추리
  const [fakeGuess, setFakeGuess] = useState('');

  const isFake = state?.fakeArtistId === myPlayerId;
  const isMyTurn = state?.currentDrawerId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const currentDrawer = room.players.find(p => p.id === state?.currentDrawerId);
  const myVote = state?.votes?.[myPlayerId];

  // 내 전용 드로잉 색상 (플레이어 인덱스 기반)
  const myPlayerIndex = room.players.findIndex(p => p.id === myPlayerId);
  const myColor = PLAYER_COLORS[myPlayerIndex % PLAYER_COLORS.length] || '#EC4899';

  // 캔버스 전체 다시 그리기 (서버에 누적된 strokes 실시간 동기화)
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화 (배경색)
    ctx.fillStyle = '#1E1B4B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 서버에 저장된 모든 스트로크 순차 렌더링
    const strokes = state?.strokes || [];
    strokes.forEach((stroke: any) => {
      const points = stroke.points || [];
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = stroke.color || '#EC4899';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.stroke();
    });

    // 현재 내가 그리고 있는 미완성 스트로크
    if (currentStrokePoints.current.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = myColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(currentStrokePoints.current[0][0], currentStrokePoints.current[0][1]);
      for (let i = 1; i < currentStrokePoints.current.length; i++) {
        ctx.lineTo(currentStrokePoints.current[i][0], currentStrokePoints.current[i][1]);
      }
      ctx.stroke();
    }
  }, [state?.strokes, myColor]);

  // 스트로크 변경 또는 턴 변경 시 캔버스 동기화 & 잉크 초기화
  useEffect(() => {
    redrawCanvas();
    if (isMyTurn) {
      setInkLeft(MAX_INK);
      currentStrokePoints.current = [];
      lastPoint.current = null;
    }
  }, [state?.strokes, state?.currentDrawerId, isMyTurn, redrawCanvas]);

  if (!state) return null;

  // 1획 그리기 종료 & 서버 전송
  const finishCurrentStroke = () => {
    if (!isMyTurn || currentStrokePoints.current.length === 0) {
      setIsDrawing(false);
      return;
    }

    const strokeData = {
      playerId: myPlayerId,
      color: myColor,
      points: [...currentStrokePoints.current]
    };

    sounds.playClick();
    socket.emit('game:action', {
      type: 'finish_stroke',
      payload: { stroke: strokeData }
    });

    setIsDrawing(false);
    currentStrokePoints.current = [];
    lastPoint.current = null;
    setInkLeft(MAX_INK);
  };

  // 마우스 다운
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMyTurn || state.phase !== 'drawing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    currentStrokePoints.current = [[x, y]];
    lastPoint.current = [x, y];
  };

  // 마우스 이동 (잉크 소모 계산)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isMyTurn || state.phase !== 'drawing') return;
    const canvas = canvasRef.current;
    if (!canvas || !lastPoint.current) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const [prevX, prevY] = lastPoint.current;
    const distance = Math.hypot(x - prevX, y - prevY);

    if (distance < 2) return; // 미세한 떨림 방지

    // 잉크 잔여량 체크
    if (inkLeft - distance <= 0) {
      // 잉크 고갈! 획 강제 종료
      setInkLeft(0);
      currentStrokePoints.current.push([x, y]);
      finishCurrentStroke();
      return;
    }

    setInkLeft(prev => Math.max(0, prev - distance));
    currentStrokePoints.current.push([x, y]);
    lastPoint.current = [x, y];

    // 즉시 로컬 렌더링
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = myColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  // 마우스 업 (1획 완료)
  const handleMouseUp = () => {
    if (isDrawing && isMyTurn) {
      finishCurrentStroke();
    }
  };

  // 10초 턴 타임아웃
  const handleTurnTimeout = () => {
    if (isMyTurn) {
      finishCurrentStroke();
    } else if (isHost) {
      socket.emit('game:action', { type: 'timeout_turn' });
    }
  };

  // 가짜 화가 지목 투표
  const handleVote = (targetPlayerId: string) => {
    if (state.phase !== 'voting' || myVote) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'submit_vote',
      payload: { targetPlayerId }
    });
  };

  // 가짜 화가의 마지막 정답 추리
  const handleFakeGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fakeGuess.trim()) return;
    sounds.playClick();
    socket.emit('game:action', {
      type: 'fake_guess',
      payload: { guess: fakeGuess.trim() }
    });
  };

  const inkPercentage = Math.round((inkLeft / MAX_INK) * 100);

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 및 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
            <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF' }}>
              카테고리: {state.category}
            </span>
            <span className="badge-pill" style={{ background: '#3B82F6', color: '#FFF', fontWeight: 800 }}>
              📌 {state.currentRound || 1} / {state.maxRounds || 2} 라운드
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF' }}>🎨 가짜 화가 찾기</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="badge-pill" style={{ background: isFake ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', border: isFake ? '1px solid #EF4444' : '1px solid #10B981', color: '#FFF', fontWeight: 800 }}>
            {isFake ? '🎭 당신은 가짜 화가입니다 (제시어 모름)' : `🔑 제시어: ${state.targetWord || state.secretWord}`}
          </div>

          {state.phase === 'drawing' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#FBBF24" />
              <CountdownTimer
                startedAt={state.turnStartedAt || Date.now()}
                durationSec={state.turnDurationSec || 10}
                onTimeout={handleTurnTimeout}
              />
            </div>
          )}
        </div>
      </div>

      {/* 1. 한 획 릴레이 드로잉 페이즈 */}
      {state.phase === 'drawing' && (
        <div>
          {/* 차례 안내 및 잉크 게이지 */}
          <div style={{
            background: isMyTurn ? 'rgba(236,72,153,0.25)' : 'var(--bg-surface)',
            border: isMyTurn ? '1px solid #EC4899' : '1px solid var(--border-glass)',
            padding: '14px 20px',
            borderRadius: '14px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1rem' }}>
              {isMyTurn ? (
                <span style={{ color: '#F472B6' }}>🖌️ [당신 차례] 캔버스에 마우스를 누른 채 [한 획]을 그리고 떼세요! (제한 10초)</span>
              ) : (
                <span>⏳ <strong style={{ color: '#60A5FA' }}>[{currentDrawer?.name}]</strong> 님이 한 획을 그리고 있습니다...</span>
              )}
            </div>

            {/* 잉크 게이지 */}
            {isMyTurn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplet size={18} color={inkPercentage < 20 ? '#EF4444' : '#60A5FA'} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: inkPercentage < 20 ? '#EF4444' : '#E2E8F0' }}>
                  잉크 {inkPercentage}%
                </span>
                <div style={{ width: '100px', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', overflow: 'hidden', border: '1px solid #475569' }}>
                  <div style={{
                    width: `${inkPercentage}%`,
                    height: '100%',
                    background: inkPercentage < 20 ? '#EF4444' : '#3B82F6',
                    transition: 'width 0.1s linear'
                  }} />
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={380}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                background: '#1E1B4B',
                borderRadius: '12px',
                cursor: isMyTurn ? 'crosshair' : 'default',
                width: '100%',
                maxWidth: '600px',
                height: '380px',
                touchAction: 'none',
                boxShadow: isMyTurn ? `0 0 16px ${myColor}55` : 'none'
              }}
            />
          </div>

          {/* 하단 참가자 드로잉 순서 및 라운드 현황 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {room.players.map((p, idx) => {
              const isCurrent = p.id === state.currentDrawerId;
              const color = PLAYER_COLORS[idx % PLAYER_COLORS.length];
              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: isCurrent ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.06)',
                    border: isCurrent ? `2px solid ${color}` : '1px solid transparent',
                    transform: isCurrent ? 'scale(1.06)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: '1.2rem' }}>{p.avatar}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. 가짜 화가 지목 투표 페이즈 */}
      {state.phase === 'voting' && (
        <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#FBBF24' }}>
            🗳️ 가짜 화가로 의심되는 사람을 지목하세요!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            제시어를 몰라 엉뚱한 선을 그렸거나 눈치를 보던 가짜 화가를 찾아내세요.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
            {room.players.map(p => (
              <button
                key={p.id}
                className="btn"
                onClick={() => handleVote(p.id)}
                disabled={!!myVote}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 10px',
                  borderRadius: '16px',
                  background: myVote === p.id ? 'rgba(236, 72, 153, 0.4)' : 'var(--bg-surface-elevated)',
                  border: myVote === p.id ? '2px solid #EC4899' : '1px solid var(--border-glass)',
                  cursor: myVote ? 'default' : 'pointer'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{p.avatar}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>{p.name}</div>
                {myVote === p.id && (
                  <span className="badge-pill" style={{ marginTop: '8px', background: '#EC4899', color: '#FFF', fontSize: '0.75rem' }}>
                    지목 완료
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. 가짜 화가의 정답 역전 시도 (fake_guess 또는 fakeGuess 모두 완벽 대응) */}
      {(state.phase === 'fake_guess' || state.phase === 'fakeGuess') && (
        <div className="glass-panel" style={{ padding: '36px 20px', background: 'rgba(239,68,68,0.2)', borderColor: '#EF4444' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F87171', marginBottom: '12px' }}>
            🚨 가짜 화가가 발각되었습니다!
          </h2>
          <p style={{ color: '#E2E8F0', fontSize: '1.05rem', marginBottom: '24px' }}>
            가짜 화가가 그림을 보고 비밀 제시어가 무엇이었는지 맞히면 <strong>대역전승</strong>을 거둡니다!
          </p>

          {isFake ? (
            <form onSubmit={handleFakeGuess} style={{ maxWidth: '460px', margin: '0 auto', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="추리한 그림의 정답 제시어 입력..."
                value={fakeGuess}
                onChange={(e) => setFakeGuess(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', background: '#EF4444', borderColor: '#EF4444' }}>
                <Send size={18} />
                <span>정답 제출!</span>
              </button>
            </form>
          ) : (
            <div style={{ color: '#FDE68A', fontSize: '1.1rem', fontWeight: 800 }}>
              ⏳ 가짜 화가가 정답 단어를 추리 중입니다...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
