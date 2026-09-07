// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { Room } from '../../shared/types';
import { LobbyView } from './components/LobbyView';
import { RoomView } from './components/RoomView';
import { JoinModal } from './components/JoinModal';
import { InGameRouter } from './components/games/InGameRouter';
import { Sparkles, RotateCcw, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [urlRoomCode, setUrlRoomCode] = useState<string | null>(null);
  const [isDirectJoinModalOpen, setIsDirectJoinModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // URL 라우팅 및 브라우저 뒤로가기/앞으로가기(popstate) 완벽 동기화
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/room\/([a-zA-Z0-9_-]+)/);

      if (match && match[1]) {
        const code = match[1].toUpperCase();
        if (!currentRoom || currentRoom.code !== code) {
          setUrlRoomCode(code);
          setIsDirectJoinModalOpen(true);
        }
      } else {
        if (currentRoom) {
          socket.emit('room:leave');
          setCurrentRoom(null);
          setIsGameStarted(false);
          setIsDirectJoinModalOpen(false);
          showToast('🏠 메인 로비로 돌아왔습니다.');
        }
      }
    };

    const path = window.location.pathname;
    const match = path.match(/\/room\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const code = match[1].toUpperCase();
      setUrlRoomCode(code);
      setIsDirectJoinModalOpen(true);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentRoom]);

  // 소켓 이벤트 리스너 등록
  useEffect(() => {
    socket.on('room:joined', ({ room, myPlayerId: pId }) => {
      setCurrentRoom(room);
      setMyPlayerId(pId);
      setIsGameStarted(room.status === 'playing');
      window.history.pushState({}, '', `/room/${room.code}`);
      showToast(`🎉 '${room.gameInfo.title}' 대기실에 입장했습니다!`);
    });

    socket.on('room:updated', (updatedRoom) => {
      setCurrentRoom(updatedRoom);
    });

    socket.on('room:player-joined', ({ player, room }) => {
      setCurrentRoom(room);
      showToast(`👋 ${player.avatar} ${player.name} 님이 방에 참가했습니다!`);
    });

    socket.on('room:player-left', ({ room, newHostId }) => {
      setCurrentRoom(room);
      if (newHostId && newHostId === myPlayerId) {
        showToast('👑 방장이 퇴장하여 회원님이 새로운 방장이 되었습니다!');
      }
    });

    socket.on('room:error', (errorMsg) => {
      alert(`[안내] ${errorMsg}`);
      if (errorMsg.includes('퇴장') || errorMsg.includes('종료')) {
        setCurrentRoom(null);
        setIsGameStarted(false);
        window.history.pushState({}, '', '/');
      }
    });

    socket.on('game:started', ({ room, gameState }) => {
      setCurrentRoom({ ...room, gameState, status: 'playing' });
      setIsGameStarted(true);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 }
      });
      showToast('🚀 게임이 시작되었습니다!');
    });

    socket.on('game:state-sync', (gameState) => {
      setCurrentRoom(prev => prev ? { ...prev, gameState } : null);
    });

    socket.on('game:ended', ({ room }) => {
      setCurrentRoom(prev => prev ? { ...prev, ...room, status: 'ended' } : null);
      confetti({ particleCount: 120, spread: 90 });
      showToast('🏆 게임이 종료되었습니다! 최종 결과를 확인하세요.');
    });

    socket.on('game:returned-to-lobby', () => {
      setIsGameStarted(false);
      showToast('🔄 파티 대기실로 돌아왔습니다! 다음 게임을 준비하세요.');
    });

    return () => {
      socket.off('room:joined');
      socket.off('room:updated');
      socket.off('room:player-joined');
      socket.off('room:player-left');
      socket.off('room:error');
      socket.off('game:started');
      socket.off('game:state-sync');
      socket.off('game:ended');
      socket.off('game:returned-to-lobby');
    };
  }, [myPlayerId]);

  // 1. 방 생성 핸들러 (팩 선택 완료 후 또는 시스템 룰 방 생성)
  const handleCreateRoom = (data: { gameId: string; packId?: string; packTitle?: string; playerName: string; avatar: string }) => {
    socket.emit('room:create', data, (response) => {
      if (!response.success) {
        alert(response.error || '방 생성에 실패했습니다.');
      }
    });
  };

  // 2. 초대 링크 접속 후 닉네임 입력 완료 시 최종 입장 핸들러
  const handleCompleteJoin = (data: { playerName: string; avatar: string; roomCode?: string }) => {
    if (!data.roomCode) return;
    socket.emit('room:join', {
      roomCode: data.roomCode,
      playerName: data.playerName,
      avatar: data.avatar
    }, (response) => {
      if (!response.success) {
        alert(response.error || '방 참가에 실패했습니다. 유효하지 않은 초대 링크이거나 인원이 가득 찼습니다.');
      } else {
        setIsDirectJoinModalOpen(false);
      }
    });
  };

  // 3. 레디 토글
  const handleToggleReady = () => {
    socket.emit('room:toggle-ready');
  };

  // 4. 게임 시작 (방장)
  const handleStartGame = () => {
    socket.emit('room:start-game');
  };

  // 5. 설정 업데이트 (방장)
  const handleUpdateSettings = (newSettings: any) => {
    socket.emit('room:update-settings', newSettings);
  };

  // 6. 플레이어 강퇴 (방장)
  const handleKickPlayer = (targetId: string) => {
    socket.emit('room:kick-player', targetId);
  };

  // 7. 방 나가기 (퇴장 버튼 클릭)
  const handleLeaveRoom = () => {
    socket.emit('room:leave');
    setCurrentRoom(null);
    setIsGameStarted(false);
    setUrlRoomCode(null);
    setIsDirectJoinModalOpen(false);
    window.history.pushState({}, '', '/');
    showToast('🏠 메인 로비로 돌아왔습니다.');
  };

  return (
    <>
      {/* 1. 게임 진행 중 화면 (전용 인게임 뷰 라우터) */}
      {currentRoom && (isGameStarted || currentRoom.status === 'playing') ? (
        <div className="app-container" style={{ padding: '24px 16px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* 상단 컨트롤 바 */}
          <div style={{ maxWidth: '950px', margin: '0 auto 16px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#A5B4FC' }}>
                🎮 {currentRoom.gameInfo.title}
              </span>
              <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#C7D2FE', fontSize: '0.8rem' }}>
                파티 코드: {currentRoom.code}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* 호스트 전용: 다 함께 대기실로 복귀 */}
              {currentRoom.hostId === myPlayerId && (
                <button
                  className="btn btn-secondary"
                  onClick={() => socket.emit('room:return-to-waiting')}
                  style={{ padding: '6px 12px', fontSize: '0.85rem', background: 'rgba(99, 102, 241, 0.25)', border: '1px solid #6366F1', color: '#FFF' }}
                  title="게임을 중단하고 다 함께 대기실로 돌아갑니다"
                >
                  <RotateCcw size={14} />
                  <span>대기실로 복귀</span>
                </button>
              )}

              <button className="btn btn-secondary" onClick={handleLeaveRoom} style={{ padding: '6px 14px', fontSize: '0.85rem' }} title="파티에서 완전히 나갑니다">
                <LogOut size={14} />
                <span>파티 나가기</span>
              </button>
            </div>
          </div>

          <InGameRouter
            room={currentRoom}
            myPlayerId={myPlayerId}
            onLeaveRoom={handleLeaveRoom}
            onReturnToWaiting={() => socket.emit('room:return-to-waiting')}
          />
        </div>
      ) : currentRoom ? (
        /* 2. 대기실 (Waiting Room) */
        <RoomView
          room={currentRoom}
          myPlayerId={myPlayerId}
          onToggleReady={handleToggleReady}
          onStartGame={handleStartGame}
          onUpdateSettings={handleUpdateSettings}
          onKickPlayer={handleKickPlayer}
          onLeaveRoom={handleLeaveRoom}
        />
      ) : (
        /* 3. 메인 로비 화면 */
        <LobbyView
          onCreateRoom={handleCreateRoom}
        />
      )}

      {/* 초대 링크를 통해 접속했을 때 뜨는 게스트 입장 모달 */}
      <JoinModal
        isOpen={isDirectJoinModalOpen && !currentRoom}
        onClose={() => setIsDirectJoinModalOpen(false)}
        roomCode={urlRoomCode || undefined}
        isCreating={false}
        onSubmit={({ playerName, avatar, roomCode }) => {
          handleCompleteJoin({ playerName, avatar, roomCode });
        }}
      />

      {/* 글로벌 토스트 알림 */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <Sparkles size={18} color="#F59E0B" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};
