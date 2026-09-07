// server/test_edge_cases_e2e.ts
import { io as Client, Socket } from 'socket.io-client';
import { Room } from '../shared/types';

const SERVER_URL = 'http://localhost:4000';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createClient(name: string, avatar: string = '🦊'): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const socket = Client(SERVER_URL, {
      transports: ['websocket'],
      forceNew: true
    });
    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', (err) => reject(err));
  });
}

async function runEdgeCasesTest() {
  console.log('🧪 [Edge Case Test] 플레이어 중도 퇴장, 방장 위임, 방 폭파 예외 케이스 검증 시작...\n');

  // Case 1: 방장 중도 퇴장 시 차순위 플레이어에게 방장(👑) 자동 위임 검증
  console.log('1. 방장 퇴장 시 새로운 방장 자동 위임 테스트...');
  const host = await createClient('원래방장', '👑');
  const guest1 = await createClient('첫번째게스트', '🐱');
  const guest2 = await createClient('두번째게스트', '🐶');

  const createRes = await new Promise<{ success: boolean; room?: Room }>((resolve) => {
    host.emit('room:create', { gameId: 'liar-game', playerName: '원래방장', avatar: '👑' }, resolve);
  });
  const roomCode = createRes.room!.code;

  await new Promise((resolve) => guest1.emit('room:join', { roomCode, playerName: '첫번째게스트', avatar: '🐱' }, resolve));
  await new Promise((resolve) => guest2.emit('room:join', { roomCode, playerName: '두번째게스트', avatar: '🐶' }, resolve));

  let updatedNewHostId: string | null = null;
  guest1.on('room:player-left', (data: any) => {
    updatedNewHostId = data.newHostId;
  });

  // 원방장 퇴장!
  host.disconnect();
  await wait(500);

  if (updatedNewHostId) {
    console.log(`✅ 방장 위임 성공! 새로운 방장 ID: ${updatedNewHostId}`);
  } else {
    throw new Error('❌ 방장 위임 실패: newHostId가 수신되지 않았습니다.');
  }

  guest1.disconnect();
  guest2.disconnect();
  await wait(300);

  // Case 2: 모든 플레이어 퇴장 시 방 자동 소멸(정리) 검증
  console.log('\n2. 전원 퇴장 시 룸 메모리 자동 정리 테스트...');
  const probeSocket = await createClient('참관인', '👀');
  const invalidJoinRes = await new Promise<{ success: boolean; error?: string }>((resolve) => {
    probeSocket.emit('room:join', { roomCode, playerName: '참관인', avatar: '👀' }, resolve);
  });

  if (!invalidJoinRes.success) {
    console.log(`✅ 방 자동 소멸 확인! (응답: ${invalidJoinRes.error})`);
  } else {
    throw new Error('❌ 방이 소멸되지 않고 남아있습니다.');
  }
  probeSocket.disconnect();

  console.log('\n🎉 모든 엣지 케이스 및 예외 처리 검증 100% 통과!');
}

runEdgeCasesTest().catch(err => {
  console.error('Fatal Edge Test Error:', err);
  process.exit(1);
});
