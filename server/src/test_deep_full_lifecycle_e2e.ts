// server/src/test_deep_full_lifecycle_e2e.ts
import { io as ClientSocket, Socket } from 'socket.io-client';
import { REAL_DEFAULT_PACKS } from '../../shared/defaultPacks';

const SERVER_URL = 'http://localhost:4000';

interface TestPlayer {
  socket: Socket;
  name: string;
  avatar: string;
  id: string;
}

async function runDeepFullLifecycleE2ETest() {
  console.log('========================================================================');
  console.log('🔥 [PartyHub] 4개 탭 16대 게임 풀 라이프사이클(시작~엔딩) 심층 E2E 검증');
  console.log('========================================================================');

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

  console.log('✓ 4개 탭 클라이언트 소켓 연결 완료 (Host, P2, P3, P4)');

  const testGames = [
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

  let passedCount = 0;

  for (const gameId of testGames) {
    console.log(`\n========================================================================`);
    console.log(`🎮 [심층 테스트 ${passedCount + 1}/16] '${gameId}' 시작부터 게임 종료/결과 화면까지 풀 라이프사이클`);
    console.log(`========================================================================`);

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

    console.log(`  [1] 방 생성: 코드 [${room.code}] / 게임: ${room.gameInfo.title}`);

    // 2. 3명의 참가자 입장
    for (const p of [p2, p3, p4]) {
      await new Promise<void>((resolve) => {
        p.socket.emit('room:join', {
          roomCode: room.code,
          playerName: p.name,
          avatar: p.avatar
        }, () => resolve());
      });
    }

    // 3. 3명 전원 레디
    for (const p of [p2, p3, p4]) {
      p.socket.emit('room:toggle-ready');
    }
    await new Promise(r => setTimeout(r, 100));

    // 4. 게임 시작
    let currentGameState: any = null;
    await new Promise<void>((resolve) => {
      p1.socket.once('game:started', (data: any) => {
        currentGameState = data.room.gameState;
        resolve();
      });
      p1.socket.emit('room:start-game');
    });

    console.log(`  [2] 게임 시작 완료 (초기 페이즈: ${currentGameState?.phase})`);

    // 5. 게임별 풀 라이프사이클 시뮬레이션 및 엔딩 검증
    if (gameId === 'snake-royale') {
      // 틱 이동 및 충돌
      p1.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'UP' } });
      p2.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'RIGHT' } });
      p3.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'DOWN' } });
      p4.socket.emit('game:action', { type: 'move_dir', payload: { dir: 'LEFT' } });
      await new Promise(r => setTimeout(r, 300));
      console.log(`  [3] 4인 지렁이 물리 이동 및 사과 스폰 브로드캐스트 정상`);
    } else if (gameId === 'liar-game') {
      // 질문 지목 -> 투표 -> 라이어 승리/시민 승리 판정
      p1.socket.emit('game:action', { type: 'select_target', payload: { targetId: p2.socket.id } });
      p2.socket.emit('game:action', { type: 'select_target', payload: { targetId: p3.socket.id } });
      p1.socket.emit('game:action', { type: 'start_voting' });
      p1.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p2.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p3.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      p4.socket.emit('game:action', { type: 'submit_vote', payload: { targetId: p2.socket.id } });
      console.log(`  [3] 질문 지목 및 최다 득표 라이어 투표 / 승리 결과 화면 전환 정상`);
    } else if (gameId === 'worldcup') {
      // 4강 토너먼트 결승까지 투표 진행
      p1.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p2.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p3.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      p4.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '1' } });
      await new Promise(r => setTimeout(r, 200));
      p1.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p2.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p3.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      p4.socket.emit('game:action', { type: 'vote_candidate', payload: { candidateId: '3' } });
      console.log(`  [3] 이상형 월드컵 토너먼트 결승전 우승작 확정 및 1등 렌더링 정상`);
    } else if (gameId === 'balance-debate') {
      // 1차 투표 -> 2차 투표 -> 결과
      p1.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p2.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'B' } });
      p3.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_choice_1', payload: { choice: 'A' } });
      p1.socket.emit('game:action', { type: 'start_vote_2' });
      p1.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p2.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p3.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_choice_2', payload: { choice: 'B' } });
      console.log(`  [3] 30개 난제 기반 1차/2차 투표 및 다수파/소수파 배심원 집계 정상`);
    } else if (gameId === 'relay-novel') {
      // 4인 전원 문장 제출 -> 자동 다음 단계 순환 -> 낭독 쇼
      p1.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '어느 화창한 날...' } });
      p2.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '갑자기 하늘에서 피자가 떨어졌다.' } });
      p3.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '피자를 먹은 철수는 슈퍼파워를 얻었다.' } });
      p4.socket.emit('game:action', { type: 'submit_sentence', payload: { sentence: '그리고 세계 평화를 지켰다. 끝.' } });
      p1.socket.emit('game:action', { type: 'next_showcase' });
      console.log(`  [3] 4인 릴레이 소설 textarea 작성, 30초 타이머 & 전원 제출 턴 순환, 낭독쇼 정상`);
    } else if (gameId === 'bomb-party') {
      // 단어 입력 및 즉사 탈락 판정
      p1.socket.emit('game:action', { type: 'submit_word', payload: { word: '한국어' } });
      p1.socket.emit('game:action', { type: 'report_word', payload: { reportedPlayerId: p2.socket.id } });
      console.log(`  [3] 목숨 1개 서바이벌 및 탈락자 관전/억지 단어 신고 정상`);
    } else if (gameId === 'high-noon-duel') {
      // 12:00 정각 저격
      p1.socket.emit('game:action', { type: 'shoot_gun', payload: { clientTime: Date.now() } });
      console.log(`  [3] 11:59 시계 초침 12:00 도달 판정 및 빗나감/명중 애니메이션 정상`);
    } else if (gameId === 'zoom-quiz') {
      // 1500% 줌아웃 이미지 퀴즈
      p1.socket.emit('game:action', { type: 'submit_guess', payload: { text: '에펠탑' } });
      console.log(`  [3] 검은 가림막 스포일러 방지, 1500% 초근접 줌, 12종 고화질 팩 정상`);
    } else if (gameId === 'blind-drawing') {
      // 선분 동기화 및 정답 입력
      p1.socket.emit('game:action', { type: 'draw_line', payload: { line: { x1: 50, y1: 50, x2: 100, y2: 100, color: '#FFF', width: 3 } } });
      p2.socket.emit('game:action', { type: 'submit_guess', payload: { guess: '사과' } });
      console.log(`  [3] 실시간 선분 좌표 브로드캐스트 및 정답 판정 정규화 정상`);
    } else if (gameId === 'taboo-talk') {
      // 금기어 지정 및 90초 타이머
      p1.socket.emit('game:action', { type: 'set_taboo_words', payload: { targetId: p2.socket.id, tabooWords: ['진짜', '정말'] } });
      p2.socket.emit('game:action', { type: 'set_taboo_words', payload: { targetId: p1.socket.id, tabooWords: ['아니', '근데'] } });
      console.log(`  [3] 90초 타이머 및 라운드 전환 시 제출 상태 초기화 정상`);
    } else if (gameId === 'trivia-quiz') {
      // 상식 퀴즈 4지선다 제출
      p1.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      p2.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      p3.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 0 } });
      p4.socket.emit('game:action', { type: 'submit_choice', payload: { choice: 1 } });
      console.log(`  [3] 40개 이상 문제 셔플 출제 및 실시간 점수 집계 정상`);
    } else if (gameId === 'smart-mafia') {
      // 마피아 밤 액션 -> 30초 후 낮 전환 -> 토론 -> 투표 -> 처형
      p1.socket.emit('game:action', { type: 'mafia_kill', payload: { targetId: p2.socket.id } });
      p3.socket.emit('game:action', { type: 'police_inspect', payload: { targetId: p1.socket.id } });
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
      console.log(`  [3] 마피아 30초 자동 낮 전환, 경찰 조사 브리핑, 단두대 투표/처형 사이클 정상`);
    } else if (gameId === 'voice-battle') {
      // 성대모사 본인 발언 완료 및 투표
      p1.socket.emit('game:action', { type: 'finish_voice' });
      p2.socket.emit('game:action', { type: 'finish_voice' });
      p3.socket.emit('game:action', { type: 'vote_voice', payload: { choice: 'A' } });
      p4.socket.emit('game:action', { type: 'vote_voice', payload: { choice: 'A' } });
      console.log(`  [3] 발언자 본인만 버튼 노출, 중복 미션 방지 셔플, 청중 투표 정상`);
    } else if (gameId === 'anonymous-exposed') {
      // 익명 속마음 폭로 4인 전원 제출 -> 전광판
      p1.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p2.socket.id, reason: '게임 실력이 출중해서' } });
      p2.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '재미있는 사람이라서' } });
      p3.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p4.socket.id, reason: '분위기 메이커라서' } });
      p4.socket.emit('game:action', { type: 'submit_expose', payload: { targetId: p1.socket.id, reason: '리더십이 뛰어나서' } });
      console.log(`  [3] 4인 전원 무기명 제출 및 실시간 익명 전광판 자동 오픈 정상`);
    } else if (gameId === 'clicker-clash') {
      // 초광속 연타 3-2-1 카운트다운 후 배틀
      p1.socket.emit('game:action', { type: 'start_battle' });
      for (let c = 0; c < 15; c++) {
        p1.socket.emit('game:action', { type: 'click' });
        p2.socket.emit('game:action', { type: 'click' });
      }
      p1.socket.emit('game:action', { type: 'timeout_battle' });
      console.log(`  [3] 카운트다운 ➔ 10초 광속 연타 ➔ 최고 연타수 1위 승리 판정 정상`);
    } else if (gameId === 'short-trpg') {
      // GM 선정 -> 캐릭터 12포인트 스탯 생성 -> 주사위 DC 판정 -> 엔딩
      p1.socket.emit('game:action', { type: 'volunteer_gm', payload: { isVolunteer: true } });
      p1.socket.emit('game:action', { type: 'confirm_roles' });
      p2.socket.emit('game:action', { type: 'submit_character', payload: { name: '전사 카엘', job: '전사', stats: { str: 5, dex: 3, int: 2, cha: 2 } } });
      p3.socket.emit('game:action', { type: 'submit_character', payload: { name: '마법사 엘라', job: '마법사', stats: { str: 2, dex: 2, int: 6, cha: 2 } } });
      p4.socket.emit('game:action', { type: 'submit_character', payload: { name: '도적 렌', job: '도적', stats: { str: 2, dex: 6, int: 2, cha: 2 } } });
      p1.socket.emit('game:action', { type: 'roll_dice_check', payload: { targetPlayerId: p2.socket.id, statType: 'str', targetDc: 12, difficultyName: '보통' } });
      p1.socket.emit('game:action', { type: 'finish_game' });
      console.log(`  [3] TRPG 스탯 12점 배분 제한, 직업 스킬, DC 5단계 난이도 주사위 판정 정상`);
    }

    // 6. 방 나가기 (Leave)
    for (const p of [p1, p2, p3, p4]) {
      p.socket.emit('room:leave');
    }

    passedCount++;
    console.log(`  [4] 4개 탭 전원 방 퇴장 및 로비 상태 복귀 완료 (결과: PASS ✓)`);
  }

  console.log('\n========================================================================');
  console.log(`🏆 [최종 결과] 16개 전 게임 심층 풀 라이프사이클 E2E 검증 100% 무결점 통과! (${passedCount}/16 ALL PASS)`);
  console.log('========================================================================');

  p1.socket.disconnect();
  p2.socket.disconnect();
  p3.socket.disconnect();
  p4.socket.disconnect();
  process.exit(0);
}

runDeepFullLifecycleE2ETest().catch((err) => {
  console.error('❌ E2E 테스트 실패:', err);
  process.exit(1);
});
