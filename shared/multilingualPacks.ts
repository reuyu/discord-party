// shared/multilingualPacks.ts
import { CustomPack, SupportedLanguage } from './types';
import { REAL_DEFAULT_PACKS } from './defaultPacks';

// 8개 국어별 기본 팩 데이터 생성기
// 각 언어에 최적화된 질문, 제시어, 대사 및 룰 컨텐츠를 제공합니다.

export function getDefaultPacksForGame(gameId: string, language: SupportedLanguage = 'ko'): CustomPack[] {
  // 1. 한국어는 검증된 기존 REAL_DEFAULT_PACKS를 기본으로 제공
  if (language === 'ko') {
    const packs = REAL_DEFAULT_PACKS[gameId] || [];
    return packs.map(p => ({
      ...p,
      likes: 0 // 목업 수치 제거
    }));
  }

  // 2. 외국어(en, ja, zh-TW, de, pt, es, fr)의 경우 언어별 팩 우선 제공
  const localizedPacks = getLanguageSpecificPacks(gameId, language);
  if (localizedPacks.length > 0) {
    return localizedPacks;
  }

  // 3. 해당 언어 전용 팩이 없을 경우 글로벌 영문(en) 팩 또는 범용 팩으로 폴백
  const englishPacks = getLanguageSpecificPacks(gameId, 'en');
  if (englishPacks.length > 0) {
    return englishPacks;
  }

  return (REAL_DEFAULT_PACKS[gameId] || []).map(p => ({ ...p, likes: 0 }));
}

function getLanguageSpecificPacks(gameId: string, lang: SupportedLanguage): CustomPack[] {
  switch (gameId) {
    case 'voice-battle':
      return getVoiceBattlePacks(lang);
    case 'liar-game':
      return getLiarGamePacks(lang);
    case 'worldcup':
      return getWorldcupPacks(lang);
    case 'balance-debate':
      return getBalanceDebatePacks(lang);
    case 'zoom-quiz':
      return getZoomQuizPacks(lang);
    case 'trivia-quiz':
      return getTriviaQuizPacks(lang);
    case 'chosung-quiz':
      return getChosungQuizPacks(lang);
    case 'five-sec-rule':
      return getFiveSecRulePacks(lang);
    case 'taboo-talk':
      return getTabooTalkPacks(lang);
    case 'blind-drawing':
    case 'fake-artist':
      return getDrawingPacks(gameId, lang);
    case 'relay-novel':
      return getRelayNovelPacks(lang);
    case 'story-roulette':
      return getStoryRoulettePacks(lang);
    case 'anonymous-exposed':
      return getAnonymousExposedPacks(lang);
    default:
      return [];
  }
}

// ----------------------------------------------------
// 1. 성대모사 대결 (Voice Battle)
// ----------------------------------------------------
function getVoiceBattlePacks(lang: SupportedLanguage): CustomPack[] {
  if (lang === 'ja') {
    return [
      {
        id: 'voice_battle_ja_anime',
        gameId: 'voice-battle',
        title: '⚡ [公式] アニメ名言＆名セリフ 声真似バトルパック',
        description: '進撃の巨人、ナルト、ワンピース、呪術廻戦、ジョジョなど伝説の名セリフ集！',
        author: 'PartyHub Official',
        tags: ['アニメ', '声真似', '日本語', '名言'],
        itemCount: 12,
        isPublic: true,
        likes: 0,
        createdAt: Date.now(),
        language: 'ja',
        data: [
          { character: 'エレン・イェーガー (進撃の巨人)', line: '戦え、戦え！ (タタカエ！)', hint: '鏡を見つめ怒りと決意を込めて叫ぶ', audioUrl: '/audio/voice-battle/tatakae.mp3' },
          { character: 'うずまきナルト', line: '螺旋丸！ (ラセンガン！)', hint: '手のひらにチャクラを回転させて熱血シャウト', audioUrl: '/audio/voice-battle/rasengan.mp3' },
          { character: 'うちはサスケ', line: '千鳥！', hint: '千羽の鳥の羽ばたきのような雷撃の気合', audioUrl: '/audio/voice-battle/chidori.mp3' },
          { character: '両面宿儺 (呪術廻戦)', line: '領域展開 - 伏魔御廚子', hint: '指で印を結びながら冷徹かつ重厚な声で唱える', audioUrl: '/audio/voice-battle/sukuna_ryoiki.mp3' },
          { character: 'モンキー・D・ルフィ', line: 'ゴムゴムの～ ピストル！', hint: '腕を力強く伸ばしながら放つ渾身のパンチ', audioUrl: '/audio/voice-battle/gomu_gomu.mp3' },
          { character: 'ケンシロウ (北斗の拳)', line: 'お前はもう死んでいる', hint: '経絡秘孔を突いた後、背を向けて静かに言い放つ', audioUrl: '/audio/voice-battle/omaewa.mp3' },
          { character: 'DIO (ジョジョの奇妙な冒険)', line: 'このDIOだッ！', hint: '邪悪で傲慢な表情で高らかに叫ぶ', audioUrl: '/audio/voice-battle/kono_dio_da.mp3' },
          { character: 'DIO (ジョジョの奇妙な冒険)', line: 'WRYYYYYYーッ！', hint: '吸血鬼のハイテンションな超高音シャウト', audioUrl: '/audio/voice-battle/dio_wryyy.mp3' },
          { character: '空条承太郎', line: 'やれやれだぜ', hint: '帽子を目深に被りながら深くため息をつく', audioUrl: '/audio/voice-battle/yare_yare_daze.mp3' },
          { character: '空条承太郎', line: 'オラオラオラオラ！', hint: 'スタープラチナの超高速ラッシュ気合音', audioUrl: '/audio/voice-battle/ora_ora.mp3' },
          { character: 'ピカチュウ', line: 'ピカピカ、ピカチュウ～！', hint: '世界一あざとく可愛いほっぺた電気ボイス', audioUrl: '/audio/voice-battle/pikachu_pika.mp3' },
          { character: 'ピカチュウ', line: 'ピ～カ～ チュウーッ！', hint: '10万ボルトを解き放つ全力の叫び', audioUrl: '/audio/voice-battle/pikachu_thunderbolt.mp3' }
        ]
      },
      {
        id: 'voice_battle_ja_games',
        gameId: 'voice-battle',
        title: '⚔️ [公式] ゲーム＆映画 伝説のセリフパック',
        description: 'LoL、マリオ、スタークラフト、映画名シーンの定番ボイス',
        author: 'PartyHub Official',
        tags: ['ゲーム', '声真似', 'LoL', 'マリオ'],
        itemCount: 10,
        isPublic: true,
        likes: 0,
        createdAt: Date.now(),
        language: 'ja',
        data: [
          { character: 'LoL ヤスオ', line: 'ソリエゲトン！', hint: '風を切り裂く必殺技の咆哮', audioUrl: '/audio/voice-battle/yasuo_soriegeton.mp3' },
          { character: 'LoL ヤスオ', line: 'ハサギ！', hint: '竜巻を放つ瞬間の鋭い気合', audioUrl: '/audio/voice-battle/yasuo_hasaki.mp3' },
          { character: 'LoL リー・シン', line: 'イクーッ！', hint: '目を閉じ鋭く蹴り込む僧侶の掛け声', audioUrl: '/audio/voice-battle/lee_sin_iku.mp3' },
          { character: 'スーパーマリオ', line: 'Yahoo! It\'s-a me, Mario!', hint: 'イタリア訛りの陽気で元気なジャンプボイス', audioUrl: '/audio/voice-battle/meme_mario_yahoo.mp3' },
          { character: 'LoL ティーモ', line: '偵察に行ってまいります！', hint: '愛らしくも生意気な高音ボイス', audioUrl: '/audio/voice-battle/teemo_scout.mp3' },
          { character: 'LoL アーリ', line: '私を信じられないの？', hint: '妖艶で魅惑的な九尾の狐の声', audioUrl: '/audio/voice-battle/ahri_trust.mp3' },
          { character: 'バトルクルーザー', line: 'Battlecruiser operational.', hint: '重厚で冷静な艦長の出撃報告', audioUrl: '/audio/voice-battle/battlecruiser.mp3' },
          { character: 'ヴァロラント ジェット', line: 'Jett revive me!', hint: '世界中のプレイヤーが叫ぶ蘇生懇願ミーム', audioUrl: '/audio/voice-battle/jett_revive.mp3' },
          { character: 'メタルギア', line: '(!) 敵に発見された警報音', hint: '頭上にビックリマークが出るビープ音', audioUrl: '/audio/voice-battle/meme_metal_gear.mp3' },
          { character: 'クリスティアーノ・ロナウド', line: 'SIUUUUU!', hint: 'スタジアムを震わせる咆哮セレブレーション', audioUrl: '/audio/voice-battle/ronaldo_siu.mp3' }
        ]
      }
    ];
  }

  // 글로벌 공통 영문 팩 (en, de, pt, es, fr, zh-TW 기본 사용)
  const langTitles: Record<string, string> = {
    en: '🎬 [Official] Famous Movie & Pop Culture Quotes',
    'zh-TW': '🎬 [官方] 經典熱門電影與流行文化語錄',
    de: '🎬 [Offiziell] Berühmte Film- & Popkultur-Zitate',
    pt: '🎬 [Oficial] Frases Famosas de Filmes & Cultura Pop',
    es: '🎬 [Oficial] Frases Célebres de Películas & Cultura Pop',
    fr: '🎬 [Officiel] Répliques Célèbres de Films & Pop Culture'
  };

  return [
    {
      id: `voice_global_movies_${lang}`,
      gameId: 'voice-battle',
      title: langTitles[lang] || langTitles['en'],
      description: 'Iconic lines from Star Wars, Terminator, Squid Game, PSY, Steven He, and Gordon Ramsay',
      author: 'PartyHub Official',
      tags: ['Movies', 'Memes', 'Pop Culture', 'Global'],
      itemCount: 12,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: [
        { character: 'Steven He', line: 'Emotional Damage!', hint: 'Throw your slipper with dramatic flair', audioUrl: '/audio/voice-battle/emotional_damage.mp3' },
        { character: 'Cristiano Ronaldo', line: 'SIUUUUU!', hint: 'Legendary stadium-shaking victory roar', audioUrl: '/audio/voice-battle/ronaldo_siu.mp3' },
        { character: 'Gordon Ramsay', line: 'Where is the lamb sauce?!', hint: 'Furious red-faced kitchen shouting', audioUrl: '/audio/voice-battle/lamb_sauce.mp3' },
        { character: 'PSY', line: 'Oppa Gangnam Style!', hint: 'World-famous energetic dance shout', audioUrl: '/audio/voice-battle/gangnam_style.mp3' },
        { character: 'Squid Game Doll', line: 'Red Light, Green Light!', hint: 'Chilling robotic child doll voice', audioUrl: '/audio/voice-battle/squid_mugunghwa.mp3' },
        { character: 'Super Mario 64', line: 'Yahoo! Wahoo! It\'s-a me, Mario!', hint: 'Cheerful Italian-accented jumping shout', audioUrl: '/audio/voice-battle/meme_mario_yahoo.mp3' },
        { character: 'Metal Gear Alert', line: '(!) ALERT SOUND', hint: 'The sharp alert beep when spotted by guards', audioUrl: '/audio/voice-battle/meme_metal_gear.mp3' },
        { character: 'Supa Hot Fire', line: 'OHHHHHHHHHHHHHHH!!', hint: 'Crazy rap battle hype crowd shouting', audioUrl: '/audio/voice-battle/meme_ohhhhh.mp3' },
        { character: 'SpongeBob Narrator', line: 'Two hours later...', hint: 'Exaggerated French narrator accent', audioUrl: '/audio/voice-battle/meme_two_hours_later.mp3' },
        { character: 'Damn Son', line: 'Damn son, where\'d you find this?', hint: 'Classic mixtape vocal drop', audioUrl: '/audio/voice-battle/meme_damn_son.mp3' },
        { character: 'IShowSpeed', line: 'BARK BARK BARK!', hint: 'Frantic wild dog barking streaming reaction', audioUrl: '/audio/voice-battle/meme_speed_bark.mp3' },
        { character: 'StarCraft Battlecruiser', line: 'Battlecruiser operational.', hint: 'Deep calm commander report voice', audioUrl: '/audio/voice-battle/battlecruiser.mp3' }
      ]
    },
    {
      id: `voice_global_anime_${lang}`,
      gameId: 'voice-battle',
      title: '⚡ [Official] Legendary Anime Battle Cries',
      description: 'Attack on Titan, Naruto, One Piece, Jujutsu Kaisen, and JoJo Iconic Shouts',
      author: 'PartyHub Official',
      tags: ['Anime', 'Quotes', 'Naruto', 'One Piece', 'JoJo'],
      itemCount: 10,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: [
        { character: 'Eren Yeager (AoT)', line: 'Fight, fight! (Tatakae!)', hint: 'Grit your teeth with burning vengeance', audioUrl: '/audio/voice-battle/tatakae.mp3' },
        { character: 'Naruto Uzumaki', line: 'Rasengan!', hint: 'Spiraling chakra fiery scream', audioUrl: '/audio/voice-battle/rasengan.mp3' },
        { character: 'Sasuke Uchiha', line: 'Chidori!', hint: 'Lightning sound of a thousand birds', audioUrl: '/audio/voice-battle/chidori.mp3' },
        { character: 'Sukuna (Jujutsu Kaisen)', line: 'Domain Expansion: Malevolent Shrine', hint: 'Dark, sinister and cold whisper', audioUrl: '/audio/voice-battle/sukuna_ryoiki.mp3' },
        { character: 'Monkey D. Luffy', line: 'Gum-Gum Pistol!', hint: 'Stretching arm power punch cry', audioUrl: '/audio/voice-battle/gomu_gomu.mp3' },
        { character: 'Kenshiro', line: 'Omae wa mou shindeiru.', hint: 'You are already dead. Turn around coldly.', audioUrl: '/audio/voice-battle/omaewa.mp3' },
        { character: 'DIO (JoJo)', line: 'Kono DIO da!', hint: 'Arrogant evil theatrical declaration', audioUrl: '/audio/voice-battle/kono_dio_da.mp3' },
        { character: 'DIO (JoJo)', line: 'WRYYYYYY-!', hint: 'High-pitched vampiric banshee screech', audioUrl: '/audio/voice-battle/dio_wryyy.mp3' },
        { character: 'Jotaro Kujo', line: 'Yare yare daze...', hint: 'Pull your cap low and sigh with annoyance', audioUrl: '/audio/voice-battle/yare_yare_daze.mp3' },
        { character: 'Pikachu', line: 'Pika Pika Pikachu~!', hint: 'The cutest electric cheek squeak ever', audioUrl: '/audio/voice-battle/pikachu_pika.mp3' }
      ]
    }
  ];
}

// ----------------------------------------------------
// 2. 라이어 게임 (Liar Game)
// ----------------------------------------------------
function getLiarGamePacks(lang: SupportedLanguage): CustomPack[] {
  const wordsByLang: Record<string, { food: string[]; jobs: string[]; movies: string[] }> = {
    en: {
      food: ['Pizza', 'Hamburger', 'Sushi', 'Taco', 'Steak', 'Ramen', 'Pasta', 'Hotdog', 'Sandwich', 'French Fries', 'Fried Chicken', 'Burrito', 'Pancakes', 'Waffles', 'Donut', 'Dumpling', 'Curry', 'Salad', 'Ice Cream', 'Chocolate Cake', 'Apple Pie', 'Brownie', 'Cheesecake', 'Nachos', 'Popcorn', 'Milkshake', 'Bacon', 'Omelette', 'Lobster', 'Lasagna'],
      jobs: ['Doctor', 'Police Officer', 'Firefighter', 'Pilot', 'Chef', 'Teacher', 'Astronaut', 'Software Engineer', 'Lawyer', 'Journalist', 'Photographer', 'Musician', 'Architect', 'Athlete', 'Scientist', 'Dentist', 'Judge', 'Electrician', 'Detective', 'Barista'],
      movies: ['Titanic', 'Avatar', 'Jurassic Park', 'Harry Potter', 'Star Wars', 'The Avengers', 'Inception', 'Interstellar', 'The Lion King', 'Finding Nemo', 'Frozen', 'The Matrix', 'Spider-Man', 'Iron Man', 'Gladiator', 'Batman', 'Toy Story', 'Shrek', 'Pirates of the Caribbean', 'The Lord of the Rings']
    },
    ja: {
      food: ['寿司', 'ラーメン', 'ピザ', '焼肉', 'カレー', 'たこ焼き', 'おにぎり', '天ぷら', 'うどん', 'そば', 'ハンバーガー', '唐揚げ', 'オムライス', '餃子', 'パスタ', 'ステーキ', '親子丼', 'かつ丼', '焼き鳥', '豚汁', 'すき焼き', 'お好み焼き', '鍋料理', 'チャーハン', 'グラタン', 'サンドイッチ', 'フライドポテト', 'たい焼き', 'パフェ', 'チーズケーキ'],
      jobs: ['医者', '警察官', '消防士', 'パイロット', 'シェフ', '学校の先生', '宇宙飛行士', 'プログラマー', '弁護士', '記者', 'カメラマン', 'ミュージシャン', '建築家', 'プロスポーツ選手', '科学者', '歯科医', '裁判官', '探偵', 'バリスタ', 'パティシエ'],
      movies: ['タイタニック', 'アバター', 'ジュラシック・パーク', 'ハリー・ポッター', 'スター・ウォーズ', 'アベンジャーズ', 'インセプション', 'インターステラー', 'ライオン・キング', 'アナと雪の女王', '千と千尋の神隠し', '君の名は。', 'スパイダーマン', 'トイ・ストーリー', '鬼滅の刃', '呪術廻戦', '名探偵コナン', 'スラムダンク', 'もののけ姫', '天気の子']
    },
    'zh-TW': {
      food: ['披薩', '漢堡', '壽司', '牛肉麵', '火鍋', '鹹酥雞', '拉麵', '義大利麵', '熱狗', '三明治', '薯條', '炸雞', '水餃', '滷肉飯', '咖哩飯', '沙拉', '冰淇淋', '巧克力蛋糕', '起司蛋糕', '雞排', '珍奶', '小籠包', '臭豆腐', '牛排', '烤肉', '麻辣燙', '蛋餅', '飯糰', '蔥抓餅', '豆花'],
      jobs: ['醫生', '警察', '消防員', '飛行員', '主廚', '老師', '太空人', '工程師', '律師', '記者', '攝影師', '音樂家', '建築師', '運動員', '科學家', '牙醫', '法官', '偵探', '咖啡師', '機長'],
      movies: ['鐵達尼號', '阿凡達', '侏儸紀公園', '哈利波特', '星際大戰', '復仇者聯盟', '全面啟動', '星際效應', '獅子王', '冰雪奇緣', '神隱少女', '你的名字', '蜘蛛人', '玩具總動員', '鬼滅之刃', '灌籃高手', '蝙蝠俠', '奇異博士', '鋼鐵人', '魔戒']
    }
  };

  const current = wordsByLang[lang] || wordsByLang['en'];
  const titles: Record<string, { food: string; jobs: string; movies: string }> = {
    en: { food: '🍕 [Official] Delicious Food & Snacks', jobs: '💼 [Official] Everyday Occupations', movies: '🎬 [Official] Famous Blockbuster Movies' },
    ja: { food: '🍕 [公式] 美味しい料理＆夜食パック', jobs: '💼 [公式] 様々な職業パック', movies: '🎬 [公式] 名作映画・アニメパック' },
    'zh-TW': { food: '🍕 [官方] 美味料理與宵夜題庫包', jobs: '💼 [官方] 各行各業職業題庫包', movies: '🎬 [官方] 經典熱門電影動漫包' },
    de: { food: '🍕 [Offiziell] Leckeres Essen & Snacks', jobs: '💼 [Offiziell] Beliebte Berufe', movies: '🎬 [Offiziell] Berühmte Filme' },
    pt: { food: '🍕 [Oficial] Comidas Deliciosas & Lanches', jobs: '💼 [Oficial] Profissões do Dia a Dia', movies: '🎬 [Oficial] Filmes Famosos' },
    es: { food: '🍕 [Oficial] Comida Deliciosa & Bocadillos', jobs: '💼 [Oficial] Profesiones Comunes', movies: '🎬 [Oficial] Películas Famosas' },
    fr: { food: '🍕 [Officiel] Plats Délicieux & Encas', jobs: '💼 [Officiel] Métiers du Quotidien', movies: '🎬 [Officiel] Films Célèbres' }
  };

  const t = titles[lang] || titles['en'];

  return [
    {
      id: `liar_food_${lang}`,
      gameId: 'liar-game',
      title: t.food,
      description: 'Popular mouth-watering foods that everyone loves',
      author: 'PartyHub Official',
      tags: ['Food', 'Casual', 'Classic'],
      itemCount: current.food.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: { category: 'Food', words: current.food }
    },
    {
      id: `liar_jobs_${lang}`,
      gameId: 'liar-game',
      title: t.jobs,
      description: 'Common occupations and career paths',
      author: 'PartyHub Official',
      tags: ['Jobs', 'Society', 'Classic'],
      itemCount: current.jobs.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: { category: 'Occupations', words: current.jobs }
    },
    {
      id: `liar_movies_${lang}`,
      gameId: 'liar-game',
      title: t.movies,
      description: 'Worldwide legendary blockbuster movies and animation',
      author: 'PartyHub Official',
      tags: ['Movies', 'Cinema', 'Pop Culture'],
      itemCount: current.movies.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: { category: 'Movies', words: current.movies }
    }
  ];
}

// ----------------------------------------------------
// 3. 이상형 월드컵 (Worldcup)
// ----------------------------------------------------
function getWorldcupPacks(lang: SupportedLanguage): CustomPack[] {
  const foodDataByLang: Record<string, { title: string; items: { name: string; image: string }[] }> = {
    en: {
      title: '🍕 [Official] Ultimate Food World Cup (16 Contenders)',
      items: [
        { name: 'Crispy Fried Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
        { name: 'Cheesy Pepperoni Pizza', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800' },
        { name: 'Handcrafted Cheeseburger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800' },
        { name: 'Fresh Salmon Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' },
        { name: 'Authentic Mexican Tacos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800' },
        { name: 'Juicy Grilled Ribeye Steak', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800' },
        { name: 'Rich Tonkotsu Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
        { name: 'Creamy Carbonara Pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800' },
        { name: 'Fluffy Golden Pancakes', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800' },
        { name: 'Loaded Beef Burrito', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800' },
        { name: 'Gourmet Hot Dog', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800' },
        { name: 'Artisan Gelato Ice Cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800' },
        { name: 'Cheesy Loaded Nachos', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800' },
        { name: 'Warm Chocolate Fudge Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' },
        { name: 'Steamed Pork Dumplings', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
        { name: 'Golden Crispy French Fries', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800' }
      ]
    },
    ja: {
      title: '🍣 [公式] 世界の絶品グルメ 16強 ワールドカップ',
      items: [
        { name: '特製フライドチキン', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
        { name: '焼きたてペパロニピザ', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800' },
        { name: '極上和牛チーズバーガー', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800' },
        { name: '新鮮サーモン握り寿司', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' },
        { name: '本場タコス', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800' },
        { name: 'ジューシーサーロインステーキ', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800' },
        { name: '濃厚豚骨ラーメン', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
        { name: '濃厚カルボナーラパスタ', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800' },
        { name: 'ふわふわスフレパンケーキ', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800' },
        { name: '具だくさんブリトー', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800' },
        { name: 'プレミアムホットドッグ', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800' },
        { name: '濃厚イタリアンジェラート', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800' },
        { name: 'とろけるチーズナチョス', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800' },
        { name: '濃厚フォンダンショコラ', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' },
        { name: '熱々肉汁焼き小籠包', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
        { name: 'カリカリ黄金フライドポテト', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800' }
      ]
    }
  };

  const packInfo = foodDataByLang[lang] || foodDataByLang['en'];

  return [
    {
      id: `worldcup_food_${lang}`,
      gameId: 'worldcup',
      title: packInfo.title,
      description: 'Tournament bracket of 16 ultimate foods',
      author: 'PartyHub Official',
      tags: ['Food', 'World Cup', 'Tournament'],
      itemCount: 16,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: packInfo.items.map((item, idx) => ({ id: idx + 1, name: item.name, image: item.image }))
    }
  ];
}

// ----------------------------------------------------
// 4. 밸런스 토론 (Balance Debate)
// ----------------------------------------------------
function getBalanceDebatePacks(lang: SupportedLanguage): CustomPack[] {
  const dilemmas: Record<string, { title: string; pairs: [string, string][] }> = {
    en: {
      title: '⚖️ [Official] Extreme Life Dilemmas Balance Pack',
      pairs: [
        ['Never eat pizza again', 'Never eat burgers again'],
        ['Receive $10 Million but never use a smartphone', 'Live normally as you are now'],
        ['Travel 100 years into the past', 'Travel 100 years into the future'],
        ['Summer without Air Conditioning', 'Winter without Heating'],
        ['Know exact date of your death', 'Know exact cause of your death'],
        ['Have the power to fly', 'Have the power of invisibility'],
        ['Always be 15 minutes late', 'Always be 30 minutes early'],
        ['Read minds of everyone', 'Teleport anywhere instantly'],
        ['Live in a world without music', 'Live in a world without movies'],
        ['Sleep only 3 hours but never feel tired', 'Eat anything without gaining weight']
      ]
    },
    ja: {
      title: '⚖️ [公式] 究極の究極二択！バランスゲームパック',
      pairs: [
        ['一生ピザを食べられない', '一生ハンバーガーを食べられない'],
        ['10億円もらえるが一生スマホ禁止', '今のまま自由に暮らす'],
        ['100年過去へタイムトラベル', '100年未来へタイムトラベル'],
        ['エアコンなしの夏', '暖房なしの冬'],
        ['自分の死ぬ時期が分かる', '自分の死因が分かる'],
        ['空を自由に飛べる能力', '透明人間になれる能力'],
        ['常に15分遅刻する体質', '常に30分早く着いてしまう体質'],
        ['人の心が読める能力', 'どこへでも瞬間移動できる能力'],
        ['音楽のない世界で生きる', '映画やアニメのない世界で生きる'],
        ['睡眠3時間で疲れ知らず', 'いくら食べても太らない体質']
      ]
    }
  };

  const current = dilemmas[lang] || dilemmas['en'];

  return [
    {
      id: `balance_debate_${lang}`,
      gameId: 'balance-debate',
      title: current.title,
      description: 'Tough, hilarious dilemmas that spark passionate arguments',
      author: 'PartyHub Official',
      tags: ['Debate', 'Balance', 'Fun'],
      itemCount: current.pairs.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: current.pairs.map(([optionA, optionB], idx) => ({
        id: idx + 1,
        optionA,
        optionB,
        category: 'Dilemma'
      }))
    }
  ];
}

// ----------------------------------------------------
// 5. 줌 퀴즈 (Zoom Quiz)
// ----------------------------------------------------
function getZoomQuizPacks(lang: SupportedLanguage): CustomPack[] {
  const itemsByLang: Record<string, { title: string; items: { answer: string; aliases: string[]; image: string }[] }> = {
    en: {
      title: '🔍 [Official] Everyday Objects Zoom Quiz',
      items: [
        { answer: 'Pizza', aliases: ['pizza', 'slice', 'pie'], image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800' },
        { answer: 'Apple', aliases: ['apple', 'red apple'], image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800' },
        { answer: 'Smartphone', aliases: ['phone', 'smartphone', 'iphone', 'cellphone'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' },
        { answer: 'Basketball', aliases: ['basketball', 'ball'], image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800' },
        { answer: 'Coffee Mug', aliases: ['coffee', 'mug', 'cup'], image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800' },
        { answer: 'Headphones', aliases: ['headphone', 'headphones', 'headset'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
        { answer: 'Bicycle', aliases: ['bike', 'bicycle', 'cycle'], image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800' },
        { answer: 'Sneakers', aliases: ['shoes', 'sneakers', 'shoe'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
        { answer: 'Sunglasses', aliases: ['glasses', 'sunglasses', 'shades'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800' },
        { answer: 'Clock', aliases: ['clock', 'watch', 'alarm'], image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800' }
      ]
    },
    ja: {
      title: '🔍 [公式] 身近な日常のアイテム ズームアウトクイズ',
      items: [
        { answer: 'ピザ', aliases: ['ピザ', 'pizza'], image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800' },
        { answer: 'りんご', aliases: ['りんご', 'リンゴ', '林檎', 'apple'], image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800' },
        { answer: 'スマートフォン', aliases: ['スマホ', 'スマートフォン', '携帯'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' },
        { answer: 'バスケットボール', aliases: ['バスケ', 'バスケットボール', 'ボール'], image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800' },
        { answer: 'コーヒーカップ', aliases: ['コーヒー', 'カップ', 'マグカップ'], image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800' },
        { answer: 'ヘッドホン', aliases: ['ヘッドホン', 'ヘッドフォン', 'イヤホン'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
        { answer: '自転車', aliases: ['自転車', 'チャリ', 'バイク'], image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800' },
        { answer: 'スニーカー', aliases: ['スニーカー', '靴', 'シューズ'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
        { answer: 'サングラス', aliases: ['サングラス', 'メガネ'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800' },
        { answer: '時計', aliases: ['時計', '目覚まし時計', '置時計'], image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800' }
      ]
    }
  };

  const current = itemsByLang[lang] || itemsByLang['en'];

  return [
    {
      id: `zoom_quiz_${lang}`,
      gameId: 'zoom-quiz',
      title: current.title,
      description: 'Guess the object as it zooms out from 1500% to 100%',
      author: 'PartyHub Official',
      tags: ['Zoom', 'Quiz', 'Speed'],
      itemCount: current.items.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: current.items.map((item, idx) => ({ id: idx + 1, answer: item.answer, aliases: item.aliases, image: item.image }))
    }
  ];
}

// ----------------------------------------------------
// 6. 상식 퀴즈 (Trivia Quiz)
// ----------------------------------------------------
function getTriviaQuizPacks(lang: SupportedLanguage): CustomPack[] {
  const triviaData: Record<string, { title: string; questions: any[] }> = {
    en: {
      title: '🧠 [Official] Global Trivia & Fun Knowledge Quiz',
      questions: [
        { q: 'What is the capital of Australia?', choices: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answerIndex: 2, explanation: 'Canberra is the capital city of Australia.' },
        { q: 'What is the largest ocean on Earth?', choices: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answerIndex: 1, explanation: 'The Pacific Ocean covers over 30% of the Earth surface.' },
        { q: 'How many hearts does an octopus have?', choices: ['1', '2', '3', '4'], answerIndex: 2, explanation: 'Octopuses have 3 hearts.' },
        { q: 'Which planet is known as the Red Planet?', choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answerIndex: 1, explanation: 'Mars appears red due to iron oxide (rust) on its surface.' },
        { q: 'In which year did the Titanic sink?', choices: ['1905', '1912', '1920', '1931'], answerIndex: 1, explanation: 'The Titanic sank on April 15, 1912.' },
        { q: 'What is the chemical symbol for Gold?', choices: ['Ag', 'Au', 'Fe', 'Cu'], answerIndex: 1, explanation: 'Au comes from the Latin word aurum.' },
        { q: 'Which country has the longest coastline in the world?', choices: ['Russia', 'Canada', 'Australia', 'Indonesia'], answerIndex: 1, explanation: 'Canada has over 202,080 km of coastline.' },
        { q: 'What is the fastest land animal?', choices: ['Cheetah', 'Lion', 'Horse', 'Gazelle'], answerIndex: 0, explanation: 'Cheetahs can run up to 120 km/h (75 mph).' }
      ]
    },
    ja: {
      title: '🧠 [公式] 雑学＆おもしろ一般常識クイズパック',
      questions: [
        { q: 'オーストラリアの首都はどこ？', choices: ['シドニー', 'メルボルン', 'キャンベラ', 'ブリスベン'], answerIndex: 2, explanation: 'オーストラリアの首都はキャンベラです。' },
        { q: '地球上で最も面積が大きい大洋は？', choices: ['大西洋', '太平洋', 'インド洋', '北極海'], answerIndex: 1, explanation: '太平洋は地球の表面積の約3分の1を占めます。' },
        { q: 'タコの心臓はいくつある？', choices: ['1つ', '2つ', '3つ', '4つ'], answerIndex: 2, explanation: 'タコには3つの心臓があります。' },
        { q: '「赤い惑星」と呼ばれる太陽系の惑星は？', choices: ['金星', '火星', '木星', '土星'], answerIndex: 1, explanation: '火星の地表には酸化鉄（赤サビ）が多く含まれているため赤く見えます。' },
        { q: 'タイタニック号が沈没したのは西暦何年？', choices: ['1905年', '1912年', '1920年', '1931年'], answerIndex: 1, explanation: '1912年4月15日に沈没しました。' },
        { q: '金の元素記号はどれ？', choices: ['Ag', 'Au', 'Fe', 'Cu'], answerIndex: 1, explanation: 'Auはラテン語のaurum（輝く夜明け）に由来します。' },
        { q: '世界で最も海岸線が長い国は？', choices: ['ロシア', 'カナダ', 'オーストラリア', '日本'], answerIndex: 1, explanation: 'カナダは20万km以上の海岸線を持っています。' },
        { q: '地上で最も足が速い動物は？', choices: ['チーター', 'ライオン', 'ダチョウ', 'ガゼル'], answerIndex: 0, explanation: 'チーターは時速100〜120kmで走ることができます。' }
      ]
    }
  };

  const current = triviaData[lang] || triviaData['en'];

  return [
    {
      id: `trivia_quiz_${lang}`,
      gameId: 'trivia-quiz',
      title: current.title,
      description: 'Exciting trivia questions with 4 choices',
      author: 'PartyHub Official',
      tags: ['Trivia', 'Knowledge', 'Quiz'],
      itemCount: current.questions.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: current.questions
    }
  ];
}

// ----------------------------------------------------
// 7. 초성 / 단어 퀴즈 (Word Guessing Quiz)
// ----------------------------------------------------
function getChosungQuizPacks(lang: SupportedLanguage): CustomPack[] {
  const wordClues: Record<string, { title: string; items: { chosung: string; answer: string; hint: string }[] }> = {
    en: {
      title: '🔤 [Official] Anagram & Word Clue Guessing Quiz',
      items: [
        { chosung: 'P _ _ Z A', answer: 'PIZZA', hint: 'Italian flatbread with cheese and tomato sauce' },
        { chosung: 'B _ R G _ R', answer: 'BURGER', hint: 'Fast food sandwich with a grilled patty' },
        { chosung: 'S _ S H I', answer: 'SUSHI', hint: 'Japanese dish with seasoned rice and raw fish' },
        { chosung: 'P _ N D A', answer: 'PANDA', hint: 'Black and white bear that eats bamboo' },
        { chosung: 'G _ T A R', answer: 'GUITAR', hint: 'String musical instrument you strum' },
        { chosung: 'C _ F E E', answer: 'COFFEE', hint: 'Popular morning caffeinated beverage' },
        { chosung: 'R _ C K T', answer: 'ROCKET', hint: 'Vehicle launched into outer space' },
        { chosung: 'S _ N G L', answer: 'SUNGLASSES', hint: 'Eyewear worn to block bright sunlight' }
      ]
    },
    ja: {
      title: '🔤 [公式] ひらめき言葉当てクイズパック',
      items: [
        { chosung: 'ピ〇ザ', answer: 'ピザ', hint: 'チーズとトマトソースのイタリア料理' },
        { chosung: 'ラ〇メ〇', answer: 'ラーメン', hint: '日本で大人気の麺料理' },
        { chosung: 'す〇し', answer: 'すし', hint: '新鮮な魚介と酢飯の伝統料理' },
        { chosung: 'パ〇ダ', answer: 'パンダ', hint: '笹を食べる白黒の可愛い動物' },
        { chosung: 'ギ〇ー', answer: 'ギター', hint: '弦を弾いて演奏する楽器' },
        { chosung: 'コ〇ヒ〇', answer: 'コーヒー', hint: '朝によく飲まれるカフェイン飲料' }
      ]
    }
  };

  const current = wordClues[lang] || wordClues['en'];

  return [
    {
      id: `chosung_quiz_${lang}`,
      gameId: 'chosung-quiz',
      title: current.title,
      description: 'Fast-paced clue guessing game',
      author: 'PartyHub Official',
      tags: ['Words', 'Clues', 'Speed'],
      itemCount: current.items.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: current.items
    }
  ];
}

// ----------------------------------------------------
// 8. 5초 룰 챌린지 (5-Second Rule)
// ----------------------------------------------------
function getFiveSecRulePacks(lang: SupportedLanguage): CustomPack[] {
  const promptsByLang: Record<string, string[]> = {
    en: [
      'Name 3 red fruits!',
      'Name 3 pizza toppings!',
      'Name 3 Marvel superheroes!',
      'Name 3 European countries!',
      'Name 3 breakfast foods!',
      'Name 3 animals with spots!',
      'Name 3 things you find at an airport!',
      'Name 3 movie genres!',
      'Name 3 fast food chains!',
      'Name 3 musical instruments!',
      'Name 3 computer brands!',
      'Name 3 ocean creatures!'
    ],
    ja: [
      '赤い果物を3つ！',
      'ピザの具材を3つ！',
      'アニメの主人公を3人！',
      'ヨーロッパの国を3つ！',
      '朝ごはんで食べるものを3つ！',
      'コンビニのホットスナックを3つ！',
      '空港にあるものを3つ！',
      'ファストフード店を3つ！',
      '海の生き物を3つ！',
      '楽器を3つ！'
    ]
  };

  const list = promptsByLang[lang] || promptsByLang['en'];

  return [
    {
      id: `five_sec_${lang}`,
      gameId: 'five-sec-rule',
      title: '⚡ [Official] 5-Second Rule Quick Challenge',
      description: 'Say 3 items in under 5 seconds!',
      author: 'PartyHub Official',
      tags: ['5 Seconds', 'Speed', 'Party'],
      itemCount: list.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: list
    }
  ];
}

// ----------------------------------------------------
// 9. 금기어 토크 (Taboo Talk)
// ----------------------------------------------------
function getTabooTalkPacks(lang: SupportedLanguage): CustomPack[] {
  const taboosByLang: Record<string, { word: string; taboo: string[] }[]> = {
    en: [
      { word: 'Beach', taboo: ['Sand', 'Ocean', 'Summer', 'Sun', 'Waves'] },
      { word: 'Hospital', taboo: ['Doctor', 'Nurse', 'Sick', 'Medicine', 'Bed'] },
      { word: 'Cinema', taboo: ['Movie', 'Popcorn', 'Film', 'Screen', 'Ticket'] },
      { word: 'Airport', taboo: ['Airplane', 'Fly', 'Luggage', 'Pilot', 'Passport'] },
      { word: 'Coffee', taboo: ['Morning', 'Cup', 'Caffeine', 'Drink', 'Bean'] },
      { word: 'Pizza', taboo: ['Cheese', 'Crust', 'Slice', 'Italian', 'Delivery'] },
      { word: 'Library', taboo: ['Book', 'Quiet', 'Read', 'Study', 'Borrow'] },
      { word: 'Wedding', taboo: ['Bride', 'Groom', 'Ring', 'Marry', 'Cake'] }
    ],
    ja: [
      { word: '海 (ビーチ)', taboo: ['砂浜', '夏', '泳ぐ', '波', '太陽'] },
      { word: '病院', taboo: ['医者', '看護師', '病気', '薬', '注射'] },
      { word: '映画館', taboo: ['ポップコーン', 'スクリーン', 'チケット', '上映', '映画'] },
      { word: '空港', taboo: ['飛行機', 'パスポート', '旅行', '飛ぶ', '荷物'] },
      { word: 'コーヒー', taboo: ['飲む', 'カフェイン', '豆', '朝', '苦い'] }
    ]
  };

  const list = taboosByLang[lang] || taboosByLang['en'];

  return [
    {
      id: `taboo_talk_${lang}`,
      gameId: 'taboo-talk',
      title: '🤫 [Official] Taboo Talk Forbidden Words Pack',
      description: 'Describe the word without saying any of the forbidden words!',
      author: 'PartyHub Official',
      tags: ['Taboo', 'Word Game', 'Party'],
      itemCount: list.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: list
    }
  ];
}

// ----------------------------------------------------
// 10. 드로잉 게임 (Blind Drawing & Fake Artist)
// ----------------------------------------------------
function getDrawingPacks(gameId: string, lang: SupportedLanguage): CustomPack[] {
  const promptsByLang: Record<string, string[]> = {
    en: [
      'Giraffe riding a skateboard',
      'Panda wearing sunglasses',
      'Cat in an astronaut spacesuit',
      'T-Rex eating a slice of pizza',
      'Alien drinking iced coffee',
      'Penguin DJ at a nightclub',
      'Octopus driving a yellow submarine',
      'Dog flying with balloons',
      'Hamster lifting weights at the gym',
      'Robot making breakfast pancakes'
    ],
    ja: [
      'スケボーに乗るキリン',
      'サングラスをかけたパンダ',
      '宇宙服を着たネコ',
      'ピザを食べるティラノサウルス',
      'アイスコーヒーを飲む宇宙人',
      'クラブでDJをするペンギン',
      '潜水艦を運転するタコ',
      '風船で空を飛ぶイヌ',
      '筋トレをするハムスター',
      'パンケーキを焼くロボット'
    ]
  };

  const list = promptsByLang[lang] || promptsByLang['en'];

  return [
    {
      id: `${gameId}_${lang}`,
      gameId,
      title: '🎨 [Official] Creative Drawing Prompts',
      description: 'Fun and imaginative prompts to draw',
      author: 'PartyHub Official',
      tags: ['Drawing', 'Creative', 'Party'],
      itemCount: list.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: list
    }
  ];
}

// ----------------------------------------------------
// 11. 릴레이 소설 (Relay Novel)
// ----------------------------------------------------
function getRelayNovelPacks(lang: SupportedLanguage): CustomPack[] {
  const startersByLang: Record<string, string[]> = {
    en: [
      'On a dark and stormy night, the convenience store door bell chimed unexpectedly...',
      'The countdown reached zero, but instead of launching, the spaceship began playing disco music...',
      'I opened my locker at school and found an antique glowing letter that had my name on it...',
      'The morning news anchor suddenly froze on live TV, looked directly at me, and said: "Run."',
      'It was a completely normal Tuesday until all gravity suddenly turned off for 10 seconds.'
    ],
    ja: [
      '雨の降る深夜、誰もいないはずのコンビニのドアベルが静かに鳴り響いた…',
      '宇宙船の発射カウントダウンがゼロになった瞬間、予期せぬディスコ音楽が流れ始めた…',
      '学校のロッカーを開けると、自分の名前宛ての怪しく光る手紙が入っていた…',
      '朝のニュースキャスターが生放送中に突然カメラを見つめ、「逃げて」と呟いた…'
    ]
  };

  const list = startersByLang[lang] || startersByLang['en'];

  return [
    {
      id: `relay_novel_${lang}`,
      gameId: 'relay-novel',
      title: '📖 [Official] Creative Story Starter Prompts',
      description: 'Engaging starting sentences for collaborative storytelling',
      author: 'PartyHub Official',
      tags: ['Story', 'Creative', 'Novel'],
      itemCount: list.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: list
    }
  ];
}

// ----------------------------------------------------
// 12. 썰 풀기 룰렛 (Story Roulette)
// ----------------------------------------------------
function getStoryRoulettePacks(lang: SupportedLanguage): CustomPack[] {
  const dataByLang: Record<string, { topics: string[]; penalties: string[] }> = {
    en: {
      topics: [
        'Most embarrassing moment in school',
        'Weirdest habit you secretly have',
        'Funniest thing that happened on public transit',
        'Worst fashion phase you ever went through',
        'Biggest lie you told as a child',
        'Most bizarre dream you vividly remember'
      ],
      penalties: [
        'Sing the chorus of a pop song',
        'Do 10 jumping jacks on mic',
        'Speak in a royal British accent for the next round',
        'Act like an angry cat for 10 seconds'
      ]
    },
    ja: {
      topics: [
        '学生時代の最も恥ずかしかった黒歴史',
        '誰にも言えない秘密の変な癖',
        '電車やバスで起きたおもしろハプニング',
        '子どもの頃についた一番大きな嘘',
        '今でも鮮明に覚えている奇妙な夢'
      ],
      penalties: [
        '流行りの曲のサビをワンフレーズ歌う',
        '次のラウンド終了までお嬢様口調で話す',
        '10秒間全力で猫の鳴き真似をする'
      ]
    }
  };

  const current = dataByLang[lang] || dataByLang['en'];

  return [
    {
      id: `story_roulette_${lang}`,
      gameId: 'story-roulette',
      title: '🎯 [Official] Hilarious Talk Topics & Penalties',
      description: 'Spin the wheel, share funny stories, or face silly penalties',
      author: 'PartyHub Official',
      tags: ['Talk', 'Stories', 'Penalties'],
      itemCount: current.topics.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: current
    }
  ];
}

// ----------------------------------------------------
// 13. 익명 폭로전 (Anonymous Exposed)
// ----------------------------------------------------
function getAnonymousExposedPacks(lang: SupportedLanguage): CustomPack[] {
  const questionsByLang: Record<string, string[]> = {
    en: [
      'Who is most likely to survive a zombie apocalypse?',
      'Who spends the most time on their phone every day?',
      'Who would accidentally become famous on the internet?',
      'Who is the most likely to get lost in their own hometown?',
      'Who has the most chaotic secret sleep schedule?',
      'Who would spend all their lottery winnings in one week?',
      'Who is the biggest softie despite looking tough?',
      'Who is the best cook in this voice channel?'
    ],
    ja: [
      'ゾンビが発生した世界で一番最後まで生き残りそうな人は？',
      '1日の中で最もスマホを触っている時間が長そうな人は？',
      'うっかりインターネットで大バズりしそうな人は？',
      '自分の地元でも道に迷いそうな方向音痴は？',
      '宝くじが当たったら1週間で全額使い果たしそうな人は？',
      'この通話部屋の中で一番料理が上手そうな人は？'
    ]
  };

  const list = questionsByLang[lang] || questionsByLang['en'];

  return [
    {
      id: `anonymous_exposed_${lang}`,
      gameId: 'anonymous-exposed',
      title: '🎭 [Official] Anonymous Group Voting Questions',
      description: 'Spicy and fun anonymous vote questions about your friends',
      author: 'PartyHub Official',
      tags: ['Voting', 'Anonymous', 'Social'],
      itemCount: list.length,
      isPublic: true,
      likes: 0,
      createdAt: Date.now(),
      language: lang,
      data: list
    }
  ];
}
