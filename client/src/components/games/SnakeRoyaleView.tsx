// client/src/components/games/SnakeRoyaleView.tsx
import React, { useEffect, useRef } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const SnakeRoyaleView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 키보드 방향키 이벤트 리스너
    const handleKeyDown = (e: KeyboardEvent) => {
      let dir = '';
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dir = 'UP';
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dir = 'DOWN';
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dir = 'LEFT';
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dir = 'RIGHT';

      if (dir) {
        e.preventDefault();
        socket.emit('game:action', { type: 'change_dir', payload: { dir } });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 방장이면 주기적으로 game_tick 요청 (playing 페이즈일 때만 150ms)
    let interval: any = null;
    if (room.hostId === myPlayerId) {
      interval = setInterval(() => {
        if (state?.phase === 'playing') {
          socket.emit('game:action', { type: 'game_tick' });
        }
      }, 150);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [room.hostId, myPlayerId, state?.phase]);

  // Canvas 렌더링 루프
  useEffect(() => {
    if (!canvasRef.current || !state) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = state.gridSize || 26;
    const cellSize = canvas.width / gridSize;
    const isCountdown = state.phase === 'countdown';

    // 배경 지우기 (우주/사이버 네온 다크)
    ctx.fillStyle = '#070913';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그리드 선 그리기
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // 사과 렌더링 (글로우 효과가 있는 빨간 사과)
    (state.apples || []).forEach((apple: any) => {
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(
        apple.x * cellSize + cellSize / 2,
        apple.y * cellSize + cellSize / 2,
        cellSize / 2.6,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0; // 초기화
    });

    // 지렁이 렌더링
    const snakes = Object.values(state.snakes || {}) as any[];

    snakes.forEach(snake => {
      if (!snake.alive) return;
      const isMe = snake.id === myPlayerId;

      snake.body.forEach((part: any, idx: number) => {
        if (idx === 0) {
          // 머리
          ctx.fillStyle = isMe ? '#FBBF24' : '#FFFFFF';
          ctx.shadowColor = isMe ? '#F59E0B' : 'rgba(255,255,255,0.5)';
          ctx.shadowBlur = isMe ? 12 : 4;
          ctx.beginPath();
          ctx.roundRect(
            part.x * cellSize + 1,
            part.y * cellSize + 1,
            cellSize - 2,
            cellSize - 2,
            4
          );
          ctx.fill();
          ctx.shadowBlur = 0;

          // 머리 눈 렌더링
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(part.x * cellSize + cellSize * 0.35, part.y * cellSize + cellSize * 0.35, 2, 0, Math.PI * 2);
          ctx.arc(part.x * cellSize + cellSize * 0.65, part.y * cellSize + cellSize * 0.35, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 몸통
          ctx.fillStyle = snake.color || '#10B981';
          ctx.beginPath();
          ctx.roundRect(
            part.x * cellSize + 1.5,
            part.y * cellSize + 1.5,
            cellSize - 3,
            cellSize - 3,
            3
          );
          ctx.fill();
        }
      });
    });

    // 닉네임 핀 및 하이라이트 렌더링 (카운트다운 및 인게임 공통 지원)
    snakes.forEach(snake => {
      if (!snake.alive || !snake.body[0]) return;
      const head = snake.body[0];
      const isMe = snake.id === myPlayerId;
      const hX = head.x * cellSize + cellSize / 2;
      const hY = head.y * cellSize;

      if (isMe) {
        // [내 뱀 머리 위] 커다란 네온 옐로우 화살표 핀 및 닉네임 박스
        ctx.save();

        // 펄스 링 애니메이션
        const time = Date.now() / 300;
        const pulseRadius = cellSize * (1.2 + Math.sin(time) * 0.2);
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(hX, hY + cellSize / 2, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 화살표 핀 (▼)
        ctx.fillStyle = '#FBBF24';
        ctx.beginPath();
        ctx.moveTo(hX, hY - 3);
        ctx.lineTo(hX - 6, hY - 11);
        ctx.lineTo(hX + 6, hY - 11);
        ctx.closePath();
        ctx.fill();

        // 라벨 배경 박스
        const label = `★ 나 (${snake.name})`;
        ctx.font = 'bold 12px sans-serif';
        const textWidth = ctx.measureText(label).width;
        const padX = 8;
        const boxW = textWidth + padX * 2;
        const boxH = 20;
        const boxX = hX - boxW / 2;
        const boxY = hY - 11 - boxH;

        ctx.fillStyle = '#F59E0B';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 6);
        ctx.fill();

        // 라벨 텍스트
        ctx.fillStyle = '#000';
        ctx.shadowBlur = 0;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, hX, boxY + boxH / 2);

        ctx.restore();
      } else if (isCountdown) {
        // 카운트다운 동안 상대방 머리 위에도 닉네임 라벨 렌더링
        ctx.save();
        const label = `${snake.name}`;
        ctx.font = 'bold 11px sans-serif';
        const textWidth = ctx.measureText(label).width;
        const boxW = textWidth + 12;
        const boxH = 18;
        const boxX = hX - boxW / 2;
        const boxY = hY - 8 - boxH;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
        ctx.strokeStyle = snake.color || '#94A3B8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, hX, boxY + boxH / 2);
        ctx.restore();
      }
    });
  }, [state, myPlayerId]);

  if (!state) return null;

  const mySnake = state.snakes?.[myPlayerId];
  const isCountdown = state.phase === 'countdown';

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '14px 24px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#10B981', color: '#FFF' }}>
            🐍 꼬리잡기 배틀로얄 ({state.gridSize}x{state.gridSize})
          </span>
          <h3 style={{ marginTop: '4px', fontSize: '1.15rem', fontWeight: 800 }}>
            {isCountdown
              ? '⏳ 게임 시작 준비! 내 지렁이 위치를 확인하세요!'
              : mySnake?.alive
              ? '🟢 생존 중! 사과를 먹고 상대를 들이받으세요!'
              : '💀 탈락 (관전 중)'}
          </h3>
        </div>
        <div style={{ color: '#FBBF24', fontWeight: 800 }}>
          🍎 먹은 사과: {state.appleStats?.[myPlayerId] || 0}개
        </div>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '16px', background: '#07090E' }}>
          <canvas
            ref={canvasRef}
            width={580}
            height={580}
            style={{
              borderRadius: '12px',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              boxShadow: '0 0 30px rgba(0,0,0,0.9)'
            }}
          />
        </div>

        {/* 3-2-1 카운트다운 오버레이 */}
        {isCountdown && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            <div style={{
              fontSize: '6rem',
              fontWeight: 900,
              color: '#FBBF24',
              textShadow: '0 0 30px #F59E0B, 0 0 60px #F59E0B',
              animation: 'bounce 0.8s infinite'
            }}>
              {state.countdownSec > 0 ? state.countdownSec : 'START!'}
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.75)',
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #FBBF24',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '1rem',
              marginTop: '10px'
            }}>
              📍 노란색 ★ 핀이 당신의 지렁이입니다!
            </div>
          </div>
        )}
      </div>

      {/* 모바일/마우스 조작 지원 버튼 */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => socket.emit('game:action', { type: 'change_dir', payload: { dir: 'UP' } })}
          style={{ width: '64px', height: '46px', fontWeight: 900, fontSize: '1.2rem' }}
        >
          ▲
        </button>
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => socket.emit('game:action', { type: 'change_dir', payload: { dir: 'LEFT' } })}
            style={{ width: '64px', height: '46px', fontWeight: 900, fontSize: '1.2rem' }}
          >
            ◀
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => socket.emit('game:action', { type: 'change_dir', payload: { dir: 'DOWN' } })}
            style={{ width: '64px', height: '46px', fontWeight: 900, fontSize: '1.2rem' }}
          >
            ▼
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => socket.emit('game:action', { type: 'change_dir', payload: { dir: 'RIGHT' } })}
            style={{ width: '64px', height: '46px', fontWeight: 900, fontSize: '1.2rem' }}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
