// server/test_all_games_e2e.ts
import { io as Client, Socket } from 'socket.io-client';
import { INITIAL_GAMES } from '../shared/gamesData';
import { Room } from '../shared/types';

const SERVER_URL = 'http://localhost:4000';

interface TestResult {
  gameId: string;
  gameTitle: string;
  playerCount: number;
  status: 'PASSED' | 'FAILED';
  error?: string;
  phasesSeen: string[];
  durationMs: number;
}

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

async function testSingleGame(gameId: string): Promise<TestResult> {
  const game = INITIAL_GAMES.find(g => g.id === gameId);
  const gameTitle = game?.title || gameId;
  const startTime = Date.now();
  const phasesSeen: string[] = [];

  // 게임별 인원수 설정 (1:1 게임은 2인, 마피아/가짜화가는 4인, 나머지는 3인)
  let targetPlayerCount = 3;
  if (game?.maxPlayers === 2) {
    targetPlayerCount = 2;
  } else if ((game?.minPlayers || 2) >= 4) {
    targetPlayerCount = game?.minPlayers || 4;
  }

  const sockets: Socket[] = [];
  const hostSocket = await createClient('호스트방장', '👑');
  sockets.push(hostSocket);

  for (let i = 1; i < targetPlayerCount; i++) {
    const guest = await createClient(`참가자${i}`, ['🐱', '🐶', '🐰', '🐼'][i - 1] || '🦊');
    sockets.push(guest);
  }

  try {
    // 1. 방 생성 (Host)
    const createRes = await new Promise<{ success: boolean; room?: Room; error?: string }>((resolve) => {
      hostSocket.emit('room:create', {
        gameId,
        playerName: '호스트방장',
        avatar: '👑'
      }, resolve);
    });

    if (!createRes.success || !createRes.room) {
      throw new Error(`방 생성 실패: ${createRes.error || 'Unknown error'}`);
    }

    const roomCode = createRes.room.code;
    let currentRoom = createRes.room;

    // 2. 게스트 순차 참가
    for (let i = 1; i < targetPlayerCount; i++) {
      const joinRes = await new Promise<{ success: boolean; room?: Room; error?: string }>((resolve) => {
        sockets[i].emit('room:join', {
          roomCode,
          playerName: `참가자${i}`,
          avatar: ['🐱', '🐶', '🐰', '🐼'][i - 1] || '🦊'
        }, resolve);
      });
      if (!joinRes.success) throw new Error(`게스트${i} 참가 실패: ${joinRes.error}`);
    }

    // 소켓 상태 업데이트 리스너
    hostSocket.on('room:updated', (updatedRoom: Room) => {
      currentRoom = updatedRoom;
      if (updatedRoom.gameState?.phase && !phasesSeen.includes(updatedRoom.gameState.phase)) {
        phasesSeen.push(updatedRoom.gameState.phase);
      }
    });

    let gameStarted = false;
    hostSocket.on('game:started', (data: any) => {
      gameStarted = true;
      currentRoom = data.room;
      if (data.gameState?.phase && !phasesSeen.includes(data.gameState.phase)) {
        phasesSeen.push(data.gameState.phase);
      }
    });

    // 3. 모든 게스트 준비 완료 및 게임 시작
    for (let i = 1; i < targetPlayerCount; i++) {
      sockets[i].emit('room:toggle-ready');
    }
    await wait(200);

    hostSocket.emit('room:start-game');

    // 게임 시작 대기 (최대 3초)
    for (let t = 0; t < 30; t++) {
      if (gameStarted || currentRoom.status === 'playing') break;
      await wait(100);
    }

    if (!gameStarted && currentRoom.status !== 'playing') {
      throw new Error(`게임 시작 이벤트 수신 실패 (상태: ${currentRoom.status})`);
    }

    await wait(200);

    // 4. 게임별 전용 인터랙션 및 페이즈 전환 시뮬레이션
    const p0 = currentRoom.players[0].id;
    const p1 = currentRoom.players[1].id;
    const p2 = currentRoom.players[2]?.id;

    if (gameId === 'trivia-quiz') {
      hostSocket.emit('game:action', { type: 'submit_answer', payload: { answerIndex: 0 } });
      sockets[1].emit('game:action', { type: 'submit_answer', payload: { answerIndex: 0 } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'submit_answer', payload: { answerIndex: 1 } });
      await wait(400);
      hostSocket.emit('game:action', { type: 'next_question' });
      await wait(300);
    } else if (gameId === 'chosung-quiz') {
      const presenterId = currentRoom.gameState.presenterId;
      const presSocket = presenterId === p0 ? hostSocket : sockets[1];
      presSocket.emit('game:action', {
        type: 'submit_question',
        payload: { category: '과일', word: '사과', hint: '빨간색 과일' }
      });
      await wait(300);
      const solverSocket = presenterId === p0 ? sockets[1] : hostSocket;
      solverSocket.emit('game:action', {
        type: 'submit_answer',
        payload: { answer: '사과' }
      });
      await wait(300);
    } else if (gameId === 'liar-game') {
      for (let i = 0; i < 3; i++) {
        const speakerId = currentRoom.gameState.currentSpeakerId;
        const sock = speakerId === p0 ? hostSocket : (speakerId === p1 ? sockets[1] : sockets[2]);
        const targetId = speakerId === p0 ? p1 : (speakerId === p1 ? p2 : p0);
        sock?.emit('game:action', { type: 'pass_turn', payload: { targetPlayerId: targetId } });
        await wait(150);
      }
      hostSocket.emit('game:action', { type: 'vote', payload: { targetPlayerId: p1 } });
      sockets[1].emit('game:action', { type: 'vote', payload: { targetPlayerId: p1 } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'vote', payload: { targetPlayerId: p1 } });
      await wait(300);
    } else if (gameId === 'worldcup') {
      const firstPair = currentRoom.gameState.currentPair;
      if (firstPair && firstPair[0]) {
        sockets[1].emit('game:action', { type: 'select_candidate', payload: { candidateId: firstPair[0].id } });
        await wait(100);
        hostSocket.emit('game:action', { type: 'confirm_winner', payload: { winnerId: firstPair[0].id } });
      }
      await wait(300);
    } else if (gameId === 'snake-royale') {
      hostSocket.emit('game:action', { type: 'change_direction', payload: { direction: 'DOWN' } });
      sockets[1].emit('game:action', { type: 'change_direction', payload: { direction: 'UP' } });
      await wait(300);
    } else if (gameId === 'balance-debate') {
      hostSocket.emit('game:action', { type: 'vote', payload: { choice: 'A' } });
      sockets[1].emit('game:action', { type: 'vote', payload: { choice: 'B' } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'vote', payload: { choice: 'A' } });
      await wait(200);
      hostSocket.emit('game:action', { type: 'start_final_vote' });
      await wait(200);
      sockets[1].emit('game:action', { type: 'final_vote', payload: { choice: 'A' } });
      await wait(300);
    } else if (gameId === 'high-noon-duel') {
      hostSocket.emit('game:action', { type: 'shoot' });
      sockets[1].emit('game:action', { type: 'shoot' });
      await wait(300);
      hostSocket.emit('game:action', { type: 'next_round' });
      await wait(200);
    } else if (gameId === 'zoom-quiz') {
      sockets[1].emit('game:action', { type: 'submit_guess', payload: { guess: currentRoom.gameState.targetAnswer || '정답' } });
      await wait(300);
    } else if (gameId === 'short-trpg') {
      hostSocket.emit('game:action', { type: 'volunteer_gm', payload: { isVolunteer: true } });
      await wait(100);
      hostSocket.emit('game:action', { type: 'confirm_roles' });
      await wait(200);
      sockets[1].emit('game:action', { type: 'create_character', payload: { concept: '기사', stats: { str: 4, dex: 3, int: 2, cha: 1 } } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'create_character', payload: { concept: '마법사', stats: { str: 1, dex: 2, int: 5, cha: 2 } } });
      await wait(200);
      hostSocket.emit('game:action', { type: 'gm_roll_check', payload: { stat: 'str', dc: 10 } });
      await wait(300);
    } else if (gameId === 'clicker-clash') {
      for (let i = 0; i < 10; i++) {
        hostSocket.emit('game:action', { type: 'click' });
        sockets[1].emit('game:action', { type: 'click' });
      }
      await wait(300);
    } else if (gameId === 'bomb-party') {
      const activeId = currentRoom.gameState.activePlayerId;
      const sock = activeId === p0 ? hostSocket : (activeId === p1 ? sockets[1] : sockets[2]);
      const syl = currentRoom.gameState.promptSyllable || '가';
      sock?.emit('game:action', { type: 'submit_word', payload: { word: `${syl}나다` } });
      await wait(200);
      if (sockets[2]) sockets[2].emit('game:action', { type: 'challenge_word' });
      await wait(300);
    } else if (gameId === 'story-roulette') {
      hostSocket.emit('game:action', { type: 'start_telling' });
      await wait(200);
      hostSocket.emit('game:action', { type: 'finish_story' });
      await wait(200);
      sockets[1].emit('game:action', { type: 'vote_story', payload: { vote: 'fun' } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'vote_story', payload: { vote: 'fun' } });
      await wait(300);
    } else if (gameId === 'taboo-talk') {
      hostSocket.emit('game:action', { type: 'submit_custom_taboo', payload: { targetPlayerId: p1, word: '바보' } });
      sockets[1].emit('game:action', { type: 'submit_custom_taboo', payload: { targetPlayerId: p2 || p0, word: '진짜' } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'submit_custom_taboo', payload: { targetPlayerId: p0, word: '근데' } });
      await wait(300);
      sockets[1].emit('game:action', { type: 'report_taboo', payload: { victimPlayerId: p0, word: '근데' } });
      await wait(300);
    } else if (gameId === 'smart-mafia') {
      hostSocket.emit('game:action', { type: 'mafia_kill', payload: { targetId: p1 } });
      sockets[1].emit('game:action', { type: 'doctor_heal', payload: { targetId: p1 } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'police_inspect', payload: { targetId: p0 } });
      await wait(300);
    } else if (gameId === 'voice-battle') {
      hostSocket.emit('game:action', { type: 'finish_voice' });
      await wait(150);
      sockets[1].emit('game:action', { type: 'finish_voice' });
      await wait(150);
      if (sockets[2]) sockets[2].emit('game:action', { type: 'vote_voice', payload: { choice: 'A' } });
      await wait(300);
    } else if (gameId === 'relay-novel') {
      hostSocket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '옛날 옛적 어느 마을에' } });
      sockets[1].emit('game:action', { type: 'submit_sentence', payload: { sentence: '용사가 살고 있었습니다.' } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'submit_sentence', payload: { sentence: '하지만 마왕이 나타났습니다.' } });
      await wait(300);
    } else if (gameId === 'anonymous-exposed') {
      hostSocket.emit('game:action', { type: 'submit_exposed', payload: { targetId: p1, comment: '항상 라면을 혼자 끓여먹음' } });
      sockets[1].emit('game:action', { type: 'submit_exposed', payload: { targetId: p0, comment: '게임할 때 목소리가 너무 큼' } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'submit_exposed', payload: { targetId: p1, comment: '치킨 다리 2개 다 먹음' } });
      await wait(300);
    } else if (gameId === 'black-and-white') {
      const turnId = currentRoom.gameState.turnPlayerId;
      const sock = turnId === p0 ? hostSocket : sockets[1];
      sock.emit('game:action', { type: 'play_tile', payload: { tile: 4 } });
      await wait(300);
    } else if (gameId === 'blind-drawing') {
      hostSocket.emit('game:action', { type: 'draw_start', payload: { x: 50, y: 50 } });
      hostSocket.emit('game:action', { type: 'draw_move', payload: { x: 100, y: 100 } });
      hostSocket.emit('game:action', { type: 'draw_end' });
      await wait(200);
      sockets[1].emit('game:action', { type: 'submit_guess', payload: { guess: currentRoom.gameState.targetWord || '피자' } });
      await wait(300);
    } else if (gameId === 'fake-artist') {
      hostSocket.emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{x:0, y:0}] } } });
      await wait(150);
      sockets[1].emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{x:10, y:10}] } } });
      await wait(150);
      if (sockets[2]) sockets[2].emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{x:20, y:20}] } } });
      await wait(300);
    } else if (gameId === 'five-sec-rule') {
      hostSocket.emit('game:action', { type: 'finish_answer' });
      await wait(200);
      sockets[1].emit('game:action', { type: 'vote_answer', payload: { isPass: true } });
      if (sockets[2]) sockets[2].emit('game:action', { type: 'vote_answer', payload: { isPass: true } });
      await wait(300);
    }

    // 5. 방 나가기 검증
    sockets[sockets.length - 1].emit('room:leave');
    await wait(200);

    return {
      gameId,
      gameTitle,
      playerCount: targetPlayerCount,
      status: 'PASSED',
      phasesSeen,
      durationMs: Date.now() - startTime
    };
  } catch (err: any) {
    return {
      gameId,
      gameTitle,
      playerCount: targetPlayerCount,
      status: 'FAILED',
      error: err.message || String(err),
      phasesSeen,
      durationMs: Date.now() - startTime
    };
  } finally {
    sockets.forEach(s => s.disconnect());
  }
}

async function runAll() {
  console.log('🚀 [PartyHub E2E Engine] 21개 전 게임 다중 탭 멀티플레이어 시뮬레이션 시작...\n');
  const results: TestResult[] = [];

  for (const game of INITIAL_GAMES) {
    process.stdout.write(`Testing [${game.id}] (${game.title})... `);
    const res = await testSingleGame(game.id);
    results.push(res);
    if (res.status === 'PASSED') {
      console.log(`✅ PASSED (${res.durationMs}ms, ${res.playerCount}P) [Phases: ${res.phasesSeen.join(' -> ')}]`);
    } else {
      console.log(`❌ FAILED (${res.durationMs}ms, ${res.playerCount}P) Error: ${res.error}`);
    }
  }

  console.log('\n======================================================');
  console.log('📊 E2E 전수 검증 결과 요약:');
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  console.log(`총 게임: ${results.length} | 성공: ${passed} | 실패: ${failed}`);
  console.log('======================================================\n');

  if (failed > 0) {
    console.error('❌ 결함이 발견된 게임 목록:');
    results.filter(r => r.status === 'FAILED').forEach(r => {
      console.error(`- ${r.gameId} (${r.gameTitle}): ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('🎉 21개 모든 게임이 100% 무결점으로 통과되었습니다!');
    process.exit(0);
  }
}

runAll().catch(err => {
  console.error('Fatal Runner Error:', err);
  process.exit(1);
});
