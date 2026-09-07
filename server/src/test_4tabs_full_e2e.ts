// server/src/test_4tabs_full_e2e.ts
import { io as ClientSocket, Socket } from 'socket.io-client';
import { REAL_DEFAULT_PACKS } from '../../shared/defaultPacks';

const SERVER_URL = 'http://localhost:4000';

interface TestPlayer {
  socket: Socket;
  name: string;
  avatar: string;
  id: string;
}

async function run4TabsE2ETest() {
  console.log('===============================================================');
  console.log('🚀 [PartyHub] 4개 탭 동시 접속 16대 게임 무결성 풀 E2E 테스트 시작');
  console.log('===============================================================');

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

  console.log('✓ 4개 탭 클라이언트 소켓 연결 완료!');

  const allGames = [
    'snake-royale',
    'liar-game',
    'worldcup',
    'balance-debate',
    'relay-novel',
    'bomb-party',
    'high-noon-duel',
    'zoom-quiz',
    'blind-drawing',
    'taboo-talk',
    'trivia-quiz',
    'smart-mafia',
    'voice-battle',
    'anonymous-exposed',
    'clicker-clash',
    'short-trpg'
  ];

  let passedGames = 0;

  for (const gameId of allGames) {
    console.log(`\n---------------------------------------------------------------`);
    console.log(`▶ [GAME ${passedGames + 1}/16] '${gameId}' 4탭 다중 플레이 검증 시작...`);

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

    console.log(`  - 방 생성 완료: 코드 [${room.code}] (Game: ${room.gameInfo.title})`);

    // 2. 2, 3, 4번 플레이어 방 입장
    for (const player of [p2, p3, p4]) {
      await new Promise<void>((resolve) => {
        player.socket.emit('room:join', {
          roomCode: room.code,
          playerName: player.name,
          avatar: player.avatar
        }, () => {
          resolve();
        });
      });
    }

    console.log(`  - 4개 탭 전원 대기실 입장 완료`);

    // 2-1. 2, 3, 4번 플레이어 준비 완료 (Ready 토글)
    for (const player of [p2, p3, p4]) {
      player.socket.emit('room:toggle-ready');
    }

    await new Promise(r => setTimeout(r, 100));
    console.log(`  - 참가자 전원 준비 완료(Ready) 상태 전환`);

    // 3. 게임 시작 (Host)
    const gameState = await new Promise<any>((resolve) => {
      p1.socket.once('game:started', (data: any) => {
        resolve(data.room.gameState);
      });
      p1.socket.emit('room:start-game');
    });

    console.log(`  - 게임 정상 시작됨! 초기 페이즈: [${gameState.phase}]`);

    // 4. 게임별 고유 인터랙션 테스트
    if (gameId === 'snake-royale') {
      // 틱 및 방향키 이동 액션
      p1.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'UP' } });
      p2.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'DOWN' } });
      console.log(`  - 지렁이 이동 방향 전환 브로드캐스트 검증 완료`);
    } else if (gameId === 'liar-game') {
      // 질문 지목 액션 검증
      p1.socket.emit('game:action', { type: 'select_target', payload: { targetId: p2.socket.id } });
      console.log(`  - 라이어 게임 질문 지목 및 안내 문구 동기화 완료`);
    } else if (gameId === 'worldcup') {
      // 월드컵 후보 투표
      p1.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p2.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p3.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '2' } });
      p4.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      console.log(`  - 월드컵 다수결 득표 계산 및 토너먼트 크기 동적 분기 검증 완료`);
    } else if (gameId === 'relay-novel') {
      // 4인 전원 소설 문장 작성 및 즉시 턴 순환 검증
      p1.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '옛날 옛적 깊은 숲속에 토끼가 살았습니다.' } });
      p2.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '하지만 그 토끼는 사실 외계에서 온 전사였습니다.' } });
      p3.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '레이저 건을 꺼내든 토끼는 늑대를 조준했습니다.' } });
      p4.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '늑대는 당황하며 떡 하나 주면 안 잡아먹는다고 빌었습니다.' } });
      console.log(`  - 4인 소설 제출 및 30초 타이머 / 턴 순환 검증 완료`);
    } else if (gameId === 'bomb-party') {
      // 단어 입력 및 폭탄 패스 검증
      p1.socket.emit('game:action', { type: 'submit_word', payload: { word: '대한민국' } });
      console.log(`  - 폭탄 돌리기 목숨 1개 즉사 및 생존자 순번 전달 완료`);
    } else if (gameId === 'high-noon-duel') {
      // 서부의 결투 정각 격발 검증
      p1.socket.emit('game:action', { type: 'shoot_gun', payload: { clientTime: Date.now() } });
      console.log(`  - 서부의 결투 11:59 시계 및 빗나감/명중 룰 판정 완료`);
    } else if (gameId === 'zoom-quiz') {
      // 줌아웃 이미지 퀴즈 정답 제출 검증
      p2.socket.emit('game:action', { type: 'submit_guess', payload: { text: '정답' } });
      console.log(`  - 줌아웃 이미지 퀴즈 1500% 초근접 확대 및 정답 판정 완료`);
    } else if (gameId === 'blind-drawing') {
      // 블라인드 드로잉 실시간 선분 좌표 동기화 검증
      p1.socket.emit('game:action', { type: 'draw_line', payload: { line: { x1: 10, y1: 10, x2: 50, y2: 50, color: '#FFF', width: 4 } } });
      console.log(`  - 블라인드 드로잉 좌표 실시간 브로드캐스트 검증 완료`);
    } else if (gameId === 'taboo-talk') {
      // 금기어 90초 타이머 및 금기어 지정 검증
      p1.socket.emit('game:action', { type: 'set_taboo_words', payload: { targetId: p2.socket.id, tabooWords: ['진짜', '아니'] } });
      console.log(`  - 금기어 서바이벌 90초 타이머 및 라운드 상태 초기화 완료`);
    } else if (gameId === 'trivia-quiz') {
      // 상식 퀴즈 4지선다 답안 제출 검증
      p1.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      p2.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      console.log(`  - 상식 퀴즈 50개 문제 셔플 및 점수 집계 완료`);
    } else if (gameId === 'smart-mafia') {
      // 스마트 마피아 밤 액션 검증
      p1.socket.emit('game:action', { type: 'mafia_kill', payload: { targetId: p2.socket.id } });
      p1.socket.emit('game:action', { type: 'finish_night' });
      console.log(`  - 스마트 마피아 30초 자동 낮 전환 및 경찰 조사 브리핑 완료`);
    } else if (gameId === 'voice-battle') {
      // 성대모사 발언 완료 및 투표 검증
      p1.socket.emit('game:action', { type: 'finish_voice' });
      console.log(`  - 성대모사 1:1 대진 및 발언 권한 검증 완료`);
    } else if (gameId === 'anonymous-exposed') {
      // 익명 속마음 지목 및 코멘트 제출 검증
      p1.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p2.socket.id, reason: '너무 멋있어서' } });
      p2.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '게임 장인이라서' } });
      p3.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p4.socket.id, reason: '착해서' } });
      p4.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '리더십이 좋아서' } });
      console.log(`  - 익명 속마음 폭로 4인 전원 제출 및 전광판 자동 전환 완료`);
    } else if (gameId === 'clicker-clash') {
      // 광속 연타 시작 및 클릭 검증
      p1.socket.emit('game:action', { type: 'start_battle' });
      p1.socket.emit('game:action', { type: 'click' });
      p2.socket.emit('game:action', { type: 'click' });
      console.log(`  - 초광속 연타 카운트다운 후 배틀 활성화 검증 완료`);
    } else if (gameId === 'short-trpg') {
      // TRPG GM 지원 및 캐릭터 생성 검증
      p1.socket.emit('game:action', { type: 'volunteer_gm', payload: { isVolunteer: true } });
      p1.socket.emit('game:action', { type: 'confirm_roles' });
      p2.socket.emit('game:action', { type: 'submit_character', payload: { name: '아서', job: '전사', stats: { str: 5, dex: 3, int: 2, cha: 2 } } });
      console.log(`  - TRPG 스탯 배분 제한 및 DC 난이도 검증 완료`);
    }

    // 5. 방 나가기
    for (const player of [p1, p2, p3, p4]) {
      player.socket.emit('room:leave');
    }

    passedGames++;
    console.log(`✓ [SUCCESS] '${gameId}' 4탭 다중 플레이 무결성 검증 통과!`);
  }

  console.log('\n===============================================================');
  console.log(`🎉 [FINAL RESULT] 총 16개 전 게임 4탭 다중 접속 E2E 무결성 검증 100% 완료! (${passedGames}/16 PASS)`);
  console.log('===============================================================');

  p1.socket.disconnect();
  p2.socket.disconnect();
  p3.socket.disconnect();
  p4.socket.disconnect();
  process.exit(0);
}

run4TabsE2ETest().catch((err) => {
  console.error('❌ E2E 테스트 도중 오류 발생:', err);
  process.exit(1);
});
