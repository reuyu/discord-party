// shared/gamesData.ts
import { GameInfo } from './types';

export const INITIAL_GAMES: GameInfo[] = [
  // 1. 라이어 게임 (커스텀 팩 지원)
  {
    id: 'liar-game',
    title: '질문! 라이어 게임',
    subtitle: '시민들 속 거짓말쟁이를 찾아라',
    description: '원탁에 둘러앉아 지목형 질문 릴레이! 라이어는 제시어를 눈치채고 정답을 맞혀 역전할 수 있을까요?',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 10,
    estimatedMinutes: 15,
    category: 'deduction',
    tags: ['추리', '심리', '원탁UI', '디스코드필수'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#EC4899',
    rulesOverview: [
      '라이어를 제외한 모든 플레이어에게 비밀 제시어가 주어집니다.',
      '첫 질문자부터 원하는 대상을 지목하여 힌트 질문을 주고받습니다.',
      '라이어는 게임 도중 언제든 [정답 맞히기]로 즉시 역전 승리가 가능합니다.',
      '모든 발언 후 화살표 지목 투표로 라이어를 검거합니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 45 }
  },

  // 2. 초성 퀴즈 배틀 (커스텀 팩 불필요 - 인게임 출제)
  {
    id: 'chosung-quiz',
    title: '⏱️ 초성 퀴즈 배틀',
    subtitle: '순서대로 출제자 턴! 스피드 단어 맞히기',
    description: '출제자가 카테고리와 키워드를 내면 초성이 공개됩니다. 절반(50%)이 맞혀야 출제자가 최대 점수를 얻는 황금 밸런스 퀴즈!',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 100,
    estimatedMinutes: 20,
    category: 'quiz',
    tags: ['초성', '스피드퀴즈', '출제자배틀', '대규모'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#3B82F6',
    rulesOverview: [
      '돌아가며 1명이 출제자가 되어 카테고리와 정답 단어를 직접 입력합니다.',
      '채팅창에 초성 정답을 선착순으로 입력해 점수를 획득합니다.',
      '출제자는 정답자가 전체의 약 50%일 때 최고 점수를 획득합니다.',
      '전체 참가자가 PASS 투표 시 출제자 0점 및 다음 턴으로 스킵됩니다.'
    ],
    defaultSettings: { rounds: 5, timeLimitSec: 45 }
  },

  // 3. 실시간 이상형 월드컵 (커스텀 팩 필수)
  {
    id: 'worldcup',
    title: '🏆 실시간 이상형 월드컵',
    subtitle: '모두가 함께 투표하는 토너먼트 배틀',
    description: '디스코드 친구들과 1:1 매치업을 보며 실시간 투표! 8강부터 128강까지 다양한 커스텀 이미지 팩 지원.',
    thumbnail: '/images/worldcup_thumb.jpg',
    minPlayers: 2,
    maxPlayers: 100,
    estimatedMinutes: 15,
    category: 'tournament',
    tags: ['투표', '월드컵', '토너먼트', '커스텀팩', '대규모'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#F59E0B',
    rulesOverview: [
      '2개의 후보가 화면에 등장하며 제한시간 내에 A 또는 B를 투표합니다.',
      '실시간 득표율 게이지가 변동되며 다수결로 다음 라운드에 진출합니다.',
      '동점 시 방장 선택 또는 무작위 룰이 적용됩니다.',
      '결승전 승자가 가려지면 우승 세레머니가 펼쳐집니다.'
    ],
    defaultSettings: { rounds: 16, timeLimitSec: 15 }
  },

  // 4. 꼬리잡기 배틀로얄 (커스텀 팩 불필요 - 실시간 액션)
  {
    id: 'snake-royale',
    title: '🐍 꼬리잡기 배틀로얄',
    subtitle: '스네이크 서바이벌! 최후의 지렁이 1인',
    description: '사과를 먹고 몸집을 키우며 상대 머리를 내 몸통에 부딪히게 만드세요! 자기장이 좁혀오는 극강의 배틀로얄.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 12,
    estimatedMinutes: 5,
    category: 'action',
    tags: ['스네이크', '피지컬', '배틀로얄', '서바이벌'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#10B981',
    rulesOverview: [
      'WASD 또는 방향키로 지렁이를 조작하여 사과를 먹고 길어집니다.',
      '상대 머리가 내 몸통에 닿으면 상대가 폭발 사망하며 사과를 드랍합니다.',
      '시간이 지나면 외곽부터 붉은 자기장이 좁혀옵니다.',
      '최후까지 살아남는 1인이 라운드를 승리합니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 180 }
  },

  // 5. 극한의 밸런스 토론 배틀 (커스텀 팩 지원)
  {
    id: 'balance-debate',
    title: '⚖️ 극한의 밸런스 토론 배틀',
    subtitle: '인터넷 커뮤니티 전설의 밸런스 난제 총집합',
    description: '깻잎논쟁, 100억 vs 평생 살기, 똥맛 카레 vs 카레맛 똥! 실시간 진영 분리와 1분 음성 토론 후 마음 바꾸기 찬스.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 50,
    estimatedMinutes: 15,
    category: 'casual',
    tags: ['밸런스', '토론', '아이스브레이킹', '깻잎논쟁'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#8B5CF6',
    rulesOverview: [
      '실제 화제의 밸런스 질문(A vs B)이 제시되고 비밀 투표를 진행합니다.',
      '투표 비율과 함께 참가자들이 A/B 진영으로 나뉘어 표시됩니다.',
      '디스코드 음성으로 치열한 토론 후 5초간 마음 바꾸기 재투표를 진행합니다.'
    ],
    defaultSettings: { rounds: 10, timeLimitSec: 60 }
  },

  // 6. 스마트 마피아 파티 (커스텀 팩 불필요 - 시스템 역할 덱)
  {
    id: 'smart-mafia',
    title: '🌙 스마트 마피아 파티',
    subtitle: '사회자 없이 웹이 진행하는 초스피드 마피아',
    description: '밤 암살/조사/치료부터 낮 토론과 단두대 찬반 처형까지 웹 시스템이 알아서 척척 진행해주는 스마트 마피아!',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    minPlayers: 4,
    maxPlayers: 20,
    estimatedMinutes: 20,
    category: 'deduction',
    tags: ['마피아', '노MC', '심리전', '역할배정', '대규모'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#EF4444',
    rulesOverview: [
      '시스템이 시민, 마피아, 의사, 경찰 등 직업을 비밀리에 자동 배정합니다.',
      '밤: 마피아 암살 투표, 의사 치료, 경찰 조사가 비공개 진행됩니다.',
      '낮: 밤 사망자 발표 후 음성 토론 및 실시간 처형 찬반 투표가 진행됩니다.'
    ],
    defaultSettings: { rounds: 1, timeLimitSec: 90 }
  },

  // 7. 썰풀기 룰렛 & 벌칙 대결 (커스텀 팩 지원)
  {
    id: 'story-roulette',
    title: '🎡 썰풀기 룰렛 & 벌칙 대결',
    subtitle: '룰렛으로 썰 풀 사람과 흑역사 주제 추첨!',
    description: '타겟 룰렛 ➔ 썰 주제(흑역사, 소름, 첫사랑) ➔ 청중 꿀잼/노잼 투표! 썰을 패스하거나 탈락하면 아찔한 벌칙 룰렛 발동.',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 30,
    estimatedMinutes: 20,
    category: 'casual',
    tags: ['토크', '룰렛', '벌칙', '흑역사', '예능'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#F43F5E',
    rulesOverview: [
      '1차 룰렛으로 썰을 풀 참가자를 무작위 추첨합니다.',
      '2차 룰렛으로 흑역사/첫사랑/공포 등 썰 주제를 뽑습니다.',
      '썰 종료 후 청중들이 [꿀잼] vs [노잼] 투표를 진행합니다.',
      '패스 또는 노잼 판정 시 3차 벌칙 룰렛(디코 프사 변경 등)이 발동합니다.'
    ],
    defaultSettings: { rounds: 5, timeLimitSec: 120 }
  },

  // 8. 성대모사 1:1 토너먼트 (커스텀 팩 지원)
  {
    id: 'voice-battle',
    title: '🎙️ 성대모사 1:1 토너먼트',
    subtitle: '캐릭터 원본 음성을 듣고 맞불 싱크로율 대결!',
    description: '1:1 대진표 매칭 후 타짜, 롤, 애니, 밈 대사 원본을 듣고 마이크로 성대모사! 관전자들의 실시간 블라인드 투표 배틀.',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 30,
    estimatedMinutes: 15,
    category: 'casual',
    tags: ['성대모사', '오디션', '보이스배틀', '예능'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#6366F1',
    rulesOverview: [
      '1:1 토너먼트 대진표가 편성되고 미션 캐릭터와 대사 음성이 재생됩니다.',
      '두 참가자가 차례대로 마이크로 성대모사를 진행합니다.',
      '다른 모든 관전자들이 실시간으로 더 뛰어난 참가자에게 투표합니다.'
    ],
    defaultSettings: { rounds: 4, timeLimitSec: 10 }
  },

  // 9. 릴레이 막장 소설 (커스텀 팩 불필요 - 100% 플레이어 릴레이 창작)
  {
    id: 'relay-novel',
    title: '✍️ 릴레이 막장 소설',
    subtitle: '갈틱폰 텍스트 버전! 앞사람 문장 이어쓰기',
    description: '앞사람이 쓴 기상천외한 문장을 이어받아 한 문장씩 작성! 마지막에 한 편씩 슬라이드쇼로 공개되는 대환장 명작 감상.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 12,
    estimatedMinutes: 15,
    category: 'drawing',
    tags: ['창작', '소설', '갈틱폰류', '릴레이', '막장스토리'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#14B8A6',
    rulesOverview: [
      '전원 동시에 소설의 첫 문장을 작성합니다.',
      '작성된 글이 릴레이로 전달되며 직전 문장을 보고 다음 문장을 이어 씁니다.',
      '모든 완성이 끝나면 화면에 슬라이드쇼로 한 편씩 공개되며 음성 낭독을 진행합니다.'
    ],
    defaultSettings: { rounds: 6, timeLimitSec: 45 }
  },

  // 10. 폭탄 돌리기 단어 폭파 배틀 (커스텀 팩 불필요 - 즉석 단어 입력 순발력 배틀)
  {
    id: 'bomb-party',
    title: '💣 폭탄 돌리기 단어 폭파 배틀',
    subtitle: '시한폭탄 째깍째깍! 글자 포함 단어 입력 패스',
    description: '폭탄을 든 사람에게 무작위 글자가 제시됩니다. 올바른 단어를 입력해 폭탄을 넘기세요! 터지면 목숨 감소 탈락.',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 16,
    estimatedMinutes: 10,
    category: 'quiz',
    tags: ['폭탄돌리기', '순발력', '단어퀴즈', '긴장감'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#EA580C',
    rulesOverview: [
      '폭탄을 든 사람에게 제시된 글자(예: [도])가 들어간 단어를 입력해야 폭탄이 넘어갑니다.',
      '무작위 타이머가 끝나 폭탄이 터지면 하트가 1개 차감됩니다.',
      '끝까지 살아남는 최후의 1인이 승리합니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 15 }
  },

  // 11. 익명 속마음 폭로 배틀 (커스텀 팩 지원)
  {
    id: 'anonymous-exposed',
    title: '🎭 익명 속마음 폭로 배틀',
    subtitle: '무기명 지목과 충격적인 익명 한 줄 코멘트',
    description: '"우리 중 가장 겉과 속이 다를 것 같은 사람은?" 무기명 투표와 익명 폭로 코멘트가 전광판에 롤링 공개되는 파티 게임.',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 30,
    estimatedMinutes: 15,
    category: 'casual',
    tags: ['심리', '익명투표', '우정파괴', '디코방폭파'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#A855F7',
    rulesOverview: [
      '매 라운드 흥미진진한 지목 질문이 주어집니다.',
      '비밀리에 1명을 지목하고 익명 이유를 한 줄 작성합니다.',
      '최다 득표자와 함께 익명 코멘트들이 전광판에 공개됩니다.'
    ],
    defaultSettings: { rounds: 5, timeLimitSec: 45 }
  },

  // 12. 서부의 결투 12:00 정각 저격 배틀 (커스텀 팩 불필요 - 피지컬)
  {
    id: 'high-noon-duel',
    title: '🤠 서부의 결투 12:00 정각 저격',
    subtitle: '시계가 12:00 정각을 가리키는 찰나 발사!',
    description: '아날로그 시계가 째깍거리다 12:00 정각이 되는 순간 0.001초 선착순 발사! 12시 이전 부정출발 시 빗나감(Miss) 패배.',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 30,
    estimatedMinutes: 10,
    category: 'action',
    tags: ['피지컬', '반응속도', '배틀로얄', '서부극', '긴장감'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#D97706',
    rulesOverview: [
      '전원 원형 배치되며 실시간 마우스 조준선(눈치 싸움)이 동기화됩니다.',
      '12:00 이전 클릭 시 총알이 빗나가며 패배합니다.',
      '12:00 정각 이후 발사하여 상대를 사살(킬 시 재장전)하고 최후의 1인이 승리합니다.'
    ],
    defaultSettings: { rounds: 1, timeLimitSec: 10 }
  },

  // 13. 초광속 연타 배틀 (커스텀 팩 불필요 - 피지컬)
  {
    id: 'clicker-clash',
    title: '⚡ 초광속 연타 배틀',
    subtitle: '줄다리기 & 광란의 CPS 스피드 연타 난투',
    description: '1:1 줄다리기 밀고 당기기 및 전원 단체 연타 대결! 화염 오라와 피버 타임으로 손가락 피지컬의 한계를 시험하세요.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 20,
    estimatedMinutes: 5,
    category: 'action',
    tags: ['연타', '피지컬', '줄다리기', '초스피드'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#EAB308',
    rulesOverview: [
      '제한시간 동안 스페이스바 또는 화면 버튼을 미친 듯이 연타합니다.',
      '1:1 줄다리기 모드에서는 상대를 구덩이에 빠뜨리면 승리합니다.',
      '피버 타임 발동 시 2배 타수 보너스가 적용됩니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 7 }
  },

  // 15. 줌아웃 이미지 퀴즈 (커스텀 팩 지원)
  {
    id: 'zoom-quiz',
    title: '🔍 줌아웃 이미지 퀴즈',
    subtitle: '500% 초근접 확대에서 서서히 축소되는 사진',
    description: '극도로 확대된 이미지의 일부분이 서서히 줌아웃됩니다. 형태를 가장 먼저 알아채고 스피드 정답을 맞히세요!',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 50,
    estimatedMinutes: 15,
    category: 'quiz',
    tags: ['줌아웃', '이미지퀴즈', '관찰력', '스피드'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#06B6D4',
    rulesOverview: [
      '500% 초근접 확대한 이미지의 일부분에서 시작합니다.',
      '15초 동안 서서히 줌아웃되며 일찍 맞힐수록 높은 점수를 얻습니다.',
      '무작위 도배 방지를 위해 오답 입력 시 2초 쿨타임이 적용됩니다.'
    ],
    defaultSettings: { rounds: 10, timeLimitSec: 15 }
  },

  // 16. 더 지니어스: 흑과 백 (커스텀 팩 불필요 - 1:1 심리 카드)
  {
    id: 'black-and-white',
    title: '🃏 더 지니어스: 흑과 백',
    subtitle: '0~8 타일 숫자 카운팅 & 비공개 심리전',
    description: '《더 지니어스》의 전설적인 1:1 심리 게임! 흑(짝수)/백(홀수) 색상만 공개한 채 숫자를 비공개로 겨뤄 먼저 5승을 쟁취하세요.',
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 8,
    category: 'deduction',
    tags: ['지니어스', '두뇌게임', '심리전', '1대1', '카드배틀'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#475569',
    rulesOverview: [
      '0~8 타일 9장을 보유하며 흑(짝수)과 백(홀수)으로 구분됩니다.',
      '선공이 낸 타일의 색상만 확인한 후 후공이 대응 타일을 제시합니다.',
      '더 큰 숫자를 낸 쪽이 1점을 얻으며, 사용된 숫자는 끝까지 비공개됩니다.'
    ],
    defaultSettings: { rounds: 9, timeLimitSec: 30 }
  },

  // 18. 블라인드 눈감고 드로잉 (커스텀 팩 지원)
  {
    id: 'blind-drawing',
    title: '🙈 블라인드 눈감고 드로잉',
    subtitle: '출제자 캔버스는 암전! 풀이자만 보는 대환장 괴작',
    description: '출제자는 캔버스가 새까맣게 가려진 상태에서 감으로만 그림을 그리고, 풀이자는 실시간으로 그려지는 기괴한 그림을 맞힙니다.',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 12,
    estimatedMinutes: 15,
    category: 'drawing',
    tags: ['드로잉', '블라인드', '웃음보장', '캐주얼'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#10B981',
    rulesOverview: [
      '출제자에게만 비밀 제시어가 주어지며, 그리는 동안 출제자 화면은 암전됩니다.',
      '풀이자 화면에만 실시간으로 괴작 궤적이 렌더링되며 채팅으로 맞힙니다.',
      '맞힌 풀이자와 출제자 모두에게 점수가 부여됩니다.'
    ],
    defaultSettings: { rounds: 5, timeLimitSec: 45 }
  },

  // 19. 가짜 화가 찾기 (커스텀 팩 지원)
  {
    id: 'fake-artist',
    title: '🎭 가짜 화가 찾기',
    subtitle: '제시어를 모르는 1명의 가짜와 한 획 릴레이',
    description: '모두가 비밀 제시어를 알고 정확히 한 획(1 stroke)씩 번갈아 그리는데, 오직 1명만 모르는 가짜 화가! 가짜를 지목해 검거하세요.',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 10,
    estimatedMinutes: 15,
    category: 'drawing',
    tags: ['드로잉', '마피아류', '블러핑', '추리'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#6366F1',
    rulesOverview: [
      '1명만 가짜 화가로 배정되며, 나머지는 제시어를 알고 시작합니다.',
      '순서대로 마우스를 떼지 않고 정확히 한 획씩만 이어 그립니다.',
      '2바퀴 종료 후 가짜 화가 지목 투표를 진행하며, 가짜는 정답 맞히기 역전이 가능합니다.'
    ],
    defaultSettings: { rounds: 2, timeLimitSec: 10 }
  },

  // 20. 절대 금기어 배틀 (커스텀 팩 불필요 - 인게임 플레이어 상호 금기어 지정)
  {
    id: 'taboo-talk',
    title: '🚫 절대 금기어 배틀',
    subtitle: '내 머리 위의 금기어를 상대가 말하게 유도하라!',
    description: '내 머리 위에만 물음표로 가려진 금기어가 배정됩니다. 일상 토크를 나누며 유도신문을 던져 상대를 함정에 빠뜨리세요.',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80',
    minPlayers: 3,
    maxPlayers: 12,
    estimatedMinutes: 10,
    category: 'casual',
    tags: ['금기어', '토크', '함정', '심리전'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: false,
    accentColor: '#EC4899',
    rulesOverview: [
      '각자 자신은 볼 수 없고 남들만 볼 수 있는 금기어가 머리 위에 배정됩니다.',
      '토크 주제로 대화를 나누며 상대가 금기어를 말하도록 유도합니다.',
      '상대가 금기어를 말하면 [적발] 버튼을 눌러 하트를 차감시킵니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 180 }
  },

  // 21. 3초 룰 뇌정지 스피드 (커스텀 팩 지원)
  {
    id: 'five-sec-rule',
    title: '⏱️ 3초 룰 뇌정지 스피드',
    subtitle: '3초 안에 미션 단어 3개 연속 발음!',
    description: '"치킨 브랜드 3개!", "헤어질 때 핑계 3개!" 3초 모래시계가 떨어지기 전에 마이크로 외치지 못하면 땡! 뇌정지 스피드 퀴즈.',
    thumbnail: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 15,
    estimatedMinutes: 15,
    category: 'quiz',
    tags: ['순발력', '3초룰', '말실수', '스피드퀴즈'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#3B82F6',
    rulesOverview: [
      '전원 동시에 텍스트 답변을 제출하며 최선착 답변이 공개됩니다.',
      '3초 게이지 카운트다운 동안 청중들이 [👍 인정] vs [👎 노인정] 투표를 진행합니다.',
      '3초 종료 시 수동 클릭 없이 자동으로 다음 문제로 전환됩니다.'
    ],
    defaultSettings: { rounds: 3, timeLimitSec: 3 }
  },

  // 22. 서바이벌 상식 퀴즈 쇼 (커스텀 팩 지원)
  {
    id: 'trivia-quiz',
    title: '🎓 서바이벌 상식 퀴즈 쇼',
    subtitle: '1대1, 개인전, 레드vs블루 팀전 지식 배틀!',
    description: '역사, 과학, 시사, 영화, 넌센스 총집합! 1:1 토너먼트, 전원 서바이벌 개인전, 레드 vs 블루 팀전까지 모두 지원하는 정통 퀴즈 쇼.',
    thumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80',
    minPlayers: 2,
    maxPlayers: 100,
    estimatedMinutes: 20,
    category: 'quiz',
    tags: ['상식퀴즈', '1대1', '개인전', '팀전', '지식배틀', '대규모'],
    isPopular: false,
    isNew: false,
    playCount: 0,
    hasCustomPack: true,
    accentColor: '#2563EB',
    rulesOverview: [
      '개인전, 1:1 토너먼트, 레드vs블루 팀전 중 모드를 선택합니다.',
      '4지선다 또는 단답형 문제가 출제되며 15초 내에 정답을 제출합니다.',
      '정답 속도에 따라 보너스 점수가 부여되며 실시간 해설이 제공됩니다.',
      '오답 시 2초 쿨타임 또는 감점 페널티가 적용됩니다.'
    ],
    defaultSettings: { rounds: 10, timeLimitSec: 15, mode: 'individual' }
  }
];

export const GENRE_FILTERS = [
  { id: 'all', label: '# 전체', category: 'all' as const },
  { id: 'quiz', label: '# 퀴즈/상식/스피드', category: 'quiz' as const },
  { id: 'deduction', label: '# 추리/심리', category: 'deduction' as const },
  { id: 'tournament', label: '# 투표/월드컵', category: 'tournament' as const },
  { id: 'action', label: '# 피지컬/액션', category: 'action' as const },
  { id: 'drawing', label: '# 드로잉/창작', category: 'drawing' as const },
  { id: 'casual', label: '# 토론/토크/친목', category: 'casual' as const },
  { id: 'roleplay', label: '# TRPG/상황극', category: 'roleplay' as const },
];

export const PLAYER_COUNT_FILTERS = [
  { id: 'all', label: '전체' },
  { id: '2-4', label: '2~4인' },
  { id: '5-8', label: '5~8인' },
  { id: '9+', label: '9인 이상 (대규모)' },
];

export const DEFAULT_AVATARS = [
  '🦊', '🐱', '🐶', '🐼', '🐯', '🦁', '🐸', '🐵', 
  '🦄', '🐙', '👾', '🤖', '👻', '🧙‍♂️', '🥷', '🧑‍🚀'
];

export const RANDOM_NICKNAMES = [
  '신속한고양이', '졸린판다', '폭풍여우', '게임마스터', '디코의제왕',
  '용감한사자', '빛나는별', '천재추리러', '스피드러너', '파티피플',
  '피자매니아', '새벽감성', '귀여운오리', '장난꾸러기', '행복한쿼카'
];
