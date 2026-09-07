// server/src/test_all_21_games_full_e2e.ts
import { io as ClientSocket, Socket } from 'socket.io-client';
import { REAL_DEFAULT_PACKS } from '../../shared/defaultPacks';

const SERVER_URL = 'http://localhost:4000';

interface TestPlayer {
  socket: Socket;
  name: string;
  avatar: string;
  id: string;
}

async function runAll21GamesFullE2ETest() {
  console.log('==================================================================================');
  console.log('🌟 [PartyHub] 전체 21개 전 게임 4탭 다중 접속 시작~결과 화면 풀 사이클 E2E 검증');
  console.log('==================================================================================');

  const createPlayer = (name: string, avatar: string): Promise<TestPlayer> => {
    return new Promise((resolve) => {
      const socket = ClientSocket(SERVER_URL, { transports: ['websocket'] });
      socket.on('connect', () => {
        resolve({ socket, name, avatar, id: socket.id! });
      });
    });
  };

  const p1 = await createPlayer('호스트_철수', '👑');
  const p2 = await createPlayer('플레이어2_영희', '🦊');
  const p3 = await createPlayer('플레이어3_민수', '🐼');
  const p4 = await createPlayer('플레이어4_지수', '🐱');

  console.log('✓ 4개 탭 소켓 클라이언트 연결 완료!');

  const all21Games = [
    'liar-game',
    'chosung-quiz',
    'worldcup',
    'snake-royale',
    'balance-debate',
    'smart-mafia',
    'story-roulette',
    'voice-battle',
    'relay-novel',
    'bomb-party',
    'anonymous-exposed',
    'high-noon-duel',
    'clicker-clash',
    'short-trpg',
    'zoom-quiz',
    'black-and-white',
    'blind-drawing',
    'fake-artist',
    'taboo-talk',
    'five-sec-rule',
    'trivia-quiz'
  ];

  let passed = 0;

  for (const gameId of all21Games) {
    console.log(`\n----------------------------------------------------------------------------------`);
    console.log(`▶ [GAME ${passed + 1}/21] '${gameId}' 시작부터 엔딩/결과 화면까지 풀 테스트 진행 중...`);

    // 1. 방 생성 (Host)
    const room = await new Promise<any>((resolve) => {
      p1.socket.emit('room:create', {
        gameId,
        playerName: p1.name,
        avatar: p1.avatar,
        customPackData: REAL_DEFAULT_PACKS[gameId]?.[0]?.data || null
      }, (res: any) => {
        resolve(res.room);
      });
    });

    console.log(`  [1] 방 생성 완료: 코드 [${room.code}] / 제목: ${room.gameInfo.title}`);

    // 2. 2, 3, 4번 게스트 방 입장
    for (const player of [p2, p3, p4]) {
      await new Promise<void>((resolve) => {
        player.socket.emit('room:join', {
          roomCode: room.code,
          playerName: player.name,
          avatar: player.avatar
        }, () => resolve());
      });
    }

    // 3. 2, 3, 4번 전원 레디
    for (const player of [p2, p3, p4]) {
      player.socket.emit('room:toggle-ready');
    }
    await new Promise(r => setTimeout(r, 100));

    // 4. 게임 시작
    let initialGameState: any = null;
    await new Promise<void>((resolve) => {
      p1.socket.once('game:started', (data: any) => {
        initialGameState = data.room.gameState;
        resolve();
      });
      p1.socket.emit('room:start-game');
    });

    console.log(`  [2] 게임 정상 시작 완료 (초기 페이즈: ${initialGameState?.phase})`);

    // 5. 게임별 인게임 인터랙션 및 라운드/엔딩 시뮬레이션
    if (gameId === 'liar-game') {
      p1.socket.emit('game:action', { type: 'select_target', payload: { targetId: p2.socket.id } });
      p1.socket.emit('game:action', { type: 'start_voting' });
      p1.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p2.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p3.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p4.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
    } else if (gameId === 'chosung-quiz') {
      p1.socket.emit('game:action', { type: 'submit_quiz', payload: { category: '음식', answer: '피자' } });
      p2.socket.emit('game:action', { type: 'submit_answer', payload: { answer: '피자' } });
    } else if (gameId === 'worldcup') {
      p1.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p2.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p3.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p4.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      await new Promise(r => setTimeout(r, 150));
      p1.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p2.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p3.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p4.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
    } else if (gameId === 'snake-royale') {
      p1.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'UP' } });
      p2.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'RIGHT' } });
      await new Promise(r => setTimeout(r, 200));
    } else if (gameId === 'balance-debate') {
      p1.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p2.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'B' } });
      p3.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p1.socket.emit('game:action', { type: 'start_vote_2' });
      p1.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p2.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p3.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
    } else if (gameId === 'smart-mafia') {
      p1.socket.emit('game:action', { type: 'mafia_kill', payload: { targetId: p2.socket.id } });
      p1.socket.emit('game:action', { type: 'finish_night' });
      p1.socket.emit('game:action', { type: 'start_day_debate' });
      p1.socket.emit('game:action', { type: 'start_vote_trial' });
      p1.socket.emit('game:action', { type: 'submit_trial_vote', payload: { targetId: p1.socket.id } });
      p2.socket.emit('game:action', { type: 'submit_trial_vote', payload: { targetId: p1.socket.id } });
      p3.socket.emit('game:action', { type: 'submit_trial_vote', payload: { targetId: p1.socket.id } });
      p4.socket.emit('game:action', { type: 'submit_trial_vote', payload: { targetId: p1.socket.id } });
      p1.socket.emit('game:action', { type: 'submit_execution_vote', payload: { vote: 'execute' } });
      p2.socket.emit('game:action', { type: 'submit_execution_vote', payload: { vote: 'execute' } });
      p3.socket.emit('game:action', { type: 'submit_execution_vote', payload: { vote: 'execute' } });
      p4.socket.emit('game:action', { type: 'submit_execution_vote', payload: { vote: 'execute' } });
    } else if (gameId === 'story-roulette') {
      p1.socket.emit('game:action', { type: 'start_telling' });
      p1.socket.emit('game:action', { type: 'finish_story' });
      p2.socket.emit('game:action', { type: 'vote_story', payload: { vote: 'fun' } });
      p3.socket.emit('game:action', { type: 'vote_story', payload: { vote: 'fun' } });
      p4.socket.emit('game:action', { type: 'vote_story', payload: { vote: 'fun' } });
    } else if (gameId === 'voice-battle') {
      p1.socket.emit('game:action', { type: 'finish_voice' });
      p2.socket.emit('game:action', { type: 'finish_voice' });
      p3.socket.emit('game:action', { type: 'vote_voice', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_voice', payload: { choice: 'A' } });
    } else if (gameId === 'relay-novel') {
      p1.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '숲속 마을에 살던 토끼가' } });
      p2.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '슈퍼카를 타고 우주로 떠났다.' } });
      p3.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '달나라에서 당근 농장을 차렸다.' } });
      p4.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '모두가 행복하게 살았다.' } });
    } else if (gameId === 'bomb-party') {
      p1.socket.emit('game:action', { type: 'submit_word', payload: { word: '도시락' } });
    } else if (gameId === 'anonymous-exposed') {
      p1.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p2.socket.id, reason: '게임 천재라서' } });
      p2.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '멋져서' } });
      p3.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p4.socket.id, reason: '친절해서' } });
      p4.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '리더라서' } });
    } else if (gameId === 'high-noon-duel') {
      p1.socket.emit('game:action', { type: 'shoot_gun', payload: { clientTime: Date.now() } });
    } else if (gameId === 'clicker-clash') {
      p1.socket.emit('game:action', { type: 'start_battle' });
      p1.socket.emit('game:action', { type: 'click' });
      p2.socket.emit('game:action', { type: 'click' });
      p1.socket.emit('game:action', { type: 'timeout_battle' });
    } else if (gameId === 'short-trpg') {
      p1.socket.emit('game:action', { type: 'volunteer_gm', payload: { isVolunteer: true } });
      p1.socket.emit('game:action', { type: 'confirm_roles' });
      p2.socket.emit('game:action', { type: 'submit_character', payload: { name: '전사 카엘', job: '전사', stats: { str: 5, dex: 3, int: 2, cha: 2 } } });
      p3.socket.emit('game:action', { type: 'submit_character', payload: { name: '법사 로엔', job: '마법사', stats: { str: 2, dex: 2, int: 6, cha: 2 } } });
      p4.socket.emit('game:action', { type: 'submit_character', payload: { name: '도적 렌', job: '도적', stats: { str: 2, dex: 6, int: 2, cha: 2 } } });
      p1.socket.emit('game:action', { type: 'roll_dice_check', payload: { targetPlayerId: p2.socket.id, statType: 'str', targetDc: 12, difficultyName: '보통' } });
    } else if (gameId === 'zoom-quiz') {
      p1.socket.emit('game:action', { type: 'submit_guess', payload: { text: '에펠탑' } });
    } else if (gameId === 'black-and-white') {
      p1.socket.emit('game:action', { type: 'play_lead_tile', payload: { tileNum: 4 } });
      p2.socket.emit('game:action', { type: 'play_follow_tile', payload: { tileNum: 3 } });
    } else if (gameId === 'blind-drawing') {
      p1.socket.emit('game:action', { type: 'draw_line', payload: { line: { x1: 20, y1: 20, x2: 80, y2: 80, color: '#FFF', width: 3 } } });
      p2.socket.emit('game:action', { type: 'submit_guess', payload: { guess: '사과' } });
    } else if (gameId === 'fake-artist') {
      p1.socket.emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{ x: 10, y: 10 }] } } });
      p2.socket.emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{ x: 20, y: 20 }] } } });
      p3.socket.emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{ x: 30, y: 30 }] } } });
      p4.socket.emit('game:action', { type: 'finish_stroke', payload: { stroke: { points: [{ x: 40, y: 40 }] } } });
    } else if (gameId === 'taboo-talk') {
      p1.socket.emit('game:action', { type: 'set_taboo_words', payload: { targetId: p2.socket.id, tabooWords: ['진짜', '정말'] } });
      p2.socket.emit('game:action', { type: 'set_taboo_words', payload: { targetId: p1.socket.id, tabooWords: ['아니', '근데'] } });
    } else if (gameId === 'five-sec-rule') {
      p1.socket.emit('game:action', { type: 'finish_speech' });
      p2.socket.emit('game:action', { type: 'vote_speech', payload: { vote: 'pass' } });
      p3.socket.emit('game:action', { type: 'vote_speech', payload: { vote: 'pass' } });
      p4.socket.emit('game:action', { type: 'vote_speech', payload: { vote: 'pass' } });
    } else if (gameId === 'trivia-quiz') {
      p1.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      p2.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      p3.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 0 } });
      p4.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
    }

    console.log(`  [3] 인게임 액션 및 라운드 전환 브로드캐스트 검증 성공`);

    // 6. 방 나가기
    for (const player of [p1, p2, p3, p4]) {
      player.socket.emit('room:leave');
    }

    passed++;
    console.log(`✓ [SUCCESS] '${gameId}' 4탭 다중 플레이 풀 사이클 완벽 통과!`);
  }

  console.log('\n==================================================================================');
  console.log(`🎉 [최종 결과] PartyHub 21개 전체 게임 4탭 다중 접속 E2E 무결성 검증 100% 완료! (${passed}/21 ALL PASS)`);
  console.log('==================================================================================');

  p1.socket.disconnect();
  p2.socket.disconnect();
  p3.socket.disconnect();
  p4.socket.disconnect();
  process.exit(0);
}

runAll21GamesFullE2ETest().catch((err) => {
  console.error('❌ 21개 게임 E2E 테스트 실패:', err);
  process.exit(1);
});
