// shared/defaultPacks.ts
import { CustomPack } from './types';

export const REAL_DEFAULT_PACKS: Record<string, CustomPack[]> = {
  // 1. 라이어 게임 제시어 팩
  'liar-game': [
    {
      id: 'liar_food',
      gameId: 'liar-game',
      title: '🍕 [공식] 맛있는 음식 & 야식 제시어 팩',
      description: '치킨, 피자, 떡볶이, 붕어빵, 마라탕, 삼겹살 등 누구나 아는 음식 50종',
      author: 'PartyHub 공식',
      tags: ['음식', '야식', '초보추천'],
      itemCount: 50,
      isPublic: true,
      likes: 8420,
      createdAt: 1700000000000,
      language: 'ko',
      data: {
        category: '음식 / 야식',
        words: [
          '치킨', '피자', '떡볶이', '붕어빵', '마라탕', '삼겹살', '짜장면', '짬뽕', '탕수육', '초밥',
          '햄버거', '라면', '김밥', '순대', '족발', '보쌈', '스테이크', '파스타', '타코야끼', '돈까스',
          '비빔밥', '된장찌개', '김치찌개', '부대찌개', '갈비찜', '냉면', '칼국수', '우동', '핫도그', '호떡',
          '와플', '마카롱', '빙수', '츄러스', '소떡소떡', '감자튀김', '치즈볼', '닭발', '곱창', '육회',
          '샌드위치', '토스트', '만두', '월남쌈', '쌀국수', '훠궈', '팟타이', '카레', '오므라이스', '계란말이'
        ]
      }
    },
    {
      id: 'liar_food_en',
      gameId: 'liar-game',
      title: '🍔 [Official] Delicious Food & Snacks Pack (English)',
      description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta, Donut, Hotdog - 40 Popular Foods',
      author: 'PartyHub Official',
      tags: ['Food', 'Snacks', 'Beginner', 'Global'],
      itemCount: 40,
      isPublic: true,
      likes: 5310,
      createdAt: 1700000000000,
      language: 'en',
      data: {
        category: 'Food & Snacks',
        words: [
          'Pizza', 'Hamburger', 'Sushi', 'Taco', 'Steak', 'Ramen', 'Pasta', 'Hotdog', 'Sandwich', 'French Fries',
          'Fried Chicken', 'Burrito', 'Pancakes', 'Waffles', 'Donut', 'Croissant', 'Bagel', 'Dumpling', 'Curry', 'Salad',
          'Ice Cream', 'Chocolate Cake', 'Apple Pie', 'Brownie', 'Cheesecake', 'Nachos', 'Popcorn', 'Milkshake', 'Bacon', 'Omelette',
          'Lobster', 'Barbecue Ribs', 'Lasagna', 'Mac and Cheese', 'Churros', 'Pad Thai', 'Fried Rice', 'Mushroom Soup', 'Spring Rolls', 'Pretzel'
        ]
      }
    },
    {
      id: 'liar_food_ja',
      gameId: 'liar-game',
      title: '🍣 [公式] 美味しい料理＆夜食ワードパック (日本語)',
      description: '寿司、ラーメン、ピザ、焼肉、カレー、たこ焼き、おにぎりなど人気料理40種',
      author: 'PartyHub 公式',
      tags: ['料理', '夜食', '定番', '日本語'],
      itemCount: 40,
      isPublic: true,
      likes: 4720,
      createdAt: 1700000000000,
      language: 'ja',
      data: {
        category: '料理 / 夜食',
        words: [
          '寿司', 'ラーメン', 'ピザ', '焼肉', 'カレー', 'たこ焼き', 'おにぎり', '天ぷら', 'うどん', 'そば',
          'ハンバーガー', '唐揚げ', 'オムライス', '餃子', 'パスタ', 'ステーキ', '親子丼', 'かつ丼', '焼き鳥', '豚汁',
          'すき焼き', 'お好み焼き', '鍋料理', 'チャーハン', 'グラタン', 'サンドイッチ', 'フライドポテト', '肉まん', 'たい焼き', 'みたらし団子',
          'パフェ', 'チーズケーキ', 'プリン', 'アイスクリーム', 'クレープ', 'ショートケーキ', 'どら焼き', 'わらび餅', 'メロンパン', 'エビフライ'
        ]
      }
    },
    {
      id: 'liar_lol',
      gameId: 'liar-game',
      title: '🎮 [공식] 리그 오브 레전드(LoL) 챔피언 팩',
      description: '야스오, 리신, 티모, 아리, 제드 등 롤 인기 챔피언 40종',
      author: 'PartyHub 공식',
      tags: ['게임', '롤', '챔피언'],
      itemCount: 40,
      isPublic: true,
      likes: 6210,
      createdAt: 1700000000000,
      data: {
        category: '롤 챔피언',
        words: [
          '야스오', '리신', '티모', '아리', '제드', '블리츠크랭크', '이즈리얼', '럭스', '카이사', '진',
          '사미라', '요네', '바루스', '애쉬', '가렌', '다리우스', '말파이트', '모르가나', '쓰레쉬', '파이크',
          '샤코', '마스터 이', '워윅', '헤카림', '녹턴', '아칼리', '카타리나', '탈론', '르블랑', '신드라',
          '오리아나', '빅토르', '트위스티드 페이트', '하이머딩거', '베이가', '람머스', '아무무', '누누와 윌럼프', '초가스', '자크'
        ]
      }
    },
    {
      id: 'liar_movies',
      gameId: 'liar-game',
      title: '🎬 [공식] 천만 관객 & 레전드 영화/애니 팩',
      description: '기생충, 아바타, 타이타닉, 인터스텔라, 슬램덩크 등 명작 40종',
      author: 'PartyHub 공식',
      tags: ['영화', '애니', '명작', '천만관객'],
      itemCount: 40,
      isPublic: true,
      likes: 7350,
      createdAt: 1700000000000,
      data: {
        category: '영화 / 명작',
        words: [
          '기생충', '괴물', '올드보이', '극한직업', '신과함께', '베테랑', '도둑들', '국제시장', '명량', '서울의 봄',
          '부산행', '인터스텔라', '인셉션', '아바타', '타이타닉', '다크나이트', '어벤져스', '아이언맨', '스파이더맨', '겨울왕국',
          '센과 치히로의 행방불명', '너의 이름은', '하울의 움직이는 성', '귀멸의 칼날', '슬램덩크', '스즈메의 문단속', '주토피아', '코코', '인사이드 아웃', '알라딘',
          '라이온 킹', '매트릭스', '해리 포터', '반지의 제왕', '쥬라기 공원', '조커', '라라랜드', '라따뚜이', '쿵푸팬더', '캐리비안의 해적'
        ]
      }
    },
    {
      id: 'liar_school',
      gameId: 'liar-game',
      title: '🏫 [공식] 추억의 학창시절 & 일상 사물 팩',
      description: '급식판, 지우개똥, 체육복, 칠판지우개, 샤프심, 삼선슬리퍼 등 40종',
      author: 'PartyHub 공식',
      tags: ['추억', '학창시절', '일상', '공감'],
      itemCount: 40,
      isPublic: true,
      likes: 5890,
      createdAt: 1700000000000,
      data: {
        category: '학창시절 / 일상',
        words: [
          '급식판', '칠판지우개', '샤프심', '삼선슬리퍼', '체육복', '학생증', '분필', '롤링페이퍼', '매점빵', '자습서',
          '모나미볼펜', '독서실', '컴퓨터용 사인펜', '필통', '실내화가방', '교과서', '알림장', '주번완장', '명찰', '수정테이프',
          '각도기', '컴퍼스', '회수권', '독서대', '형광펜', '오답노트', '시간표', '포스트잇', '머리핀', '충전기',
          '보조배터리', '텀블러', '우산', '안경', '마우스패드', '이어폰', '손난로', '물티슈', '손거울', '립밤'
        ]
      }
    }
  ],

  // 3. 실시간 이상형 월드컵 후보 팩
  'worldcup': [
    {
      id: 'wc_food_32',
      gameId: 'worldcup',
      title: '👑 [공식] 2026 대한민국 국민 야식 월드컵 32강',
      description: '치킨 vs 피자 vs 떡볶이! 100% 정밀 매칭된 고화질 음식 사진 32선',
      author: 'PartyHub 공식',
      tags: ['야식', '음식', '32강', '국민투표'],
      itemCount: 32,
      isPublic: true,
      likes: 9120,
      createdAt: 1700000000000,
      data: [
        {
                "id": 1,
                "name": "바삭한 후라이드 치킨",
                "image": "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwZnJpZWQlMjBjaGlja2VuJTIwY3Jpc3B5fGVufDB8fHx8MTc4ODUzNjc3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 2,
                "name": "치즈 폭포 페퍼로니 피자",
                "image": "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGVwcGVyb25pJTIwcGl6emElMjBzbGljZSUyMGNoZWVzZXxlbnwwfHx8fDE3ODg1MzY3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 3,
                "name": "매콤달콤 쌀 떡볶이",
                "image": "https://plus.unsplash.com/premium_photo-1700161711824-1b28505a8d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHRlb2tib2traSUyMGtvcmVhbiUyMHNwaWN5JTIwcmljZSUyMGNha2V8ZW58MHx8fHwxNzg4NTM2NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 4,
                "name": "쫄깃한 한방 족발",
                "image": "https://plus.unsplash.com/premium_photo-1723575685216-6dab84c3fd23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJhaXNlZCUyMHBvcmslMjBiZWxseSUyMGdsYXplZCUyMG1lYXR8ZW58MHx8fHwxNzg4NTM2NzgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 5,
                "name": "지글지글 삼겹살 구이",
                "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FtZ3llb3BzYWwlMjBrb3JlYW4lMjBiYnElMjBwb3JrJTIwYmVsbHl8ZW58MHx8fHwxNzg4NTM2Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 6,
                "name": "얼큰한 차돌 짬뽕",
                "image": "https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBub29kbGUlMjBzZWFmb29kJTIwc291cCUyMGpqYW1wcG9uZ3xlbnwwfHx8fDE3ODg1MzY3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 7,
                "name": "불맛 가득 직화 닭발",
                "image": "https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBjaGlja2VuJTIwd2luZ3MlMjBncmlsbGVkJTIwYmJxfGVufDB8fHx8MTc4ODUzNjc5MXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 8,
                "name": "고소한 소곱창 구이",
                "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwYmJxJTIwYmVlZiUyMGdyaWxsZWQlMjBtZWF0fGVufDB8fHx8MTc4ODUzNjc5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 9,
                "name": "수제 더블 치즈버거",
                "image": "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZG91YmxlJTIwY2hlZXNlYnVyZ2VyJTIwYnVyZ2VyfGVufDB8fHx8MTc4ODUzNjc5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 10,
                "name": "신선한 모듬 초밥",
                "image": "https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3VzaGklMjBwbGF0dGVyJTIwc2FzaGltaXxlbnwwfHx8fDE3ODg1MzY3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 11,
                "name": "바삭 촉촉 겉바속촉 탕수육",
                "image": "https://plus.unsplash.com/premium_photo-1669261881745-1b59cb9adcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3dlZXQlMjBzb3VyJTIwcG9yayUyMGNyaXNweXxlbnwwfHx8fDE3ODg1MzY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 12,
                "name": "얼큰 칼칼 부대찌개",
                "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwYXJteSUyMHN0ZXclMjBidWRhZSUyMGpqaWdhZXxlbnwwfHx8fDE3ODg1MzY4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 13,
                "name": "시원한 살얼음 물냉면",
                "image": "https://images.unsplash.com/photo-1579576792017-054fe0e86b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sZCUyMG5vb2RsZXMlMjBuYWVuZ215ZW9ufGVufDB8fHx8MTc4ODUzNjgwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 14,
                "name": "마라향 가득 마라탕",
                "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFsYXRhbmclMjBzcGljeSUyMGhvdHBvdCUyMGJvd2x8ZW58MHx8fHwxNzg4NTM2ODA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 15,
                "name": "두툼한 일식 안심 돈까스",
                "image": "https://plus.unsplash.com/premium_photo-1668618296698-a2e8e36eefeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9ua2F0c3UlMjBwb3JrJTIwY3V0bGV0JTIwY3Jpc3B5fGVufDB8fHx8MTc4ODUzNjgwNnww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 16,
                "name": "꾸덕한 베이컨 까르보나라",
                "image": "https://plus.unsplash.com/premium_photo-1661677825991-caa232fea9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFzdGElMjBjYXJib25hcmElMjBjcmVhbXklMjBiYWNvbnxlbnwwfHx8fDE3ODg1MzY4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 17,
                "name": "바삭 노릇 군만두",
                "image": "https://plus.unsplash.com/premium_photo-1673769108032-83c49135e142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnJpZWQlMjBneW96YSUyMGR1bXBsaW5ncyUyMGNyaXNweXxlbnwwfHx8fDE3ODg1MzY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 18,
                "name": "달콤 짭짤 소갈비찜",
                "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJhaXNlZCUyMHNob3J0JTIwcmlicyUyMGdhbGJpamppbXxlbnwwfHx8fDE3ODg1MzY4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 19,
                "name": "길거리 포장마차 찹쌀순대",
                "image": "https://plus.unsplash.com/premium_photo-1748864080569-dd208970df9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwc3RyZWV0JTIwZm9vZCUyMHNhdXNhZ2UlMjBibG9vZHxlbnwwfHx8fDE3ODg1MzY4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 20,
                "name": "따끈따끈 타코야끼",
                "image": "https://plus.unsplash.com/premium_photo-1722593856742-085ef5549070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dGFrb3lha2klMjBiYWxscyUyMGphcGFuZXNlfGVufDB8fHx8MTc4ODUzNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 21,
                "name": "달콤한 꿀호떡 & 붕어빵",
                "image": "https://plus.unsplash.com/premium_photo-1725986663003-9c55755f892f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwYnVuZ2VvcHBhbmclMjBob3R0ZW9rJTIwd2FmZmxlfGVufDB8fHx8MTc4ODUzNjgxOXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 22,
                "name": "치즈 듬뿍 콘치즈",
                "image": "https://plus.unsplash.com/premium_photo-1700004501455-49e1c0c8aee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWVsdGVkJTIwY2hlZXNlJTIwY29ybiUyMHNraWxsZXR8ZW58MHx8fHwxNzg4NTM2ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 23,
                "name": "양념 소떡소떡",
                "image": "https://plus.unsplash.com/premium_photo-1732753629920-86710780bfe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwc3RyZWV0JTIwZm9vZCUyMHNrZXdlcnMlMjBzYXVzYWdlfGVufDB8fHx8MTc4ODUzNjgyNHww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 24,
                "name": "바삭 고소 치즈볼",
                "image": "https://plus.unsplash.com/premium_photo-1723802480207-8f3032039218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y3Jpc3B5JTIwY2hlZXNlJTIwYmFsbHMlMjBmcmllZHxlbnwwfHx8fDE3ODg1MzY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 25,
                "name": "얼큰 칼국수 & 김치",
                "image": "https://plus.unsplash.com/premium_photo-1664360228046-a0a7ccf4fb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwbm9vZGxlJTIwc291cCUyMGthbGd1a3N1fGVufDB8fHx8MTc4ODUzNjgzMHww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 26,
                "name": "신선한 생연어 사시미",
                "image": "https://plus.unsplash.com/premium_photo-1725467481401-e9a1ee6decce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnJlc2glMjBzYWxtb24lMjBzYXNoaW1pJTIwc2xpY2VkfGVufDB8fHx8MTc4ODUzNjgzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 27,
                "name": "감칠맛 폭발 간장게장",
                "image": "https://plus.unsplash.com/premium_photo-1668143363099-1d9e04d4a3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y3JhYiUyMGRpc2glMjBzZWFmb29kJTIwZ291cm1ldHxlbnwwfHx8fDE3ODg1MzY4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 28,
                "name": "바삭 케이준 감자튀김",
                "image": "https://plus.unsplash.com/premium_photo-1683121324474-83460636b0ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnJlbmNoJTIwZnJpZXMlMjBjcmlzcHklMjBzYWx0ZWR8ZW58MHx8fHwxNzg4NTM2ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 29,
                "name": "새콤달콤 비빔만두",
                "image": "https://plus.unsplash.com/premium_photo-1663858367029-442eaf365f8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZHVtcGxpbmdzJTIwd2l0aCUyMGZyZXNoJTIwc2FsYWQlMjB2ZWdldGFibGVzfGVufDB8fHx8MTc4ODUzNjg0MHww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 30,
                "name": "시원 달콤 딸기 빙수",
                "image": "https://plus.unsplash.com/premium_photo-1669686982303-7da68cdd4595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3RyYXdiZXJyeSUyMHNoYXZlZCUyMGljZSUyMGRlc3NlcnQlMjBiaW5nc3V8ZW58MHx8fHwxNzg4NTM2ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 31,
                "name": "매콤 알싸 불족발",
                "image": "https://plus.unsplash.com/premium_photo-1664478272084-532c1bfebd25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBicmFpc2VkJTIwcG9yayUyMHJpYnMlMjBiYnF8ZW58MHx8fHwxNzg4NTM2ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 32,
                "name": "새벽 감성 양은냄비 신라면",
                "image": "https://plus.unsplash.com/premium_photo-1694707235804-743100dacc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a29yZWFuJTIwcmFtZW4lMjBpbnN0YW50JTIwbm9vZGxlJTIwcG90fGVufDB8fHx8MTc4ODUzNjg0OHww&ixlib=rb-4.1.0&q=80&w=1080"
        }
]
    },
    {
      id: 'wc_ramen_16',
      gameId: 'worldcup',
      title: '🍜 [공식] 전국민 최애 라면 월드컵 16강',
      description: '신라면 vs 진라면 vs 짜파게티 vs 불닭볶음면! 한국인의 영혼의 동반자 16선',
      author: 'PartyHub 공식',
      tags: ['라면', '분식', '16강', '소울푸드'],
      itemCount: 16,
      isPublic: true,
      likes: 8540,
      createdAt: 1700000000000,
      data: [
        {
                "id": 1,
                "name": "원조 매운맛 신라면",
                "image": "https://plus.unsplash.com/premium_photo-1694707235544-c9f6884d77d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBrb3JlYW4lMjByYW1lbiUyMG5vb2RsZXN8ZW58MHx8fHwxNzg4NTM2ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 2,
                "name": "얼큰 칼칼 진라면 매운맛",
                "image": "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmFtZW4lMjBub29kbGUlMjBib3dsJTIwZWdnfGVufDB8fHx8MTc4ODUzNjg1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 3,
                "name": "구수한 된장베이스 안성탕면",
                "image": "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bm9vZGxlJTIwc291cCUyMGJyb3RoJTIwcmFtZW58ZW58MHx8fHwxNzg4NTM2ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 4,
                "name": "오동통 다시마 너구리",
                "image": "https://plus.unsplash.com/premium_photo-1726873221744-73e3e5e5879b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dWRvbiUyMG5vb2RsZXMlMjBzZWFmb29kJTIwYnJvdGh8ZW58MHx8fHwxNzg4NTM2ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 5,
                "name": "삼양라면 오리지널",
                "image": "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aW5zdGFudCUyMG5vb2RsZSUyMHNvdXAlMjByYW1lbnxlbnwwfHx8fDE3ODg1MzY4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 6,
                "name": "고소한 계란블록 참깨라면",
                "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2VzYW1lJTIwcmFtZW4lMjBub29kbGUlMjBlZ2d8ZW58MHx8fHwxNzg4NTM2ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 7,
                "name": "국민 컵라면 육개장 사발면",
                "image": "https://plus.unsplash.com/premium_photo-1670978265021-ef0f575de914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y3VwJTIwcmFtZW4lMjBub29kbGUlMjBib3dsfGVufDB8fHx8MTc4ODUzNjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 8,
                "name": "극강의 매운맛 열라면",
                "image": "https://plus.unsplash.com/premium_photo-1670978265021-ef0f575de914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBob3QlMjBub29kbGUlMjBjaGlsaXxlbnwwfHx8fDE3ODg1MzY4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 9,
                "name": "일요일 요리사 짜파게티",
                "image": "https://images.unsplash.com/photo-1626803774007-f92c2c32cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amphamFuZ215ZW9uJTIwYmxhY2slMjBiZWFuJTIwbm9vZGxlc3xlbnwwfHx8fDE3ODg1MzY4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 10,
                "name": "중독성 최강 불닭볶음면",
                "image": "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BpY3klMjBmcmllZCUyMG5vb2RsZXMlMjByZWR8ZW58MHx8fHwxNzg4NTM2ODY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 11,
                "name": "매콤새콤 팔도 비빔면",
                "image": "https://plus.unsplash.com/premium_photo-1661432479675-595fc5f16219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmliaW0lMjBndWtzdSUyMGNvbGQlMjBzcGljeSUyMG5vb2RsZXN8ZW58MHx8fHwxNzg4NTM2ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 12,
                "name": "눈물 쏙 빠지는 틈새라면",
                "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmVkJTIwaG90JTIwc3BpY3klMjByYW1lbiUyMHNvdXB8ZW58MHx8fHwxNzg4NTM2ODczfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 13,
                "name": "담백 칼칼 닭육수 꼬꼬면",
                "image": "https://plus.unsplash.com/premium_photo-1664472752075-d5b2b3de0a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2hpY2tlbiUyMG5vb2RsZSUyMHdoaXRlJTIwYnJvdGglMjBzb3VwfGVufDB8fHx8MTc4ODUzNjg3NHww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 14,
                "name": "시원한 파송송 무파마",
                "image": "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2NhbGxpb24lMjByYWRpc2glMjBub29kbGUlMjBzb3VwfGVufDB8fHx8MTc4ODUzNjg3OHww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 15,
                "name": "얼큰 해물 오징어짬뽕",
                "image": "https://plus.unsplash.com/premium_photo-1726873221744-73e3e5e5879b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2VhZm9vZCUyMHNxdWlkJTIwbm9vZGxlJTIwc291cHxlbnwwfHx8fDE3ODg1MzY4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 16,
                "name": "밥 말아먹기 딱 좋은 스낵면",
                "image": "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dGhpbiUyMHJhbWVuJTIwbm9vZGxlcyUyMGJyb3RofGVufDB8fHx8MTc4ODUzNjg4MHww&ixlib=rb-4.1.0&q=80&w=1080"
        }
]
    },
    {
      id: 'wc_travel_16',
      gameId: 'worldcup',
      title: '✈️ [공식] 죽기 전에 꼭 가봐야 할 버킷리스트 세계 여행지 16강',
      description: '파리 에펠탑, 로마 콜로세움, 스위스 융프라우, 몰디브 해변 등 세계 명소 16선',
      author: 'PartyHub 공식',
      tags: ['여행', '랜드마크', '세계여행', '16강'],
      itemCount: 16,
      isPublic: true,
      likes: 9320,
      createdAt: 1700000000000,
      data: [
        {
                "id": 1,
                "name": "프랑스 파리 에펠탑",
                "image": "https://plus.unsplash.com/premium_photo-1719430569503-338fc89eb21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFyaXMlMjBlaWZmZWwlMjB0b3dlciUyMHN1bnNldHxlbnwwfHx8fDE3ODg1MzY4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 2,
                "name": "이탈리아 로마 콜로세움",
                "image": "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cm9tZSUyMGNvbG9zc2V1bSUyMGhpc3RvcmljfGVufDB8fHx8MTc4ODUzNjg4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 3,
                "name": "스위스 인터라켄 융프라우",
                "image": "https://plus.unsplash.com/premium_photo-1673561277495-fda97fb6ee61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3dpc3MlMjBhbHBzJTIwanVuZ2ZyYXUlMjBzbm93JTIwbW91bnRhaW58ZW58MHx8fHwxNzg4NTM2ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 4,
                "name": "미국 뉴욕 타임스퀘어",
                "image": "https://plus.unsplash.com/premium_photo-1694475099474-41c6b0ec7aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmV3JTIweW9yayUyMHRpbWVzJTIwc3F1YXJlJTIwbmlnaHQlMjBuZW9ufGVufDB8fHx8MTc4ODUzNjg4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 5,
                "name": "일본 도쿄 시부야 & 후지산",
                "image": "https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amFwYW4lMjBtb3VudCUyMGZ1amklMjBjaGVycnklMjBibG9zc29tJTIwdG9reW98ZW58MHx8fHwxNzg4NTM2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 6,
                "name": "스페인 바르셀로나 사그라다 파밀리아",
                "image": "https://plus.unsplash.com/premium_photo-1754211779435-5aad4fb9079a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFyY2Vsb25hJTIwc2FncmFkYSUyMGZhbWlsaWElMjBjaHVyY2h8ZW58MHx8fHwxNzg4NTM2ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 7,
                "name": "미국 그랜드 캐니언",
                "image": "https://plus.unsplash.com/premium_photo-1669050701110-a5eb879f1b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JhbmQlMjBjYW55b24lMjBuYXRpb25hbCUyMHBhcmslMjBzdW5zZXR8ZW58MHx8fHwxNzg4NTM2ODkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 8,
                "name": "인도네시아 발리 우붓 계단식 논",
                "image": "https://plus.unsplash.com/premium_photo-1721311166723-5c408da54364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFsaSUyMHVidWQlMjByaWNlJTIwdGVycmFjZXMlMjBsdXNoJTIwZ3JlZW58ZW58MHx8fHwxNzg4NTM2ODk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 9,
                "name": "몰디브 수상 방갈로 & 에메랄드 해변",
                "image": "https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFsZGl2ZXMlMjBvdmVyd2F0ZXIlMjB2aWxsYSUyMHR1cnF1b2lzZSUyMG9jZWFufGVufDB8fHx8MTc4ODUzNjg5NXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 10,
                "name": "영국 런던 빅벤 & 타워브리지",
                "image": "https://plus.unsplash.com/premium_photo-1664303991463-36449a65d3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bG9uZG9uJTIwYmlnJTIwYmVuJTIwdG93ZXIlMjBicmlkZ2UlMjB0aGFtZXN8ZW58MHx8fHwxNzg4NTM2ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 11,
                "name": "아이슬란드 환상의 오로라(북극광)",
                "image": "https://plus.unsplash.com/premium_photo-1675805015838-7f8b70536f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aWNlbGFuZCUyMG5vcnRoZXJuJTIwbGlnaHRzJTIwYXVyb3JhJTIwYm9yZWFsaXMlMjBuaWdodHxlbnwwfHx8fDE3ODg1MzY4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 12,
                "name": "호주 시드니 오페라하우스",
                "image": "https://plus.unsplash.com/premium_photo-1697730262092-03c94e7dd8fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3lkbmV5JTIwb3BlcmElMjBob3VzZSUyMGhhcmJvdXIlMjBzdW5zZXR8ZW58MHx8fHwxNzg4NTM2OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 13,
                "name": "이집트 카이로 피라미드 & 스핑크스",
                "image": "https://plus.unsplash.com/premium_photo-1694475204768-f83df37da1f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZWd5cHQlMjBweXJhbWlkcyUyMGdpemElMjBjYWlybyUyMGRlc2VydHxlbnwwfHx8fDE3ODg1MzY5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 14,
                "name": "이탈리아 베네치아 곤돌라 운하",
                "image": "https://plus.unsplash.com/premium_photo-1677355911198-5d56b4df49f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwY2FuYWwlMjBnb25kb2xhJTIwaXRhbHklMjBoaXN0b3JpY3xlbnwwfHx8fDE3ODg1MzY5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 15,
                "name": "태국 방콕 왓 아룬 새벽사원",
                "image": "https://plus.unsplash.com/premium_photo-1693149386423-2e4e264712e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFuZ2tvayUyMHdhdCUyMGFydW4lMjB0ZW1wbGUlMjByaXZlcnxlbnwwfHx8fDE3ODg1MzY5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
                "id": 16,
                "name": "페루 마추픽추 잉카 공중도시",
                "image": "https://plus.unsplash.com/premium_photo-1694475501155-2f344cea9eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFjaHUlMjBwaWNjaHUlMjBwZXJ1JTIwaW5jYSUyMHJ1aW5zJTIwbW91bnRhaW5zfGVufDB8fHx8MTc4ODUzNjkxMXww&ixlib=rb-4.1.0&q=80&w=1080"
        }
]
    }
  ],

  // 5. 극한의 밸런스 토론 배틀
  'balance-debate': [
    {
      id: 'balance_legend',
      gameId: 'balance-debate',
      title: '🔥 [공식] 인터넷 커뮤니티 전설의 밸런스 30선',
      description: '깻잎논쟁, 100억 vs 평생살기, 똥맛카레, 탄산 vs 라면 등 검증된 난제 모음',
      author: 'PartyHub 공식',
      tags: ['깻잎논쟁', '100억', '극단적선택', '토론'],
      itemCount: 30,
      isPublic: true,
      likes: 9940,
      createdAt: 1700000000000,
      data: [
        { id: 1, optionA: '내 애인이 내 절친 깻잎 떼어주기', optionB: '내 절친이 내 애인 깻잎 떼어주기', category: '연애 / 논쟁' },
        { id: 2, optionA: '지금 당장 100억 받고 50세에 사망', optionB: '그냥 지금처럼 평범하게 100세까지 무병장수', category: '인생 / 머니' },
        { id: 3, optionA: '똥맛 나는 카레 먹기 (성분은 100% 카레)', optionB: '카레맛 나는 똥 먹기 (성분은 100% 똥, 위생 보장)', category: '황당 / 극단' },
        { id: 4, optionA: '평생 라면(면류) 못 먹기', optionB: '평생 탄산음료 못 마시기', category: '음식' },
        { id: 5, optionA: '환승 이별 당하기 (새 사람 생겼다고 통보)', optionB: '잠수 이별 당하기 (어느 날 갑자기 모든 연락 두절)', category: '연애' },
        { id: 6, optionA: '내 과거를 전부 알고 있는 사람과 결혼', optionB: '나에 대해 아무것도 모르는 사람과 결혼', category: '결혼 / 비밀' },
        { id: 7, optionA: '사막 한가운데서 얼어 죽기', optionB: '남극 한가운데서 타 죽기', category: '황당' },
        { id: 8, optionA: '평생 스마트폰 없이 살기', optionB: '평생 친구 없이 살기', category: '인생' },
        { id: 9, optionA: '내가 사랑하는 사람과 결혼하기 (상대는 나를 덜 사랑함)', optionB: '나를 맹목적으로 사랑해주는 사람과 결혼하기 (나는 덜 사랑함)', category: '연애' },
        { id: 10, optionA: '군대 재입대 2년 복무하고 50억 받기', optionB: '그냥 지금 현재 상태로 살기', category: '인생' },
        { id: 11, optionA: '모든 사람의 속마음이 머릿속에 강제로 다 들리기', optionB: '내 모든 속마음이 주변 사람들에게 확성기처럼 들리기', category: '초능력 / 저주' },
        { id: 12, optionA: '애인의 절친에게 새우 껍질 정성껏 까주는 내 애인', optionB: '내 절친의 롱패딩 지퍼를 끝까지 올려주는 내 애인', category: '연애 / 논쟁' },
        { id: 13, optionA: '과거로 돌아가기 (기억 그대로 가지고 10살로 리셋)', optionB: '미래로 순간이동하기 (10년 뒤의 나에게 100억 입금)', category: 'SF / 인생' },
        { id: 14, optionA: '여름에 에어컨 없이 살기', optionB: '겨울에 난방/온수 없이 살기', category: '생존' },
        { id: 15, optionA: '1년 동안 인터넷/스마트폰 금지 (대신 10억 지급)', optionB: '1년 동안 씻기 금지 (대신 50억 지급)', category: '도전 / 머니' },
        { id: 16, optionA: '키 150cm에 얼굴 차은우/장원영', optionB: '키 188cm에 얼굴은 평범 이하', category: '외모' },
        { id: 17, optionA: '말할 때마다 무조건 반말로만 말하기', optionB: '말할 때마다 무조건 랩으로 비트 타며 말하기', category: '벌칙 / 예능' },
        { id: 18, optionA: '평생 치킨 못 먹기', optionB: '평생 삼겹살 못 먹기', category: '음식' },
        { id: 19, optionA: '내 결혼식에 전 애인이 축가 부르기', optionB: '전 애인 결혼식에 내가 사회 보기', category: '결혼 / 흑역사' },
        { id: 20, optionA: '매일 아침 월요일로 시작하는 삶 (월화수목금금금)', optionB: '매일 24시간 내내 직장 상사와 1:1로 일하기', category: '직장 / 공포' },
        { id: 21, optionA: '아무리 먹어도 절대 살 안 찌는 체질', optionB: '잠을 하루에 2시간만 자도 전혀 피곤하지 않은 체질', category: '신체 / 축복' },
        { id: 22, optionA: '평생 음악 없이 살기', optionB: '평생 영화/유튜브/드라마 영상 없이 살기', category: '문화 / 인생' },
        { id: 23, optionA: '비행기 이코노미석으로 지구 3바퀴 돌기', optionB: '만원 지하철 9호선에서 24시간 동안 서 있기', category: '고통' },
        { id: 24, optionA: '나를 제외한 전 세계 모든 사람이 투명인간 되기', optionB: '나 혼자만 전 세계에서 평생 투명인간으로 살기', category: '고독' },
        { id: 25, optionA: '무인도에 단둘이 갇히기: 말 엄청 많은 수다쟁이', optionB: '무인도에 단둘이 갇히기: 1년 내내 한마디도 안 하는 사람', category: '생존 / 동반자' },
        { id: 26, optionA: '모르는 사람 100명 앞에서 팬티 바람으로 댄스 추기', optionB: '친한 친구 10명 앞에서 내 모든 검색 기록/일기 낭독하기', category: '흑역사' },
        { id: 27, optionA: '평생 맥주/소주 등 술 못 마시기', optionB: '평생 커피/카페인 음료 못 마시기', category: '음료' },
        { id: 28, optionA: '내 일거수일투족이 전 국민에게 24시간 라이브 방송되기', optionB: '평생 감옥 독방에서 5년 살고 500억 받기', category: '자유 / 머니' },
        { id: 29, optionA: '외계인이 지구를 침공했을 때 통역사로 끌려가기', optionB: '좀비 아포칼립스에서 가장 먼저 감염된 좀비 되기', category: 'SF / 판타지' },
        { id: 30, optionA: '로또 1등 50억 당첨되고 인터넷에 실명/주소 박제되기', optionB: '로또 2등 5천만원 당첨되고 아무도 모르게 조용히 받기', category: '머니 / 안전' }
      ]
    },
    {
      id: 'balance_workplace',
      gameId: 'balance-debate',
      title: '💼 [공식] 대한민국 직장인/알바 대공감 밸런스 30선',
      description: '월 250 칼퇴 vs 월 550 매일 야근, 성격 좋은 무능 팀장 vs 싸가지 없는 천재 사수 등 현실 난제 30선',
      author: 'PartyHub 공식',
      tags: ['직장인', '알바', '월급', '현실공감'],
      itemCount: 30,
      isPublic: true,
      likes: 8760,
      createdAt: 1700000000000,
      data: [
        { id: 1, optionA: '월 250만원 칼퇴 보장 워라밸 극상', optionB: '월 550만원 매일 밤 11시 야근 & 주말출근', category: '급여 / 워라밸' },
        { id: 2, optionA: '일 하나도 안 하고 칭찬만 해주는 착한 무능 팀장', optionB: '인성은 파탄났지만 일은 기가 막히게 잘 가르쳐주는 천재 팀장', category: '상사' },
        { id: 3, optionA: '집 앞 걸어서 5분 거리 중소기업', optionB: '편도 왕복 3시간 걸리는 대기업 본사', category: '출퇴근' },
        { id: 4, optionA: '사내 연애하다가 안 좋게 헤어져서 매일 마주치기', optionB: '상사에게 내 뒷담화 카톡 실수로 바로 전송하기', category: '직장 흑역사' },
        { id: 5, optionA: '월급 50만원 인상되고 법인카드 없음', optionB: '월급 동결 대신 삼시세끼 법인카드로 무제한 결제 가능', category: '복지' },
        { id: 6, optionA: '팀원 전원이 나보다 나이 어린 천재 후배들', optionB: '팀원 전원이 꼰대지만 나한테 일은 안 시킴', category: '팀원' },
        { id: 7, optionA: '매일 점심시간 2시간 보장 (단, 혼밥 금지)', optionB: '매일 30분 일찍 조기 퇴근 (점심 20분 컷)', category: '점심시간' },
        { id: 8, optionA: '재택근무 100% (대신 10분마다 마우스 움직임 감시 프로그램)', optionB: '사무실 출근 100% (아무도 내 모니터 안 쳐다봄)', category: '근무형태' },
        { id: 9, optionA: '내가 싼 똥을 사수가 수습하고 하루종일 갈굼당하기', optionB: '사수가 싼 대형사고를 내가 혼자서 밤새 수습하기', category: '사고' },
        { id: 10, optionA: '금요일 퇴근 10분 전에 대형 긴급업무 투척', optionB: '월요일 아침 출근하자마자 전사 주간회의 발표자 지정', category: '공포' },
        { id: 11, optionA: '회사 사람들에게 내 인스타 부계정 들키기', optionB: '회사 사람들에게 내 주식/코인 -80% 잔고 들키기', category: '비밀' },
        { id: 12, optionA: '회식 무조건 1차 삼겹살 9시 칼귀가', optionB: '회식 오마카세 + 2차 3차 새벽 2시까지 강제 음주', category: '회식' },
        { id: 13, optionA: '능력은 있는데 입만 열면 불평불만인 동기', optionB: '능력은 없는데 의욕만 넘쳐서 일 다 터뜨리는 동기', category: '동기' },
        { id: 14, optionA: '월요일 하루 쉬는 주 4일제 (화수목금 근무)', optionB: '수요일 하루 쉬는 주 4일제 (월화/목금 분할)', category: '주4일제' },
        { id: 15, optionA: '회사 대표와 단둘이 제주도 3박 4일 출장', optionB: '회사에서 가장 어색한 타 부서원 5명과 1박 2일 워크숍', category: '출장' },
        { id: 16, optionA: '이직 제안: 연봉 1.5배 상승 대신 야근 2배', optionB: '현 직장 유지: 내년에 진급 보장 (연봉 5% 인상)', category: '이직' },
        { id: 17, optionA: '내 기획안을 팀장이 자기 성과로 가로채기', optionB: '팀장의 망한 기획안에 내 이름만 책임자로 올라가기', category: '성과' },
        { id: 18, optionA: '점심 메뉴 무조건 팀장이 정하는 대로 먹기', optionB: '매일 점심 메뉴 내가 골라야 하고 팀원들 불평 듣기', category: '점심' },
        { id: 19, optionA: '월급날이 매주 금요일마다 분할 입금 (주급)', optionB: '월급날이 매달 말일에 10% 추가 인센티브와 일괄 입금', category: '급여' },
        { id: 20, optionA: '회사에서 일하다 졸다가 대표 어깨에 기대어 자기', optionB: '전체 메일에 [사직서 양식] 실수로 첨부해서 발송', category: '실수' },
        { id: 21, optionA: '퇴사할 때 사이다로 부서장한테 팩폭 날리고 나가기', optionB: '퇴사할 때 억울해도 웃는 얼굴로 커피 돌리고 나가기', category: '퇴사' },
        { id: 22, optionA: '에어컨 빵빵한 대신 패딩 입어야 하는 사무실', optionB: '에어컨 고장나서 선풍기만 돌아가는 한여름 사무실', category: '환경' },
        { id: 23, optionA: '사내 메신저 슬랙/팀즈에서 실수로 애인한테 보낼 하트 보내기', optionB: '사내 메신저에서 상사 별명 부르며 뒷담화 복붙하기', category: '메신저' },
        { id: 24, optionA: '내가 혼자 야근할 때 치킨 사들고 찾아오는 상사', optionB: '내가 야근하든 말든 일찍 퇴근하고 절대 연락 안 하는 상사', category: '야근' },
        { id: 25, optionA: '업무 중 멍때리기 1시간 자유', optionB: '업무 빡세게 하고 1시간 일찍 퇴근하기', category: '근무' },
        { id: 26, optionA: '직장 동료들과 사적으로 절친되기 (주말에도 만남)', optionB: '직장 동료들과 업무 외엔 연락처도 모르는 완벽한 비즈니스', category: '인간관계' },
        { id: 27, optionA: '평생 정규직 연봉 4000 보장 (인상 없음)', optionB: '1년 단위 프리랜서 연봉 1억 (단, 매년 재계약 불안)', category: '고용안정' },
        { id: 28, optionA: '주말에 대표한테 [급한 건 아닌데]로 시작하는 카톡 받기', optionB: '평일에 새벽 6시에 상사 전화받고 기상하기', category: '연락' },
        { id: 29, optionA: '회사 화장실이 호텔급 최고급 비데 완비', optionB: '회사 탕비실에 스타벅스 원두 머신 및 고급 간식 무제한', category: '사내복지' },
        { id: 30, optionA: '로또 1등 당첨되고 다음 날 바로 시원하게 퇴사', optionB: '로또 1등 당첨 숨기고 취미로 회사 다니며 빌런 참교육하기', category: '로또 / 퇴사' }
      ]
    },
    {
      id: 'balance_superpower',
      gameId: 'balance-debate',
      title: '🦸 [공식] 초능력 & 판타지 인생 리셋 30선',
      description: '투명인간 vs 순간이동, 시간 되돌리기 vs 미래 보기, 100억 복권 당첨 vs 초능력자 등 흥미진진 난제 30선',
      author: 'PartyHub 공식',
      tags: ['초능력', 'SF', '판타지', '인생역전'],
      itemCount: 30,
      isPublic: true,
      likes: 9240,
      createdAt: 1700000000000,
      data: [
        { id: 1, optionA: '원하는 장소 어디든 마음대로 순간이동 (쿨타임 10분)', optionB: '원하는 시간으로 과거/미래 시간여행 (단, 1년에 1번만 가능)', category: '이동 / 시간' },
        { id: 2, optionA: '완벽한 투명인간 되기 (옷도 함께 투명해짐)', optionB: '자유롭게 하늘을 날아다니기 (시속 100km)', category: '능력' },
        { id: 3, optionA: '눈 마주친 사람의 생각을 읽는 독심술', optionB: '내가 하는 모든 말을 상대가 무조건 믿게 만드는 최면술', category: '정신' },
        { id: 4, optionA: '매일 아침 통장에 100만원씩 평생 입금', optionB: '지금 당장 일시불로 300억 받기', category: '재력' },
        { id: 5, optionA: '전 세계 모든 언어를 원어민 수준으로 구사하기', optionB: '전 세계 모든 악기를 프로 연주자 수준으로 연주하기', category: '재능' },
        { id: 6, optionA: '동물들과 완벽하게 대화할 수 있는 능력', optionB: '컴퓨터와 기계를 생각만으로 해킹하고 조종하는 능력', category: '소통' },
        { id: 7, optionA: '아무리 맞아도 다치지 않고 늙지 않는 불사신 (단, 감각은 있음)', optionB: '1초 만에 상처와 질병을 완벽 치료하는 치유 능력', category: '신체' },
        { id: 8, optionA: '10초 전 과거로 되돌리는 [실행 취소] 버튼 (무제한 사용)', optionB: '10분 뒤 미래를 미리 볼 수 있는 예지력', category: '시간' },
        { id: 9, optionA: '내가 먹고 싶은 음식이 생각만 하면 눈앞에 생성', optionB: '내가 입고 싶은 명품/옷이 생각만 하면 옷장에 생성', category: '소환' },
        { id: 10, optionA: '물속에서 숨쉬며 심해 끝까지 자유롭게 헤엄치기', optionB: '우주복 없이 우주를 자유롭게 유영하고 별 구경하기', category: '탐험' },
        { id: 11, optionA: '하루 24시간 중 시간을 1시간 동안 멈출 수 있는 능력', optionB: '나 자신의 신체 속도를 10배 빠르게 가속하는 능력', category: '시간 / 속도' },
        { id: 12, optionA: '원하는 사람의 외모로 완벽 변신하기', optionB: '원하는 사물로 변신하기 (자동차, 스마트폰 등)', category: '변신' },
        { id: 13, optionA: '평생 잠을 자지 않아도 100% 최상의 컨디션 유지', optionB: '평생 밥을 먹지 않아도 영양과 포만감이 100% 유지', category: '생리현상' },
        { id: 14, optionA: '어떤 게임이든 세계 1등 챔피언이 되는 실력', optionB: '어떤 주식이든 다음 날 오를지 내릴지 100% 맞히는 직감', category: '재능 / 부' },
        { id: 15, optionA: '사망 시 기억을 모두 간직한 채 10살로 환생 (인생 2회차)', optionB: '현재 나이에서 외모와 신체만 20살 전성기로 리셋', category: '환생' },
        { id: 16, optionA: '손끝에서 불을 자유자재로 뿜어내고 조종하기', optionB: '손끝에서 얼음과 냉기를 자유자재로 얼리고 조종하기', category: '원소' },
        { id: 17, optionA: '모든 사람에게 호감을 사는 치명적인 매력 오라', optionB: '모든 사람이 나를 존경하고 두려워하는 카리스마 오라', category: '매력' },
        { id: 18, optionA: '책을 손으로 만지기만 하면 내용이 100% 뇌에 암기됨', optionB: '운동을 하지 않아도 캡틴 아메리카급 완벽한 근육 몸매 유지', category: '지능 / 신체' },
        { id: 19, optionA: '손가락 튕기면 방 청소와 빨래가 1초 만에 완료', optionB: '손가락 튕기면 모든 전자기기 배터리가 100% 완충', category: '생활 편의' },
        { id: 20, optionA: '나를 사랑하는 사람 100명 vs 나를 동경하는 사람 100만 명', optionB: '내가 진심으로 사랑하는 단 1명과 영원히 함께하기', category: '사랑' },
        { id: 21, optionA: '사물의 무게를 0으로 만들어 가볍게 들어올리기', optionB: '벽이나 장애물을 통과해 걸어 다닐 수 있는 능력', category: '물리' },
        { id: 22, optionA: '전 세계 모든 도서관의 지식을 머릿속에 탑재', optionB: '전 세계 모든 무술과 격투기를 마스터한 인간 병기', category: '문무' },
        { id: 23, optionA: '날씨를 내 마음대로 비/눈/맑음으로 조작하기', optionB: '지진, 태풍 등 모든 자연재해를 100% 사전에 막아내기', category: '날씨' },
        { id: 24, optionA: '내가 좋아하는 만화/영화 세계 속으로 들어가 살기', optionB: '만화/영화 속 주인공을 현실 세계로 소환해 친구 먹기', category: '서브컬처' },
        { id: 25, optionA: '눈물 흘릴 때마다 순도 99% 다이아몬드가 떨어짐', optionB: '땀 흘릴 때마다 순금 금가루가 배출됨', category: '연금술' },
        { id: 26, optionA: '꿈속을 내가 100% 자각몽으로 지배하고 현실처럼 체감', optionB: '다른 사람의 꿈속에 들어가서 함께 놀고 메시지 남기기', category: '꿈' },
        { id: 27, optionA: '원하는 사람과 영혼을 24시간 동안 맞바꾸기', optionB: '내 분신(도플갱어)을 3명 소환해 대신 일시키기', category: '분신' },
        { id: 28, optionA: '거짓말을 들으면 즉시 붉은 빛으로 간파하는 진실의 눈', optionB: '상대의 수명이 머리 위에 숫자로 보이는 사신의 눈', category: '마안' },
        { id: 29, optionA: '어떤 치명적인 독이나 바이러스에도 100% 면역 체질', optionB: '더위와 추위를 전혀 느끼지 않고 쾌적한 항온 체질', category: '체질' },
        { id: 30, optionA: '초능력을 갖는 대신 평생 인터넷/스마트폰 금지', optionB: '평범한 인간으로 살되 통장에 1000억 원 지급', category: '최종 선택' }
      ]
    }
  ],

  // 15. 줌아웃 이미지 퀴즈
  'zoom-quiz': [
    {
      id: 'zoom_daily_objects',
      gameId: 'zoom-quiz',
      title: '🔍 [공식] 초근접 줌아웃 사물 & 랜드마크 퀴즈 팩 (25선)',
      description: '극단적으로 줌인된 일부분을 보고 무엇인지 빠르게 맞혀보세요!',
      author: 'PartyHub 공식',
      tags: ['사물', '랜드마크', '초근접', '고화질'],
      itemCount: 25,
      isPublic: true,
      likes: 7120,
      createdAt: 1700000000000,
      data: [
        { id: 1, answer: '피자', aliases: ['페퍼로니피자', '치즈피자'], image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80', focusX: 45, focusY: 55 },
        { id: 2, answer: '치킨', aliases: ['후라이드', '통닭', '후라이드치킨'], image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80', focusX: 60, focusY: 40 },
        { id: 3, answer: '고양이', aliases: ['냥이', '야옹이'], image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80', focusX: 48, focusY: 50 },
        { id: 4, answer: '강아지', aliases: ['개', '댕댕이', '멍멍이'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 40 },
        { id: 5, answer: '에펠탑', aliases: ['파리에펠탑'], image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 30 },
        { id: 6, answer: '딸기', aliases: ['스트로베리'], image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 7, answer: '바나나', aliases: ['바나나송이'], image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80', focusX: 45, focusY: 55 },
        { id: 8, answer: '농구공', aliases: ['농구'], image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 9, answer: '커피', aliases: ['아메리카노', '라떼', '에스프레소'], image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 10, answer: '도넛', aliases: ['도너츠', '글레이즈드'], image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 11, answer: '사과', aliases: ['청사과', '빨간사과'], image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 12, answer: '햄버거', aliases: ['버거', '치즈버거'], image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 13, answer: '호랑이', aliases: ['범', '타이거'], image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 45 },
        { id: 14, answer: '축구공', aliases: ['축구'], image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 15, answer: '선글라스', aliases: ['선글래스', '안경'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 16, answer: '자전거', aliases: ['사이클', '바이시클'], image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 17, answer: '기타', aliases: ['통기타', '일렉기타'], image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80', focusX: 45, focusY: 50 },
        { id: 18, answer: '비행기', aliases: ['항공기', '여객기'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 19, answer: '팝콘', aliases: ['콘'], image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 20, answer: '초콜릿', aliases: ['초콜렛', '초코'], image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 21, answer: '수박', aliases: ['워터멜론'], image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 22, answer: '시계', aliases: ['손목시계', '워치'], image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 23, answer: '스마트폰', aliases: ['핸드폰', '아이폰', '갤럭시'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 24, answer: '헤드폰', aliases: ['헤드셋', '이어폰'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 },
        { id: 25, answer: '피아노', aliases: ['건반'], image: 'https://images.unsplash.com/photo-1520523839898-507125cd53c1?w=800&auto=format&fit=crop&q=80', focusX: 50, focusY: 50 }
      ]
    }
  ],

  // 18. 블라인드 눈감고 드로잉 제시어 팩 (55선)
  'blind-drawing': [
    {
      id: 'blind_classic_55',
      gameId: 'blind-drawing',
      title: '🙈 [공식] 눈감고 그리는 대환장 괴작 엄선 55선',
      description: '스케이트보드 타는 기린, 선글라스 낀 피카츄, 우주복 입은 고양이 등 빵 터지는 제시어 모음',
      author: 'PartyHub 공식',
      tags: ['드로잉', '블라인드', '웃음보장', '괴작', '예능'],
      itemCount: 55,
      isPublic: true,
      likes: 9810,
      createdAt: 1700000000000,
      data: [
        '스케이트보드 타는 기린', '선글라스 낀 피카츄', '우주복 입은 고양이', '피자 먹는 티라노사우루스', '춤추는 눈사람',
        '햄버거 먹는 펭귄', '선풍기 앞의 판다', '서핑보드 타는 토끼', '역도하는 햄스터', '커피 마시는 사자',
        '드럼 치는 문어', '비키니 입은 킹콩', '치킨 뜯는 닭', '라면 끓이는 너구리', '요가하는 코끼리',
        '낚시하는 고래', '오토바이 타는 치와와', '디제잉하는 개구리', '셀카 찍는 나무늘보', '줄넘기하는 하마',
        '롤러코스터 타는 유령', '외계인에게 납치되는 소', '지각해서 식빵 물고 달리는 학생', '단속 피하는 전동 킥보드', '노래방에서 열창하는 백수',
        '비행기 날개 위의 승객', '헬스장에서 거울 셀카 찍는 곰', '벼락 맞은 대머리', '치과에서 오열하는 악어', '무인도에서 코코넛 따는 원주민',
        '붕어빵', '타코야끼', '회전목마', '에펠탑', '자유의 여신상',
        '소방차', '잠수함', '열기구', '신호등', '해골 바가지',
        '선풍기', '전자레인지', '마이크 잡은 래퍼', '축구 골키퍼', '당구 치는 마법사',
        '캠핑장에서 고기 굽는 늑대', '스모 선수', '도둑과 경찰', '바나나 껍질 밟고 넘어지는 로봇', '눈물 흘리는 양파',
        '스쿠버 다이빙하는 원숭이', '우산 쓰고 날아가는 사람', '마라톤 결승선 통과', '생일 케이크 촛불 부는 공룡', '사우나에서 땀 흘리는 북극곰'
      ]
    }
  ],

    // 8. 성대모사 1:1 토너먼트 미션 팩 (실제 음성 100% 지원 3대 팩)
  'voice-battle': [
    {
      id: 'voice_real_meme_korean',
      gameId: 'voice-battle',
      title: '🔥 [🇰🇷 한국 문화 전용] 한국 레전드 밈 & 인터넷 방송 시그니처 팩',
      description: '사딸라, 랄로, 괴물쥐, 오징어게임, 이병헌, 강남스타일 등 원본 오디오가 100% 재생되는 레전드 팩',
      author: 'PartyHub 공식',
      tags: ['한국문화전용', '실제음성', '레전드밈', '김두한', '랄로', '괴물쥐', '오징어게임'],
      itemCount: 14,
      isPublic: true,
      likes: 4200,
      createdAt: 1700000000000,
      language: 'ko',
      isKoreanCultureOnly: true,
      data: [
        { character: '야인시대 김두한', line: '사딸라!', hint: '미군과 담판 짓는 협상의 달인 김영철', audioUrl: '/audio/voice-battle/saddalra.mp3' },
        { character: '괴물쥐', line: '말대꾸 하지마!', hint: '쥐환이의 찰진 버럭 호통', audioUrl: '/audio/voice-battle/maldaeggu.mp3' },
        { character: '랄로', line: '안녕하세요 도둑입니다.', hint: '특유의 건들건들 나른한 톤', audioUrl: '/audio/voice-battle/ralro_thief.mp3' },
        { character: '괴물쥐', line: '비켜!!', hint: '목청 터져라 외치는 긴급 샤우팅', audioUrl: '/audio/voice-battle/bikyeo.mp3' },
        { character: '오징어 게임 영희', line: '무궁화 꽃이 피었습니다', hint: '서늘하고 소름 돋는 영희 인형 목소리', audioUrl: '/audio/voice-battle/squid_mugunghwa.mp3' },
        { character: '오징어 게임 이정재', line: '우린 말이 아니야, 사람이야!', hint: '울분을 토해내는 이정재의 명대사', audioUrl: '/audio/voice-battle/squid_horse.mp3' },
        { character: '오징어 게임 성기훈', line: '얼음!', hint: '다급하고 절박한 외침', audioUrl: '/audio/voice-battle/seonggihun_ice.mp3' },
        { character: '싸이 (PSY)', line: '오빤 강남스타일!', hint: '전 세계를 흔든 전설의 그 샤우팅', audioUrl: '/audio/voice-battle/gangnam_style.mp3' },
        { character: '김남규', line: '할 수 있어 민수야!', hint: '진심 어린 응원과 격려', audioUrl: '/audio/voice-battle/minsu.mp3' },
        { character: '이병헌', line: '안 돼-!!', hint: '영혼까지 끌어모은 절규', audioUrl: '/audio/voice-battle/leebyunghun_andwae.mp3' },
        { character: 'BTS 정국', line: '안녕하세요 저는 방탄소년단 황금막내 정국입니다', hint: '풋풋하고 상큼한 자기소개', audioUrl: '/audio/voice-battle/bts_jungkook.mp3' },
        { character: '스티븐 허 (Steven He)', line: 'Emotional Damage!', hint: '슬리퍼를 날리며 날리는 정신적 데미지', audioUrl: '/audio/voice-battle/emotional_damage.mp3' },
        { character: '크리스티아누 호날두', line: 'SIUUUUU!', hint: '경기장을 뒤흔드는 전설의 호우 세레머니', audioUrl: '/audio/voice-battle/ronaldo_siu.mp3' },
        { character: '고든 램지', line: 'Where is the lamb sauce?!', hint: '주방을 뒤엎을 기세의 호통', audioUrl: '/audio/voice-battle/lamb_sauce.mp3' }
      ]
    },
    {
      id: 'voice_real_games',
      gameId: 'voice-battle',
      title: '⚔️ [실제 원본 음성 100%] 롤 & 스타 & 발로란트 게임 명대사 팩',
      description: '야스오, 리신, 티모, 아리, 배틀크루저, 핵 감지, 제트 등 원본 인게임 사운드 100% 수록',
      author: 'PartyHub 공식',
      tags: ['실제음성', '롤', '스타크래프트', '발로란트', '게임음성'],
      itemCount: 10,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '롤 야스오', line: '소리에게돈!', hint: '바람을 가르는 야스오의 궁극기 포효', audioUrl: '/audio/voice-battle/yasuo_soriegeton.mp3' },
        { character: '롤 야스오', line: '하사기!', hint: '회오리바람을 날리는 찰나의 기합', audioUrl: '/audio/voice-battle/yasuo_hasaki.mp3' },
        { character: '롤 리 신', line: '이쿠-!', hint: '눈을 감고 발차기를 꽂아 넣는 수도승', audioUrl: '/audio/voice-battle/lee_sin_iku.mp3' },
        { character: '롤 티모', line: '정찰 다녀오겠습니다!', hint: '가장 얄밉고 앙증맞은 목소리', audioUrl: '/audio/voice-battle/teemo_scout.mp3' },
        { character: '롤 아리', line: '저를 믿지 못하시나요?', hint: '매혹적인 구미호의 목소리', audioUrl: '/audio/voice-battle/ahri_trust.mp3' },
        { character: '롤 전설의 중계', line: 'Faker, what was that?!', hint: '류의 제드를 솔킬 낸 페이커의 명장면 영어 해설', audioUrl: '/audio/voice-battle/faker_what_was_that.mp3' },
        { character: '스타크래프트 배틀크루저', line: 'Battlecruiser operational.', hint: '중후하고 차분한 함장의 출격 보고', audioUrl: '/audio/voice-battle/battlecruiser.mp3' },
        { character: '스타크래프트 부관', line: 'Nuclear launch detected.', hint: '온몸에 소름 돋는 핵 미사일 감지 경보', audioUrl: '/audio/voice-battle/nuke_detected.mp3' },
        { character: '스타크래프트 마린', line: 'You wanna piece of me, boy?', hint: '기관총을 장전하며 읊조리는 해병', audioUrl: '/audio/voice-battle/sc_marine.mp3' },
        { character: '발로란트 제트', line: 'Jett revive me!', hint: '전 세계 게이머들의 눈물겨운 부활 요청 밈', audioUrl: '/audio/voice-battle/jett_revive.mp3' }
      ]
    },
    {
      id: 'voice_real_anime',
      gameId: 'voice-battle',
      title: '⚡ [실제 원본 음성 100%] 전설의 명작 애니메이션 시그니처 대사 팩',
      description: '나선환, 치도리, 고무고무 피스톨, 복마어주자, 오마에와 모 신데이루 등 원본 음성 수록',
      author: 'PartyHub 공식',
      tags: ['실제음성', '애니', '나루토', '원피스', '주술회전', '죠죠'],
      itemCount: 12,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '진격의 거인 에렌 예거', line: '싸워라, 싸워라! (타타카에!)', hint: '거울을 보며 결의를 다지는 분노의 외침', audioUrl: '/audio/voice-battle/tatakae.mp3' },
        { character: '나루토', line: '나선환! (라센간!)', hint: '손바닥에 차크라를 회전시키는 열혈 샤우팅', audioUrl: '/audio/voice-battle/rasengan.mp3' },
        { character: '사스케', line: '치도리!', hint: '천 마리의 새가 우는 뇌절의 번개', audioUrl: '/audio/voice-battle/chidori.mp3' },
        { character: '주술회전 료멘 스쿠나', line: '영역 전개 (료이키 텐카이) - 복마어주자', hint: '손가락 인을 맺으며 깔리는 저주받은 목소리', audioUrl: '/audio/voice-battle/sukuna_ryoiki.mp3' },
        { character: '원피스 몽키 D 루피', line: '고무고무~ 피스톨!', hint: '팔을 쭉 뻗으며 날리는 강펀치', audioUrl: '/audio/voice-battle/gomu_gomu.mp3' },
        { character: '북두의 권 켄시로', line: '오마에와 모 신데이루 (너는 이미 죽어있다)', hint: '상대 혈도를 찌른 뒤 뒤돌아서며', audioUrl: '/audio/voice-battle/omaewa.mp3' },
        { character: '죠죠의 기묘한 모험 디오', line: '코노 디오다! (이 디오다!)', hint: '사악하고 오만방자한 표정으로 외치기', audioUrl: '/audio/voice-battle/kono_dio_da.mp3' },
        { character: '죠죠의 기묘한 모험 디오', line: 'WRYYYYYY-!', hint: '흡혈귀의 초고음 괴성 샤우팅', audioUrl: '/audio/voice-battle/dio_wryyy.mp3' },
        { character: '죠죠 쿠죠 죠타로', line: '야레야레 다제 (이런이런)', hint: '모자를 푹 눌러쓰며 내뱉는 귀찮은 한숨', audioUrl: '/audio/voice-battle/yare_yare_daze.mp3' },
        { character: '죠죠 쿠죠 죠타로', line: '오라오라오라오라!', hint: '스타 플래티나의 초고속 연타 기합', audioUrl: '/audio/voice-battle/ora_ora.mp3' },
        { character: '포켓몬스터 피카츄', line: '피카 피카 피카츄~!', hint: '세상에서 가장 귀여운 볼따구 전기 소리', audioUrl: '/audio/voice-battle/pikachu_pika.mp3' },
        { character: '포켓몬스터 피카츄', line: '피~카~ 츄-!', hint: '백만볼트를 쏘아 올리는 기합', audioUrl: '/audio/voice-battle/pikachu_thunderbolt.mp3' }
      ]
    },
    {
      id: 'voice_real_sfx',
      gameId: 'voice-battle',
      title: '🔥 [실제 원본 음성 100%] 전설의 글로벌 밈 & 뇌절 샤우팅 팩 (12선)',
      description: 'OHHHHHHHHHHHHHHH, FA! FA! FA!, 아쟁총각 비타스, What Does The Fox Say, 아이쇼스피드 등 전 세계 레전드 밈 샤우팅 원본 음성 수록!',
      author: 'PartyHub 공식',
      tags: ['실제음성', '글로벌밈', 'OHHHH', 'FAFAFA', '샤우팅', '레전드'],
      itemCount: 12,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '수파 핫 파이어 (Supa Hot Fire)', line: 'OHHHHHHHHHHHHHHH!!', hint: '랩 배틀 폭탄 드롭 후 관중들의 광란의 환호성', audioUrl: '/audio/voice-battle/meme_ohhhhh.mp3' },
        { character: 'FA! FA! FA! (틱톡 트렌드)', line: 'FA! FA! FA! (FAHHHHHH!!)', hint: '비트에 맞춰 터져 나오는 찰진 기합 샤우팅', audioUrl: '/audio/voice-battle/meme_fafafa.mp3' },
        { character: '비타스 (아쟁총각 7th Element)', line: 'BLBLBLBLBLBL! 아~ 아~ 아!', hint: '혀를 빠르게 굴리며 짓는 외계인 미소와 찰진 혀 튕기기', audioUrl: '/audio/voice-battle/meme_vitas.mp3' },
        { character: '일비스 (What Does The Fox Say)', line: '딩딩딩딩 딩그링그링! 파파파파 파우!', hint: '전 세계를 뒤흔든 여우의 정체불명 울음소리', audioUrl: '/audio/voice-battle/meme_fox_say.mp3' },
        { character: '메탈기어 솔리드 (Metal Gear Alert)', line: '(!) 띠-잉!!', hint: '적에게 발각되었을 때 머리 위에 느낌표와 함께 울리는 비프음', audioUrl: '/audio/voice-battle/meme_metal_gear.mp3' },
        { character: '스폰지밥 내레이터', line: 'Two hours later... (투 아워스 레이터)', hint: '특유의 프랑스 억양으로 읽는 스폰지밥 시간 경과 카드', audioUrl: '/audio/voice-battle/meme_two_hours_later.mp3' },
        { character: '독일 초딩 (Angry German Kid)', line: '야아아아악! 와아아악!! (키보드 샷건)', hint: '언리얼 토너먼트 로딩 중 폭발하는 분노의 샤우팅', audioUrl: '/audio/voice-battle/meme_angry_german.mp3' },
        { character: '클럽 믹스테이프 (Damn Son)', line: 'Damn son, where\'d you find this?', hint: '클럽 믹스테이프의 전설적인 드롭 시그니처', audioUrl: '/audio/voice-battle/meme_damn_son.mp3' },
        { character: '슈퍼 마리오 64', line: 'Yahoo! Wahoo! It\'s-a me, Mario!', hint: '이탈리아 억양의 활기찬 점프 샤우팅', audioUrl: '/audio/voice-battle/meme_mario_yahoo.mp3' },
        { character: '레전드 효과음 (Bruh)', line: 'Bruh... (브러...)', hint: '어이없고 황당할 때 묵직하게 깔리는 탄식', audioUrl: '/audio/voice-battle/meme_bruh.mp3' },
        { character: '바인 붐 (Vine Boom)', line: '쿵-!! (Vine Boom Sound)', hint: '반전이나 충격적인 순간에 울리는 그 묵직한 쿵 소리', audioUrl: '/audio/voice-battle/meme_vine_boom.mp3' },
        { character: '아이쇼스피드 (IShowSpeed)', line: 'BARK BARK BARK! (폭풍 개짖기)', hint: '방송 중 흥분해서 거칠게 짖어대는 광기의 리액션', audioUrl: '/audio/voice-battle/meme_speed_bark.mp3' }
      ]
    },
    {
      id: 'voice_kr_streamer_memes',
      gameId: 'voice-battle',
      title: '🇰🇷 [한국 문화 전용] 한국 스트리머 레전드 유행어 & 찰진 명대사 팩 (12선)',
      description: '감스트 "개새끼 열매", "이래도 지랄", 랄로 "꼬추때라", 거제 야호, 나문희 "호박고구마", 심영 등 한국 인터넷 역사에 남은 레전드 밈 모음!',
      author: 'PartyHub 공식',
      tags: ['한국문화전용', '한국밈', '감스트', '랄로', '나문희', '스트리머', '실제음성'],
      itemCount: 12,
      isPublic: true,
      likes: 3850,
      createdAt: 1700000000000,
      language: 'ko',
      isKoreanCultureOnly: true,
      data: [
        { character: '감스트 (GAMST)', line: '너 개새끼 열매 먹었냐?!', hint: '목청 터지며 외치는 레전드 극대노 호통', audioUrl: '/audio/voice-battle/kr_gamst_fruit.mp3' },
        { character: '감스트 (GAMST)', line: '이래도 지랄 저래도 지랄!', hint: '억까에 지쳐 쏟아내는 분노의 랩핑', audioUrl: '/audio/voice-battle/kr_gamst_jiral.mp3' },
        { character: '랄로 (Ralro)', line: '꼬추 때라 그냥!', hint: '특유의 시니컬하고 찰진 훈수', audioUrl: '/audio/voice-battle/kr_ralro_cut.mp3' },
        { character: '거제 야호 할아버지', line: '야호-! (거제 야호)', hint: '산 정상에서 울려 퍼지는 우렁찬 그 샤우팅', audioUrl: '/audio/voice-battle/kr_geoje_yaho.mp3' },
        { character: '나문희 (거침없이 하이킥)', line: '호박고구마!! 호박고구마!!!', hint: '식탁에서 며느리에게 폭발하는 레전드 샤우팅', audioUrl: '/audio/voice-battle/kr_sweet_potato.mp3' },
        { character: '야인시대 심영', line: '1972년 12월 21일...', hint: '비장하고 처절한 심영물의 오프닝 내레이션', audioUrl: '/audio/voice-battle/kr_simyoung_date.mp3' },
        { character: '이명박 대통령 짤', line: '이 차는 이제 제겁니다', hint: '취재진 앞에서 능청스럽게 차에 오르며', audioUrl: '/audio/voice-battle/kr_this_car.mp3' },
        { character: '학교폭력 멈춰', line: '멈춰-! (학교폭력 멈춰)', hint: '손바닥을 쫙 펴며 단호하게 외치는 멈춰 구호', audioUrl: '/audio/voice-battle/kr_stop.mp3' },
        { character: '홍명보 감독', line: '싸워-!! 싸우라고-!!', hint: '그라운드를 향해 목이 터져라 지르는 사자후', audioUrl: '/audio/voice-battle/kr_hong_fight.mp3' },
        { character: '가재맨', line: '엄... 넌 따라가라', hint: '어이없다는 듯 툭 내뱉는 건조한 말투', audioUrl: '/audio/voice-battle/kr_gajaeman_eom.mp3' },
        { character: '인터넷 밈', line: '하~앙! (찰진 신음)', hint: '각종 영상에 효과음으로 들어가는 바로 그 소리', audioUrl: '/audio/voice-battle/kr_haang.mp3' },
        { character: '레전드 엽기 효과음', line: '뿌-웅! (찰진 방귀)', hint: '가장 짧고 강렬하게 터져 나오는 리얼 방귀음', audioUrl: '/audio/voice-battle/kr_bbung.mp3' }
      ]
    },
    {
      id: 'voice_legendary_games',
      gameId: 'voice-battle',
      title: '🎮 [공식] 롤 & 발로란트 & 마인크래프트 게임 사운드 팩 (12선)',
      description: '펜타킬, 더블킬, 미아 핑, 발로란트 에이스/스파이크, 마크 피격/경험치, 어몽어스 임포스터, 로블록스 OOF 등 게이머라면 누구나 아는 명작 사운드!',
      author: 'PartyHub 공식',
      tags: ['게임음성', '롤', '발로란트', '마인크래프트', '어몽어스', '로블록스'],
      itemCount: 12,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '리그 오브 레전드', line: '펜타킬! (PENTAKILL!)', hint: '전장을 지배한 자에게 바치는 전설의 아나운서 샤우팅', audioUrl: '/audio/voice-battle/game_pentakill.mp3' },
        { character: '리그 오브 레전드', line: '더블킬! (DOUBLE KILL!)', hint: '짜릿한 2연속 처치 아나운서 음성', audioUrl: '/audio/voice-battle/game_doublekill.mp3' },
        { character: '리그 오브 레전드 시스템', line: '미아 핑 (물음표 핑 띠링)', hint: '적 실종 시 라인에 찍히는 신경 쓰이는 핑 소리', audioUrl: '/audio/voice-battle/game_missing_ping.mp3' },
        { character: '발로란트 (Valorant)', line: '에이스! (Valorant Ace Sound)', hint: '5인 전원 처치 시 울려 퍼지는 환상적인 클러치 사운드', audioUrl: '/audio/voice-battle/game_val_ace.mp3' },
        { character: '발로란트 시스템', line: '스파이크 설치 완료 (Spike Planted)', hint: 'A/B 사이트에 스파이크가 설치되는 긴장감 넘치는 비프음', audioUrl: '/audio/voice-battle/game_val_plant.mp3' },
        { character: '마인크래프트 스티브', line: '찰진 피격음 (Oof / Classic Hurt)', hint: '낙하 데미지나 좀비에게 맞았을 때 나는 묵직한 뼈 맞는 소리', audioUrl: '/audio/voice-battle/game_mc_hurt.mp3' },
        { character: '마인크래프트 경험치', line: '레벨업 경험치 구슬 (띵띵띵띠링)', hint: '초록색 경험치 구슬을 흡수할 때 나는 영롱한 차임벨', audioUrl: '/audio/voice-battle/game_mc_xp.mp3' },
        { character: '어몽어스 (Among Us)', line: '임포스터 지목 효과음 (두-웅...)', hint: '크루원 중 임포스터가 공개되는 순간의 으스스한 사운드', audioUrl: '/audio/voice-battle/game_amongus_reveal.mp3' },
        { character: '로블록스 (Roblox)', line: 'OOF! (사망 효과음)', hint: '전 세계 게이머들의 뇌리에 박힌 오리지널 사망 음성', audioUrl: '/audio/voice-battle/game_roblox_oof.mp3' },
        { character: '포켓몬스터 1세대', line: '야생의 포켓몬 배틀 개시 BGM (띠리리리리)', hint: '풀숲에서 포켓몬과 마주치는 순간 긴장감 넘치는 인트로', audioUrl: '/audio/voice-battle/game_pokemon_battle.mp3' },
        { character: '메탈슬러그', line: 'OK! (미션 스타트)', hint: '미션 1 시작과 함께 울려 퍼지는 남자의 목소리', audioUrl: '/audio/voice-battle/game_metal_slug_ok.mp3' },
        { character: '이니셜 D', line: 'DEJA VU! I\'ve just been in this place before!', hint: '드리프트와 함께 폭발하는 전설의 유로비트 샤우팅', audioUrl: '/audio/voice-battle/game_deja_vu.mp3' }
      ]
    },
    {
      id: 'voice_daily_sfx_notif',
      gameId: 'voice-battle',
      title: '🔔 [공식] 일상 필수 알림음 & 공포의 시스템 효과음 팩 (12선)',
      description: '디스코드 통화/알림/입장, 카카오톡, 서울 지하철 진입음, 학교 종소리, 쇠파이프, 뺨 때리기, FBI OPEN UP 등 일상 속 시그니처 사운드!',
      author: 'PartyHub 공식',
      tags: ['알림음', '디스코드', '카톡', '지하철', '효과음', '쇠파이프'],
      itemCount: 12,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '디스코드 (Discord)', line: '통화 연결음 (뚜루루루 뚜루루루)', hint: '음성 통화 발신 시 귀에 맴도는 중독성 멜로디', audioUrl: '/audio/voice-battle/sfx_discord_call.mp3' },
        { character: '디스코드 알림', line: '메시지 알림음 (띵!)', hint: '멘션이나 DM 왔을 때 울리는 깔끔한 차임벨', audioUrl: '/audio/voice-battle/sfx_discord_notif.mp3' },
        { character: '디스코드 음성채널', line: '채널 입장음 (동-둥!)', hint: '친구가 음성 통화방에 들어올 때 나는 반가운 소리', audioUrl: '/audio/voice-battle/sfx_discord_join.mp3' },
        { character: '카카오톡 (KakaoTalk)', line: '카톡-!', hint: '대한민국 국민 모두가 반응하는 찰진 알림 음성', audioUrl: '/audio/voice-battle/sfx_katalk.mp3' },
        { character: '서울교통공사 지하철', line: '열차 진입 멜로디 (빠바밤 빠바밤 빠밤~)', hint: '승강장에 열차가 들어올 때 울려 퍼지는 국악/오케스트라 진입음', audioUrl: '/audio/voice-battle/sfx_seoul_subway.mp3' },
        { character: '초중고등학교', line: '수업 시작 종소리 (딩동댕동~ 딩동댕동~)', hint: '쉬는 시간 끝나고 교실로 뛰어가게 만드는 전설의 벨', audioUrl: '/audio/voice-battle/sfx_school_bell.mp3' },
        { character: '메탈 파이프 밈', line: '챙-그랑 탕탕탕 (쇠파이프 낙하음)', hint: '아무 이유 없이 뇌절로 터져 나오는 묵직한 쇠파이프 둔탁음', audioUrl: '/audio/voice-battle/sfx_metal_pipe.mp3' },
        { character: '뺨 때리기 효과음', line: '찰싹-!! (찰진 뺨 때리는 소리)', hint: '막장 드라마의 따귀 세례를 연상시키는 경쾌한 파열음', audioUrl: '/audio/voice-battle/sfx_slap.mp3' },
        { character: 'FBI 밈', line: 'FBI OPEN UP! (문 부수고 돌입)', hint: '수상한 검색어 입력 시 문 박차고 들어오는 특수부대', audioUrl: '/audio/voice-battle/sfx_fbi_open.mp3' },
        { character: '마이크로소프트 윈도우', line: '윈도우 XP 종료음 (띠리링~)', hint: '컴퓨터 끄고 잠자리에 들 때 듣던 추억의 사운드', audioUrl: '/audio/voice-battle/sfx_win_xp_shutdown.mp3' },
        { character: '애플 (Apple)', line: '애플페이 결제음 (띵-!)', hint: '단말기에 아이폰을 갖다 댔을 때 나는 부드러운 차임', audioUrl: '/audio/voice-battle/sfx_apple_pay.mp3' },
        { character: '민방위 본부', line: '위이이잉- 애애앵-! (공습경보 사이렌)', hint: '전국에 울려 퍼지는 섬뜩하고 긴박한 비상 사이렌', audioUrl: '/audio/voice-battle/sfx_air_raid.mp3' }
      ]
    },
    {
      id: 'voice_anime_pop_bgm',
      gameId: 'voice-battle',
      title: '📺 [공식] 전설의 애니 & 중독성 팝/BGM 팩 (10선)',
      description: '코난 추리 테마, 고죠 무량공처, 죠죠 처형곡, 마이클 잭슨 Hee Hee, 해리포터 리코더, 스폰지밥, 피터 파커 댄스 등 전설의 BGM 모음!',
      author: 'PartyHub 공식',
      tags: ['애니BGM', '코난', '고죠사토루', '죠죠', '마이클잭슨', '해리포터'],
      itemCount: 10,
      isPublic: true,
      likes: 0,
      createdAt: 1700000000000,
      data: [
        { character: '명탐정 코난', line: '추리 테마 BGM (딴딴딴 따단- 딴딴딴 따단-)', hint: '진실은 언제나 하나! 사건의 진상이 밝혀질 때 흐르는 색소폰', audioUrl: '/audio/voice-battle/anime_conan.mp3' },
        { character: '주술회전 고죠 사토루', line: '영역 전개 (료이키 텐카이) - 무량공처', hint: '안대를 벗으며 무한한 정보를 주입하는 최강의 주술사', audioUrl: '/audio/voice-battle/anime_gojo_domain.mp3' },
        { character: '죠죠의 기묘한 모험 5부', line: '골든 윈드 처형곡 피아노 솔로 (일 벤토 도로)', hint: '피아노 건반이 빨라지며 악당에게 무다무다 7페이지 난타 예고', audioUrl: '/audio/voice-battle/anime_jojo_golden.mp3' },
        { character: '마이클 잭슨 (Michael Jackson)', line: 'Hee Hee! (아오!)', hint: '문워크와 함께 터져 나오는 팝의 황제 시그니처 샤우팅', audioUrl: '/audio/voice-battle/anime_mj_heehee.mp3' },
        { character: '해리포터 망한 연주 밈', line: '리코더 발연주 테마곡 (삐이익 삑삑)', hint: '호그와트 마법 학교의 웅장한 테마를 음이탈로 망치는 리코더', audioUrl: '/audio/voice-battle/anime_harry_recorder.mp3' },
        { character: '스폰지밥', line: 'A few moments later... (어 퓨 모먼츠 레이터)', hint: '느긋하고 우아한 프랑스 억양의 시간 경과 내레이션', audioUrl: '/audio/voice-battle/anime_sponge_moments.mp3' },
        { character: '스파이더맨 3 피터 파커', line: '피터 파커 흑화 댄스 BGM (따다다 따다단)', hint: '앞머리를 내리고 길거리를 활보하며 추는 광기의 골반 댄스', audioUrl: '/audio/voice-battle/anime_spiderman_dance.mp3' },
        { character: '드래곤볼 손오공', line: '손오공 드립 BGM (Goku Drip)', hint: '패딩 입은 손오공 짤과 함께 울려 퍼지는 극의 트랩 비트', audioUrl: '/audio/voice-battle/anime_goku_drip.mp3' },
        { character: '수퍼 아이돌 (Super Idol)', line: 'Super Idol de xiaorong (수퍼 아이돌)', hint: '물병을 뿌리며 청량하게 부르는 중국 틱톡 전설의 챌린지', audioUrl: '/audio/voice-battle/anime_super_idol.mp3' },
        { character: 'YIPPEE 밈 (TBH Creature)', line: 'YIPPEEEEEEEEEEEEEE!!', hint: '콜라 마시고 포트나이트 할 때 내지르는 초고음 환호성', audioUrl: '/audio/voice-battle/meme_yippee.mp3' }
      ]
    },
    {
      id: 'voice_global_en',
      gameId: 'voice-battle',
      title: '🎬 [Global English] Famous Movie & Pop Culture Quotes',
      description: 'SpongeBob, Star Wars, Terminator, Batman, Gordon Ramsay, Mario - 10 Universal English Voice Lines',
      author: 'PartyHub Official',
      tags: ['English', 'Movies', 'PopCulture', 'Global'],
      itemCount: 10,
      isPublic: true,
      likes: 6410,
      createdAt: 1700000000000,
      language: 'en',
      data: [
        { character: 'SpongeBob SquarePants', line: 'I\'m ready! I\'m ready! I\'m ready!', hint: 'High-pitched excited laugh and bounce', audioUrl: '/audio/voice-battle/meme_two_hours_later.mp3' },
        { character: 'Gordon Ramsay', line: 'Where is the lamb sauce?!', hint: 'Explosive kitchen shouting with pure rage', audioUrl: '/audio/voice-battle/lamb_sauce.mp3' },
        { character: 'Steven He', line: 'Emotional Damage!', hint: 'Slapping a sandal with disappointed dad tone', audioUrl: '/audio/voice-battle/emotional_damage.mp3' },
        { character: 'Cristiano Ronaldo', line: 'SIUUUUU!', hint: 'Iconic roaring jumping stadium celebration', audioUrl: '/audio/voice-battle/ronaldo_siu.mp3' },
        { character: 'StarCraft Marine', line: 'You wanna piece of me, boy?', hint: 'Gruff space marine cocking a heavy rifle', audioUrl: '/audio/voice-battle/sc_marine.mp3' },
        { character: 'StarCraft Battlecruiser', line: 'Battlecruiser operational.', hint: 'Deep calm commanding captain radio', audioUrl: '/audio/voice-battle/battlecruiser.mp3' },
        { character: 'Valorant Jett', line: 'Jett revive me!', hint: 'Desperate hilarious gaming teammate plea', audioUrl: '/audio/voice-battle/jett_revive.mp3' },
        { character: 'LoL Legendary Caster', line: 'Faker, what was that?!', hint: 'Insane hyped English esports casting moment', audioUrl: '/audio/voice-battle/faker_what_was_that.mp3' },
        { character: 'Super Mario', line: 'It\'s-a me, Mario! Yahoo!', hint: 'Cheerful Italian plumber accent with jump sound', audioUrl: '/audio/voice-battle/meme_mario_yahoo.mp3' },
        { character: 'Supa Hot Fire', line: 'OHHHHHHHHHHHHHHH!!', hint: 'The whole crowd screaming after a savage rap diss', audioUrl: '/audio/voice-battle/meme_ohhhhh.mp3' }
      ]
    },
    {
      id: 'voice_global_ja',
      gameId: 'voice-battle',
      title: '⚡ [日本語] アニメ名言＆名セリフ 声真似バトルパック',
      description: 'ナルト、ワンピース、呪術廻戦、ジョジョ、ポケモンなど世界中で大人気のアニメ決めゼリフ10選',
      author: 'PartyHub 公式',
      tags: ['日本語', 'アニメ', '名言', 'ジャンプ'],
      itemCount: 10,
      isPublic: true,
      likes: 5820,
      createdAt: 1700000000000,
      language: 'ja',
      data: [
        { character: 'NARUTO - ナルト', line: '螺旋丸！(らせんがん！)', hint: '手のひらにチャクラを回転させて叫ぶ熱血ボイス', audioUrl: '/audio/voice-battle/rasengan.mp3' },
        { character: 'NARUTO - サスケ', line: '千鳥！(ちどり！)', hint: '千羽の鳥が鳴くような雷鳴の叫び', audioUrl: '/audio/voice-battle/chidori.mp3' },
        { character: '呪術廻戦 - 五条悟', line: '領域展開 - 無量空処 (むりょうくうしょ)', hint: '目隠しを外しながら静かに放つ最強の術式', audioUrl: '/audio/voice-battle/anime_gojo_domain.mp3' },
        { character: '呪術廻戦 - 両面宿儺', line: '領域展開 - 伏魔御厨子 (ふくまみづし)', hint: '低く響き渡る呪いの王の圧倒的威圧感', audioUrl: '/audio/voice-battle/sukuna_ryoiki.mp3' },
        { character: '進撃の巨人 - エレン・イェーガー', line: '戦え、戦え！(たたかえ！)', hint: '鏡に向かって決意を燃やす魂の叫び', audioUrl: '/audio/voice-battle/tatakae.mp3' },
        { character: 'ONE PIECE - ルフィ', line: 'ゴムゴムの〜 ピストル！', hint: '腕を力強く伸ばして放つ痛快な必殺パンチ', audioUrl: '/audio/voice-battle/gomu_gomu.mp3' },
        { character: 'ジョジョ - ディオ', line: 'このDIOだッ！WRYYYYYY！', hint: '傲慢で狂気に満ちた吸血鬼の絶叫', audioUrl: '/audio/voice-battle/kono_dio_da.mp3' },
        { character: 'ジョジョ - 承太郎', line: 'やれやれだぜ... オラオラオラ！', hint: '帽子を深く被りため息から超高速連打へ', audioUrl: '/audio/voice-battle/yare_yare_daze.mp3' },
        { character: '北斗の拳 - ケンシロウ', line: 'お前はもう死んでいる。', hint: '秘孔を突いた後の静かな決め台詞', audioUrl: '/audio/voice-battle/omaewa.mp3' },
        { character: 'ポケットモンスター - ピカチュウ', line: 'ピッカチュウ〜！ ピカピカ！', hint: '世界一可愛らしい声からの10万ボルト気合', audioUrl: '/audio/voice-battle/pikachu_thunderbolt.mp3' }
      ]
    }
  ],

  // 21. 3초 룰 뇌정지 스피드
  'five-sec-rule': [
    {
      id: 'fivesec_classic',
      gameId: 'five-sec-rule',
      title: '⏱️ [공식] 3초 룰 뇌정지 스피드 미션 50선',
      description: '"치킨 브랜드 3개!", "헤어질 때 핑계 3개!" 3초 안에 외치는 순발력 미션 50선',
      author: 'PartyHub 공식',
      tags: ['순발력', '3초룰', '스피드', '예능'],
      itemCount: 50,
      isPublic: true,
      likes: 8120,
      createdAt: 1700000000000,
      data: [
        '치킨 브랜드 3가지!',
        '헤어질 때 대는 핑계 3가지!',
        '초록색 사물 3가지!',
        '피시방에서 시켜 먹는 음식 3가지!',
        '롤(LoL) 챔피언 3명!',
        '한국 래퍼 3명!',
        '편의점 삼각김밥 종류 3가지!',
        '아침에 지각했을 때 대는 핑계 3가지!',
        '동그란 과일 3가지!',
        '겨울 하면 생각나는 음식 3가지!',
        '디스코드에서 자주 쓰는 단어 3개!',
        '노래방 애창곡 3곡!',
        '방 청소할 때 발견되는 물건 3가지!',
        '돈 100만 원 생기면 사고 싶은 것 3가지!',
        '여름 휴가지 3곳!',
        '한국 대표 배달음식 3가지!',
        '스마트폰에서 가장 많이 쓰는 앱 3개!',
        '무인도에 가져갈 물건 3가지!',
        '싫어하는 채소 3가지!',
        '술자리 인기 안주 3가지!',
        '빨간색 음식 3가지!',
        '넷플릭스 인기 시리즈 3편!',
        '한국 프로야구 구단 3곳!',
        '길거리 포장마차 메뉴 3가지!',
        '커피 프랜차이즈 3곳!',
        '라면 브랜드 3가지!',
        '동물원에 있는 동물 3마리!',
        '지하철 2호선 역 이름 3개!',
        '집에 불나면 챙길 물건 3개!',
        '화장실에서 폰으로 하는 것 3가지!',
        '대한민국 대통령 이름 3명!',
        '탕수육 소스 찍어먹는 이유 3가지!',
        '비 오는 날 생각나는 것 3가지!',
        '놀이공원 놀이기구 3가지!',
        '침대 옆에 협탁 위에 있는 물건 3가지!',
        '가방 안에 무조건 들어있는 물건 3가지!',
        '편의점 4캔 만원 맥주 브랜드 3가지!',
        '소주 안주로 최고인 국물 요리 3가지!',
        '새벽 2시에 배고플 때 찾는 음식 3가지!',
        '아이돌 그룹 이름 3팀!',
        '영화관 팝콘 맛 3가지!',
        '친구랑 절교하고 싶어지는 순간 3가지!',
        '가장 무서운 공포 영화 3편!',
        '학창시절 지겹게 들었던 잔소리 3가지!',
        '다이어트할 때 가장 참기 힘든 음식 3가지!',
        '월요일 아침 출근/등교할 때 드는 생각 3가지!',
        '소개팅에서 절대 하면 안 되는 말 3가지!',
        '바다에 사는 해양 생물 3마리!',
        '외계인이 지구에 오면 보여줄 것 3가지!',
        '죽기 전에 꼭 해보고 싶은 버킷리스트 3가지!'
      ]
    }
  ],

  // 22. 서바이벌 상식 퀴즈 쇼 (초등/중등/성인/교수/과학/한국사 6대 팩)
  'trivia-quiz': [
    {
      id: 'trivia_elementary',
      gameId: 'trivia-quiz',
      title: '🎒 [난이도: 초등학생] 누구나 맞히는 기초 퀴즈 팩 (15선)',
      description: '사계절, 대한민국 수도, 기초 상식 등 초등학생도 아는 쉬운 문제',
      author: 'PartyHub 공식',
      tags: ['초등학생', '기초상식', '초급', '워밍업'],
      itemCount: 15,
      isPublic: true,
      likes: 5410,
      createdAt: 1700000000000,
      data: [
        { question: '대한민국의 수도는 어디일까요?', options: ['부산', '서울', '제주', '대구'], answerIndex: 1, explanation: '대한민국의 수도는 서울특별시입니다.' },
        { question: '한 해의 계절 중 가장 더운 계절은 무엇일까요?', options: ['봄', '여름', '가을', '겨울'], answerIndex: 1, explanation: '여름은 기온이 가장 높은 계절입니다.' },
        { question: '호랑이와 사자는 동물 중 어디에 해당할까요?', options: ['조류', '파충류', '포유류', '양서류'], answerIndex: 2, explanation: '새끼를 낳아 젖을 먹여 기르는 포유류입니다.' },
        { question: '신호등에서 "건너가도 좋다"는 신호는 무슨 색일까요?', options: ['빨간색', '노란색', '초록색', '파란색'], answerIndex: 2, explanation: '초록불일 때 횡단보도를 건넙니다.' },
        { question: '1년은 모두 몇 달(개월)로 이루어져 있을까요?', options: ['10달', '12달', '14달', '24달'], answerIndex: 1, explanation: '1년은 1월부터 12월까지 총 12개월입니다.' },
        { question: '태극기의 네 모서리에 있는 4괘 중 "하늘"을 상징하는 것은?', options: ['건(乾)', '곤(坤)', '감(坎)', '리(離)'], answerIndex: 0, explanation: '건괘는 하늘을 상징합니다.' },
        { question: '물(액체)이 얼어서 고체가 되면 무엇이 될까요?', options: ['수증기', '얼음', '눈물', '소금'], answerIndex: 1, explanation: '물이 영하로 내려가면 얼음이 됩니다.' },
        { question: '우리나라의 국화(나라꽃)는 무엇일까요?', options: ['장미', '무궁화', '해바라기', '진달래'], answerIndex: 1, explanation: '대한민국의 국화는 무궁화입니다.' },
        { question: '삼각형의 세 내각의 합은 몇 도일까요?', options: ['90도', '180도', '270도', '360도'], answerIndex: 1, explanation: '삼각형의 세 각의 합은 항상 180도입니다.' },
        { question: '태양 주위를 도는 행성 중 우리가 살고 있는 별은?', options: ['화성', '금성', '지구', '목성'], answerIndex: 2, explanation: '우리가 살고 있는 행성은 지구입니다.' },
        { question: '하루는 몇 시간일까요?', options: ['12시간', '24시간', '36시간', '48시간'], answerIndex: 1, explanation: '지구 자전 주기는 약 24시간입니다.' },
        { question: '사람의 영구치(어른 이빨)는 사랑니를 제외하고 보통 몇 개일까요?', options: ['20개', '24개', '28개', '36개'], answerIndex: 2, explanation: '사랑니를 제외한 어른 영구치는 28개입니다.' },
        { question: '무지개의 일곱 가지 색 중 가장 바깥쪽(첫 번째) 색은?', options: ['빨간색', '노란색', '초록색', '보라색'], answerIndex: 0, explanation: '무지개는 빨주노초파남보 순서입니다.' },
        { question: '조선 시대 거북선을 만들어 왜군을 물리친 장군은?', options: ['강감찬', '이순신', '김유신', '계백'], answerIndex: 1, explanation: '충무공 이순신 장군입니다.' },
        { question: '얼어붙은 물(얼음)이 녹아서 액체가 되는 현상은?', options: ['응고', '융해', '기화', '승화'], answerIndex: 1, explanation: '고체가 액체로 변하는 것을 융해(녹음)라고 합니다.' }
      ]
    },
    {
      id: 'trivia_middle',
      gameId: 'trivia-quiz',
      title: '🏫 [난이도: 중학생] 교과서 필수 상식 퀴즈 팩 (15선)',
      description: '역사 인물, 기초 과학, 사회 상식 교과서 필수 문제 모음',
      author: 'PartyHub 공식',
      tags: ['중학생', '교과서', '역사', '과학'],
      itemCount: 15,
      isPublic: true,
      likes: 6200,
      createdAt: 1700000000000,
      data: [
        { question: '조선 시대 훈민정음(한글)을 창제한 왕은 누구일까요?', options: ['태조 이성계', '세종대왕', '정조', '영조'], answerIndex: 1, explanation: '세종대왕은 1443년에 훈민정음을 창제했습니다.' },
        { question: '지구 대기 중에서 가장 많은 비율(약 78%)을 차지하는 기체는?', options: ['산소', '질소', '이산화탄소', '헬륨'], answerIndex: 1, explanation: '지구 대기의 약 78%는 질소입니다.' },
        { question: '임진왜란 당시 명량해전에서 활약한 조선의 명장은 누구일까요?', options: ['강감찬', '을지문덕', '이순신', '김유신'], answerIndex: 2, explanation: '이순신 장군은 13척의 배로 명량에서 왜선을 격파했습니다.' },
        { question: '물의 화학식 표기로 올바른 것은 무엇일까요?', options: ['CO2', 'H2O', 'NaCl', 'O2'], answerIndex: 1, explanation: '물은 수소 2개와 산소 1개가 결합한 H2O입니다.' },
        { question: '태양계 행성 중 태양에서 가장 가까운 행성은 무엇일까요?', options: ['수성', '금성', '지구', '화성'], answerIndex: 0, explanation: '태양에서 가장 가까운 행성은 수성입니다.' },
        { question: '삼국통일을 완수한 신라의 제30대 왕은 누구일까요?', options: ['문무왕', '진흥왕', '무열왕', '선덕여왕'], answerIndex: 0, explanation: '문무왕은 676년 나당전쟁을 끝으로 삼국통일을 완수했습니다.' },
        { question: '식물이 빛 에너지를 이용해 양분을 만드는 작용은?', options: ['호흡 작용', '광합성', '증산 작용', '발효 작용'], answerIndex: 1, explanation: '엽록체에서 빛을 흡수해 포도당을 만드는 광합성입니다.' },
        { question: '대한민국 헌법 제1조 1항: "대한민국은 (   )이다."', options: ['민주공화국', '자유시장국가', '법치국가', '연방국가'], answerIndex: 0, explanation: '대한민국은 민주공화국이다.' },
        { question: '빛의 속도는 초당 약 몇 km일까요?', options: ['3만 km', '30만 km', '300만 km', '3000만 km'], answerIndex: 1, explanation: '빛의 속도는 진공에서 약 30만 km/s (299,792 km/s)입니다.' },
        { question: '세계에서 가장 긴 강으로 알려진 아프리카의 강은?', options: ['아마존강', '나일강', '양쯔강', '미시시피강'], answerIndex: 1, explanation: '나일강은 총길이 약 6,650km로 세계에서 가장 긴 강입니다.' },
        { question: '직각삼각형에서 직각을 낀 두 변의 제곱의 합은 빗변의 제곱과 같다는 정리는?', options: ['피타고라스 정리', '유클리드 정리', '페르마의 정리', '탈레스 정리'], answerIndex: 0, explanation: 'a² + b² = c²는 피타고라스 정리입니다.' },
        { question: '신라의 청소년 수양 단체로 화랑과 낭도로 구성된 조직은?', options: ['화랑도', '별무반', '삼별초', '훈민회'], answerIndex: 0, explanation: '신라의 화랑도입니다.' },
        { question: '자석의 같은 극끼리는 서로 밀어내는데, 이때 작용하는 힘은?', options: ['인력', '척력', '마찰력', '중력'], answerIndex: 1, explanation: '서로 밀어내는 힘은 척력, 당기는 힘은 인력입니다.' },
        { question: '세계에서 가장 큰 섬은 어디일까요?', options: ['그린란드', '마다가스카르', '보르네오', '제주도'], answerIndex: 0, explanation: '세계 최대의 섬은 덴마크령 그린란드입니다.' },
        { question: '물질을 이루는 기본 입자로 원자핵과 전자로 구성된 것은?', options: ['분자', '원자', '이온', '세포'], answerIndex: 1, explanation: '물질의 기본 입자는 원자(Atom)입니다.' }
      ]
    },
    {
      id: 'trivia_adult',
      gameId: 'trivia-quiz',
      title: '💼 [난이도: 성인] 2026 대한민국 국민 필수 교양 팩 (15선)',
      description: '시사, 경제, 문화, 법률, 세계사 등 성인을 위한 알짜 교양 상식',
      author: 'PartyHub 공식',
      tags: ['성인', '시사', '경제', '교양'],
      itemCount: 15,
      isPublic: true,
      likes: 8940,
      createdAt: 1700000000000,
      data: [
        { question: '물가가 지속적으로 상승하고 화폐 가치가 하락하는 경제 현상은?', options: ['디플레이션', '인플레이션', '스태그플레이션', '모라토리엄'], answerIndex: 1, explanation: '인플레이션(Inflation)은 물가가 지속 상승하는 현상입니다.' },
        { question: '세계에서 가장 넓은 면적을 가진 대양(바다)은 어디일까요?', options: ['대서양', '인도양', '태평양', '북극해'], answerIndex: 2, explanation: '태평양은 전 세계 바다 면적의 약 절반을 차지합니다.' },
        { question: '빛의 삼원색(RGB)에 해당하지 않는 색깔은 무엇일까요?', options: ['빨강', '초록', '파랑', '노랑'], answerIndex: 3, explanation: '빛의 삼원색은 Red, Green, Blue이며 노랑은 포함되지 않습니다.' },
        { question: '컴퓨터의 두뇌에 해당하는 중앙처리장치의 약어는?', options: ['RAM', 'CPU', 'SSD', 'GPU'], answerIndex: 1, explanation: 'CPU(Central Processing Unit)는 핵심 연산 제어 장치입니다.' },
        { question: '올림픽 오륜기에서 상징하지 않는 대륙은 어디일까요?', options: ['아시아', '유럽', '남극', '아프리카'], answerIndex: 2, explanation: '오륜기는 아시아/유럽/아프리카/아메리카/오세아니아 5대륙을 상징합니다.' },
        { question: '주식 시장에서 주가가 지속적으로 하락하는 약세장을 뜻하는 동물은?', options: ['황소(Bull)', '곰(Bear)', '늑대(Wolf)', '독수리(Eagle)'], answerIndex: 1, explanation: '하락장은 Bear Market, 상승장은 Bull Market이라고 부릅니다.' },
        { question: '대한민국 국회의원의 임기는 몇 년일까요?', options: ['3년', '4년', '5년', '6년'], answerIndex: 1, explanation: '국회의원 임기는 4년, 대통령 임기는 5년 단임제입니다.' },
        { question: '세계 3대 커피 원두 품종에 해당하지 않는 것은?', options: ['아라비카', '로부스타', '리베리카', '게이샤'], answerIndex: 3, explanation: '3대 품종은 아라비카, 로부스타, 리베리카이며 게이샤는 아라비카의 변종입니다.' },
        { question: '인류 최초로 달에 착륙한 아폴로 11호의 우주비행사는?', options: ['닐 암스트롱', '유리 가가린', '버즈 올드린', '일론 머스크'], answerIndex: 0, explanation: '1969년 닐 암스트롱이 인류 최초로 달 표면에 발을 디뎠습니다.' },
        { question: '혈액형 중 모든 혈액형에게 적혈구를 수혈해 줄 수 있는 혈액형은?', options: ['A형', 'B형', 'O형', 'AB형'], answerIndex: 2, explanation: 'O형은 항원이 없어 모든 혈액형에게 적혈구 수혈이 가능합니다.' },
        { question: '불황 속에서도 물가가 계속 상승하는 최악의 경제 상황은?', options: ['스태그플레이션', '디플레이션', '리세션', '버블'], answerIndex: 0, explanation: '경기 침체(Stagnation)와 물가 상승(Inflation)의 합성어입니다.' },
        { question: '음주운전 처벌 기준 혈중알코올농도 면허 정지 수치는 몇 % 이상일까요?', options: ['0.03%', '0.05%', '0.08%', '0.1%'], answerIndex: 0, explanation: '윤창호법 이후 0.03% 이상 시 면허 정지 처분을 받습니다.' },
        { question: '인터넷 주소 URL에서 "https"의 "s"가 의미하는 것은?', options: ['Speed', 'Secure', 'Server', 'System'], answerIndex: 1, explanation: 'SSL/TLS 암호화 보안 통신을 뜻하는 Secure입니다.' },
        { question: '프랑스의 수도 파리를 관통하여 흐르는 유명한 강의 이름은?', options: ['템스강', '센강', '다뉴브강', '라인강'], answerIndex: 1, explanation: '파리를 가로지르는 강은 센강(Seine)입니다.' },
        { question: '신라의 대표적인 목탑 터로 몽골의 침입으로 소실된 것은?', options: ['황룡사 9층 목탑', '불국사 다보탑', '미륵사지 석탑', '석가탑'], answerIndex: 0, explanation: '고려 시대 몽골 침략으로 소실된 황룡사 9층 목탑입니다.' }
      ]
    },
    {
      id: 'trivia_professor',
      gameId: 'trivia-quiz',
      title: '🧐 [난이도: 교수/박사] 멘사급 초고난도 하이엔드 상식 팩 (15선)',
      description: '철학, 양자역학, 고전 문학, 심층 인문학 등 1%를 위한 두뇌 대결',
      author: 'PartyHub 공식',
      tags: ['교수', '박사', '고난도', '멘사', '심화'],
      itemCount: 15,
      isPublic: true,
      likes: 9150,
      createdAt: 1700000000000,
      data: [
        { question: '양자역학에서 관측하기 전까지 입자의 상태가 확률로 중첩된다는 사고실험은?', options: ['맥스웰의 도깨비', '슈뢰딩거의 고양이', '테세우스의 배', '페르미 역설'], answerIndex: 1, explanation: '슈뢰딩거의 고양이는 양자 중첩 상태를 설명하는 유명한 사고실험입니다.' },
        { question: '"너 자신을 알라"라는 명언으로 유명한 고대 그리스의 철학자는?', options: ['플라톤', '아리스토텔레스', '소크라테스', '에피쿠로스'], answerIndex: 2, explanation: '소크라테스가 무지의 지를 설파하며 강조한 명언입니다.' },
        { question: '경제학에서 죄수의 딜레마와 관련된 게임이론의 균형 상태를 일컫는 용어는?', options: ['파레토 최적', '내시 균형', '보이지 않는 손', '케인스 균형'], answerIndex: 1, explanation: '존 내시가 정립한 내시 균형(Nash Equilibrium)입니다.' },
        { question: '지구의 지질 시대 중 공룡이 번성했던 중생대의 3기에 해당하지 않는 것은?', options: ['트라이아스기', '쥐라기', '백악기', '캄브리아기'], answerIndex: 3, explanation: '캄브리아기는 고생대의 첫 번째 기입니다.' },
        { question: '프랑스 대혁명 당시 루이 16세가 처형된 단두대(Guillotine)의 설계에 관여한 인물은?', options: ['조제프 기요탱', '로베스피에르', '당통', '마라'], answerIndex: 0, explanation: '의사였던 조제프 기요탱의 제안으로 고통 없는 인도적 처형 기구로 채택되었습니다.' },
        { question: '아인슈타인이 1921년 노벨 물리학상을 수상한 직접적인 계기가 된 이론은?', options: ['특수 상대성 이론', '일반 상대성 이론', '광전 효과 설명', '브라운 운동 연구'], answerIndex: 2, explanation: '아인슈타인은 상대성 이론이 아닌 광전 효과(빛의 입자성)로 노벨상을 받았습니다.' },
        { question: '단테의 <신곡>에서 지옥편(Inferno) 가장 깊은 제9옥에 갇힌 배신자는?', options: ['유다', '브루투스', '카시우스', '셋 다 맞음'], answerIndex: 3, explanation: '루시퍼의 세 입에 각각 유다, 브루투스, 카시우스가 물려 고통받고 있습니다.' },
        { question: '컴퓨팅 이론에서 튜링 기계가 정지할지 여부를 판별할 수 없다는 문제는?', options: ['P-NP 문제', '정지 문제(Halting Problem)', '쾨니히스베르크 다리 문제', '밀레니엄 문제'], answerIndex: 1, explanation: '앨런 튜링이 증명한 결정 불가능성 문제인 정지 문제입니다.' },
        { question: '지구상에서 가장 단단한 광물로 모스 경도 10에 해당하는 광물은?', options: ['강옥(루비/사파이어)', '금강석(다이아몬드)', '석영', '황옥(토파즈)'], answerIndex: 1, explanation: '모스 굳기계 10의 기준 광물은 금강석(다이아몬드)입니다.' },
        { question: '인간의 뇌에서 언어의 이해를 담당하는 영역은 베르니케 영역, 발화를 담당하는 영역은?', options: ['브로카 영역', '해마', '편도체', '시상하부'], answerIndex: 0, explanation: '브로카 영역(Broca\'s area)은 언어 생성 및 발화를 담당합니다.' },
        { question: '열역학 제2법칙에 따라 고립계에서 항상 증가하거나 유지되는 물리량은?', options: ['엔탈피', '엔트로피', '깁스 자유에너지', '내부 에너지'], answerIndex: 1, explanation: '자연계의 무질서도를 나타내는 엔트로피(Entropy)입니다.' },
        { question: '체코 프라하 출신의 실존주의 소설가로 <변신>, <심판>을 집필한 작가는?', options: ['프란츠 카프카', '알베르 카뮈', '장폴 사르트르', '밀란 쿤데라'], answerIndex: 0, explanation: '그레고르 잠자가 해충으로 변하는 소설 <변신>의 작가 프란츠 카프카입니다.' },
        { question: '우주론에서 우주가 가속 팽창하고 있음을 설명하기 위해 도입된 미지의 에너지는?', options: ['암흑 물질', '암흑 에너지', '타키온 에너지', '진공 에너지'], answerIndex: 1, explanation: '우주의 약 68%를 차지하며 척력을 발생시키는 암흑 에너지(Dark Energy)입니다.' },
        { question: '괴델의 불완전성 정리가 수학계에 입증한 핵심 결론은?', options: ['모든 참인 명제는 증명 가능하다', '모순이 없는 체계 내에는 증명할 수 없는 참인 명제가 존재한다', '0으로 나누기는 수학적으로 참이다', '페르마의 정리는 거짓이다'], answerIndex: 1, explanation: '수학 체계의 완전성과 무모순성이 양립할 수 없음을 증명했습니다.' },
        { question: '음악사에서 "음악의 아버지"는 바흐, "음악의 어머니"로 불리는 작곡가는?', options: ['모차르트', '베토벤', '헨델', '하이든'], answerIndex: 2, explanation: '바흐와 동시대 독일 태생의 작곡가 헨델(Handel)입니다.' }
      ]
    }
  ],

  // 7. 썰풀기 룰렛 & 벌칙
  'story-roulette': [
    {
      id: 'story_party_topics',
      gameId: 'story-roulette',
      title: '🎡 [공식] 흑역사 & 이불킥 토크 주제 & 벌칙 팩',
      description: '이불킥 흑역사, 소름 돋는 실화, 첫사랑 썰 등 웃음 보장 토크 팩',
      author: 'PartyHub 공식',
      tags: ['흑역사', '비밀', '썰', '예능'],
      itemCount: 35,
      isPublic: true,
      likes: 6120,
      createdAt: 1700000000000,
      data: {
        topics: [
          '내 인생 최대 이불킥 흑역사 썰',
          '살면서 가장 소름 돋았던 실화/귀신 썰',
          '아직도 생각하면 심장 뛰는 첫사랑/짝사랑 썰',
          '살면서 돈 가장 아까웠던 낭비 썰',
          '친구한테 살면서 제일 억울하게 오해받았던 썰',
          '술 마시고 저지른 최악의 주사/실수 썰',
          '학교/직장에서 들키고 쥐구멍에 숨고 싶었던 비밀 썰',
          '살면서 가장 크게 싸워본 경험 썰',
          '부모님 몰래 벌였던 대형 사고 썰',
          '여행 가서 겪은 대환장 사건 썰',
          '내 생애 가장 민망했던 고백/차임 썰',
          '길거리에서 모르는 사람과 엮인 황당한 썰',
          '인터넷/게임에서 겪은 레전드 빌런 썰',
          '살면서 거짓말하다가 딱 걸려서 식은땀 흘린 썰',
          '꿈인 줄 알았는데 알고 보니 현실이었던 썰'
        ],
        penalties: [
          '디스코드 프로필 사진 24시간 동안 방장이 지정한 엽사로 변경',
          '음성 채널에서 노래방 노래 1절 감정 잡고 완창하기',
          '디스코드 상태메시지 24시간 동안 "나 바보 아니다"로 고정',
          '카톡 단톡방에 갤러리 7번째 사진 아무 설명 없이 전송',
          '다음 3판 동안 말 끝마다 "~냥" 붙여서 말하기',
          '지금 바로 마이크로 가장 자신 있는 성대모사 1개 하기',
          '방장에게 진심을 담아 1분 동안 폭풍 칭찬 세례 퍼붓기',
          '지금 바로 자리에서 일어나 기상나팔 소리 내며 국군체조 30초 하기',
          '자신의 가장 아끼는 보물 사진을 디코드 채팅에 인증하기',
          '다음 게임 시작할 때까지 모든 대답을 오직 속삭임(ASMR)으로 하기'
        ]
      }
    }
  ],

  // 19. 가짜 화가 찾기
  'fake-artist': [
    {
      id: 'fake_artist_classic',
      gameId: 'fake-artist',
      title: '🎭 [공식] 한 획 릴레이 드로잉 엄선 40선',
      description: '피카츄, 에펠탑, 햄버거, 자전거 등 한 획으로 표현하기 아슬아슬한 제시어 모음',
      author: 'PartyHub 공식',
      tags: ['가짜화가', '한획드로잉', '마피아류', '드로잉'],
      itemCount: 40,
      isPublic: true,
      likes: 6720,
      createdAt: 1700000000000,
      data: [
        '피카츄', '에펠탑', '햄버거', '자전거', '안경', '선풍기', '우산', '선인장', '펭귄', '기린',
        '피자', '축구공', '스마트폰', '자동차', '눈사람', '해골', '왕관', '달팽이', '비행기', '기타',
        '사과', '커피잔', '가위', '신호등', '헬리콥터', '고양이', '토끼', '우주선', '선글라스', '시계',
        '열기구', '유령', '풍선', '바나나', '케이크', '다이아몬드', '야구방망이', '모자', '나무', '물고기'
      ]
    }
  ],

  // 11. 익명 속마음 폭로 배틀
  'anonymous-exposed': [
    {
      id: 'anonymous_party_30',
      gameId: 'anonymous-exposed',
      title: '🎭 [공식] 우정 파괴 디스코드 파티 지목 질문 30선',
      description: '"가장 겉과 속이 다를 것 같은 사람?", "무인도에서 가장 먼저 탈락할 사람?" 등 매운맛 질문 모음',
      author: 'PartyHub 공식',
      tags: ['익명지목', '우정파괴', '디스코드', '매운맛'],
      itemCount: 30,
      isPublic: true,
      likes: 9140,
      createdAt: 1700000000000,
      data: [
        '우리 중 가장 겉과 속이 다를 것 같은 사람은?',
        '무인도에 떨어졌을 때 가장 먼저 생존 포기할 것 같은 사람은?',
        '로또 1등에 당첨되면 우리 몰래 잠수탈 것 같은 사람은?',
        '만약 좀비 아포칼립스가 터지면 가장 먼저 감염될 것 같은 사람은?',
        '외모에 신경을 제일 많이 쓸 것 같은 사람은?',
        '술 마시면 주사가 가장 기상천외할 것 같은 사람은?',
        '소개팅 나가면 3분 만에 차일 것 같은 사람은?',
        '스마트폰 갤러리에 흑역사 사진이 가장 많을 것 같은 사람은?',
        '평소에 카톡 답장 제일 느리게 읽씹/안읽씹할 것 같은 사람은?',
        '우리 중 10년 뒤에 가장 큰 부자가 되어 있을 것 같은 사람은?',
        '게임할 때 억까당하면 책상 샷건 제일 많이 칠 것 같은 사람은?',
        '디스코드에서 마이크 켜두고 혼잣말/노래 제일 많이 부를 것 같은 사람은?',
        '연애할 때 애인한테 제일 꼼짝 못 할 것 같은 사람은?',
        '친구 돈 빌려주고 달라는 말 제일 못 꺼낼 것 같은 사람은?',
        '우리 중 단둘이 1박 2일 여행 가면 제일 어색할 것 같은 사람은?',
        '비밀을 말해주면 1시간도 안 돼서 소문낼 것 같은 사람은?',
        '학창 시절에 선생님한테 제일 많이 혼났을 것 같은 사람은?',
        '혼자 노래방 가서 3시간 동안 감성 발라드 부를 것 같은 사람은?',
        '새벽 3시에 배고프다고 야식 시켜 먹을 확률이 가장 높은 사람은?',
        '인터넷 쇼핑 장바구니에 쓸데없는 물건이 제일 많을 것 같은 사람은?',
        '친구들 앞에서 쎈 척하지만 알고 보면 제일 쫄보인 사람은?',
        '우리 중 가장 눈물이 많고 감수성이 풍부한 사람은?',
        '운전할 때 핸들만 잡으면 인성이 180도 바뀔 것 같은 사람은?',
        '패션 센스가 가장 독특하고 난해한 사람은?',
        '회사/학교에서 사회생활(영혼 없는 칭찬) 제일 잘할 것 같은 사람은?',
        '남의 연애 상담은 프로급인데 정작 본인 연애는 못 할 것 같은 사람은?',
        '귀신이나 공포 영화를 제일 무서워해서 눈 가리고 볼 사람은?',
        '평소에 말실수 제일 많이 해서 쥐구멍에 숨고 싶어 할 사람은?',
        '외계인이 지구를 침공하면 가장 먼저 외계인 편으로 붙을 사람은?',
        '오늘 파티게임에서 MVP가 되어 가장 신나게 세레머니할 사람은?'
      ]
    }
  ]
};
