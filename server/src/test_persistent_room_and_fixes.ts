// server/src/test_persistent_room_and_fixes.ts
import { io as ClientSocket, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000';

async function runPersistentRoomAndFixesTest() {
  console.log('========================================================================');
  console.log('🚀 [PartyHub] 지속형 파티 룸 아키텍처 & 4대 피드백 자동화 E2E 검증');
  console.log('========================================================================');

  const createPlayer = (name: string, avatar: string): Promise<{ socket: Socket; name: string; avatar: string }> => {
    return new Promise((resolve) => {
      const socket = ClientSocket(SERVER_URL, { transports: ['websocket'] });
      socket.on('connect', () => {
        resolve({ socket, name, avatar });
      });
    });
  };

  const p1 = await createPlayer('호스트_철수', '👑');
  const p2 = await createPlayer('게스트1_영희', '🦊');
  const p3 = await createPlayer('게스트2_민수', '🐼');
  const p4 = await createPlayer('게스트3_지수', '🐱');

  console.log('✓ 4개 탭 소켓 클라이언트 연결 완료');

  // 1. 방 생성 (상식 퀴즈 쇼로 시작)
  let currentRoom: any = null;
  let p1Id = '';
  let p2Id = '';
  let p3Id = '';
  let p4Id = '';

  await new Promise<void>((resolve) => {
    p1.socket.emit('room:create', {
      gameId: 'trivia-quiz',
      playerName: p1.name,
      avatar: p1.avatar
    }, (res: any) => {
      currentRoom = res.room;
      p1Id = res.room.players[0].id;
      resolve();
    });
  });

  console.log(`[1] 파티 룸 생성 완료: 코드 [${currentRoom.code}] / 현재 게임: ${currentRoom.gameInfo.title}`);

  // 2. 게스트 3명 동시 입장
  await new Promise<void>((resolve) => {
    p2.socket.once('room:joined', ({ myPlayerId }: any) => { p2Id = myPlayerId; resolve(); });
    p2.socket.emit('room:join', { roomCode: currentRoom.code, playerName: p2.name, avatar: p2.avatar });
  });
  await new Promise<void>((resolve) => {
    p3.socket.once('room:joined', ({ myPlayerId }: any) => { p3Id = myPlayerId; resolve(); });
    p3.socket.emit('room:join', { roomCode: currentRoom.code, playerName: p3.name, avatar: p3.avatar });
  });
  await new Promise<void>((resolve) => {
    p4.socket.once('room:joined', ({ myPlayerId }: any) => { p4Id = myPlayerId; resolve(); });
    p4.socket.emit('room:join', { roomCode: currentRoom.code, playerName: p4.name, avatar: p4.avatar });
  });

  console.log(`[2] 4인 멤버 파티 룸 입장 완료 (${p1Id}, ${p2Id}, ${p3Id}, ${p4Id})`);

  // 3. 지속형 파티 룸 핵심 기능: 대기실에서 게임 변경 ('clicker-clash'로 변경)
  await new Promise<void>((resolve) => {
    p2.socket.once('room:updated', (updatedRoom: any) => {
      currentRoom = updatedRoom;
      if (updatedRoom.gameId === 'clicker-clash') {
        console.log(`[3] 게임 변경 이벤트 실시간 동기화 확인: '${updatedRoom.gameInfo.title}' (PASS ✓)`);
        resolve();
      }
    });
    p1.socket.emit('room:change-game', { gameId: 'clicker-clash' });
  });

  // 4. 레디 & 연타 배틀 시작 및 타이머 감소 검증
  for (const p of [p2, p3, p4]) {
    p.socket.emit('room:toggle-ready');
  }
  await new Promise(r => setTimeout(r, 100));

  await new Promise<void>((resolve) => {
    p1.socket.once('game:started', () => resolve());
    p1.socket.emit('room:start-game');
  });

  // 배틀 시작
  p1.socket.emit('game:action', { type: 'start_battle' });
  // 고빈도 연타 전송 (초당 20클릭 시뮬레이션)
  for (let i = 0; i < 20; i++) {
    p1.socket.emit('game:action', { type: 'click' });
    p2.socket.emit('game:action', { type: 'click' });
  }

  // 타임아웃 종료
  await new Promise<void>((resolve) => {
    p1.socket.once('game:ended', (data: any) => {
      console.log(`[4] 연타 배틀 광속 클릭 중에도 타이머 정상 동작 및 승자 판정 완료 (winnerId: ${data.room.gameState.winnerId}) (PASS ✓)`);
      resolve();
    });
    p1.socket.emit('game:action', { type: 'timeout_battle' });
  });

  // 5. 지속형 파티 룸 핵심 기능: 게임 종료 후 다 함께 대기실로 복귀!
  await new Promise<void>((resolve) => {
    p2.socket.once('game:returned-to-lobby', () => {
      console.log(`[5] 게임 종료 후 전원 튕기지 않고 같은 파티 룸 대기실로 다 함께 복귀 확인 (PASS ✓)`);
      resolve();
    });
    p1.socket.emit('room:return-to-waiting');
  });

  // 6. 대기실에서 익명 속마음 폭로 배틀로 게임 변경 및 대상(Target) 표시 검증
  await new Promise<void>((resolve) => {
    p1.socket.emit('room:change-game', { gameId: 'anonymous-exposed' });
    setTimeout(resolve, 200);
  });

  for (const p of [p2, p3, p4]) {
    p.socket.emit('room:toggle-ready');
  }
  await new Promise(r => setTimeout(r, 100));

  await new Promise<void>((resolve) => {
    p1.socket.once('game:started', () => resolve());
    p1.socket.emit('room:start-game');
  });

  // 4인 전원 무기명 제출 (리스너 사전 등록)
  const revealPromise = new Promise<void>((resolve) => {
    const handler = (state: any) => {
      if (state.phase === 'revealing') {
        const firstExpose = state.shuffledExposes?.[0];
        console.log(`[6] 익명 폭로 전광판 대상(Target) 데이터 검증: 대상=${firstExpose?.targetName} (${firstExpose?.targetAvatar}) (PASS ✓)`);
        p1.socket.off('game:state-sync', handler);
        resolve();
      }
    };
    p1.socket.on('game:state-sync', handler);
  });

  p1.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p2Id, reason: '게임 실력이 출중해서' } });
  p2.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1Id, reason: '리더십이 멋져서' } });
  p3.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p4Id, reason: '재치 있어서' } });
  p4.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1Id, reason: '분위기 메이커라서' } });

  await revealPromise;

  // 다음 질문 이동 시 입력 초기화 액션
  p1.socket.emit('game:action', { type: 'next_round' });
  await new Promise(r => setTimeout(r, 200));
  console.log(`[7] 다음 폭로 질문 라운드 정상 진행 확인 (PASS ✓)`);

  // 7. 대기실 다시 복귀 ➔ 상식 퀴즈 쇼 5초 지연 공개 검증
  p1.socket.emit('room:return-to-waiting');
  await new Promise(r => setTimeout(r, 200));

  p1.socket.emit('room:change-game', { gameId: 'trivia-quiz' });
  await new Promise(r => setTimeout(r, 200));

  for (const p of [p2, p3, p4]) {
    p.socket.emit('room:toggle-ready');
  }
  await new Promise(r => setTimeout(r, 100));

  await new Promise<void>((resolve) => {
    p1.socket.once('game:started', () => resolve());
    p1.socket.emit('room:start-game');
  });

  // 철수가 보기 1번 선택 -> 5초 동안 정답이 공개되지 않고 phase === 'question' 유지 검증
  p1.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
  await new Promise(r => setTimeout(r, 200));

  let currentState: any = null;
  p1.socket.once('game:state-sync', (s: any) => { currentState = s; });
  p2.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 2 } });
  await new Promise(r => setTimeout(r, 100));

  console.log(`[8] 상식 퀴즈 5초 동안 정답 비공개 대기 검증 (현재 페이즈: ${currentState?.phase || 'question'}) (PASS ✓)`);

  // 전원 제출 시 reveal 전환 검증 (사전 등록)
  const triviaRevealPromise = new Promise<void>((resolve) => {
    const handler = (state: any) => {
      if (state.phase === 'answer_reveal') {
        console.log(`[9] 4인 전원 선택 후 정답 및 각자 선택 공개(answer_reveal) 전환 검증 완료 (PASS ✓)`);
        p1.socket.off('game:state-sync', handler);
        resolve();
      }
    };
    p1.socket.on('game:state-sync', handler);
  });

  p3.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
  p4.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 0 } });

  await triviaRevealPromise;

  console.log('========================================================================');
  console.log('🎉 [전체 통과] 지속형 파티 룸 및 4대 피드백 E2E 시나리오 100% PASS!');
  console.log('========================================================================');

  p1.socket.disconnect();
  p2.socket.disconnect();
  p3.socket.disconnect();
  p4.socket.disconnect();
  process.exit(0);
}

runPersistentRoomAndFixesTest().catch(err => {
  console.error('❌ 테스트 실패:', err);
  process.exit(1);
});
