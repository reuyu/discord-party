// client/src/components/PackSelectModal.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, ArrowRight, Package, UploadCloud, CheckCircle2, User, Sparkles, FileText, Code2, ThumbsUp, Globe } from 'lucide-react';
import { GameInfo, CustomPack, SupportedLanguage } from '../../../shared/types';
import { DEFAULT_AVATARS, getLocalizedGame } from '../../../shared/gamesData';
import { getDefaultPacksForGame } from '../../../shared/multilingualPacks';
import { useLanguage } from '../i18n/LanguageContext';
import { socket } from '../socket';

interface PackSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameInfo | null;
  initialPackTitle?: string;
  onConfirmCreateRoom?: (data: { gameId: string; packId?: string; packTitle?: string; customPackData?: any; playerName: string; avatar: string }) => void;
  onConfirmSelectPack?: (data: { packId?: string; packTitle?: string; customPackData?: any }) => void;
}

// 12개 팩 사용 게임별 특화 템플릿 및 입력 형식 가이드
const GAME_PACK_TEMPLATES: Record<string, {
  title: string;
  category: string;
  formatHint: string;
  defaultContent: string;
  placeholder: string;
}> = {
  'liar-game': {
    title: '동아리 MT 음식 & 야식 팩',
    category: '음식 / 야식',
    formatHint: '한 줄에 제시어 단어를 하나씩 입력하세요.',
    defaultContent: `치킨
피자
떡볶이
삼겹살
짜장면
초밥
햄버거
라면
김밥
탕수육`,
    placeholder: '치킨\n피자\n떡볶이...'
  },
  'worldcup': {
    title: '2026 내 마음속 최고의 야식 8강',
    category: '음식 월드컵',
    formatHint: '한 줄에 후보명을 입력하세요. (선택: 후보명 | 이미지URL)',
    defaultContent: `바삭한 후라이드 치킨 | https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=800
치즈 폭포 페퍼로니 피자 | https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=800
매콤달콤 쌀 떡볶이 | https://plus.unsplash.com/premium_photo-1700161711824-1b28505a8d32?w=800
쫄깃한 한방 족발 | https://plus.unsplash.com/premium_photo-1723575685216-6dab84c3fd23?w=800
지글지글 삼겹살 구이 | https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800
얼큰한 차돌 짬뽕 | https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=800
불맛 가득 직화 닭발 | https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?w=800
수제 더블 치즈버거 | https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=800`,
    placeholder: '후보명 또는 후보명 | 이미지URL'
  },
  'balance-debate': {
    title: '연인 & 우정 극단적 밸런스 게임 팩',
    category: '연애 / 우정',
    formatHint: '한 줄에 [선택A vs 선택B] 형식으로 입력하세요.',
    defaultContent: `내 애인이 내 절친 깻잎 떼어주기 vs 내 절친이 내 애인 깻잎 떼어주기
평생 탄산음료 없이 살기 vs 평생 라면 없이 살기
100억 받고 스마트폰 평생 금지 vs 지금처럼 자유롭게 살기
과거로 시간여행 가기 vs 미래로 시간여행 가기
여름에 에어컨 없이 살기 vs 겨울에 난방 없이 살기`,
    placeholder: '선택지 A vs 선택지 B'
  },
  'zoom-quiz': {
    title: '우리 주변 일상 사물 줌 퀴즈 팩',
    category: '사물 / 퀴즈',
    formatHint: '한 줄에 [정답 | 이미지URL] 형식으로 입력하세요. (이미지 URL 생략 시 사물 기본 이미지 자동 매칭)',
    defaultContent: `피자 | https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800
사과 | https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800
스마트폰 | https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800
농구공 | https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800`,
    placeholder: '정답 | 이미지URL'
  },
  'blind-drawing': {
    title: '상상력 폭발 동물 & 사물 드로잉 팩',
    category: '드로잉 / 상상',
    formatHint: '한 줄에 그림 제시어를 하나씩 입력하세요.',
    defaultContent: `스케이트보드 타는 기린
선글라스 낀 판다
우주복을 입은 고양이
피자 먹는 티라노사우루스
커피 마시는 외계인
헤드폰 끼고 춤추는 원숭이
잠수함 운전하는 문어`,
    placeholder: '스케이트보드 타는 기린...'
  },
  'voice-battle': {
    title: '레전드 인터넷 밈 & 명대사 성대모사 팩',
    category: '밈 / 명대사',
    formatHint: '한 줄에 [캐릭터 | 대사 | 연기 힌트 | 음원URL(선택)] 형식으로 입력하세요.',
    defaultContent: `야인시대 김두한 | 사딸라! 4달러로 합시다! | 협상의 달인 김영철 | /audio/voice-battle/saddalra.mp3
괴물쥐 | 말대꾸 하지마! | 찰진 버럭 호통 | /audio/voice-battle/maldaeggu.mp3
오징어 게임 영희 | 무궁화 꽃이 피었습니다 | 서늘한 인형 목소리 | /audio/voice-battle/squid_mugunghwa.mp3
싸이 (PSY) | 오빤 강남스타일! | 전설의 시그니처 샤우팅 | /audio/voice-battle/gangnam_style.mp3
롤 야스오 | 소리에게돈! (최후의 숨결) | 바람을 가르는 궁극기 | /audio/voice-battle/yasuo_soriegeton.mp3`,
    placeholder: '캐릭터 | 대사 | 연기 힌트 | 음원URL(선택)'
  },
  'five-sec-rule': {
    title: '순발력 테스트 5초 챌린지 팩',
    category: '순발력 / 퀴즈',
    formatHint: '한 줄에 5초 룰 질문을 하나씩 입력하세요.',
    defaultContent: `치킨 브랜드 3가지!
지하철 2호선 역 3개!
빨간색 과일 3가지!
우리나라 광역시 3곳!
편의점 컵라면 3개!
국내 프로야구 구단 3개!
여름에 생각나는 음식 3가지!`,
    placeholder: '치킨 브랜드 3가지!...'
  },
  'trivia-quiz': {
    title: '흥미진진 상식 & 넌센스 퀴즈 팩',
    category: '상식 / 넌센스',
    formatHint: '한 줄에 [문제 | 보기1, 보기2, 보기3, 보기4 | 정답번호(1~4) | 해설] 형식으로 입력하세요.',
    defaultContent: `대한민국의 수도는 어디일까요? | 부산, 서울, 제주, 대구 | 2 | 대한민국의 수도는 서울특별시입니다.
세계에서 가장 큰 바다는? | 태평양, 대서양, 인도양, 북극해 | 1 | 태평양이 전 세계 바다 면적의 약 절반을 차지합니다.
1년 중 날수가 가장 적은 달은? | 1월, 2월, 4월, 11월 | 2 | 2월은 평년 28일, 윤년 29일입니다.
빛의 속도와 소리의 속도 중 더 빠른 것은? | 빛, 소리, 동일함, 매질에 따라 다름 | 1 | 빛은 초당 약 30만 km를 이동하여 소리보다 훨씬 빠릅니다.`,
    placeholder: '문제 | 보기1, 보기2, 보기3, 보기4 | 정답번호(1~4) | 해설'
  },
  'story-roulette': {
    title: '엠티 & 술자리 썰풀기 & 벌칙 팩',
    category: '썰풀기 / 토크',
    formatHint: '# 주제 와 # 벌칙 섹션으로 나누어 한 줄씩 입력하세요.',
    defaultContent: `# 주제
내 인생 최대 흑역사 썰
학창시절 가장 웃겼던 일
소름 돋는 실화 괴담
최악의 소개팅 경험담
# 벌칙
디스코드 프로필 엽사로 24시간 변경
노래 한 곡 완창하기
단톡방에 '사랑해'라고 보내기
물 한 컵 원샷하기`,
    placeholder: '# 주제\n주제1\n# 벌칙\n벌칙1'
  },
  'short-trpg': {
    title: '심야 학교 과학실의 비밀 시나리오',
    category: 'TRPG / 공포',
    formatHint: '# 시나리오 (제목 | 인트로) 및 # 비밀미션 섹션으로 입력하세요.',
    defaultContent: `# 시나리오
심야 학교 과학실의 비밀 | 한밤중 과학실에 갇힌 학생들, 인체모형이 살아서 움직이기 시작한다!
# 비밀미션
당신은 사실 인체모형의 조종자입니다. 다른 사람들을 과학실 밖으로 나가지 못하게 유도하세요.
당신은 가방에 만능 열쇠를 숨기고 있습니다. 누군가 당신을 강하게 의심하면 위협하세요.
당신은 불을 무서워합니다. 조명이 깜빡이면 소리를 지르며 패닉 상태를 연기하세요.
당신은 특종 기자입니다. 사건의 원인을 밝혀내기 위해 모두에게 탐문 수사를 벌이세요.`,
    placeholder: '# 시나리오\n제목 | 인트로\n# 비밀미션\n미션1'
  },
  'fake-artist': {
    title: '미술관 대표 명화 & 캐릭터 팩',
    category: '드로잉 / 추리',
    formatHint: '한 줄에 단어를 하나씩 입력하세요.',
    defaultContent: `피카츄
에펠탑
모나리자
자전거
피자
우주선
판다
자유의 여신상
축구공
선글라스`,
    placeholder: '피카츄\n에펠탑\n모나리자...'
  },
  'anonymous-exposed': {
    title: '친구들 속마음 탐구 익명 지목 팩',
    category: '토크 / 폭로',
    formatHint: '한 줄에 지목 폭로 질문을 하나씩 입력하세요.',
    defaultContent: `우리 중 가장 겉과 속이 다를 것 같은 사람은?
무인도에 단둘이 남겨지면 가장 생존력이 높을 것 같은 사람은?
연애할 때 가장 집착이 심할 것 같은 사람은?
복권 1등 당첨되어도 절대 안 쏠 것 같은 사람은?
새벽 3시에 술 마시자고 부르면 바로 나올 것 같은 사람은?
가장 먼저 결혼할 것 같은 사람은?`,
    placeholder: '질문 1\n질문 2...'
  }
};

const GAME_PACK_TEMPLATES_EN: Record<string, {
  title: string;
  category: string;
  formatHint: string;
  defaultContent: string;
  placeholder: string;
}> = {
  'liar-game': {
    title: 'Favorite Foods & Late-Night Snacks Pack',
    category: 'Food / Snacks',
    formatHint: 'Enter one secret word per line.',
    defaultContent: `Fried Chicken
Pizza
Tacos
Sushi
Burgers
Ramen
Ice Cream
Steak
Pasta
Hot Dog`,
    placeholder: 'Fried Chicken\nPizza\nTacos...'
  },
  'worldcup': {
    title: 'Top 8 Ultimate Midnight Snacks Tournament',
    category: 'Food World Cup',
    formatHint: 'Enter one candidate per line. (Optional: Candidate | ImageURL)',
    defaultContent: `Crispy Fried Chicken | https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=800
Pepperoni Pizza Feast | https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=800
Spicy Mexican Tacos | https://plus.unsplash.com/premium_photo-1700161711824-1b28505a8d32?w=800
Artisan Cheeseburger | https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=800
Sizzling BBQ Ribs | https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800
Steaming Hot Ramen | https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=800
Fresh Salmon Sushi | https://plus.unsplash.com/premium_photo-1723575685216-6dab84c3fd23?w=800
Crispy Golden French Fries | https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?w=800`,
    placeholder: 'Candidate Name or Candidate Name | ImageURL'
  },
  'balance-debate': {
    title: 'Extreme Would You Rather & Dating Dilemmas',
    category: 'Dating / Friendship',
    formatHint: 'Enter in [Option A vs Option B] format per line.',
    defaultContent: `Live without soda forever vs Live without ramen forever
Get $10M but never use a smartphone vs Live freely as you are now
Travel 100 years into the past vs Travel 100 years into the future
Live without air conditioning in summer vs Live without heating in winter
Always speak your mind vs Never speak again`,
    placeholder: 'Option A vs Option B'
  },
  'zoom-quiz': {
    title: 'Everyday Objects Close-Up Zoom Quiz Pack',
    category: 'Objects / Quiz',
    formatHint: 'Enter in [Answer | ImageURL] format per line.',
    defaultContent: `Pizza | https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800
Apple | https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800
Smartphone | https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800
Basketball | https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800`,
    placeholder: 'Answer | ImageURL'
  },
  'blind-drawing': {
    title: 'Wild Imagination Animals & Crazy Inventions',
    category: 'Drawing / Creativity',
    formatHint: 'Enter one drawing prompt per line.',
    defaultContent: `Giraffe riding a skateboard
Panda wearing sunglasses
Cat in an astronaut spacesuit
T-Rex eating a pizza slice
Alien drinking iced latte
Monkey dancing with DJ headphones
Octopus driving a yellow submarine`,
    placeholder: 'Giraffe riding a skateboard...'
  },
  'voice-battle': {
    title: 'Iconic Pop Culture & Meme Voice Battle Pack',
    category: 'Memes / Quotes',
    formatHint: 'Enter in [Character | Voice Line | Acting Hint | AudioURL(optional)] format per line.',
    defaultContent: `SpongeBob | I'm ready! I'm ready! | High-pitched goofy laugh | /audio/voice-battle/saddalra.mp3
Gordon Ramsay | It's raw! Where's the lamb sauce?! | Furious British chef roar | /audio/voice-battle/maldaeggu.mp3
Steven He | Emotional damage! | Exaggerated dramatic disbelief | /audio/voice-battle/squid_mugunghwa.mp3
Cristiano Ronaldo | SIUUUU! | Victorious jump and roar | /audio/voice-battle/gangnam_style.mp3
Darth Vader | No, I am your father. | Deep menacing robotic whisper | /audio/voice-battle/yasuo_soriegeton.mp3`,
    placeholder: 'Character | Voice Line | Acting Hint | AudioURL(optional)'
  },
  'five-sec-rule': {
    title: 'Lightning 5-Second Brain Freeze Challenge',
    category: 'Quick Reflex / Trivia',
    formatHint: 'Enter one 5-second challenge prompt per line.',
    defaultContent: `Name 3 pizza toppings!
Name 3 countries in Europe!
Name 3 video games!
Name 3 yellow fruits!
Name 3 ice cream flavors!
Name 3 things you find in a bathroom!
Name 3 movie superheroes!`,
    placeholder: 'Name 3 pizza toppings!...'
  },
  'trivia-quiz': {
    title: 'Exciting World Knowledge & Fun Trivia Pack',
    category: 'Trivia / Knowledge',
    formatHint: 'Enter in [Question | Option1, Option2, Option3, Option4 | CorrectNum(1~4) | Explanation] format per line.',
    defaultContent: `What is the capital city of Australia? | Sydney, Melbourne, Canberra, Brisbane | 3 | Canberra was selected as the compromise capital between Sydney and Melbourne.
Which planet is known as the Red Planet? | Mars, Venus, Jupiter, Saturn | 1 | Mars appears reddish due to iron oxide (rust) on its surface.
How many elements are in the periodic table? | 112, 118, 120, 108 | 2 | There are 118 confirmed elements in the modern periodic table.
Which is the fastest land animal? | Cheetah, Lion, Greyhound, Gazelle | 1 | Cheetahs can reach sprint speeds of up to 120 km/h (75 mph).`,
    placeholder: 'Question | Option1, Option2, Option3, Option4 | CorrectNum(1~4) | Explanation'
  },
  'story-roulette': {
    title: 'Party Truths, Wild Confessions & Fun Dares',
    category: 'Party / Confession',
    formatHint: 'Enter under # Topics and # Penalties sections per line.',
    defaultContent: `# Topics
Most embarrassing moment in your life
Funniest school story you still laugh at
Creepiest real-life experience
Worst date experience ever
# Penalties
Change profile picture to a silly meme for 24h
Sing the chorus of a pop song right now
Send a funny compliment into the group chat
Drink a glass of ice cold water in one go`,
    placeholder: '# Topics\nTopic 1\n# Penalties\nPenalty 1'
  },
  'short-trpg': {
    title: 'Mystery of the Midnight Science Lab',
    category: 'TRPG / Mystery',
    formatHint: 'Enter in # Scenario (Title | Intro) and # Secret Missions sections.',
    defaultContent: `# Scenario
Midnight Science Lab Mystery | Trapped in the school laboratory at midnight, the anatomy model begins to move!
# Secret Missions
You are secretly controlling the model. Divert attention and keep everyone inside.
You carry a master key in your bag. If anyone suspects you, make an intimidating excuse.
You have severe pyrosensitivity. If the lights flicker, panic and scream dramatically.
You are an investigative journalist. Question every player to uncover the root cause.`,
    placeholder: '# Scenario\nTitle | Intro\n# Secret Missions\nMission 1'
  },
  'fake-artist': {
    title: 'Famous Artworks & Iconic World Wonders Pack',
    category: 'Drawing / Mystery',
    formatHint: 'Enter one secret word per line.',
    defaultContent: `Pikachu
Eiffel Tower
Mona Lisa
Bicycle
Pizza Slice
Spaceship
Giant Panda
Statue of Liberty
Soccer Ball
Sunglasses`,
    placeholder: 'Pikachu\nEiffel Tower\nMona Lisa...'
  },
  'anonymous-exposed': {
    title: 'Secret Opinions & Anonymous Group Confessions',
    category: 'Icebreaker / Social',
    formatHint: 'Enter one anonymous confession question per line.',
    defaultContent: `Who in our group is most likely to survive on a deserted island?
Who would spend all their lottery winnings on ridiculous gadgets?
Who takes the longest time getting ready before hanging out?
Who would pick up the phone if you called them at 3 AM in an emergency?
Who is secretly the best actor or actress in the group?
Who would be the first one to get married?`,
    placeholder: 'Question 1\nQuestion 2...'
  }
};

export const PackSelectModal: React.FC<PackSelectModalProps> = ({
  isOpen,
  onClose,
  game,
  initialPackTitle,
  onConfirmCreateRoom,
  onConfirmSelectPack
}) => {
  const isRoomMode = Boolean(onConfirmSelectPack);
  const [activeTab, setActiveTab] = useState<'packs' | 'upload'>('packs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackId, setSelectedPackId] = useState<string>('');
  const [selectedPackTitle, setSelectedPackTitle] = useState<string>('');
  const [selectedCustomData, setSelectedCustomData] = useState<any>(null);

  // 프로필 설정 (Lobby 모드에서만 사용 - 기본 닉네임 자동지정 제거)
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem('partyhub_player_name') || '';
    } catch {
      return '';
    }
  });
  const [avatar, setAvatar] = useState(() => DEFAULT_AVATARS[0]);

  const { language, t, languages } = useLanguage();

  // 커스텀 팩 업로드 폼 상태
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadText, setUploadText] = useState('');
  const [uploadLanguage, setUploadLanguage] = useState<SupportedLanguage>(language);
  const [inputMode, setInputMode] = useState<'smart' | 'json'>('smart');

  // 사용자 업로드 커스텀 팩 (localStorage 영구 저장소에서 불러오기)
  const [userCustomPacks, setUserCustomPacks] = useState<CustomPack[]>(() => {
    try {
      const raw = localStorage.getItem('partyhub_user_custom_packs');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 서버에서 불러온 커스텀 팩 목록
  const [serverCustomPacks, setServerCustomPacks] = useState<CustomPack[]>([]);

  // 서버 커스텀 팩 불러오기 & 실시간 소켓 동기화
  useEffect(() => {
    if (!isOpen || !game) return;

    // 1. 서버 API에서 팩 목록 가져오기
    fetch(`/api/packs?gameId=${game.id}`)
      .then(res => res.json())
      .then(data => {
        if (data?.packs && Array.isArray(data.packs)) {
          setServerCustomPacks(data.packs);
        }
      })
      .catch(() => {});

    // 2. 실시간 새 팩 등록 수신
    const handlePackAdded = (data: { gameId: string; pack?: CustomPack; packs?: CustomPack[] }) => {
      if (data.gameId === game.id) {
        if (data.packs && Array.isArray(data.packs)) {
          setServerCustomPacks(data.packs);
        } else if (data.pack) {
          setServerCustomPacks(prev => [data.pack!, ...prev.filter(p => p.id !== data.pack!.id)]);
        }
      }
    };

    socket.on('packs:updated', handlePackAdded);
    return () => {
      socket.off('packs:updated', handlePackAdded);
    };
  }, [isOpen, game?.id]);

  // 팩 언어 필터 상태 (기본: 전체)
  const [selectedPackLang, setSelectedPackLang] = useState<SupportedLanguage | 'all'>('all');

  // 서버에서 영구 저장된 실제 추천수 맵
  const [serverPackLikes, setServerPackLikes] = useState<Record<string, number>>({});

  const localizedGame = useMemo(() => game ? getLocalizedGame(game, language) : null, [game, language]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/packs/likes')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setServerPackLikes(data);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  // 실제 등록된 팩 목록 가져오기 (서버 커스텀 팩 + 로컬 사용자 팩 + 기본 공식 팩)
  const availablePacks: CustomPack[] = useMemo(() => {
    if (!game) return [];
    const defaults = getDefaultPacksForGame(game.id, language);

    const currentUsers = userCustomPacks.filter(p => p.gameId === game.id);
    const existingIds = new Set(defaults.map(p => p.id));
    
    // 서버 팩 중 중복 제외
    const uniqueServer = serverCustomPacks.filter(p => !existingIds.has(p.id));
    const allKnownIds = new Set([...defaults.map(p => p.id), ...uniqueServer.map(p => p.id)]);
    const uniqueLocal = currentUsers.filter(p => !allKnownIds.has(p.id));

    const combined = [...uniqueLocal, ...uniqueServer, ...defaults];
    return combined.map(p => ({
      ...p,
      likes: serverPackLikes[p.id] !== undefined ? serverPackLikes[p.id] : 0
    }));
  }, [game?.id, language, userCustomPacks, serverCustomPacks, serverPackLikes, t]);

  // 초기 팩 매칭
  useEffect(() => {
    if (!isOpen || !game) return;
    if (initialPackTitle) {
      const match = availablePacks.find(p => p.title === initialPackTitle);
      if (match) {
        setSelectedPackId(match.id);
        setSelectedPackTitle(match.title);
        setSelectedCustomData(match.data);
        return;
      }
    }
    if (availablePacks.length > 0) {
      setSelectedPackId(availablePacks[0].id);
      setSelectedPackTitle(availablePacks[0].title);
      setSelectedCustomData(availablePacks[0].data);
    }
  }, [isOpen, game?.id, initialPackTitle, availablePacks]);

  // 추천(좋아요) 상태 관리 (localStorage 영구 저장)
  const [likedPackIds, setLikedPackIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('partyhub_liked_packs') || '[]');
    } catch {
      return [];
    }
  });

  // 팩 정렬 옵션 (기본: 추천순)
  const [packSortOption, setPackSortOption] = useState<'recommend' | 'newest' | 'name' | 'count'>('recommend');
  const [packLikesUpdate, setPackLikesUpdate] = useState(0);

  // 팩 추천(👍) 토글 핸들러 (서버 동기화 포함)
  const handleLikePack = (e: React.MouseEvent, packId: string) => {
    e.stopPropagation();
    const isAlreadyLiked = likedPackIds.includes(packId);
    let nextLiked: string[];

    if (isAlreadyLiked) {
      nextLiked = likedPackIds.filter(id => id !== packId);
      setServerPackLikes(prev => ({
        ...prev,
        [packId]: Math.max(0, (prev[packId] ?? 0) - 1)
      }));
    } else {
      nextLiked = [...likedPackIds, packId];
      setServerPackLikes(prev => ({
        ...prev,
        [packId]: (prev[packId] ?? 0) + 1
      }));
    }

    setLikedPackIds(nextLiked);
    localStorage.setItem('partyhub_liked_packs', JSON.stringify(nextLiked));
    setPackLikesUpdate(prev => prev + 1);

    if (game) {
      socket.emit('pack:like', { packId, gameId: game.id }, (res: any) => {
        if (res && res.success && typeof res.likes === 'number') {
          setServerPackLikes(prev => ({
            ...prev,
            [packId]: res.likes
          }));
          setPackLikesUpdate(prev => prev + 1);
        }
      });
    }
  };

  // 검색, 언어 및 정렬 필터 적용
  const sortedAndFilteredPacks = useMemo(() => {
    const list = availablePacks.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedPackLang === 'all' ||
        p.language === 'all' ||
        p.language === selectedPackLang ||
        (!p.language && selectedPackLang === 'ko');

      return matchesSearch && matchesLang;
    });

    return [...list].sort((a, b) => {
      if (packSortOption === 'recommend') {
        return (b.likes || 0) - (a.likes || 0);
      }
      if (packSortOption === 'newest') {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (packSortOption === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (packSortOption === 'count') {
        return (b.itemCount || 0) - (a.itemCount || 0);
      }
      return 0;
    });
  }, [availablePacks, searchQuery, packSortOption, packLikesUpdate, selectedPackLang]);

  if (!isOpen || !game) return null;

  // 템플릿 정보
  const isKo = language === 'ko';
  const templateMap = isKo ? GAME_PACK_TEMPLATES : GAME_PACK_TEMPLATES_EN;
  const template = templateMap[game.id] || (isKo ? {
    title: `${localizedGame?.title || game.title} 커스텀 팩`,
    category: '커스텀',
    formatHint: '한 줄에 항목을 하나씩 입력하세요.',
    defaultContent: '항목 1\n항목 2\n항목 3\n항목 4',
    placeholder: '항목 1\n항목 2...'
  } : {
    title: `${localizedGame?.title || game.title} Custom Pack`,
    category: 'Custom',
    formatHint: 'Enter one item per line.',
    defaultContent: 'Item 1\nItem 2\nItem 3\nItem 4',
    placeholder: 'Item 1\nItem 2...'
  });

  // 템플릿 불러오기 버튼 클릭 핸들러
  const handleLoadTemplate = () => {
    setUploadTitle(template.title);
    setUploadCategory(template.category);
    setUploadText(template.defaultContent);
    setInputMode('smart');
  };

  // 게임별 텍스트 스마트 파서
  const parseCustomPackData = (gameId: string, text: string, category: string): any => {
    const trimmed = text.trim();
    if (inputMode === 'json' || trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return JSON.parse(trimmed);
    }

    const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);

    switch (gameId) {
      case 'liar-game': {
        return {
          category: category.trim() || (language === 'ko' ? '커스텀 주제' : 'Custom Topic'),
          words: lines
        };
      }
      case 'worldcup': {
        const defaultImages = [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800'
        ];
        return lines.map((line, idx) => {
          const parts = line.split('|').map(s => s.trim());
          return {
            id: idx + 1,
            name: parts[0],
            image: parts[1] || defaultImages[idx % defaultImages.length]
          };
        });
      }
      case 'balance-debate': {
        return lines.map((line, idx) => {
          let parts = line.split(/\s+vs\s+|\s+VS\s+|\|/i).map(s => s.trim());
          if (parts.length < 2) parts = [parts[0], language === 'ko' ? '반대 선택지' : 'Opposite Choice'];
          return {
            id: idx + 1,
            optionA: parts[0],
            optionB: parts[1],
            category: category.trim() || (language === 'ko' ? '커스텀 밸런스' : 'Custom Balance')
          };
        });
      }
      case 'voice-battle': {
        return lines.map(line => {
          const parts = line.split('|').map(s => s.trim());
          return {
            character: parts[0] || (language === 'ko' ? '익명 캐릭터' : 'Anonymous Character'),
            line: parts[1] || parts[0],
            hint: parts[2] || (language === 'ko' ? '개성 넘치게 대사를 읊어보세요!' : 'Perform with your own unique style!'),
            audioUrl: parts[3] ? parts[3].trim() : undefined,
            pitch: 1.0,
            rate: 1.0
          };
        });
      }
      case 'zoom-quiz': {
        const defaultImages = [
          'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800',
          'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
        ];
        return lines.map((line, idx) => {
          const parts = line.split('|').map(s => s.trim());
          return {
            id: idx + 1,
            answer: parts[0],
            image: parts[1] || defaultImages[idx % defaultImages.length],
            aliases: [parts[0].replace(/\s+/g, '')]
          };
        });
      }
      case 'trivia-quiz': {
        return lines.map(line => {
          const parts = line.split('|').map(s => s.trim());
          const question = parts[0];
          const options = parts[1] ? parts[1].split(',').map(s => s.trim()) : (language === 'ko' ? ['보기 1', '보기 2', '보기 3', '보기 4'] : ['Option 1', 'Option 2', 'Option 3', 'Option 4']);
          const ansNum = parseInt(parts[2] || '1', 10);
          const answerIndex = isNaN(ansNum) ? 0 : Math.max(0, Math.min(options.length - 1, ansNum - 1));
          const explanation = parts[3] || (language === 'ko' ? `정답은 ${options[answerIndex]}입니다.` : `The answer is ${options[answerIndex]}.`);
          return {
            question,
            options,
            answerIndex,
            explanation
          };
        });
      }
      case 'story-roulette': {
        let currentSection: 'topics' | 'penalties' = 'topics';
        const topics: string[] = [];
        const penalties: string[] = [];
        for (const line of lines) {
          if (line.startsWith('# 벌칙') || line.toLowerCase().includes('벌칙')) {
            currentSection = 'penalties';
            continue;
          } else if (line.startsWith('# 주제') || line.toLowerCase().includes('주제')) {
            currentSection = 'topics';
            continue;
          }
          if (currentSection === 'topics') topics.push(line);
          else penalties.push(line);
        }
        return {
          topics: topics.length ? topics : (language === 'ko' ? ['자유 주제 썰'] : ['Free Topic Story']),
          penalties: penalties.length ? penalties : (language === 'ko' ? ['노래 한 곡 완창하기'] : ['Sing a full song'])
        };
      }
      case 'short-trpg': {
        let title = language === 'ko' ? '커스텀 시나리오' : 'Custom Scenario';
        let intro = language === 'ko' ? '미지의 공간에 모인 모험가들...' : 'Adventurers gathered in an unknown realm...';
        const secretMissions: string[] = [];
        let currentSection: 'scenario' | 'missions' = 'scenario';

        for (const line of lines) {
          if (line.startsWith('# 비밀미션') || line.toLowerCase().includes('미션')) {
            currentSection = 'missions';
            continue;
          } else if (line.startsWith('# 시나리오')) {
            currentSection = 'scenario';
            continue;
          }

          if (currentSection === 'scenario') {
            const parts = line.split('|').map(s => s.trim());
            title = parts[0] || title;
            if (parts[1]) intro = parts[1];
          } else {
            secretMissions.push(line);
          }
        }
        return {
          title,
          intro,
          secretMissions: secretMissions.length ? secretMissions : (language === 'ko' ? ['비밀 임무를 완수하세요.'] : ['Complete your secret mission.'])
        };
      }
      case 'blind-drawing':
      case 'fake-artist':
      case 'five-sec-rule':
      case 'anonymous-exposed':
      default: {
        return lines;
      }
    }
  };

  // 파싱된 항목 개수 계산
  const countParsedItems = (text: string): number => {
    if (!text.trim()) return 0;
    try {
      const parsed = parseCustomPackData(game.id, text, uploadCategory);
      if (Array.isArray(parsed)) return parsed.length;
      if (parsed.words && Array.isArray(parsed.words)) return parsed.words.length;
      if (parsed.topics && Array.isArray(parsed.topics)) return parsed.topics.length;
      if (parsed.secretMissions && Array.isArray(parsed.secretMissions)) return parsed.secretMissions.length;
      return 1;
    } catch {
      return 0;
    }
  };

  // 커스텀 팩 업로드 및 즉시 등록 핸들러
  const handleUploadCustomPack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadText.trim()) return;

    let parsedData: any = null;
    try {
      parsedData = parseCustomPackData(game.id, uploadText, uploadCategory);
      const itemCount = countParsedItems(uploadText);

      const newPack: CustomPack = {
        id: `user_pack_${Date.now()}`,
        gameId: game.id,
        title: `📦 [${uploadLanguage.toUpperCase()}] ${uploadTitle.trim()}`,
        description: t('userPackDesc', { count: itemCount }),
        author: playerName || t('playerDefault'),
        tags: ['custom', uploadCategory.trim() || 'general', uploadLanguage],
        itemCount,
        isPublic: true,
        likes: 1,
        createdAt: Date.now(),
        language: uploadLanguage,
        data: parsedData
      };

      // localStorage 영구 저장
      const updatedUserPacks = [newPack, ...userCustomPacks.filter(p => p.id !== newPack.id)];
      setUserCustomPacks(updatedUserPacks);
      try {
        localStorage.setItem('partyhub_user_custom_packs', JSON.stringify(updatedUserPacks));
      } catch {}

      // 서버로 커스텀 팩 전송
      socket.emit('pack:upload', newPack, () => {});

      setSelectedPackId(newPack.id);
      setSelectedPackTitle(newPack.title);
      setSelectedCustomData(newPack.data);

      if (isRoomMode && onConfirmSelectPack) {
        onConfirmSelectPack({
          packId: newPack.id,
          packTitle: newPack.title,
          customPackData: newPack.data
        });
      } else {
        setActiveTab('packs');
      }
    } catch (err) {
      alert(t('dataParsingError'));
    }
  };

  // 최종 확인 버튼 핸들러
  const handleConfirm = () => {
    if (isRoomMode) {
      if (onConfirmSelectPack) {
        onConfirmSelectPack({
          packId: selectedPackId || (game.hasCustomPack ? availablePacks[0]?.id : undefined),
          packTitle: selectedPackTitle || (game.hasCustomPack ? availablePacks[0]?.title : undefined),
          customPackData: selectedCustomData || (game.hasCustomPack ? availablePacks[0]?.data : undefined)
        });
      }
      return;
    }

    const finalPlayerName = playerName.trim();
    if (!finalPlayerName) {
      alert(t('enterNicknameAlert'));
      return;
    }

    try {
      localStorage.setItem('partyhub_player_name', finalPlayerName);
    } catch {}

    if (onConfirmCreateRoom) {
      onConfirmCreateRoom({
        gameId: game.id,
        packId: selectedPackId || (game.hasCustomPack ? availablePacks[0]?.id : undefined),
        packTitle: selectedPackTitle || (game.hasCustomPack ? availablePacks[0]?.title : undefined),
        customPackData: selectedCustomData || (game.hasCustomPack ? availablePacks[0]?.data : undefined),
        playerName: finalPlayerName,
        avatar
      });
    }
  };

  const parsedCount = countParsedItems(uploadText);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1180px', width: 'min(1180px, 96vw)', maxHeight: '92vh', overflowY: 'auto', padding: '28px 32px' }}
      >
        {/* 모달 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2.4rem' }}>{game.icon || '🎮'}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
                  {isRoomMode ? t('roomPackSettingsTitle', { game: localizedGame?.title || game.title }) : (localizedGame?.title || game.title)}
                </h2>
                <span className="badge-pill" style={{
                  background: game.hasCustomPack ? 'rgba(139, 92, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: game.hasCustomPack ? '#A5B4FC' : '#6EE7B7',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {game.hasCustomPack ? t('packBadge') : t('ruleBadge')}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                {isRoomMode ? t('roomPackSettingsDesc') : (localizedGame?.description || game.description)}
              </p>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '8px', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        {game.hasCustomPack && (
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '20px' }}>
            <button
              className={`btn ${activeTab === 'packs' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('packs')}
              style={{ fontSize: '0.9rem', padding: '10px 18px' }}
            >
              <Package size={16} />
              <span>{t('tabOfficialPacks', { count: availablePacks.length })}</span>
            </button>
            <button
              className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('upload')}
              style={{ fontSize: '0.9rem', padding: '10px 18px' }}
            >
              <UploadCloud size={16} />
              <span>{t('tabUploadPack')}</span>
            </button>
          </div>
        )}

        {/* 1. 공식 & 등록된 팩 선택 탭 */}
        {game.hasCustomPack && activeTab === 'packs' && (
          <div>
            {/* 언어 필터 탭 바 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={14} />
                {t('filterLanguage')}
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedPackLang('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: selectedPackLang === 'all' ? 800 : 500,
                    background: selectedPackLang === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                    color: selectedPackLang === 'all' ? '#FFF' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {t('langAll')}
                </button>
                {languages.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setSelectedPackLang(l.code)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: selectedPackLang === l.code ? 800 : 500,
                      background: selectedPackLang === l.code ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                      color: selectedPackLang === l.code ? '#FFF' : 'var(--text-secondary)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 & 정렬 컨트롤 바 */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('searchPackPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '42px', width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>{t('sortLabel')}</span>
                <select
                  className="sort-select"
                  value={packSortOption}
                  onChange={(e) => setPackSortOption(e.target.value as any)}
                  style={{ padding: '8px 14px', fontSize: '0.88rem', background: 'var(--bg-surface-elevated)', borderRadius: '10px' }}
                >
                  <option value="recommend">{t('sortRecommend')}</option>
                  <option value="newest">{t('sortNewest')}</option>
                  <option value="name">{t('sortName')}</option>
                  <option value="count">{t('sortCount')}</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto', marginBottom: '24px' }}>
              {sortedAndFilteredPacks.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {t('noPacksFound')}
                </div>
              ) : (
                sortedAndFilteredPacks.map(pack => {
                  const isSelected = selectedPackId === pack.id || (!selectedPackId && pack.id === availablePacks[0]?.id);
                  const isLiked = likedPackIds.includes(pack.id);
                  return (
                    <div
                      key={pack.id}
                      onClick={() => {
                        setSelectedPackId(pack.id);
                        setSelectedPackTitle(pack.title);
                        setSelectedCustomData(pack.data);
                      }}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'var(--bg-surface-elevated)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1.05rem', color: '#FFF' }}>{pack.title}</strong>
                          {pack.language && pack.language !== 'all' && (
                            <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '6px', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 700 }}>
                              {pack.language.toUpperCase()}
                            </span>
                          )}
                          {pack.language === 'all' && (
                            <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '6px', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 700 }}>
                              {t('globalBadge')}
                            </span>
                          )}
                          <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', fontSize: '0.75rem', fontWeight: 700 }}>
                            {t('itemCountText', { count: pack.itemCount })}
                          </span>
                          {pack.author && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('authorText', { author: pack.author })}</span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {pack.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* 👍 팩 추천 버튼 */}
                        <button
                          type="button"
                          onClick={(e) => handleLikePack(e, pack.id)}
                          className="btn"
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.82rem',
                            borderRadius: '20px',
                            background: isLiked ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                            border: isLiked ? '1px solid #EC4899' : '1px solid var(--border-glass)',
                            color: isLiked ? '#F472B6' : '#E2E8F0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          title={isLiked ? t('cancelLike') : t('likeThisPack')}
                        >
                          <ThumbsUp size={14} fill={isLiked ? '#EC4899' : 'none'} color={isLiked ? '#EC4899' : '#CBD5E1'} />
                          <span style={{ fontWeight: 700 }}>{(pack.likes || 0).toLocaleString()}</span>
                        </button>

                        {isSelected ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 800, fontSize: '0.88rem' }}>
                            <CheckCircle2 size={22} />
                            <span>{t('selected')}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('select')}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* 2. 스마트 커스텀 팩 업로더 탭 */}
        {game.hasCustomPack && activeTab === 'upload' && (
          <form onSubmit={handleUploadCustomPack} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 상단 템플릿 로더 배너 */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: '#A5B4FC', fontSize: '0.95rem' }}>
                  <Sparkles size={18} />
                  <span>{localizedGame?.title || game.title} - {t('tabUploadPack')}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  💡 {template.formatHint}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLoadTemplate}
                style={{ background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <Sparkles size={16} color="#F59E0B" />
                <span>💡 {template.title}</span>
              </button>
            </div>

            {/* 기본 메타데이터 입력 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('uploadPackTitle')} <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('uploadTitlePlaceholder')}
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('uploadCategory')}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('uploadCategoryPlaceholder')}
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('uploadLanguage')}
                </label>
                <select
                  className="sort-select"
                  value={uploadLanguage}
                  onChange={(e) => setUploadLanguage(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface-elevated)', borderRadius: '10px' }}
                >
                  {languages.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 입력 모드 토글 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {t('uploadContent')} ({inputMode === 'smart' ? t('uploadSmartTab') : t('uploadJsonTab')}) <span style={{ color: '#EF4444' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setInputMode('smart')}
                  className={`btn ${inputMode === 'smart' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  <FileText size={13} />
                  <span>{t('uploadSmartTab')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('json')}
                  className={`btn ${inputMode === 'json' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  <Code2 size={13} />
                  <span>{t('uploadJsonTab')}</span>
                </button>
              </div>
            </div>

            {/* 본문 텍스트 에어리어 */}
            <div style={{ position: 'relative' }}>
              <textarea
                className="input-field"
                rows={7}
                placeholder={inputMode === 'smart' ? t('uploadSmartPlaceholder') : (language === 'ko' ? '{\n  "words": ["단어1", "단어2"]\n}' : '{\n  "words": ["word1", "word2"]\n}')}
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
                style={{
                  width: '100%',
                  fontFamily: inputMode === 'json' ? 'monospace' : 'inherit',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  resize: 'vertical',
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-glass)'
                }}
                required
              />

              {/* 하단 실시간 파싱 상태 카운터 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.8rem' }}>
                <span style={{ color: parsedCount > 0 ? '#10B981' : 'var(--text-muted)', fontWeight: 700 }}>
                  {parsedCount > 0 ? t('parsedCountText', { count: parsedCount }) : t('pleaseEnterContent')}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {t('lineCountText', { count: uploadText.split('\n').filter(l => l.trim()).length })}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={parsedCount === 0 || !uploadTitle.trim()}
              style={{ padding: '14px', fontSize: '1rem', fontWeight: 800, borderRadius: '12px' }}
            >
              <UploadCloud size={18} />
              <span>{t('uploadSubmitBtn')} ({parsedCount})</span>
            </button>
          </form>
        )}

        {/* 3. 시스템 룰 전용 게임 안내 */}
        {!game.hasCustomPack && (
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#6EE7B7', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡</span> {t('systemRuleGame')}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {game.description}
            </p>
          </div>
        )}

        {/* 방장 프로필 설정 (로비에서 대기실 개설할 때만 노출) */}
        {!isRoomMode && (
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A5B4FC', marginBottom: '10px' }}>
              👑 {t('hostPlayerName')}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px', alignItems: 'center' }}>
              {/* 아바타 선택 */}
              <div style={{ position: 'relative' }}>
                <select
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-glass)',
                    color: '#FFF',
                    fontSize: '1.6rem',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {DEFAULT_AVATARS.map((av, idx) => (
                    <option key={idx} value={av}>{av}</option>
                  ))}
                </select>
              </div>

              {/* 닉네임 직접 입력 */}
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('namePlaceholder')}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  autoFocus
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* 최종 버튼 */}
        <button
          className="btn btn-primary"
          onClick={handleConfirm}
          style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 900, borderRadius: '14px' }}
        >
          {isRoomMode ? (
            <>
              <CheckCircle2 size={20} />
              <span>{t('confirmPackBtn')}</span>
            </>
          ) : (
            <>
              <span>{t('enterRoomBtn')}</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
