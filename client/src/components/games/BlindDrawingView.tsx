// client/src/components/games/BlindDrawingView.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { CountdownTimer } from '../common/CountdownTimer';
import { sounds } from '../../utils/audio';
import { Send, EyeOff, ArrowRight, Trash2 } from 'lucide-react';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const BlindDrawingView: React.FC<Props> = ({ room, myPlayerId }) => {
  const state = room.gameState;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [guessInput, setGuessInput] = useState('');

  // 캔버스 렌더링 (모든 참가자 화면에 drawPaths 실시간 동기화)
  useEffect(() => {
    if (!canvasRef.current || !state) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경 지우기
    ctx.fillStyle = '#0B0E14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 저장된 모든 선분 그리기 (맞히는 사람 및 결과 화면에서 선명하고 뚜렷하게 표출)
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#00F0FF';
    ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
    ctx.shadowBlur = 4;

    (state.drawPaths || []).forEach((line: any) => {
      ctx.beginPath();
      ctx.moveTo(line.fromX, line.fromY);
      ctx.lineTo(line.toX, line.toY);
      ctx.stroke();
    });
    ctx.shadowBlur = 0;
  }, [state?.drawPaths]);

  if (!state) return null;

  const isDrawer = state.drawerId === myPlayerId;
  const isHost = room.hostId === myPlayerId;
  const drawerPlayer = room.players.find(p => p.id === state.drawerId);
  const correctPlayer = room.players.find(p => p.id === state.correctPlayerId);

  // 드로잉 이벤트 리스너
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer || state.phase !== 'drawing') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDrawing(true);
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawer || !lastPos || state.phase !== 'drawing') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    socket.emit('game:action', {
      type: 'draw_line',
      payload: {
        line: { fromX: lastPos.x, fromY: lastPos.y, toX: curX, toY: curY }
      }
    });

    setLastPos({ x: curX, y: curY });
  };

  const handleMouseUp = () => {
    if (!isDrawer) return;
    setIsDrawing(false);
    setLastPos(null);
  };

  const handleClearCanvas = () => {
    if (!isDrawer) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'clear_canvas' });
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || isDrawer || state.phase !== 'drawing') return;
    socket.emit('game:action', {
      type: 'submit_guess',
      payload: { guess: guessInput.trim() }
    });
    setGuessInput('');
  };

  const handleTimeout = () => {
    if (isHost || isDrawer) {
      socket.emit('game:action', { type: 'timeout_round' });
    }
  };

  const handleNextRound = () => {
    if (!isHost) return;
    sounds.playClick();
    socket.emit('game:action', { type: 'next_round' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 & 타이머 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#0284C7', color: '#FFF' }}>
            라운드 {(state.roundIndex || 0) + 1} / {state.totalRounds || 3}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🙈 블라인드 눈감고 드로잉</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ color: '#FBBF24', fontWeight: 800 }}>
            내 점수: {state.scores?.[myPlayerId] || 0}점
          </div>

          {state.phase === 'drawing' && (
            <CountdownTimer
              startedAt={state.startedAt}
              durationSec={state.timerSec || 45}
              onTimeout={handleTimeout}
            />
          )}
        </div>
      </div>

      {/* 출제자 제시어 안내 or 풀이자 안내 */}
      {isDrawer ? (
        <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px', background: 'rgba(239,68,68,0.2)', borderColor: '#EF4444' }}>
          <div style={{ fontSize: '0.85rem', color: '#FCA5A5' }}>
            🙈 당신은 눈을 감고 그리는 출제자입니다! (화면이 100% 완전 암전됩니다!)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', marginTop: '4px' }}>
            🔑 그려야 할 제시어: <span style={{ color: '#FDE047' }}>[{state.targetWord}]</span>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '14px', marginBottom: '16px', background: 'rgba(99,102,241,0.2)', borderColor: '#6366F1' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#A5B4FC' }}>
            🎨 [{drawerPlayer?.name}] 님이 눈을 감고 그림을 그리고 있습니다! 무엇인지 맞혀보세요!
          </div>
        </div>
      )}

      {/* 드로잉 캔버스 영역 */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px', display: 'inline-block', position: 'relative', borderRadius: '20px' }}>
        <canvas
          ref={canvasRef}
          width={560}
          height={380}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            borderRadius: '14px',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            cursor: isDrawer ? 'crosshair' : 'default',
            display: 'block'
          }}
        />

        {/* 출제자 100% 완전 암전 안대 효과 (선이 절대 비치지 않는 완전 순수 블랙) */}
        {isDrawer && state.phase === 'drawing' && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              bottom: '16px',
              borderRadius: '14px',
              background: '#000000', // 100% 완전 암전! 선 비침 0%
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            <EyeOff size={52} color="#EF4444" style={{ marginBottom: '14px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF' }}>
              🕶️ 완전 안대 착용 중! 마우스 감각만으로 그리세요!
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '8px' }}>
              (본인 캔버스는 완벽히 차단되며, 다른 참가자들에게만 실시간으로 보입니다!)
            </div>
          </div>
        )}
      </div>

      {/* 조작 버튼 및 정답 제출 폼 */}
      {state.phase === 'drawing' ? (
        <div>
          {isDrawer ? (
            <button className="btn btn-secondary" onClick={handleClearCanvas}>
              <Trash2 size={16} />
              <span>캔버스 전체 지우기</span>
            </button>
          ) : (
            <form onSubmit={handleGuessSubmit} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="이 그림은 무엇일까요? 정답 입력..."
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 28px', background: '#8B5CF6', borderColor: '#8B5CF6' }}>
                <Send size={18} />
                <span>정답 제출</span>
              </button>
            </form>
          )}
        </div>
      ) : (
        /* 라운드 종료 / 정답 결과 화면 */
        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(139,92,246,0.2)', borderColor: '#8B5CF6' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', marginBottom: '8px' }}>
            {correctPlayer
              ? `🎉 [${correctPlayer.name}] 님이 정답을 맞혔습니다!`
              : '⌛ 시간 초과로 라운드가 종료되었습니다!'}
          </h2>
          <div style={{ fontSize: '1.15rem', color: '#FDE047', fontWeight: 800, marginBottom: '16px' }}>
            🔑 정답: [{state.targetWord}]
          </div>

          {isHost && (
            <button className="btn btn-primary" onClick={handleNextRound} style={{ padding: '12px 32px', background: '#8B5CF6' }}>
              <span>다음 라운드로 이동 ➔</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
