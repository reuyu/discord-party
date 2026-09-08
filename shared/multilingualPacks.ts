// shared/multilingualPacks.ts
import { CustomPack, SupportedLanguage } from './types';
import { REAL_DEFAULT_PACKS } from './defaultPacks';
import { PACK_DATA_TRANSLATIONS } from './defaultPacksDataTranslations';

export interface PackMetadataTranslation {
  title: string;
  description: string;
  tags?: string[];
  author?: string;
}

// 8개 국어 지원 팩 제목 & 설명 번역 사전
// 사용자가 어떤 언어를 선택하든 모든 기본 팩이 유지되며, 해당 언어로 번역되어 보입니다.
const PACK_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, PackMetadataTranslation>>> = {
  // ==========================================
  // 1. 성대모사 대결 (voice-battle) - 10대 팩
  // ==========================================
  voice_real_meme_korean: {
    ko: { title: '🔥 [공식] 한국 레전드 밈 & 인터넷 방송 시그니처 팩 (14선)', description: '사딸라, 랄로, 괴물쥐, 오징어게임, 이병헌, 강남스타일 등 원본 오디오가 100% 재생되는 레전드 팩' },
    en: { title: '🔥 [Official] Korean Memes & Variety Show Punchlines (14 Picks)', description: 'Iconic lines from Squid Game, PSY, Faker, Gamst, and viral Korean variety shows' },
    ja: { title: '🔥 [公式] 韓国レジェンドミーム＆配信シグネチャーパック (14選)', description: 'サッダラ、イ・ビョンホン、イカゲーム、PSY、韓国ネットのレジェンドミーム集' },
    'zh-TW': { title: '🔥 [官方] 韓國經典迷因與實況主名言包 (14選)', description: '包含四大天王、李炳憲、魷魚遊戲、PSY、韓國網路傳奇爆笑迷因' },
    de: { title: '🔥 [Offiziell] Koreanische Memes & Show-Zitate (14 Auswahlen)', description: 'Kultige Zitate aus Squid Game, PSY, Faker und viralen koreanischen Shows' },
    pt: { title: '🔥 [Oficial] Memes Coreanos & Frases de Sucesso (14 Seleções)', description: 'Linhas icônicas de Round 6, PSY, Faker e programas de variedades coreanos' },
    es: { title: '🔥 [Oficial] Memes Coreanos & Frases Célebres (14 Selecciones)', description: 'Líneas icónicas de El juego del calamar, PSY, Faker y shows de variedades coreanos' },
    fr: { title: '🔥 [Officiel] Mèmes Coréens & Répliques Culte (14 Sélections)', description: 'Répliques cultes de Squid Game, PSY, Faker et émissions de variétés coréennes' }
  },
  voice_real_games: {
    ko: { title: '⚔️ [공식] 롤 & 스타 & 발로란트 게임 명대사 팩 (10선)', description: '야스오, 리신, 티모, 아리, 배틀크루저, 핵 감지, 제트 등 원본 인게임 사운드 100% 수록' },
    en: { title: '⚔️ [Official] LoL, StarCraft & Valorant Game Quotes (10 Picks)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Battlecruiser, Nuclear Launch, Jett - 100% original voice lines' },
    ja: { title: '⚔️ [公式] LoL・スタクラ・ヴァロラント ゲーム名セリフパック (10選)', description: 'ヤスオ、リー・シン、ティーモ、アーリ、バトルクルーザー、核警報、ジェットなどインゲーム音声収録' },
    'zh-TW': { title: '⚔️ [官方] LoL、星海爭霸、特戰英豪 經典遊戲台詞包 (10選)', description: '犽宿、李星、提摩、阿璃、戰巡艦、核彈警報、婕提 - 100%原汁原味遊戲語音' },
    de: { title: '⚔️ [Offiziell] LoL, StarCraft & Valorant Gaming-Zitate (10 Auswahlen)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Battlecruiser, Nuklearalarm, Jett - Originale Soundlines' },
    pt: { title: '⚔️ [Oficial] LoL, StarCraft & Valorant Citações de Jogos (10 Seleções)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Cruzador de Batalha, Alarme Nuclear, Jett - Vozes originais' },
    es: { title: '⚔️ [Oficial] LoL, StarCraft & Valorant Citas de Juegos (10 Selecciones)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Crucero de Batalla, Alerta Nuclear, Jett - Voces originales' },
    fr: { title: '⚔️ [Officiel] LoL, StarCraft & Valorant Répliques de Jeux (10 Sélections)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Cuirassé, Alerte Nucléaire, Jett - Voix originales du jeu' }
  },
  voice_real_anime: {
    ko: { title: '⚡ [공식] 전설의 명작 애니메이션 시그니처 대사 팩 (12선)', description: '나선환, 치도리, 고무고무 피스톨, 복마어주자, 오마에와 모 신데이루 등 원본 음성 수록' },
    en: { title: '⚡ [Official] Legendary Anime Signature Lines (12 Picks)', description: 'Rasengan, Chidori, Gum-Gum Pistol, Malevolent Shrine, Omae Wa Mou Shindeiru, JoJo WRYYY' },
    ja: { title: '⚡ [公式] 伝説の名作アニメ シグネチャーセリフパック (12選)', description: '螺旋丸、千鳥、ゴムゴムのピストル、伏魔御廚子、お前はもう死んでいる、ジョジョWRYYY' },
    'zh-TW': { title: '⚡ [官方] 傳奇經典動漫標誌性名台詞包 (12選)', description: '螺旋丸、千鳥、橡膠手槍、伏魔御廚子、你已經死了、JOJO WRYYY 原聲收錄' },
    de: { title: '⚡ [Offiziell] Legendäre Anime-Klassiker Zitate (12 Auswahlen)', description: 'Rasengan, Chidori, Gum-Gum-Pistole, Malevolent Shrine, Omae Wa Mou Shindeiru, JoJo WRYYY' },
    pt: { title: '⚡ [Oficial] Linhas Marcantes de Animes Clássicos (12 Seleções)', description: 'Rasengan, Chidori, Pistola de Borracha, Malevolent Shrine, Omae Wa Mou Shindeiru, JoJo WRYYY' },
    es: { title: '⚡ [Oficial] Frases Legendarias de Anime Clásico (12 Selecciones)', description: 'Rasengan, Chidori, Pistola de Goma, Malevolent Shrine, Omae Wa Mou Shindeiru, JoJo WRYYY' },
    fr: { title: '⚡ [Officiel] Répliques Légendaires d\'Animes Classiques (12 Sélections)', description: 'Rasengan, Chidori, Pistolet Gum-Gum, Autel Démoniaque, Omae Wa Mou Shindeiru, JoJo WRYYY' }
  },
  voice_real_sfx: {
    ko: { title: '🔥 [공식] 전설의 글로벌 밈 & 뇌절 샤우팅 팩 (12선)', description: 'OHHHHH, FA! FA! FA!, 비타스, What Does The Fox Say, 아이쇼스피드 등 전 세계 레전드 밈' },
    en: { title: '🔥 [Official] Global Memes & Viral Shouting Sounds (12 Picks)', description: 'OHHHHH, FA! FA! FA!, Vitas 7th Element, What Does The Fox Say, IShowSpeed Bark, Metal Gear Alert' },
    ja: { title: '🔥 [公式] 伝説のグローバルミーム＆絶叫サウンドパック (12選)', description: 'OHHHHH, FA! FA! FA!, ヴィタス, What Does The Fox Say, IShowSpeed 犬吠え, メタルギア警戒音' },
    'zh-TW': { title: '🔥 [官方] 全球傳奇迷因與魔性咆哮音效包 (12選)', description: 'OHHHHH、FA! FA! FA!、海豚音、狐狸叫、IShowSpeed狂吠、特工警戒音' },
    de: { title: '🔥 [Offiziell] Globale Memes & Virale Schreie (12 Auswahlen)', description: 'OHHHHH, FA! FA! FA!, Vitas 7th Element, What Does The Fox Say, IShowSpeed Bellen, Metal Gear Alert' },
    pt: { title: '🔥 [Oficial] Memes Globais & Gritos Virais (12 Seleções)', description: 'OHHHHH, FA! FA! FA!, Vitas 7th Element, What Does The Fox Say, IShowSpeed Latido, Alerta Metal Gear' },
    es: { title: '🔥 [Oficial] Memes Globales & Gritos Virales (12 Selecciones)', description: 'OHHHHH, FA! FA! FA!, Vitas 7th Element, What Does The Fox Say, IShowSpeed Ladrido, Alerta Metal Gear' },
    fr: { title: '🔥 [Officiel] Mèmes Mondiaux & Cris Viraux (12 Sélections)', description: 'OHHHHH, FA! FA! FA!, Vitas 7th Element, What Does The Fox Say, IShowSpeed Aboiement, Alerte Metal Gear' }
  },
  voice_kr_streamer_memes: {
    ko: { title: '🎙️ [공식] 한국 스트리머 레전드 유행어 & 찰진 명대사 팩 (12선)', description: '감스트, 랄로, 나문희 호박고구마, 거제 야호, 심영 등 한국 인터넷 역사에 남은 레전드 밈' },
    en: { title: '🎙️ [Official] Korean Streamers Legendary Catchphrases (12 Picks)', description: 'Viral streamer rage quotes, sweet potato grandma, and iconic Korean live-streaming memes' },
    ja: { title: '🎙️ [公式] 韓国人気配信者 レジェンド流行語パック (12選)', description: 'ネット配信者のブチギレ名言、サツマイモおばあちゃんなど韓国配信界の伝説ミーム' },
    'zh-TW': { title: '🎙️ [官方] 韓國人氣實況主傳奇流行語與名言包 (12選)', description: '知名實況主爆氣名場面、地瓜奶奶、韓國實況圈爆笑名言集' },
    de: { title: '🎙️ [Offiziell] Koreanische Streamer Legendäre Zitate (12 Auswahlen)', description: 'Virale Streamer-Wutanfälle, legendäre TV-Zitate und koreanische Internet-Memes' },
    pt: { title: '🎙️ [Oficial] Bordões de Streamers Coreanos (12 Seleções)', description: 'Falas virais de streamers, memes de TV e frases hilárias da internet coreana' },
    es: { title: '🎙️ [Oficial] Frases de Streamers Coreanos (12 Selecciones)', description: 'Momentos virales de streamers, memes de televisión y citas divertidas de Corea' },
    fr: { title: '🎙️ [Officiel] Répliques de Streamers Coréens (12 Sélections)', description: 'Moments viraux de streamers, mèmes télévisés et phrases cultes du web coréen' }
  },
  voice_legendary_games: {
    ko: { title: '🎮 [공식] 롤 & 발로란트 & 마인크래프트 게임 사운드 팩 (12선)', description: '펜타킬, 더블킬, 미아 핑, 발로란트 에이스, 마크 피격/경험치, 어몽어스, 로블록스 OOF' },
    en: { title: '🎮 [Official] LoL, Valorant & Minecraft Iconic Sound Effects (12 Picks)', description: 'Pentakill, Ace, Spike Planted, Minecraft Hurt/XP, Roblox OOF, Among Us Impostor' },
    ja: { title: '🎮 [公式] LoL・ヴァロラント・マイクラ ゲームサウンドパック (12選)', description: 'ペンタキル、エース、スパイク設置、マイクラ被弾・経験値音、Roblox OOF、Among Us' },
    'zh-TW': { title: '🎮 [官方] LoL、特戰英豪、麥塊 遊戲標誌性音效包 (12選)', description: '五連殺 Pentakill、Ace、安裝輻能核心、麥塊骨折/經驗值音效、Roblox OOF、Among Us' },
    de: { title: '🎮 [Offiziell] LoL, Valorant & Minecraft Gaming-Sounds (12 Auswahlen)', description: 'Pentakill, Valorant Ace, Spike platziert, Minecraft Hurt/XP, Roblox OOF, Among Us' },
    pt: { title: '🎮 [Oficial] Efeitos Sonoros de LoL, Valorant & Minecraft (12 Seleções)', description: 'Pentakill, Ace, Spike Plantada, Dano/XP do Minecraft, Roblox OOF, Among Us' },
    es: { title: '🎮 [Oficial] Efectos de Sonido de LoL, Valorant & Minecraft (12 Selecciones)', description: 'Pentakill, Ace, Spike Plantada, Daño/XP de Minecraft, Roblox OOF, Among Us' },
    fr: { title: '🎮 [Officiel] Sons Culte LoL, Valorant & Minecraft (12 Sélections)', description: 'Pentakill, Ace, Spike Posée, Dégâts/XP Minecraft, Roblox OOF, Among Us' }
  },
  voice_daily_sfx_notif: {
    ko: { title: '🔔 [공식] 일상 필수 알림음 & 공포의 시스템 효과음 팩 (12선)', description: '디스코드 통화/알림/입장, 지하철 진입음, 학교 종소리, 쇠파이프, 뺨 때리기, 애플페이, FBI' },
    en: { title: '🔔 [Official] Daily Notification Chimes & System SFX (12 Picks)', description: 'Discord call/join/message, subway chimes, school bell, metal pipe falling, Apple Pay, FBI Open Up' },
    ja: { title: '🔔 [公式] 日常おなじみ通知音＆システム効果音パック (12選)', description: 'Discord着信・入室音、地下鉄チャイム、学校チャイム、鉄パイプ落下音、Apple Pay、FBI' },
    'zh-TW': { title: '🔔 [官方] 日常生活必備通知鈴聲與系統音效包 (12選)', description: 'Discord通話/進房/提示音、地鐵進站音樂、學校鐘聲、鐵管掉落聲、Apple Pay、FBI' },
    de: { title: '🔔 [Offiziell] Tägliche Benachrichtigungstöne & System-SFX (12 Auswahlen)', description: 'Discord Anruf/Beitritt/Nachricht, U-Bahn-Chimes, Schulgong, Metallrohr, Apple Pay, FBI' },
    pt: { title: '🔔 [Oficial] Sons de Notificação & Efeitos de Sistema (12 Seleções)', description: 'Discord chamada/entrada/mensagem, sons de metrô, sino da escola, cano de metal, Apple Pay, FBI' },
    es: { title: '🔔 [Oficial] Sonidos de Notificación Diarios & Efectos (12 Selecciones)', description: 'Discord llamada/entrada/mensaje, campana de metro, timbre escolar, tubo de metal, Apple Pay, FBI' },
    fr: { title: '🔔 [Officiel] Sons de Notification & Effets Système (12 Sélections)', description: 'Discord appel/connexion/message, mélodie du métro, cloche d\'école, tube en métal, Apple Pay, FBI' }
  },
  voice_anime_pop_bgm: {
    ko: { title: '📺 [공식] 전설의 애니 & 중독성 팝/BGM 팩 (10선)', description: '코난 추리 테마, 고죠 무량공처, 죠죠 처형곡, 마이클 잭슨 Hee Hee, 해리포터 리코더, 스폰지밥' },
    en: { title: '📺 [Official] Legendary Anime Themes & Addictive Pop BGM (10 Picks)', description: 'Conan deduction theme, Gojo domain expansion, JoJo Golden Wind piano, Michael Jackson Hee Hee, Harry Potter recorder' },
    ja: { title: '📺 [公式] 伝説のアニメテーマ＆中毒性ポップBGMパック (10選)', description: 'コナン推理テーマ、五条無量空処、ジョジョ処刑用BGM、マイケル・ジャクソン、ハリーポッター' },
    'zh-TW': { title: '📺 [官方] 傳奇動漫主題曲與洗腦流行BGM包 (10選)', description: '柯南推理主題曲、五條悟無量空處、JOJO處刑曲鋼琴、麥可傑克森 Hee Hee、哈利波特' },
    de: { title: '📺 [Offiziell] Legendäre Anime-Themes & Pop-BGM (10 Auswahlen)', description: 'Detektiv Conan Thema, Gojo Domain Expansion, JoJo Golden Wind Piano, Michael Jackson Hee Hee' },
    pt: { title: '📺 [Oficial] Temas de Anime Lendários & BGM Pop Viciante (10 Seleções)', description: 'Tema de detetive de Conan, Gojo expansão de domínio, JoJo Golden Wind, Michael Jackson Hee Hee' },
    es: { title: '📺 [Oficial] Temas de Anime Legendarios & BGM Pop Pegadizo (10 Selecciones)', description: 'Tema de detective de Conan, Gojo expansión de dominio, JoJo Golden Wind, Michael Jackson Hee Hee' },
    fr: { title: '📺 [Officiel] Thèmes d\'Anime Légendaires & BGM Pop Entraînant (10 Sélections)', description: 'Thème de détective Conan, Gojo extension du territoire, JoJo Golden Wind, Michael Jackson Hee Hee' }
  },
  voice_global_en: {
    ko: { title: '🎬 [공식] 전설의 영화 & 팝컬처 영문 명대사 팩 (10선)', description: '스폰지밥, 스타워즈, 터미네이터, 배트맨, 고든 램지, 마리오 등 전 세계인이 아는 영문 명대사 10선' },
    en: { title: '🎬 [Official] Legendary Movies & Pop Culture English Voice Lines (10 Picks)', description: 'SpongeBob, Gordon Ramsay, Steven He, Cristiano Ronaldo SIU, StarCraft, Mario, Valorant' },
    ja: { title: '🎬 [公式] 伝説の映画＆ポップカルチャー 英語名セリフパック (10選)', description: 'スポンジ・ボブ、ゴードン・ラムゼイ、ロナウド、スタクラ、マリオなど世界共通英語ボイス' },
    'zh-TW': { title: '🎬 [官方] 傳奇電影與流行文化 英語名台詞包 (10選)', description: '海綿寶寶、戈登拉姆齊、C羅SIU、星海爭霸、超級瑪利歐等全球經典英語台詞' },
    de: { title: '🎬 [Offiziell] Legendäre Filme & Popkultur Englische Zitate (10 Auswahlen)', description: 'SpongeBob, Gordon Ramsay, Steven He, Ronaldo SIU, StarCraft, Mario, Valorant' },
    pt: { title: '🎬 [Oficial] Frases de Filmes & Cultura Pop em Inglês (10 Seleções)', description: 'Bob Esponja, Gordon Ramsay, Steven He, Cristiano Ronaldo SIU, StarCraft, Mario' },
    es: { title: '🎬 [Oficial] Frases de Películas & Cultura Pop en Inglés (10 Selecciones)', description: 'Bob Esponja, Gordon Ramsay, Steven He, Cristiano Ronaldo SIU, StarCraft, Mario' },
    fr: { title: '🎬 [Officiel] Répliques de Films & Pop Culture en Anglais (10 Sélections)', description: 'Bob l\'éponge, Gordon Ramsay, Steven He, Cristiano Ronaldo SIU, StarCraft, Mario' }
  },
  voice_global_ja: {
    ko: { title: '⚡ [공식] 일본 애니 명대사 & 소년만화 시그니처 팩 (10선)', description: '나루토, 원피스, 주술회전, 죠죠, 포켓몬 등 전 세계에서 사랑받는 명대사 10선' },
    en: { title: '⚡ [Official] Japanese Anime Famous Quotes & Jump Signature Lines (10 Picks)', description: 'Naruto, One Piece, Jujutsu Kaisen, JoJo, Pokemon - 10 worldwide popular anime lines' },
    ja: { title: '⚡ [公式] アニメ名言＆名セリフ 声真似バトルパック (10選)', description: 'ナルト、ワンピース、呪術廻戦、ジョジョ、ポケモンなど世界中で大人気のアニメ決めゼリフ10選' },
    'zh-TW': { title: '⚡ [官方] 日本動漫名言與少年JUMP經典台詞包 (10選)', description: '火影忍者、航海王、咒術迴戰、JOJO、寶可夢等全球超人氣動漫名言10選' },
    de: { title: '⚡ [Offiziell] Japanische Anime-Zitate & Jump-Signaturen (10 Auswahlen)', description: 'Naruto, One Piece, Jujutsu Kaisen, JoJo, Pokémon - 10 weltweit beliebte Anime-Zitate' },
    pt: { title: '⚡ [Oficial] Frases Famosas de Anime Japonês & Shonen Jump (10 Seleções)', description: 'Naruto, One Piece, Jujutsu Kaisen, JoJo, Pokémon - 10 frases famosas de anime' },
    es: { title: '⚡ [Oficial] Frases Famosas de Anime Japonés & Shonen Jump (10 Selecciones)', description: 'Naruto, One Piece, Jujutsu Kaisen, JoJo, Pokémon - 10 frases épicas de anime' },
    fr: { title: '⚡ [Officiel] Citations Célèbres d\'Anime Japonais & Shonen Jump (10 Sélections)', description: 'Naruto, One Piece, Jujutsu Kaisen, JoJo, Pokémon - 10 répliques cultes d\'anime' }
  },

  // ==========================================
  // 2. 라이어 게임 (liar-game) - 6대 팩
  // ==========================================
  liar_food: {
    ko: { title: '🍕 [공식] 맛있는 음식 & 야식 제시어 팩', description: '치킨, 피자, 떡볶이, 붕어빵, 마라탕, 삼겹살 등 누구나 아는 음식 50종' },
    en: { title: '🍕 [Official] Delicious Food & Midnight Snacks Word Pack', description: 'Fried chicken, pizza, tteokbokki, ramen, sushi, burgers - 50 popular foods' },
    ja: { title: '🍕 [公式] 美味しい料理＆夜食お題パック', description: 'チキン、ピザ、トッポッキ、ラーメン、寿司、ハンバーガーなど大人気フード50種' },
    'zh-TW': { title: '🍕 [官方] 美味料理與宵夜題庫包', description: '炸雞、披薩、辣炒年糕、拉麵、壽司、漢堡等50種人氣美食' },
    de: { title: '🍕 [Offiziell] Leckeres Essen & Mitternachtssnacks', description: 'Brathähnchen, Pizza, Tteokbokki, Ramen, Sushi, Burger - 50 beliebte Gerichte' },
    pt: { title: '🍕 [Oficial] Comidas Deliciosas & Lanches Noturnos', description: 'Frango frito, pizza, tteokbokki, ramen, sushi, hambúrgueres - 50 comidas populares' },
    es: { title: '🍕 [Oficial] Comida Deliciosa & Aperitivos Nocturnos', description: 'Pollo frito, pizza, tteokbokki, ramen, sushi, hamburguesas - 50 comidas populares' },
    fr: { title: '🍕 [Officiel] Plats Délicieux & Encas Nocturnes', description: 'Poulet frit, pizza, tteokbokki, ramen, sushi, burgers - 50 plats populaires' }
  },
  liar_food_en: {
    ko: { title: '🍔 [공식] 글로벌 맛있는 음식 & 스낵 제시어 팩 (영단어)', description: '피자, 버거, 스시, 타코, 스테이크, 라멘, 파스타, 도넛 등 글로벌 인기 음식 40종 (영단어)' },
    en: { title: '🍔 [Official] Global Popular Foods & Snacks (English Words)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta, Donut, Hotdog - 40 Global Foods' },
    ja: { title: '🍔 [公式] グローバル人気料理＆スナック (英単語)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta など世界の人気フード40種 (英単語)' },
    'zh-TW': { title: '🍔 [官方] 全球人氣美食與零食題庫包 (英文單字)', description: 'Pizza、Burger、Sushi、Taco、Steak、Ramen、Pasta 等全球人氣美食40種 (英文單字)' },
    de: { title: '🍔 [Offiziell] Beliebte Welt-Gerichte & Snacks (Englisch)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta - 40 globale Speisen' },
    pt: { title: '🍔 [Oficial] Comidas Populares Globais & Lanches (Inglês)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta - 40 comidas globais' },
    es: { title: '🍔 [Oficial] Comidas Populares del Mundo & Aperitivos (Inglés)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta - 40 comidas globales' },
    fr: { title: '🍔 [Officiel] Plats Mondiaux Populaires & Encas (Anglais)', description: 'Pizza, Burger, Sushi, Taco, Steak, Ramen, Pasta - 40 plats mondiaux' }
  },
  liar_food_ja: {
    ko: { title: '🍣 [공식] 일식 요리 & 심야 식당 제시어 팩 (일본어)', description: '초밥, 라멘, 피자, 야키니쿠, 카레, 타코야끼, 오니기리 등 일본 대표 요리 40종 (일본어)' },
    en: { title: '🍣 [Official] Japanese Cuisine & Midnight Diner Pack (Japanese Words)', description: 'Sushi, Ramen, Yakiniku, Takoyaki, Tempura, Udon, Curry - 40 Japanese Delicacies' },
    ja: { title: '🍣 [公式] 日本料理＆深夜食堂お題パック (日本語)', description: '寿司、ラーメン、焼肉、たこ焼き、天ぷら、うどん、カレーなど定番の和食40種' },
    'zh-TW': { title: '🍣 [官方] 日式料理與深夜食堂題庫包 (日文單字)', description: '壽司、拉麵、燒肉、章魚燒、天婦羅、烏龍麵、咖哩等40種日本道地料理 (日文單字)' },
    de: { title: '🍣 [Offiziell] Japanische Küche & Midnight Diner (Japanisch)', description: 'Sushi, Ramen, Yakiniku, Takoyaki, Tempura, Udon - 40 japanische Köstlichkeiten' },
    pt: { title: '🍣 [Oficial] Culinária Japonesa & Midnight Diner (Japonês)', description: 'Sushi, Ramen, Yakiniku, Takoyaki, Tempura, Udon - 40 iguarias japonesas' },
    es: { title: '🍣 [Oficial] Cocina Japonesa & Midnight Diner (Japonés)', description: 'Sushi, Ramen, Yakiniku, Takoyaki, Tempura, Udon - 40 delicias japonesas' },
    fr: { title: '🍣 [Officiel] Cuisine Japonaise & Midnight Diner (Japonais)', description: 'Sushi, Ramen, Yakiniku, Takoyaki, Tempura, Udon - 40 délices japonais' }
  },
  liar_lol: {
    ko: { title: '🎮 [공식] 리그 오브 레전드(LoL) 챔피언 팩', description: '야스오, 리신, 티모, 아리, 제드 등 롤 인기 챔피언 40종' },
    en: { title: '🎮 [Official] League of Legends (LoL) Champions Pack', description: 'Yasuo, Lee Sin, Teemo, Ahri, Zed, Blitzcrank, Ezreal - 40 Popular Champions' },
    ja: { title: '🎮 [公式] リーグ・オブ・レジェンド(LoL) チャンピオンパック', description: 'ヤスオ、リー・シン、ティーモ、アーリ、ゼドなど大人気チャンピオン40種' },
    'zh-TW': { title: '🎮 [官方] 英雄聯盟 (LoL) 英雄題庫包', description: '犽宿、李星、提摩、阿璃、劫、布里茨、伊澤瑞爾等40名熱門英雄' },
    de: { title: '🎮 [Offiziell] League of Legends (LoL) Champions Pack', description: 'Yasuo, Lee Sin, Teemo, Ahri, Zed - 40 beliebte Champions' },
    pt: { title: '🎮 [Oficial] Campeões de League of Legends (LoL)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Zed - 40 campeões populares' },
    es: { title: '🎮 [Oficial] Campeones de League of Legends (LoL)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Zed - 40 campeones populares' },
    fr: { title: '🎮 [Officiel] Champions de League of Legends (LoL)', description: 'Yasuo, Lee Sin, Teemo, Ahri, Zed - 40 champions populaires' }
  },
  liar_movies: {
    ko: { title: '🎬 [공식] 천만 관객 & 레전드 영화/애니 팩', description: '기생충, 아바타, 타이타닉, 인터스텔라, 슬램덩크 등 명작 40종' },
    en: { title: '🎬 [Official] 10M-Viewer Blockbusters & Classic Movies/Anime', description: 'Parasite, Avatar, Titanic, Interstellar, The Avengers, Spirited Away - 40 Masterpieces' },
    ja: { title: '🎬 [公式] 歴代大ヒット映画＆レジェンドアニメパック', description: 'パラサイト、アバター、タイタニック、インターステラー、千と千尋など名作40種' },
    'zh-TW': { title: '🎬 [官方] 影史百萬票房鉅作與傳奇動漫包', description: '寄生上流、阿凡達、鐵達尼號、星際效應、灌籃高手、神隱少女等40部名作' },
    de: { title: '🎬 [Offiziell] Blockbuster & Film-/Anime-Klassiker', description: 'Parasite, Avatar, Titanic, Interstellar, Avengers, Chihiros Reise - 40 Meisterwerke' },
    pt: { title: '🎬 [Oficial] Filmes de Sucesso & Animes Clássicos', description: 'Parasita, Avatar, Titanic, Interestelar, Vingadores, A Viagem de Chihiro - 40 obras-primas' },
    es: { title: '🎬 [Oficial] Grandes Éxitos de Taquilla & Películas/Anime', description: 'Parásitos, Avatar, Titanic, Interstellar, Vengadores, El viaje de Chihiro - 40 obras maestras' },
    fr: { title: '🎬 [Officiel] Blockbusters & Grands Classiques Cinéma/Anime', description: 'Parasite, Avatar, Titanic, Interstellar, Avengers, Le Voyage de Chihiro - 40 chefs-d\'œuvre' }
  },
  liar_school: {
    ko: { title: '🏫 [공식] 추억의 학창시절 & 일상 사물 팩', description: '급식판, 지우개똥, 체육복, 칠판지우개, 샤프심, 삼선슬리퍼 등 40종' },
    en: { title: '🏫 [Official] Nostalgic School Days & Everyday Objects Pack', description: 'Lunch tray, eraser, gym uniform, chalk, slippers, pencil case - 40 nostalgic school items' },
    ja: { title: '🏫 [公式] 思い出の学生時代＆日常アイテムパック', description: '給食トレイ、消しゴム、体操着、黒板消し、スリッパ、筆箱など思い出の40種' },
    'zh-TW': { title: '🏫 [官方] 懷舊學生時代與日常生活用品包', description: '便當盒、橡皮擦屑、體育服、黑板擦、室內拖鞋、鉛筆盒等40種懷舊校園物品' },
    de: { title: '🏫 [Offiziell] Nostalgische Schulzeit & Alltagsgegenstände', description: 'Tablett, Radiergummi, Sportkleidung, Kreide, Federmäppchen - 40 Schulgegenstände' },
    pt: { title: '🏫 [Oficial] Dias de Escola Nostálgicos & Objetos Diários', description: 'Bandeja, borracha, uniforme, giz, estojo de lápis - 40 itens escolares nostálgicos' },
    es: { title: '🏫 [Oficial] Días de Escuela Nostálgicos & Objetos Cotidianos', description: 'Bandeja, borrador, uniforme, tiza, estuche - 40 objetos escolares nostálgicos' },
    fr: { title: '🏫 [Officiel] Souvenirs d\'École & Objets du Quotidien', description: 'Plateau, gomme, tenue de sport, craie, trousse - 40 objets scolaires nostalgiques' }
  },

  // ==========================================
  // 3. 실시간 이상형 월드컵 (worldcup) - 3대 팩
  // ==========================================
  wc_food_32: {
    ko: { title: '👑 [공식] 2026 대한민국 국민 야식 월드컵 32강', description: '치킨 vs 피자 vs 떡볶이! 100% 정밀 매칭된 고화질 음식 사진 32선' },
    en: { title: '👑 [Official] 2026 Ultimate Midnight Snack World Cup (Round of 32)', description: 'Fried Chicken vs Pizza vs Tteokbokki! 32 high-definition matched foods' },
    ja: { title: '👑 [公式] 2026 国民的夜食ワールドカップ ベスト32', description: 'チキン vs ピザ vs トッポッキ！高画質フード写真32選' },
    'zh-TW': { title: '👑 [官方] 2026 國民宵夜爭霸世界盃 32強', description: '炸雞 vs 披薩 vs 辣炒年糕！精選32道高清深夜美食對決' },
    de: { title: '👑 [Offiziell] 2026 Ultimative Mitternachtssnack-WM (Top 32)', description: 'Brathähnchen vs. Pizza vs. Tteokbokki! 32 HD-Gerichte im Wettstreit' },
    pt: { title: '👑 [Oficial] Copa do Mundo de Lanches Noturnos 2026 (Top 32)', description: 'Frango frito vs Pizza vs Tteokbokki! 32 comidas deliciosas em HD' },
    es: { title: '👑 [Oficial] Copa Mundial de Aperitivos Nocturnos 2026 (Top 32)', description: 'Pollo frito vs Pizza vs Tteokbokki! 32 platos deliciosos en HD' },
    fr: { title: '👑 [Officiel] Coupe du Monde des Encas Nocturnes 2026 (Top 32)', description: 'Poulet frit vs Pizza vs Tteokbokki ! 32 délices nocturnes en HD' }
  },
  wc_ramen_16: {
    ko: { title: '🍜 [공식] 전국민 최애 라면 월드컵 16강', description: '신라면 vs 진라면 vs 짜파게티 vs 불닭볶음면! 한국인의 영혼의 동반자 16선' },
    en: { title: '🍜 [Official] All-Time Favorite Ramen World Cup (Round of 16)', description: 'Shin Ramyun vs Jin Ramen vs Chapagetti vs Buldak! 16 legendary noodles' },
    ja: { title: '🍜 [公式] 国民的愛されラーメンワールドカップ ベスト16', description: '辛ラーメン vs ジンラーメン vs チャパゲティ vs ブルダック！愛され麺16選' },
    'zh-TW': { title: '🍜 [官方] 全民最愛泡麵世界盃 16強', description: '辛拉麵 vs 金拉麵 vs 炸醬麵 vs 辣雞麵！精選16款靈魂泡麵' },
    de: { title: '🍜 [Offiziell] Beliebteste Ramen-WM (Top 16)', description: 'Shin Ramyun vs. Jin Ramen vs. Chapagetti vs. Buldak! 16 Kult-Nudeln' },
    pt: { title: '🍜 [Oficial] Copa do Mundo dos Lamens Favoritos (Top 16)', description: 'Shin Ramyun vs Jin Ramen vs Chapagetti vs Buldak! 16 macarrões lendários' },
    es: { title: '🍜 [Oficial] Copa Mundial de Ramen Favoritos (Top 16)', description: 'Shin Ramyun vs Jin Ramen vs Chapagetti vs Buldak! 16 fideos legendarios' },
    fr: { title: '🍜 [Officiel] Coupe du Monde des Meilleurs Ramens (Top 16)', description: 'Shin Ramyun vs Jin Ramen vs Chapagetti vs Buldak ! 16 nouilles légendaires' }
  },
  wc_travel_16: {
    ko: { title: '✈️ [공식] 죽기 전에 꼭 가봐야 할 버킷리스트 세계 여행지 16강', description: '파리 에펠탑, 로마 콜로세움, 스위스 융프라우, 몰디브 해변 등 세계 명소 16선' },
    en: { title: '✈️ [Official] Bucket List World Travel Destinations (Round of 16)', description: 'Eiffel Tower, Colosseum, Swiss Alps, Maldives, Times Square - 16 World Wonders' },
    ja: { title: '✈️ [公式] 死ぬまでに一度は行きたい世界の名所旅行ワールドカップ 16強', description: 'エッフェル塔、コロッセオ、スイスアルプス、モルディブなど世界の名所16選' },
    'zh-TW': { title: '✈️ [官方] 一生必去人生清單世界旅行勝地世界盃 16強', description: '巴黎鐵塔、羅馬競技場、瑞士少女峰、馬爾地夫等16處世界名勝' },
    de: { title: '✈️ [Offiziell] Traumreiseziele der Welt WM (Top 16)', description: 'Eiffelturm, Kolosseum, Schweizer Alpen, Malediven - 16 Weltwunder' },
    pt: { title: '✈️ [Oficial] Destinos dos Sonhos do Mundo Copa (Top 16)', description: 'Torre Eiffel, Coliseu, Alpes Suíços, Maldivas - 16 maravilhas do mundo' },
    es: { title: '✈️ [Oficial] Destinos de Viaje Imprescindibles Copa Mundial (Top 16)', description: 'Torre Eiffel, Coliseo, Alpes Suizos, Maldivas - 16 maravillas del mundo' },
    fr: { title: '✈️ [Officiel] Destinations de Rêve du Monde Coupe (Top 16)', description: 'Tour Eiffel, Colisée, Alpes Suisses, Maldives - 16 merveilles du monde' }
  },

  // ==========================================
  // 4. 극한의 밸런스 토론 (balance-debate) - 3대 팩
  // ==========================================
  balance_legend: {
    ko: { title: '🔥 [공식] 인터넷 커뮤니티 전설의 밸런스 30선', description: '깻잎논쟁, 100억 vs 평생살기, 똥맛카레, 탄산 vs 라면 등 검증된 난제 모음' },
    en: { title: '🔥 [Official] Legendary Internet Balance Dilemmas (30 Questions)', description: 'Perilla leaf debate, $10M vs immortality, soda vs ramen - 30 iconic choices' },
    ja: { title: '🔥 [公式] ネットで話題の伝説の究極の二者択一 30選', description: 'エゴマの葉論争、100億円vs長寿、炭酸vsラーメンなど話題の難問集' },
    'zh-TW': { title: '🔥 [官方] 網路社群傳奇終極二選一 30選', description: '芝麻葉爭論、一億元vs長命百歲、汽水vs泡麵等經典終極抉擇' },
    de: { title: '🔥 [Offiziell] Legendäre Internet-Dilemmas (30 Fragen)', description: '10 Mio. € vs. langes Leben, Cola vs. Ramen - 30 kultige Entscheidungen' },
    pt: { title: '🔥 [Oficial] Dilemas Lendários da Internet (30 Perguntas)', description: 'R$ 50 milhões vs imortalidade, refrigerante vs ramen - 30 escolhas icônicas' },
    es: { title: '🔥 [Oficial] Dilemas Legendarios de Internet (30 Preguntas)', description: '10M € vs inmortalidad, refresco vs ramen - 30 dilemas icónicos' },
    fr: { title: '🔥 [Officiel] Dilemmes Légendaires d\'Internet (30 Questions)', description: '10M € vs immortalité, soda vs ramen - 30 choix cornéliens mythiques' }
  },
  balance_workplace: {
    ko: { title: '💼 [공식] 대한민국 직장인/알바 대공감 밸런스 30선', description: '월 250 칼퇴 vs 월 550 매일 야근, 성격 좋은 무능 팀장 vs 싸가지 없는 천재 사수 등 현실 난제 30선' },
    en: { title: '💼 [Official] Office Life & Work Dilemmas (30 Questions)', description: '$2.5k on-time leave vs $5.5k daily overtime, nice incompetent boss vs genius rude mentor' },
    ja: { title: '💼 [公式] 社会人・バイト共感必至の二者択一 30選', description: '定時退社薄給 vs 毎日残業高給、優しい無能上司 vs 口の悪い天才上司などリアル難問' },
    'zh-TW': { title: '💼 [官方] 上班族與打工人超有共鳴二選一 30選', description: '準時下班低薪 vs 天天加班高薪、好脾氣無能主管 vs 毒舌天才前輩' },
    de: { title: '💼 [Offiziell] Arbeitsplatz & Büro-Dilemmas (30 Fragen)', description: 'Pünktlich Feierabend vs. Überstunden mit Spitzengehalt, netter inkompetenter Chef vs. Genie' },
    pt: { title: '💼 [Oficial] Vida no Trabalho & Dilemas Profissionais (30 Perguntas)', description: 'Sair no horário com salário normal vs hora extra diária com salário alto, chefe legal e incompetente vs gênio' },
    es: { title: '💼 [Oficial] Dilemas de Oficina & Vida Laboral (30 Preguntas)', description: 'Salir a tiempo vs horas extra con gran sueldo, jefe simpático e incompetente vs mentor genio difícil' },
    fr: { title: '💼 [Officiel] Dilemmes au Travail & Vie de Bureau (30 Questions)', description: 'Départ à l\'heure vs heures sup gros salaire, patron sympa incompétent vs mentor génial désagréable' }
  },
  balance_superpower: {
    ko: { title: '🦸 [공식] 초능력 & 판타지 인생 리셋 30선', description: '투명인간 vs 순간이동, 시간 되돌리기 vs 미래 보기, 100억 복권 당첨 vs 초능력자 등 흥미진진 난제 30선' },
    en: { title: '🦸 [Official] Superpowers & Fantasy Life Reset (30 Questions)', description: 'Invisibility vs Teleportation, Time Rewind vs Future Sight, $100M Lottery vs Superpowers' },
    ja: { title: '🦸 [公式] 特殊能力＆ファンタジー人生リセット 30選', description: '透明人間 vs 瞬間移動、時間巻き戻し vs 未来予知、100億円宝くじ当選 vs 超能力' },
    'zh-TW': { title: '🦸 [官方] 超能力與奇幻人生重啟 30選', description: '隱形人 vs 瞬間移動、時光倒流 vs 預知未來、頭獎樂透 vs 獲得超能力' },
    de: { title: '🦸 [Offiziell] Superkräfte & Fantasy-Neustart (30 Fragen)', description: 'Unsichtbarkeit vs. Teleportation, Zeit zurückdrehen vs. Zukunft sehen, 100 Mio. € vs. Superkraft' },
    pt: { title: '🦸 [Oficial] Superpoderes & Reinício de Vida Fantástica (30 Perguntas)', description: 'Invisibilidade vs Teletransporte, Voltar no Tempo vs Ver o Futuro, Loteria milionária vs Superpoderes' },
    es: { title: '🦸 [Oficial] Superpoderes & Reinicio de Vida Fantástica (30 Preguntas)', description: 'Invisibilidad vs Teletransporte, Rebobinar el tiempo vs Ver el futuro, Lotería millonaria vs Superpoderes' },
    fr: { title: '🦸 [Officiel] Super-pouvoirs & Réinitialisation Fantastique (30 Questions)', description: 'Invisibilité vs Téléportation, Remonter le temps vs Voir le futur, Loto géant vs Super-pouvoirs' }
  },

  // ==========================================
  // 5. 줌아웃 퀴즈 (zoom-quiz)
  // ==========================================
  zoom_daily_objects: {
    ko: { title: '🔍 [공식] 초근접 줌아웃 사물 & 랜드마크 퀴즈 팩 (25선)', description: '극단적으로 줌인된 일부분을 보고 무엇인지 빠르게 맞혀보세요!' },
    en: { title: '🔍 [Official] Extreme Close-Up Zoom Quiz: Objects & Landmarks (25 Items)', description: 'Identify everyday objects and famous landmarks zoomed in to the extreme!' },
    ja: { title: '🔍 [公式] 超拡大ズームアウト日常品＆名所クイズ (25問)', description: '限界までズームインされた写真から、何なのかを素早く当ててみよう！' },
    'zh-TW': { title: '🔍 [官方] 超近距離特寫縮小 物體與地標猜謎包 (25題)', description: '觀察極限放大的照片特寫，快速猜出究竟是什麼物體或知名地標！' },
    de: { title: '🔍 [Offiziell] Extrem-Nahaufnahme Zoom-Quiz: Objekte & Wahrzeichen (25)', description: 'Errate Alltagsgegenstände und Wahrzeichen anhand extremer Vergrößerungen!' },
    pt: { title: '🔍 [Oficial] Quiz de Zoom Extremo: Objetos & Pontos Turísticos (25)', description: 'Identifique objetos do cotidiano e pontos turísticos a partir de super closes!' },
    es: { title: '🔍 [Oficial] Quiz de Zoom Extremo: Objetos & Monumentos (25)', description: '¡Identifica objetos cotidianos y monumentos famosos a partir de planos súper cerrados!' },
    fr: { title: '🔍 [Officiel] Quiz Zoom Extrême : Objets & Monuments (25)', description: 'Devinez les objets du quotidien et monuments célèbres à partir de gros plans extrêmes !' }
  },

  // ==========================================
  // 6. 블라인드 드로잉 (blind-drawing)
  // ==========================================
  blind_classic_55: {
    ko: { title: '🙈 [공식] 눈감고 그리는 대환장 괴작 엄선 55선', description: '스케이트보드 타는 기린, 선글라스 낀 피카츄, 우주복 입은 고양이 등 빵 터지는 제시어 모음' },
    en: { title: '🙈 [Official] Blind Drawing Masterpieces (55 Hilarious Prompts)', description: 'Skateboarding giraffe, Pikachu with sunglasses, astronaut cat - 55 hilarious drawing prompts' },
    ja: { title: '🙈 [公式] 目を閉じて描く爆笑カオスお題 55選', description: 'スケボーに乗るキリン、サングラスピカチュウ、宇宙服の猫など抱腹絶倒のお題集' },
    'zh-TW': { title: '🙈 [官方] 閉眼盲畫爆笑混沌題庫 55選', description: '溜滑板的長頸鹿、戴墨鏡的皮卡丘、穿太空衣的貓咪等55個爆笑繪畫題目' },
    de: { title: '🙈 [Offiziell] Blindes Zeichnen Verrückte Meisterwerke (55)', description: 'Skateboardende Giraffe, Pikachu mit Sonnenbrille, Astronautenkatze - 55 witzige Aufgaben' },
    pt: { title: '🙈 [Oficial] Desenho às Cegas Obras-Primas Hilárias (55)', description: 'Girafa no skate, Pikachu de óculos escuros, gato astronauta - 55 temas hilários' },
    es: { title: '🙈 [Oficial] Dibujo a Ciegas Obras Maestras Divertidas (55)', description: 'Jirafa en patineta, Pikachu con gafas de sol, gato astronauta - 55 temas divertidísimos' },
    fr: { title: '🙈 [Officiel] Dessin à l\'Aveugle Chefs-d\'œuvre Hilarants (55)', description: 'Girafe en skateboard, Pikachu en lunettes de soleil, chat astronaute - 55 thèmes loufoques' }
  },

  // ==========================================
  // 7. 3초 룰 (five-sec-rule)
  // ==========================================
  fivesec_classic: {
    ko: { title: '⏱️ [공식] 3초 룰 뇌정지 스피드 미션 50선', description: '"치킨 브랜드 3개!", "헤어질 때 핑계 3개!" 3초 안에 외치는 순발력 미션 50선' },
    en: { title: '⏱️ [Official] 3-Second Rule Mind-Freeze Speed Missions (50 Prompts)', description: '"3 fast food brands!", "3 breakup excuses!" Shout out 3 answers in 3 seconds!' },
    ja: { title: '⏱️ [公式] 3秒ルール 頭真っ白スピードミッション 50選', description: '「チキンのブランド3つ！」「別れる時の言い訳3つ！」3秒以内に叫ぶ瞬発力バトル' },
    'zh-TW': { title: '⏱️ [官方] 3秒極速腦袋當機挑戰 50選', description: '「說出3家速食店品牌！」「分手時說的3個藉口！」3秒內大聲喊出答案的極速反應對決' },
    de: { title: '⏱️ [Offiziell] 3-Sekunden-Regel Speed-Missionen (50)', description: '"3 Fast-Food-Marken!", "3 Ausreden bei Trennungen!" Antworte in 3 Sekunden!' },
    pt: { title: '⏱️ [Oficial] Regra dos 3 Segundos Missões Rápidas (50)', description: '"3 marcas de fast food!", "3 desculpas de término!" Grite 3 respostas em 3 segundos!' },
    es: { title: '⏱️ [Oficial] Regla de 3 Segundos Desafíos Rápidos (50)', description: '¡"3 marcas de comida rápida!", "3 excusas de ruptura!" ¡Grita 3 respuestas en 3 segundos!' },
    fr: { title: '⏱️ [Officiel] Règle des 3 Secondes Défis Éclair (50)', description: '"3 marques de fast-food !", "3 excuses de rupture !" Donnez 3 réponses en 3 secondes !' }
  },

  // ==========================================
  // 8. 상식 퀴즈 (trivia-quiz) - 4대 팩
  // ==========================================
  trivia_elementary: {
    ko: { title: '🎒 [난이도: 초등학생] 누구나 맞히는 기초 퀴즈 팩 (15선)', description: '사계절, 대한민국 수도, 기초 상식 등 초등학생도 아는 쉬운 문제' },
    en: { title: '🎒 [Elementary] Easy Warm-Up Trivia Quiz (15 Questions)', description: 'Four seasons, capitals, basic nature & science facts that everyone can answer' },
    ja: { title: '🎒 [小学生レベル] だれでも解ける基礎雑学クイズ (15問)', description: '四季、首都、自然や科学の基礎常識など誰でも楽しめるウォーミングアップ問題' },
    'zh-TW': { title: '🎒 [小學難度] 輕鬆熱身基礎常識問答 (15題)', description: '四季、各國首都、基礎自然科學常識等每個人都能答對的熱身題目' },
    de: { title: '🎒 [Grundschule] Leichtes Aufwärm-Quiz (15 Fragen)', description: 'Vier Jahreszeiten, Hauptstädte, Natur- und Grundlagenwissen für alle' },
    pt: { title: '🎒 [Nível Fácil] Quiz Básico de Aquecimento (15 Perguntas)', description: 'Estações do ano, capitais, fatos da natureza e ciências fáceis' },
    es: { title: '🎒 [Nivel Básico] Quiz Fácil de Calentamiento (15 Preguntas)', description: 'Estaciones del año, capitales, naturaleza y hechos básicos para calentar' },
    fr: { title: '🎒 [Niveau Débutant] Quiz Facile d\'Échauffement (15 Questions)', description: 'Saisons, capitales, nature et culture générale de base accessibles à tous' }
  },
  trivia_middle: {
    ko: { title: '🏫 [난이도: 중학생] 교과서 필수 상식 퀴즈 팩 (15선)', description: '역사 인물, 기초 과학, 사회 상식 교과서 필수 문제 모음' },
    en: { title: '🏫 [Middle School] Textbook Essential Trivia Quiz (15 Questions)', description: 'Historical figures, foundational science, and essential general knowledge' },
    ja: { title: '🏫 [中学生レベル] 教科書必須の常識クイズ (15問)', description: '歴史の偉人、基礎科学、社会常識など教科書レベルの重要知識問題' },
    'zh-TW': { title: '🏫 [國中難度] 課本必學核心知識問答 (15題)', description: '歷史人物、基礎理化、社會常識等國高中核心基本題目' },
    de: { title: '🏫 [Mittelstufe] Grundwissen & Schulstoff-Quiz (15 Fragen)', description: 'Historische Persönlichkeiten, Grundlagen der Wissenschaft und Allgemeinwissen' },
    pt: { title: '🏫 [Nível Médio] Conhecimentos Gerais Essenciais (15 Perguntas)', description: 'Figuras históricas, ciências fundamentais e conhecimentos de livros didáticos' },
    es: { title: '🏫 [Nivel Intermedio] Cultura General Básica (15 Preguntas)', description: 'Personajes históricos, ciencias básicas y conocimientos generales esenciales' },
    fr: { title: '🏫 [Niveau Intermédiaire] Culture Générale Essentielle (15 Questions)', description: 'Grandes figures historiques, sciences fondamentales et savoirs scolaires' }
  },
  trivia_adult: {
    ko: { title: '💼 [난이도: 성인] 2026 대한민국 국민 필수 교양 팩 (15선)', description: '시사, 경제, 문화, 법률, 세계사 등 성인을 위한 알짜 교양 상식' },
    en: { title: '💼 [Adult] 2026 Essential General Culture Quiz (15 Questions)', description: 'Current affairs, economy, culture, world history, and daily social trivia' },
    ja: { title: '💼 [大人レベル] 現代人必須の教養・時事クイズ (15問)', description: '時事、経済、文化、世界史など現代の大人が知っておくべき教養雑学' },
    'zh-TW': { title: '💼 [成人難度] 現代公民必備常識與時事問答 (15題)', description: '時事熱門話題、經濟常識、文化世界史等當代成人必修素養題目' },
    de: { title: '💼 [Erwachsene] Allgemeine Bildung & Allgemeinwissen (15 Fragen)', description: 'Aktuelles, Wirtschaft, Kultur, Weltgeschichte und praktisches Allgemeinwissen' },
    pt: { title: '💼 [Adulto] Cultura Geral & Conhecimento Essencial (15 Perguntas)', description: 'Atualidades, economia, cultura, história mundial e curiosidades sociais' },
    es: { title: '💼 [Adultos] Cultura General & Actualidad (15 Preguntas)', description: 'Actualidad, economía, cultura, historia mundial y conocimientos generales para adultos' },
    fr: { title: '💼 [Adulte] Culture Générale & Actualités (15 Questions)', description: 'Actualités, économie, culture, histoire mondiale et connaissances indispensables' }
  },
  trivia_professor: {
    ko: { title: '🧐 [난이도: 교수/박사] 멘사급 초고난도 하이엔드 상식 팩 (15선)', description: '철학, 양자역학, 고전 문학, 심층 인문학 등 1%를 위한 두뇌 대결' },
    en: { title: '🧐 [Expert / PhD] Mensa-Level Genius Trivia Quiz (15 Questions)', description: 'Philosophy, quantum mechanics, classic literature, and elite intellectual trivia' },
    ja: { title: '🧐 [博士・教授レベル] メンサ級超難問ハイエンド雑学クイズ (15問)', description: '哲学、量子力学、古典文学、深層人文学など知性派のための超難問バトル' },
    'zh-TW': { title: '🧐 [博士教授級] 門薩級頂級超高難度常識問答 (15題)', description: '哲學思辨、量子力學、古典名著、深層人文社科的頂級燒腦對決' },
    de: { title: '🧐 [Experten / Doktor] Mensa-Niveau Genius-Quiz (15 Fragen)', description: 'Philosophie, Quantenmechanik, klassische Literatur und Tiefenwissen' },
    pt: { title: '🧐 [Especialista / PhD] Quiz Nível Mensa de Gênio (15 Perguntas)', description: 'Filosofia, mecânica quântica, literatura clássica e conhecimentos profundos' },
    es: { title: '🧐 [Experto / Doctorado] Quiz Nivel Mensa de Genio (15 Preguntas)', description: 'Filosofía, física cuántica, literatura clásica y alta cultura intelectual' },
    fr: { title: '🧐 [Expert / Doctorat] Quiz de Génie Niveau Mensa (15 Questions)', description: 'Philosophie, mécanique quantique, littérature classique et savoirs pointus' }
  },

  // ==========================================
  // 9. 썰풀기 룰렛 (story-roulette)
  // ==========================================
  story_party_topics: {
    ko: { title: '🎡 [공식] 흑역사 & 이불킥 토크 주제 & 벌칙 팩', description: '이불킥 흑역사, 소름 돋는 실화, 첫사랑 썰 등 웃음 보장 토크 팩' },
    en: { title: '🎡 [Official] Embarrassing Memories & Talk Topics + Penalties', description: 'Cringe moments, creepy true stories, first crush memories, and funny party dares' },
    ja: { title: '🎡 [公式] 黒歴史＆赤面トークテーマ＆罰ゲームパック', description: '恥ずかしすぎる黒歴史、鳥肌の実話、初恋のエピソードなど爆笑トーク集' },
    'zh-TW': { title: '🎡 [官方] 黑歷史與尷尬回憶話題＋趣味懲罰包', description: '尷尬黑歷史、毛骨悚然真實故事、初戀回憶與爆笑派對懲罰' },
    de: { title: '🎡 [Offiziell] Peinliche Geschichten & Talk-Themen + Strafen', description: 'Peinliche Momente, Gruselgeschichten, erste Liebe und lustige Party-Strafen' },
    pt: { title: '🎡 [Oficial] Histórias Vergonhosas & Temas de Conversa + Punições', description: 'Micos inesquecíveis, histórias arrepiantes, primeiro amor e prendas divertidas' },
    es: { title: '🎡 [Oficial] Historias Vergonzosas & Temas de Charla + Castigos', description: 'Momentos vergonzosos, historias espeluznantes, primer amor y retos divertidos' },
    fr: { title: '🎡 [Officiel] Histoires Gênantes & Sujets de Discussion + Gages', description: 'Moments de honte, histoires vraies frissonnantes, premier amour et gages délirants' }
  },

  // ==========================================
  // 10. 가짜 화가 (fake-artist)
  // ==========================================
  fake_artist_classic: {
    ko: { title: '🎭 [공식] 한 획 릴레이 드로잉 엄선 40선', description: '피카츄, 에펠탑, 햄버거, 자전거 등 한 획으로 표현하기 아슬아슬한 제시어 모음' },
    en: { title: '🎭 [Official] One-Stroke Drawing Relay Prompts (40 Items)', description: 'Pikachu, Eiffel Tower, burger, bicycle - tricky words to draw in just one stroke' },
    ja: { title: '🎭 [公式] 一筆書きリレードローイング厳選 40選', description: 'ピカチュウ、エッフェル塔、ハンバーガー、自転車など一筆で描く絶妙なお題' },
    'zh-TW': { title: '🎭 [官方] 一筆接力作畫精選題庫 40選', description: '皮卡丘、巴黎鐵塔、漢堡、自行車等考驗一筆畫功力的絕妙題目' },
    de: { title: '🎭 [Offiziell] Ein-Strich Zeichnen Relais (40 Aufgaben)', description: 'Pikachu, Eiffelturm, Burger, Fahrrad - knifflige Motive für einen einzigen Strich' },
    pt: { title: '🎭 [Oficial] Desenho em Um Traço Desafios (40 Itens)', description: 'Pikachu, Torre Eiffel, hambúrguer, bicicleta - palavras desafiadoras para um só traço' },
    es: { title: '🎭 [Oficial] Dibujo de Un Solo Trazo Desafíos (40 Ítems)', description: 'Pikachu, Torre Eiffel, hamburguesa, bicicleta - palabras difíciles de trazar de una vez' },
    fr: { title: '🎭 [Officiel] Dessin en Un Seul Trait Défis (40 Sujets)', description: 'Pikachu, Tour Eiffel, burger, vélo - des mots délicats à dessiner en un seul trait' }
  },

  // ==========================================
  // 11. 익명 폭로 (anonymous-exposed)
  // ==========================================
  anonymous_party_30: {
    ko: { title: '🎭 [공식] 우정 파괴 디스코드 파티 지목 질문 30선', description: '"가장 겉과 속이 다를 것 같은 사람?", "무인도에서 가장 먼저 탈락할 사람?" 등 매운맛 질문 모음' },
    en: { title: '🎭 [Official] Friendship-Testing Discord Pointing Questions (30)', description: '"Most two-faced friend?", "First to perish on a desert island?" Spicy questions' },
    ja: { title: '🎭 [公式] 友情崩壊!? Discord パーティー指名質問 30選', description: '「裏表が一番ありそうな人は？」「無人島で真っ先に脱落しそうな人は？」など激辛質問' },
    'zh-TW': { title: '🎭 [官方] 友誼小船說翻就翻 Discord 互相指名問答 30選', description: '「誰最表裡不一？」「掉到無人島誰最先陣亡？」等辛辣互相指名真心話' },
    de: { title: '🎭 [Offiziell] Freundschafts-Test Discord Zeigefragen (30)', description: '"Wer ist am scheinheiligsten?", "Wer überlebt eine einsame Insel am kürzesten?"' },
    pt: { title: '🎭 [Oficial] Perguntas Picantes de Apontar o Dedo (30)', description: '"Quem é mais duas caras?", "Quem não duraria um dia numa ilha deserta?"' },
    es: { title: '🎭 [Oficial] Preguntas Picantes de Señalar con el Dedo (30)', description: '¿"Quién tiene dos caras?", "¿Quién sería el primero en morir en una isla desierta?"' },
    fr: { title: '🎭 [Officiel] Questions Piquantes pour Pointer du Doigt (30)', description: '"Qui a le plus double visage ?", "Qui périrait en premier sur une île déserte ?"' }
  }
};

/**
 * 게임 ID와 언어 설정에 맞는 기본 팩 목록을 반환합니다.
 * - 사용자가 어떤 언어를 선택하든 해당 게임의 모든 기본 팩(REAL_DEFAULT_PACKS)이 100% 온전히 유지됩니다.
 * - 팩의 제목, 설명, 태그 등이 선택된 언어로 번역되어 표시됩니다.
 * - 팩 고유의 language 속성('ko', 'en', 'ja', 'all')은 그대로 유지되어 뱃지로 확인할 수 있습니다.
 */
export function getDefaultPacksForGame(gameId: string, language: SupportedLanguage = 'ko'): CustomPack[] {
  const packs = REAL_DEFAULT_PACKS[gameId] || [];
  
  if (language === 'ko') {
    return packs.map(p => ({
      ...p,
      likes: 0
    }));
  }

  return packs.map(pack => {
    const packTrans = PACK_TRANSLATIONS[pack.id];
    const packDataTrans = PACK_DATA_TRANSLATIONS[pack.id];
    const trans = packTrans ? (packTrans[language] || packTrans['en']) : null;
    const translatedData = packDataTrans ? (packDataTrans[language] || packDataTrans['en']) : null;

    return {
      ...pack,
      title: trans?.title || pack.title,
      description: trans?.description || pack.description,
      tags: trans?.tags || pack.tags,
      author: trans?.author || 'PartyHub Official',
      data: translatedData || pack.data,
      likes: 0
    };
  });
}
