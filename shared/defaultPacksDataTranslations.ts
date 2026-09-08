// shared/defaultPacksDataTranslations.ts
import { SupportedLanguage } from './types';

/**
 * 32개 기본 공식 팩의 내부 데이터(data) 다국어 번역 사전
 * 사용자가 비한국어 언어를 선택했을 때 팩의 질문, 단어, 선택지, 해설이 100% 현지화되어 플레이됩니다.
 */
export const PACK_DATA_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, any>>> = {
  'liar_food': {
    'en': {
      "category": "Food & Snacks",
      "words": [
            "Fried Chicken",
            "Pizza",
            "Tteokbokki (Spicy Rice Cakes)",
            "Fish Bread (Bungeoppang)",
            "Mala Hotpot",
            "Pork Belly (Samgyeopsal)",
            "Black Bean Noodles (Jajangmyeon)",
            "Spicy Seafood Soup (Jjamppong)",
            "Sweet and Sour Pork (Tangsuyuk)",
            "Sushi",
            "Hamburger",
            "Ramen Noodles",
            "Kimbap (Seaweed Rice Roll)",
            "Korean Blood Sausage (Sundae)",
            "Pork Trotters (Jokbal)",
            "Bossam (Boiled Pork Wrap)",
            "Grilled Steak",
            "Pasta",
            "Takoyaki",
            "Pork Cutlet (Tonkatsu)",
            "Bibimbap",
            "Soybean Paste Stew",
            "Kimchi Stew",
            "Army Stew (Budaejjigae)",
            "Braised Short Ribs",
            "Cold Noodles (Naengmyeon)",
            "Knife-Cut Noodles (Kalguksu)",
            "Udon Noodles",
            "Hot Dog / Corn Dog",
            "Sweet Honey Pancake (Hotteok)",
            "Belgian Waffle",
            "Macaron",
            "Shaved Ice (Bingsu)",
            "Churros",
            "Rice Cake & Sausage Skewer (Sotteok)",
            "French Fries",
            "Cheese Balls",
            "Spicy Chicken Feet",
            "Beef Tripe (Gopchang)",
            "Beef Tartare (Yukhoe)",
            "Sandwich",
            "Toast",
            "Dumplings (Mandu)",
            "Vietnamese Spring Rolls",
            "Pho Noodles",
            "Chinese Hot Pot",
            "Pad Thai",
            "Curry Rice",
            "Omurice",
            "Rolled Omelette"
      ]
},
    'ja': {
      "category": "料理 / 夜食",
      "words": [
            "フライドチキン",
            "ピザ",
            "トッポッキ",
            "たい焼き",
            "麻辣湯",
            "サムギョプサル",
            "ジャージャー麺",
            "チャンポン",
            "タンスユク (酢豚)",
            "寿司",
            "ハンバーガー",
            "ラーメン",
            "キンパ",
            "スンデ",
            "チョッパル (豚足)",
            "ポッサム",
            "ステーキ",
            "パスタ",
            "たこ焼き",
            "とんかつ",
            "ビビンバ",
            "テンジャンチゲ",
            "キムチチゲ",
            "プデチゲ",
            "カルビチム",
            "冷麺",
            "カルグクス",
            "うどん",
            "アメリカンドッグ",
            "ホットク",
            "ワッフル",
            "マカロン",
            "かき氷",
            "チュロス",
            "ソトックソトック",
            "フライドポテト",
            "チーズボール",
            "タッパル (鶏足)",
            "ホルモン焼き",
            "ユッケ",
            "サンドイッチ",
            "トースト",
            "餃子",
            "生春巻き",
            "フォー",
            "火鍋",
            "パッタイ",
            "カレーライス",
            "オムライス",
            "卵焼き"
      ]
},
  },

  'liar_food_en': {
    'en': {
      "category": "Global Popular Foods & Snacks",
      "words": [
            "Pizza",
            "Burger",
            "Sushi",
            "Taco",
            "Steak",
            "Ramen",
            "Pasta",
            "Donut",
            "Hotdog",
            "Sandwich",
            "Burrito",
            "Waffle",
            "Pancake",
            "Croissant",
            "Bagel",
            "Nachos",
            "Fried Chicken",
            "BBQ Ribs",
            "Curry",
            "Paella",
            "Lasagna",
            "Fish and Chips",
            "Shawarma",
            "Kebab",
            "Dim Sum",
            "Gyoza",
            "Quesadilla",
            "Crepe",
            "Churros",
            "Pretzel",
            "Macaron",
            "Brownie",
            "Cupcake",
            "Cheesecake",
            "Apple Pie",
            "Ice Cream",
            "Gelato",
            "Popcorn",
            "French Fries",
            "Onion Rings"
      ]
},
  },

  'liar_food_ja': {
    'en': {
      "category": "Japanese Cuisine & Midnight Diner",
      "words": [
            "Sushi",
            "Ramen",
            "Yakiniku",
            "Takoyaki",
            "Okonomiyaki",
            "Tempura",
            "Udon",
            "Soba",
            "Curry Rice",
            "Tonkatsu",
            "Gyudon (Beef Bowl)",
            "Katsudon",
            "Oyakodon",
            "Yakitori",
            "Sukiyaki",
            "Shabu-Shabu",
            "Onigiri",
            "Miso Soup",
            "Karaage",
            "Gyoza",
            "Chawanmushi",
            "Tamagoyaki",
            "Edamame",
            "Unagi Don",
            "Sashimi",
            "Dango",
            "Dorayaki",
            "Mochi",
            "Taiyaki",
            "Melonpan",
            "Matcha Parfait",
            "Kakigori",
            "Monjayaki",
            "Oden",
            "Nabe",
            "Omurice",
            "Hambagu",
            "Croquette",
            "Somen",
            "Hiyashi Chuka"
      ]
},
    'ja': {
      "category": "日本料理 / 深夜食堂",
      "words": [
            "寿司",
            "ラーメン",
            "焼肉",
            "たこ焼き",
            "お好み焼き",
            "天ぷら",
            "うどん",
            "蕎麦",
            "カレーライス",
            "とんかつ",
            "牛丼",
            "カツ丼",
            "親子丼",
            "焼き鳥",
            "すき焼き",
            "しゃぶしゃぶ",
            "おにぎり",
            "味噌汁",
            "唐揚げ",
            "餃子",
            "茶碗蒸し",
            "卵焼き",
            "枝豆",
            "うな丼",
            "刺身",
            "団子",
            "どら焼き",
            "餅",
            "たい焼き",
            "メロンパン",
            "抹茶パフェ",
            "かき氷",
            "もんじゃ焼き",
            "おでん",
            "鍋",
            "オムライス",
            "ハンバーグ",
            "コロッケ",
            "そうめん",
            "冷やし中華"
      ]
},
  },

  'liar_lol': {
    'en': {
      "category": "LoL Champions",
      "words": [
            "Yasuo",
            "Lee Sin",
            "Teemo",
            "Ahri",
            "Zed",
            "Blitzcrank",
            "Ezreal",
            "Lux",
            "Kai'Sa",
            "Jhin",
            "Samira",
            "Yone",
            "Varus",
            "Ashe",
            "Garen",
            "Darius",
            "Malphite",
            "Morgana",
            "Thresh",
            "Pyke",
            "Shaco",
            "Master Yi",
            "Warwick",
            "Hecarim",
            "Nocturne",
            "Akali",
            "Katarina",
            "Talon",
            "LeBlanc",
            "Syndra",
            "Orianna",
            "Viktor",
            "Twisted Fate",
            "Heimerdinger",
            "Veigar",
            "Rammus",
            "Amumu",
            "Nunu & Willump",
            "Cho'Gath",
            "Zac"
      ]
},
  },

  'liar_movies': {
    'en': {
      "category": "Legendary Movies & Anime",
      "words": [
            "Parasite",
            "The Host",
            "Oldboy",
            "Extreme Job",
            "Along with the Gods",
            "Veteran",
            "The Thieves",
            "Ode to My Father",
            "The Admiral: Roaring Currents",
            "12.12: The Day",
            "Train to Busan",
            "Interstellar",
            "Inception",
            "Avatar",
            "Titanic",
            "The Dark Knight",
            "Avengers",
            "Iron Man",
            "Spider-Man",
            "Frozen",
            "Spirited Away",
            "Your Name",
            "Howl's Moving Castle",
            "Demon Slayer: Mugen Train",
            "The First Slam Dunk",
            "Suzume",
            "Zootopia",
            "Coco",
            "Inside Out",
            "Aladdin",
            "The Lion King",
            "The Matrix",
            "Harry Potter",
            "The Lord of the Rings",
            "Jurassic Park",
            "Joker",
            "La La Land",
            "Ratatouille",
            "Kung Fu Panda",
            "Pirates of the Caribbean"
      ]
},
  },

  'liar_school': {
    'en': {
      "category": "School & Everyday Memories",
      "words": [
            "Lunch Tray",
            "Eraser Shavings",
            "Gym Uniform",
            "Chalkboard Eraser",
            "Mechanical Pencil Lead",
            "Indoor Slippers",
            "Student Name Tag",
            "Student ID Card",
            "Pencil Case",
            "Textbook",
            "Desk Drawer",
            "Water Bottle",
            "School Backpack",
            "Jump Rope",
            "Attendance Book",
            "Colored Chalk",
            "Plastic Protractor",
            "Hallway Slippers",
            "Exam Timer",
            "Hallway Locker",
            "Correction Tape",
            "Sticky Notes",
            "Highlighter Pen",
            "Stapler",
            "Craft Scissors",
            "Measuring Ruler",
            "Compass",
            "Report Card",
            "Classroom Curtains",
            "Classroom Broom",
            "Trash Dustpan",
            "Blackboard",
            "Beam Projector",
            "Gym Whistle",
            "Track Stopwatch",
            "Lined Notebook",
            "Study Binder",
            "Packed Lunchbox",
            "Morning Alarm Clock",
            "School Homework Diary"
      ]
},
  },

  'fake_artist_classic': {
    'en': [
      "Pikachu",
      "Eiffel Tower",
      "Hamburger",
      "Bicycle",
      "Eyeglasses",
      "Electric Fan",
      "Umbrella",
      "Desert Cactus",
      "Antarctic Penguin",
      "Giraffe",
      "Pizza Slice",
      "Soccer Ball",
      "Smartphone",
      "Sports Car",
      "Snowman",
      "Skull",
      "Golden Crown",
      "Garden Snail",
      "Airplane",
      "Acoustic Guitar",
      "Red Apple",
      "Coffee Mug",
      "Scissors",
      "Traffic Light",
      "Helicopter",
      "Pet Cat",
      "Fluffy Rabbit",
      "Rocket Spaceship",
      "Sunglasses",
      "Wristwatch",
      "Hot Air Balloon",
      "Friendly Ghost",
      "Party Balloon",
      "Banana",
      "Birthday Cake",
      "Diamond Gem",
      "Baseball Bat",
      "Top Hat",
      "Oak Tree",
      "Tropical Fish"
],
    'ja': [
      "ピカチュウ",
      "エッフェル塔",
      "ハンバーガー",
      "自転車",
      "メガネ",
      "扇風機",
      "傘",
      "サボテン",
      "ペンギン",
      "キリン",
      "ピザ",
      "サッカーボール",
      "スマートフォン",
      "自動車",
      "雪だるま",
      "ドクロ",
      "王冠",
      "カタツムリ",
      "飛行機",
      "ギター",
      "リンゴ",
      "コーヒーカップ",
      "ハサミ",
      "信号機",
      "ヘリコプター",
      "猫",
      "ウサギ",
      "宇宙船",
      "サングラス",
      "時計",
      "気球",
      "おばけ",
      "風船",
      "バナナ",
      "ケーキ",
      "ダイヤモンド",
      "バット",
      "帽子",
      "木",
      "魚"
],
  },

  'blind_classic_55': {
    'en': [
      "Giraffe riding a skateboard",
      "Panda wearing sunglasses",
      "Cat in an astronaut suit",
      "T-Rex eating pizza",
      "Alien drinking an iced latte",
      "Monkey dancing with DJ headphones",
      "Octopus driving a yellow submarine",
      "Penguin wearing a sharp tuxedo",
      "Grizzly bear riding a unicycle",
      "Great white shark brushing its teeth",
      "Fire-breathing dragon roasting marshmallows",
      "Koala sleeping with a rain umbrella",
      "Lion singing dramatic opera on stage",
      "Sloth riding a high-speed rollercoaster",
      "Elephant performing delicate ballet",
      "Flamingo playing mini golf",
      "Boxing kangaroo wearing red gloves",
      "Golden retriever flying a propeller airplane",
      "Squirrel burying a giant gold coin",
      "Tree frog rocking an electric guitar",
      "Happy pig enjoying a mud bath",
      "Wise owl wearing a graduation cap",
      "Chameleon camouflaged on a rainbow",
      "Hamster running like the wind on its wheel",
      "Zebra covered in colorful polka dots",
      "Beaver building a dam with chopsticks",
      "Little mouse carrying a giant cheese block",
      "Sea turtle driving a red sports car",
      "Clever fox wearing reading glasses with a book",
      "Mallard duck wearing headphones playing video games",
      "Alligator playing the golden saxophone",
      "Sheep getting a fancy salon haircut",
      "Blue whale leaping gracefully over the crescent moon",
      "Crab doing gymnastics on a balance beam",
      "Butterfly with stained-glass wings",
      "Pegasus horse galloping across sunset clouds",
      "Rhino with a triple-scoop ice cream cone horn",
      "Hippo floating lazily in a pool on a duck floatie",
      "Cheetah driving an F1 racing car",
      "Lone wolf howling at a glowing neon moon",
      "Chubby walrus wrapped in a cozy winter scarf",
      "Silverback gorilla typing furiously on a laptop",
      "Sweet skunk offering a bouquet of fresh roses",
      "Pelican with colorful tropical fish in its beak",
      "Raccoon washing a smartphone under a faucet",
      "Hedgehog curled into a spiky bowling ball",
      "Cheeky seagull stealing french fries from a tourist",
      "Holstein cow soaring with angel wings",
      "Desert camel relaxing in a hammock between its humps",
      "Ostrich burying its head inside a bucket of popcorn",
      "Sea lion balancing a whole pepperoni pizza on its nose",
      "Sea otters floating on their backs holding paws",
      "Meerkat sentinel scouting through a telescope",
      "Fiery phoenix bird rising from golden embers",
      "Magic unicorn happily baking rainbow cupcakes"
],
    'ja': [
      "スケートボードに乗るキリン",
      "サングラスをかけたパンダ",
      "宇宙服を着た猫",
      "ピザを食べるティラノサウルス",
      "アイスラテを飲む宇宙人",
      "ヘッドホンをつけて踊るサル",
      "潜水艦を運転するタコ",
      "タキシードを着たペンギン",
      "一輪車に乗るクマ",
      "歯磨きをするサメ",
      "マシュマロを焼くドラゴン",
      "傘をさして眠るコアラ",
      "オペラを熱唱するライオン",
      "ジェットコースターに乗るナマケモノ",
      "バレエを踊るゾウ",
      "ゴルフをするフラミンゴ",
      "ボクシングをするカンガルー",
      "飛行機を操縦するイヌ",
      "巨大なドングリを埋めるリス",
      "エレキギターを弾くカエル",
      "泥風呂を満喫するブタ",
      "卒業帽をかぶったフクロウ",
      "虹色に擬態したカメレオン",
      "回し車を全力疾走するハムスター",
      "水玉模様のシマウマ"
],
  },

  'fivesec_classic': {
    'en': [
      "Name 3 pizza toppings!",
      "Name 3 countries in Europe!",
      "Name 3 popular video games!",
      "Name 3 yellow fruits!",
      "Name 3 ice cream flavors!",
      "Name 3 items found in a bathroom!",
      "Name 3 superhero movies!",
      "Name 3 musical instruments!",
      "Name 3 fast food restaurants!",
      "Name 3 classic excuses for being late!",
      "Name 3 zoo animals!",
      "Name 3 vehicles with wheels!",
      "Name 3 high school subjects!",
      "Name 3 summer Olympic sports!",
      "Name 3 winter clothing items!",
      "Name 3 breakfast foods!",
      "Name 3 famous cartoon characters!",
      "Name 3 classic board games!",
      "Name 3 pizza chains!",
      "Name 3 appliances you plug into a wall!",
      "Name 3 languages spoken across the world!",
      "Name 3 types of footwear!",
      "Name 3 items currently inside your fridge!",
      "Name 3 sea creatures!",
      "Name 3 popular dog breeds!",
      "Name 3 pizza toppings you absolutely hate!",
      "Name 3 sweet desserts!",
      "Name 3 Marvel superheroes!",
      "Name 3 DC superheroes!",
      "Name 3 social media apps!",
      "Name 3 vegetables you dislike!",
      "Name 3 items in your backpack or bag!",
      "Name 3 things you can read!",
      "Name 3 animated Disney movies!",
      "Name 3 hot beverages!",
      "Name 3 things you wear on your head!",
      "Name 3 major cities in Asia!",
      "Name 3 modes of public transportation!",
      "Name 3 pasta shapes or types!",
      "Name 3 green vegetables!",
      "Name 3 objects made of wood!",
      "Name 3 home gaming consoles!",
      "Name 3 things that smell amazing!",
      "Name 3 things that make very loud noises!",
      "Name 3 professions that wear uniforms!",
      "Name 3 things you do immediately after waking up!",
      "Name 3 things you do right before going to sleep!",
      "Name 3 items you bring to the beach!",
      "Name 3 countries in the Americas!",
      "Name 3 living things that can fly!"
],
    'ja': [
      "ピザのトッピング3つ！",
      "ヨーロッパの国3つ！",
      "人気のビデオゲーム3つ！",
      "黄色い果物3つ！",
      "アイスクリームの味3つ！",
      "お風呂場にあるもの3つ！",
      "スーパーヒーロー映画3つ！",
      "楽器3つ！",
      "ファストフード店3つ！",
      "遅刻の言い訳3つ！",
      "動物園にいる動物3つ！",
      "タイヤのついた乗り物3つ！",
      "学校の教科3つ！",
      "オリンピックの競技3つ！",
      "冬に着る防寒具3つ！",
      "朝ごはんに食べるもの3つ！",
      "有名なアニメキャラクター3つ！",
      "ボードゲーム3つ！",
      "ピザ屋の名前3つ！",
      "コンセントに挿して使う家電3つ！"
],
  },

  'anonymous_party_30': {
    'en': [
      "Who in our group seems most different on the outside vs on the inside?",
      "Who would be the very first person to give up survival on a deserted island?",
      "Who would secretly disappear and cut contact after winning a $10M lottery?",
      "Who would be the very first person to get infected in a sudden zombie apocalypse?",
      "Who spends the most obsessive amount of time checking their appearance in mirrors?",
      "Who has the most bizarre and chaotic habits after having a few drinks?",
      "Who is most likely to get dumped within 3 minutes on a blind date?",
      "Who has the most embarrassing, unreleased photos in their smartphone photo gallery?",
      "Who takes the longest time to reply, leaving messages on read or unread for days?",
      "Who among us will end up being the richest person 10 years from now?",
      "Who gets the most furiously salty and slams their desk while losing in games?",
      "Who sings or talks to themselves the most when their Discord microphone is left on?",
      "Who is the most completely whipped and submissive when dating someone?",
      "Who is the absolute worst at asking for their borrowed money back from friends?",
      "Who would be the most awkward person to travel with on a 1-on-1 weekend trip?",
      "Who is most likely to leak a top secret within one hour of hearing it?",
      "Who got scolded the most by teachers back in their school days?",
      "Who would secretly go to karaoke alone and belt emotional ballads for 3 hours?",
      "Who is most likely to succumb and order late-night snacks at 3:30 AM?",
      "Who has the highest pile of completely useless gadgets in their online shopping cart?",
      "Who acts tough in front of friends but is secretly the biggest coward inside?",
      "Who cries the most easily while watching sentimental movies or dramas?",
      "Who turns into a completely aggressive, road-raging maniac once behind the steering wheel?",
      "Who possesses the most experimental, bizarre, and incomprehensible fashion sense?",
      "Who is the ultimate master of fake corporate smiles and soulless compliments?",
      "Who gives world-class relationship advice to friends but is completely hopeless in their own love life?",
      "Who is so terrified of horror movies that they watch through their fingers with eyes covered?",
      "Who commits the most embarrassing verbal slip-ups during everyday conversations?",
      "Who would immediately switch sides and collaborate with aliens if they invaded Earth?",
      "Who would celebrate with the most obnoxious, theatrical victory dance after winning MVP today?"
],
    'ja': [
      "この中で一番「表と裏の顔」が違いそうな人は？",
      "無人島に漂流したら一番最初に生き残るのを諦めそうな人は？",
      "宝くじで10億円当たったら誰にも言わずに音信不通になりそうな人は？",
      "もしゾンビパニックが起きたら真っ先に噛まれてゾンビ化しそうな人は？",
      "鏡を見る回数や身だしなみに一番うるさそうな人は？",
      "お酒を飲んだら一番奇想天外な酒癖を発揮しそうな人は？",
      "合コンやマッチングアプリで開始3分で振られそうな人は？",
      "スマホの写真フォルダに一番人に見せられない黒歴史がありそうな人は？",
      "普段LINEやDiscordの返信が一番遅い（既読スルー・未読スルー）人は？",
      "10年後に一番お金持ちになっていそうな人は？"
],
  },

  'story_party_topics': {
    'en': {
      "topics": [
            "The single most embarrassing, cringe-worthy moment of your entire life",
            "The funniest, most chaotic school memory that still makes you laugh out loud",
            "The creepiest, inexplicable real-life ghost or uncanny experience you ever had",
            "The absolute worst, most catastrophic date experience you have ever endured",
            "The biggest, most elaborate lie you ever successfully pulled off on your parents",
            "The most ridiculous, wasteful purchase you ever made with your own money",
            "Your wildest, most unbelievable late-night party or drunken misadventure",
            "The most painfully awkward encounter you ever had with a stranger or ex",
            "Your deepest, funniest childhood secret that you have never told anyone here",
            "A time you acted extremely confident and failed in the most spectacular fashion",
            "The funniest incident that ever happened to you on an open Discord voice call",
            "The most absurd, petty argument you ever had with a friend or family member",
            "A guilty-pleasure song, show, or obsession that you secretly adore",
            "The closest you ever came to getting caught red-handed doing something foolish",
            "The weirdest pet peeve you have that instantly drives you insane"
      ],
      "penalties": [
            "Change your Discord profile picture to a ridiculous meme chosen by the group for 24 hours",
            "Sing the dramatic chorus of an energetic pop song out loud into your microphone right now",
            "Send \"I love you all so much\" into an active group chat with zero context",
            "Drink a full large glass of ice-cold water in one continuous chug",
            "Speak exclusively in a theatrical dramatic whisper for the next 2 full game rounds",
            "Give every single player in the room one completely sincere, heartfelt compliment",
            "Turn on your camera or mic and do 10 energetic jumping jacks right now",
            "Tell your absolute worst, driest dad joke and force out a loud hysterical laugh",
            "Talk like an emotionless customer service AI robot assistant until your next turn",
            "Honestly confess your current celebrity crush and describe your dream date with them"
      ]
},
  },

  'wc_food_32': {
    'en': [
      {
            "id": 1,
            "name": "Crispy Korean Fried Chicken",
            "image": "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=800"
      },
      {
            "id": 2,
            "name": "Melty Pepperoni Pizza",
            "image": "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=800"
      },
      {
            "id": 3,
            "name": "Spicy Chewy Tteokbokki",
            "image": "https://plus.unsplash.com/premium_photo-1700161711824-1b28505a8d32?w=800"
      },
      {
            "id": 4,
            "name": "Sizzling Pork Belly BBQ (Samgyeopsal)",
            "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800"
      },
      {
            "id": 5,
            "name": "Tender Braised Pork Trotters (Jokbal)",
            "image": "https://plus.unsplash.com/premium_photo-1723575685216-6dab84c3fd23?w=800"
      },
      {
            "id": 6,
            "name": "Savory Sweet Garlic Soy Chicken",
            "image": "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=800"
      },
      {
            "id": 7,
            "name": "Fiery Seafood Jjamppong Soup",
            "image": "https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=800"
      },
      {
            "id": 8,
            "name": "Charcoal Grilled Beef Tripe (Gopchang)",
            "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?w=800"
      },
      {
            "id": 9,
            "name": "Artisan Double Bacon Cheeseburger",
            "image": "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=800"
      },
      {
            "id": 10,
            "name": "Fresh Salmon & Tuna Sushi Platter",
            "image": "https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?w=800"
      },
      {
            "id": 11,
            "name": "Crispy Sweet and Sour Pork",
            "image": "https://plus.unsplash.com/premium_photo-1669261881745-1b59cb9adcfb?w=800"
      },
      {
            "id": 12,
            "name": "Spicy Sausage Army Stew (Budaejjigae)",
            "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?w=800"
      },
      {
            "id": 13,
            "name": "Ice-Cold Buckwheat Cold Noodles (Naengmyeon)",
            "image": "https://images.unsplash.com/photo-1579576792017-054fe0e86b79?w=800"
      },
      {
            "id": 14,
            "name": "Fiery Sichuan Mala Hot Pot Bowl",
            "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?w=800"
      },
      {
            "id": 15,
            "name": "Crispy Panko Pork Cutlet (Tonkatsu)",
            "image": "https://plus.unsplash.com/premium_photo-1668618296698-a2e8e36eefeb?w=800"
      },
      {
            "id": 16,
            "name": "Creamy Bacon Carbonara Pasta",
            "image": "https://plus.unsplash.com/premium_photo-1661677825991-caa232fea9da?w=800"
      },
      {
            "id": 17,
            "name": "Golden Pan-Fried Crispy Gyoza",
            "image": "https://plus.unsplash.com/premium_photo-1673769108032-83c49135e142?w=800"
      },
      {
            "id": 18,
            "name": "Savory Braised Beef Short Ribs (Galbi-jjim)",
            "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800"
      },
      {
            "id": 19,
            "name": "Traditional Street Food Sausage (Sundae)",
            "image": "https://plus.unsplash.com/premium_photo-1748864080569-dd208970df9e?w=800"
      },
      {
            "id": 20,
            "name": "Steaming Japanese Takoyaki Balls",
            "image": "https://plus.unsplash.com/premium_photo-1722593856742-085ef5549070?w=800"
      },
      {
            "id": 21,
            "name": "Sweet Honey Hotteok & Fish Cake",
            "image": "https://plus.unsplash.com/premium_photo-1725986663003-9c55755f892f?w=800"
      },
      {
            "id": 22,
            "name": "Golden Cheesy Sweet Corn Bake",
            "image": "https://plus.unsplash.com/premium_photo-1668618296698-a2e8e36eefeb?w=800"
      },
      {
            "id": 23,
            "name": "Charcoal Spicy Chicken Feet",
            "image": "https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?w=800"
      },
      {
            "id": 24,
            "name": "Spicy Sweet Bibim Cold Noodles",
            "image": "https://plus.unsplash.com/premium_photo-1661432479675-595fc5f16219?w=800"
      },
      {
            "id": 25,
            "name": "Midnight Spicy Instant Ramen Bowl",
            "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?w=800"
      },
      {
            "id": 26,
            "name": "Steaming Dumpling Soup with Seaweed",
            "image": "https://plus.unsplash.com/premium_photo-1673769108032-83c49135e142?w=800"
      },
      {
            "id": 27,
            "name": "Loaded Melted Cheese French Fries",
            "image": "https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?w=800"
      },
      {
            "id": 28,
            "name": "Charcoal Grilled Sweet Pork Galbi",
            "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800"
      },
      {
            "id": 29,
            "name": "Crispy Sugar-Dusted Hotdog Corn Dog",
            "image": "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=800"
      },
      {
            "id": 30,
            "name": "Bubbling Soft Tofu Stew (Sundubu)",
            "image": "https://plus.unsplash.com/premium_photo-1661412855930-2936cf94e57a?w=800"
      },
      {
            "id": 31,
            "name": "Spicy Stir-Fried Pork (Jeyuk Bokkeum)",
            "image": "https://plus.unsplash.com/premium_photo-1672938855289-005faf61618d?w=800"
      },
      {
            "id": 32,
            "name": "Seafood Scallion Crispy Pancake (Pajeon)",
            "image": "https://plus.unsplash.com/premium_photo-1668618296698-a2e8e36eefeb?w=800"
      }
],
  },

  'wc_travel_16': {
    'en': [
      {
            "id": 1,
            "name": "Eiffel Tower at Sunset (Paris, France)",
            "image": "https://plus.unsplash.com/premium_photo-1719430569503-338fc89eb21f?w=800"
      },
      {
            "id": 2,
            "name": "The Ancient Colosseum (Rome, Italy)",
            "image": "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?w=800"
      },
      {
            "id": 3,
            "name": "Jungfraujoch Alpine Peak (Swiss Alps)",
            "image": "https://plus.unsplash.com/premium_photo-1673698463059-a0352efdf19a?w=800"
      },
      {
            "id": 4,
            "name": "Overwater Luxury Bungalows (Maldives)",
            "image": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=800"
      },
      {
            "id": 5,
            "name": "Sagrada Familia Cathedral (Barcelona, Spain)",
            "image": "https://plus.unsplash.com/premium_photo-1697729600773-5b03411b0585?w=800"
      },
      {
            "id": 6,
            "name": "Santorini Blue Dome Village (Greece)",
            "image": "https://plus.unsplash.com/premium_photo-1661963134706-03db9b61fd88?w=800"
      },
      {
            "id": 7,
            "name": "Neon Lights of Times Square (New York, USA)",
            "image": "https://plus.unsplash.com/premium_photo-1681803533606-96ecbbab1f95?w=800"
      },
      {
            "id": 8,
            "name": "Grand Canyon National Park (Arizona, USA)",
            "image": "https://plus.unsplash.com/premium_photo-1668799886221-c42ba5c9db9d?w=800"
      },
      {
            "id": 9,
            "name": "Senso-ji Temple & Skytree (Tokyo, Japan)",
            "image": "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=800"
      },
      {
            "id": 10,
            "name": "Fushimi Inari Red Torii Gates (Kyoto, Japan)",
            "image": "https://plus.unsplash.com/premium_photo-1661962961803-a26b6b779a5b?w=800"
      },
      {
            "id": 11,
            "name": "Great Pyramids of Giza (Cairo, Egypt)",
            "image": "https://plus.unsplash.com/premium_photo-1661962388022-f67a21f66c0d?w=800"
      },
      {
            "id": 12,
            "name": "Sydney Opera House & Harbor (Australia)",
            "image": "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?w=800"
      },
      {
            "id": 13,
            "name": "Taj Mahal Marble Palace (Agra, India)",
            "image": "https://plus.unsplash.com/premium_photo-1661885523029-fc9d732207c2?w=800"
      },
      {
            "id": 14,
            "name": "Lake Louise in Banff National Park (Canada)",
            "image": "https://plus.unsplash.com/premium_photo-1675827055694-a10aef2727f0?w=800"
      },
      {
            "id": 15,
            "name": "Machu Picchu Inca Citadel (Peru)",
            "image": "https://plus.unsplash.com/premium_photo-1675827055620-24d540e0892a?w=800"
      },
      {
            "id": 16,
            "name": "Statue of Liberty Sunset (New York, USA)",
            "image": "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?w=800"
      }
],
  },

  'wc_ramen_16': {
    'en': [
      {
            "id": 1,
            "name": "Fiery Gourmet Shin Ramyun",
            "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?w=800"
      },
      {
            "id": 2,
            "name": "Hearty Beef Broth Jin Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=800"
      },
      {
            "id": 3,
            "name": "Savory Black Bean Chapagetti",
            "image": "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?w=800"
      },
      {
            "id": 4,
            "name": "Creamy Pink Carbonara Buldak",
            "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?w=800"
      },
      {
            "id": 5,
            "name": "Rich Four-Cheese Buldak Ramyun",
            "image": "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?w=800"
      },
      {
            "id": 6,
            "name": "Classic Soul-Warming Ansungtangmyun",
            "image": "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?w=800"
      },
      {
            "id": 7,
            "name": "Toasted Sesame Egg Chamggae Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1664472752075-d5b2b3de0a88?w=800"
      },
      {
            "id": 8,
            "name": "Milky White Beef Bone Gomtang",
            "image": "https://plus.unsplash.com/premium_photo-1664472752075-d5b2b3de0a88?w=800"
      },
      {
            "id": 9,
            "name": "The Original Classic Samyang Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=800"
      },
      {
            "id": 10,
            "name": "Spicy Kimchi Broth Bowl Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?w=800"
      },
      {
            "id": 11,
            "name": "Sweet & Tangy Cold Paldo Bibimmyeon",
            "image": "https://plus.unsplash.com/premium_photo-1661432479675-595fc5f16219?w=800"
      },
      {
            "id": 12,
            "name": "Extreme Eye-Watering Teumsae Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1694708455263-e58c7aacbb19?w=800"
      },
      {
            "id": 13,
            "name": "Clear White Chicken Broth Kkokkomyeon",
            "image": "https://plus.unsplash.com/premium_photo-1664472752075-d5b2b3de0a88?w=800"
      },
      {
            "id": 14,
            "name": "Crisp Scallion & Radish Mupama Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?w=800"
      },
      {
            "id": 15,
            "name": "Deep Seafood Squid Jjamppong Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1726873221744-73e3e5e5879b?w=800"
      },
      {
            "id": 16,
            "name": "Quick Broth Thin Noodle Snack Ramen",
            "image": "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?w=800"
      }
],
  },

  'balance_legend': {
    'en': [
      {
            "id": 1,
            "optionA": "Your partner peels a sesame leaf for your best friend",
            "optionB": "Your best friend peels a sesame leaf for your partner",
            "category": "Romance / Dilemma"
      },
      {
            "id": 2,
            "optionA": "Never drink soda for the rest of your life",
            "optionB": "Never eat ramen noodles for the rest of your life",
            "category": "Food / Survival"
      },
      {
            "id": 3,
            "optionA": "Receive $10 Million but never use a smartphone again",
            "optionB": "Live freely as you are right now with your phone",
            "category": "Money / Lifestyle"
      },
      {
            "id": 4,
            "optionA": "Time travel 100 years into the past",
            "optionB": "Time travel 100 years into the future",
            "category": "Fantasy / Time"
      },
      {
            "id": 5,
            "optionA": "Survive summer without any air conditioning",
            "optionB": "Survive winter without any indoor heating",
            "category": "Physical / Weather"
      },
      {
            "id": 6,
            "optionA": "Partner who has 10 close opposite-sex friends they text daily",
            "optionB": "Partner who has 0 friends and only contacts you 24/7",
            "category": "Romance / Trust"
      },
      {
            "id": 7,
            "optionA": "Always say everything you are thinking out loud with zero filter",
            "optionB": "Never be allowed to speak again, only communicating in written text",
            "category": "Social / Life"
      },
      {
            "id": 8,
            "optionA": "Receive $1 Million right now with 100% certainty",
            "optionB": "50% chance to win $100 Million, 50% chance of receiving $0",
            "category": "Money / Probability"
      },
      {
            "id": 9,
            "optionA": "Live the rest of your life without hot water for showers",
            "optionB": "Live the rest of your life without indoor high-speed Wi-Fi",
            "category": "Comfort / Habits"
      },
      {
            "id": 10,
            "optionA": "Waking up with your browser history projected to everyone in room",
            "optionB": "Waking up with your secret diary read aloud on speaker",
            "category": "Privacy / Nightmare"
      },
      {
            "id": 11,
            "optionA": "Your best friend forgets your birthday completely",
            "optionB": "Your best friend wishes you happy birthday with the wrong name",
            "category": "Friendship"
      },
      {
            "id": 12,
            "optionA": "Living in a bustling penthouse in the middle of New York City",
            "optionB": "Living in a tranquil private island mansion with a private beach",
            "category": "Dream Home"
      },
      {
            "id": 13,
            "optionA": "Ability to fly at the speed of a bicycle",
            "optionB": "Ability to teleport anywhere, but only once per month",
            "category": "Superpower"
      },
      {
            "id": 14,
            "optionA": "Eating only spicy food for every meal for 1 whole year",
            "optionB": "Eating only completely bland, unseasoned food for 1 whole year",
            "category": "Food / Discipline"
      },
      {
            "id": 15,
            "optionA": "Knowing the exact date and time of your future demise",
            "optionB": "Knowing the exact manner and cause of your future demise",
            "category": "Fate / Mystery"
      },
      {
            "id": 16,
            "optionA": "Never having to sleep again without feeling any fatigue",
            "optionB": "Never having to work again while maintaining your current salary",
            "category": "Time / Freedom"
      },
      {
            "id": 17,
            "optionA": "Being able to speak every human language fluently",
            "optionB": "Being able to talk to and understand all animals",
            "category": "Gift / Communication"
      },
      {
            "id": 18,
            "optionA": "Having your partner see all your past text messages",
            "optionB": "Having your parents see all your past text messages",
            "category": "Secrets / Fear"
      },
      {
            "id": 19,
            "optionA": "Living without music for the rest of your life",
            "optionB": "Living without movies and TV shows for the rest of your life",
            "category": "Entertainment"
      },
      {
            "id": 20,
            "optionA": "Having permanent hiccup fits for 1 hour every morning",
            "optionB": "Sneezing 5 times consecutively every time you laugh",
            "category": "Body / Quirks"
      },
      {
            "id": 21,
            "optionA": "Win every argument you ever have, but lose friends",
            "optionB": "Always lose arguments, but be universally adored by everyone",
            "category": "Ego / Harmony"
      },
      {
            "id": 22,
            "optionA": "Sleep on a bed of ice in winter",
            "optionB": "Sleep inside a greenhouse with no fan in summer",
            "category": "Physical / Torment"
      },
      {
            "id": 23,
            "optionA": "Partner who never gets angry at all, completely emotionless",
            "optionB": "Partner who gets angry over tiny things but calms down in 10 seconds",
            "category": "Romance / Temper"
      },
      {
            "id": 24,
            "optionA": "Drink warm flat soda whenever thirsty",
            "optionB": "Eat soggy cold french fries whenever hungry",
            "category": "Food / Sacrifices"
      },
      {
            "id": 25,
            "optionA": "Forget your past completely and start fresh with a clean slate",
            "optionB": "Keep all your memories, but never be able to make new ones",
            "category": "Mind / Memory"
      },
      {
            "id": 26,
            "optionA": "Always have to yell like you are using a megaphone",
            "optionB": "Always have to speak in an inaudible, faint whisper",
            "category": "Voice / Volume"
      },
      {
            "id": 27,
            "optionA": "Be 10 minutes late to every appointment for the rest of your life",
            "optionB": "Arrive 30 minutes early to every appointment for the rest of your life",
            "category": "Punctuality"
      },
      {
            "id": 28,
            "optionA": "Partner who looks stunningly attractive but is completely unfunny",
            "optionB": "Partner who has average looks but makes you laugh until you cry daily",
            "category": "Romance / Chemistry"
      },
      {
            "id": 29,
            "optionA": "Only be allowed to wear winter puffer coats all year round",
            "optionB": "Only be allowed to wear swim shorts or beachwear all year round",
            "category": "Fashion / Survival"
      },
      {
            "id": 30,
            "optionA": "Get $50,000 every time you step on a Lego brick barefoot",
            "optionB": "Get $100 whenever you do 10 clean pushups",
            "category": "Pain vs Gain"
      }
],
  },

  'balance_workplace': {
    'en': [
      {
            "id": 1,
            "optionA": "Boss who is a micromanager but approves all pay raises generously",
            "optionB": "Boss who never talks to you but denies all promotion requests",
            "category": "Career / Boss"
      },
      {
            "id": 2,
            "optionA": "5-minute walking commute to work with $40k salary",
            "optionB": "2-hour subway commute each way with $90k salary",
            "category": "Commute vs Salary"
      },
      {
            "id": 3,
            "optionA": "Work 4 days a week for 10 hours each day",
            "optionB": "Work 5 days a week for 8 hours each day",
            "category": "Work Schedule"
      },
      {
            "id": 4,
            "optionA": "Colleague who does 0 work but is super nice and brings donuts",
            "optionB": "Colleague who does all your work flawlessly but is constantly rude",
            "category": "Coworker / Dynamics"
      },
      {
            "id": 5,
            "optionA": "Full remote work forever from home with zero office visits",
            "optionB": "Company with an Olympic pool, free gourmet buffet, and mandatory office presence",
            "category": "Office / Remote"
      },
      {
            "id": 6,
            "optionA": "Accidentally reply-all with a private meme to the CEO",
            "optionB": "Have your microphone unmuted during an all-hands call while singing",
            "category": "Office Nightmares"
      },
      {
            "id": 7,
            "optionA": "Get a 30% raise but work every single weekend",
            "optionB": "Take a 10% pay cut but never receive a single email after 5 PM",
            "category": "Work-Life Balance"
      },
      {
            "id": 8,
            "optionA": "Have a coworker who constantly talks to themselves out loud",
            "optionB": "Have a coworker who types on a super loud mechanical keyboard at 120 WPM",
            "category": "Desk Neighbor"
      },
      {
            "id": 9,
            "optionA": "Annual team retreat with forced talent shows and trust falls",
            "optionB": "Mandatory weekly after-work drinking dinners with upper management",
            "category": "Company Culture"
      },
      {
            "id": 10,
            "optionA": "Get praised publicly in front of 500 executives for work you did not do",
            "optionB": "Do heroic work that saves the company but receive zero recognition",
            "category": "Credit / Ethics"
      },
      {
            "id": 11,
            "optionA": "Colleagues discover your secret cringe Instagram finsta account",
            "optionB": "Colleagues discover your stock/crypto portfolio down -80%",
            "category": "Workplace Secrets"
      },
      {
            "id": 12,
            "optionA": "Company dinner: strictly 1 round of BBQ, go home right at 9 PM",
            "optionB": "Company dinner: free omakase sushi, but mandatory drinking until 2 AM",
            "category": "Team Dinners"
      },
      {
            "id": 13,
            "optionA": "Colleague who is capable but complains and whines every time they open their mouth",
            "optionB": "Colleague who has zero skill but endless enthusiasm, causing disasters daily",
            "category": "Teammates"
      },
      {
            "id": 14,
            "optionA": "4-day work week taking Mondays off (work Tue-Fri)",
            "optionB": "4-day work week taking Wednesdays off (break in the middle)",
            "category": "4-Day Schedule"
      },
      {
            "id": 15,
            "optionA": "4-day business trip to Jeju Island alone with the CEO",
            "optionB": "2-day overnight team retreat with 5 awkward colleagues from other teams",
            "category": "Business Trips"
      },
      {
            "id": 16,
            "optionA": "Job offer: 1.5x salary increase but double the overtime work",
            "optionB": "Stay at current job: guaranteed promotion next year with 5% raise",
            "category": "Career Decisions"
      },
      {
            "id": 17,
            "optionA": "Your manager steals full credit for your great project idea",
            "optionB": "Your manager puts only your name as responsible owner on their failed project",
            "category": "Office Politics"
      },
      {
            "id": 18,
            "optionA": "Lunch menu is always chosen by your boss with zero input",
            "optionB": "You must choose the team lunch menu every day and endure complaints",
            "category": "Lunch Drama"
      },
      {
            "id": 19,
            "optionA": "Salary paid out weekly every single Friday",
            "optionB": "Salary paid out monthly with an extra 10% performance bonus",
            "category": "Paycheck Frequency"
      },
      {
            "id": 20,
            "optionA": "Falling asleep at desk and accidentally dozing off on CEO's shoulder",
            "optionB": "Accidentally attaching your resignation letter draft to a company-wide email",
            "category": "Horrifying Mistakes"
      },
      {
            "id": 21,
            "optionA": "Roasting your toxic department head with cold hard facts on your final day",
            "optionB": "Leaving gracefully with polite smiles and handing out coffee even if wronged",
            "category": "Resignation Style"
      },
      {
            "id": 22,
            "optionA": "Freezing office where AC blasts at 18°C and you need a winter parka",
            "optionB": "Broken AC office with only electric fans blowing hot humid air in July",
            "category": "Office Climate"
      },
      {
            "id": 23,
            "optionA": "Accidentally sending a love heart emoji intended for partner into company Slack",
            "optionB": "Accidentally pasting a gossip message mocking boss's nickname into general channel",
            "category": "Slack Blunders"
      },
      {
            "id": 24,
            "optionA": "Boss who shows up with fried chicken at 10 PM while you work overtime",
            "optionB": "Boss who leaves right at 5 PM regardless of deadlines and never contacts you",
            "category": "Overtime Boss"
      },
      {
            "id": 25,
            "optionA": "Allowed 1 full hour of daydreaming / doing nothing during work hours",
            "optionB": "Work with zero breaks at 100% focus and leave work 1 hour early",
            "category": "Pacing"
      },
      {
            "id": 26,
            "optionA": "Colleagues who become your closest best friends and hang out on weekends",
            "optionB": "Strictly professional colleagues whose phone numbers you do not even know",
            "category": "Coworker Boundaries"
      },
      {
            "id": 27,
            "optionA": "Guaranteed lifetime employment at $40,000 salary with zero raises",
            "optionB": "1-year freelance contract at $100,000 salary with perpetual renewal stress",
            "category": "Job Security"
      },
      {
            "id": 28,
            "optionA": "Receiving a weekend Kakao message from CEO starting with \"Not urgent, but...\"",
            "optionB": "Receiving a loud wake-up phone call from boss at 6:00 AM on weekdays",
            "category": "Off-Hours Calls"
      },
      {
            "id": 29,
            "optionA": "Office restroom is a 5-star hotel luxury suite with high-tech bidets",
            "optionB": "Office pantry has Starbucks espresso bean machine and unlimited gourmet snacks",
            "category": "Company Perks"
      },
      {
            "id": 30,
            "optionA": "Win $10M lottery and dramatically resign the very next morning",
            "optionB": "Win $10M lottery secretly and keep working as a relaxed hobby, putting bullies in their place",
            "category": "Lottery & Work"
      }
],
  },

  'balance_superpower': {
    'en': [
      {
            "id": 1,
            "optionA": "Invisibility, but only when you are completely naked",
            "optionB": "Flight, but only at the speed of an elderly person walking",
            "category": "Awkward Powers"
      },
      {
            "id": 2,
            "optionA": "Mind reading, but you hear every negative thought people have of you",
            "optionB": "Future sight, but you can only see bad news 24 hours in advance",
            "category": "Cursed Knowledge"
      },
      {
            "id": 3,
            "optionA": "Super strength, but you break everything you touch if emotional",
            "optionB": "Super speed, but you have zero brakes and crash frequently",
            "category": "Control Issues"
      },
      {
            "id": 4,
            "optionA": "Never aging physically past 25, but everyone you love ages normally",
            "optionB": "Aging twice as fast, but with the genius intellect of Einstein",
            "category": "Immortality vs Mortality"
      },
      {
            "id": 5,
            "optionA": "Ability to pause time for 10 minutes once per day",
            "optionB": "Ability to rewind time by 30 seconds as often as you want",
            "category": "Time Manipulation"
      },
      {
            "id": 6,
            "optionA": "Ability to fluently speak with and understand all animals",
            "optionB": "Ability to hack and control all computers and electronics with your mind",
            "category": "Communication"
      },
      {
            "id": 7,
            "optionA": "Complete invulnerability to all physical injury and disease (feel pain though)",
            "optionB": "Instant 1-second regeneration to heal any wound or illness completely",
            "category": "Body Powers"
      },
      {
            "id": 8,
            "optionA": "Unlimited \"Undo\" button that rewinds reality 10 seconds back",
            "optionB": "Clairvoyance that lets you glimpse the exact events 10 minutes into the future",
            "category": "Time Control"
      },
      {
            "id": 9,
            "optionA": "Any dish you crave instantly manifests piping hot in front of you",
            "optionB": "Any designer luxury clothes you desire instantly appear in your closet",
            "category": "Manifestation"
      },
      {
            "id": 10,
            "optionA": "Breathe underwater and explore the ocean depths without equipment",
            "optionB": "Fly freely through outer space without a spacesuit and stargaze up close",
            "category": "Exploration"
      },
      {
            "id": 11,
            "optionA": "Pause world time for 1 full hour out of every 24 hours",
            "optionB": "Accelerate your physical movement and reflexes to 10x normal speed",
            "category": "Speed & Time"
      },
      {
            "id": 12,
            "optionA": "Shapeshift flawlessly into the appearance of any person you choose",
            "optionB": "Transform into any inanimate object at will (sports car, smartphone)",
            "category": "Shapeshifting"
      },
      {
            "id": 13,
            "optionA": "Never need to sleep while always maintaining 100% peak energy",
            "optionB": "Never need to eat while always feeling 100% nourished and satisfied",
            "category": "Biology"
      },
      {
            "id": 14,
            "optionA": "World #1 esports champion skill in any video game you touch",
            "optionB": "100% accurate sixth sense on whether any stock will rise or fall tomorrow",
            "category": "Talent & Wealth"
      },
      {
            "id": 15,
            "optionA": "Upon death, reincarnate into your 10-year-old self with all memories intact",
            "optionB": "Instantly reset your current physical age and looks back to age 20 right now",
            "category": "Reincarnation"
      },
      {
            "id": 16,
            "optionA": "Summon and manipulate blazing fire from your fingertips at will",
            "optionB": "Summon and manipulate freezing ice and blizzards from your fingertips at will",
            "category": "Elemental Mastery"
      },
      {
            "id": 17,
            "optionA": "Irresistible charm aura that makes everyone instantly like and trust you",
            "optionB": "Commanding charisma aura that makes everyone revere and respect you",
            "category": "Social Aura"
      },
      {
            "id": 18,
            "optionA": "Touch any textbook or book to instantly memorize 100% of its content",
            "optionB": "Possess Captain America-level superhero physique without any workouts",
            "category": "Mind vs Physique"
      },
      {
            "id": 19,
            "optionA": "Snap your fingers to have your entire home cleaned and laundry done in 1 sec",
            "optionB": "Snap your fingers to instantly charge all your electronic devices to 100%",
            "category": "Convenience"
      },
      {
            "id": 20,
            "optionA": "Be loved deeply by 100 people vs Be admired from afar by 1,000,000 fans",
            "optionB": "Spend eternity with the single person who is your true soulmate",
            "category": "Love & Admiration"
      },
      {
            "id": 21,
            "optionA": "Reduce the physical weight of any object to 0 to lift it effortlessly",
            "optionB": "Phase through solid walls and obstacles as if they were thin air",
            "category": "Physics Defiance"
      },
      {
            "id": 22,
            "optionA": "Possess the collective knowledge of every library on Earth in your brain",
            "optionB": "Master every martial art and combat discipline as the ultimate human weapon",
            "category": "Scholar vs Warrior"
      },
      {
            "id": 23,
            "optionA": "Control the weather at will (rain, snow, sunny, rainbows)",
            "optionB": "100% prevent and neutralize all natural disasters (earthquakes, tsunamis)",
            "category": "Weather Control"
      },
      {
            "id": 24,
            "optionA": "Transport into your favorite anime or movie world and live there permanently",
            "optionB": "Summon your favorite fictional protagonist into the real world as your best friend",
            "category": "Fiction & Reality"
      },
      {
            "id": 25,
            "optionA": "Shed tears of 99.9% pure sparkling diamond gems whenever you cry",
            "optionB": "Perspire pure 24-karat gold dust whenever you sweat during exercise",
            "category": "Alchemy"
      },
      {
            "id": 26,
            "optionA": "Experience 100% lucid dreams where you control everything like reality",
            "optionB": "Enter into other people's dreams at night, hang out, and leave secret messages",
            "category": "Dream Realm"
      },
      {
            "id": 27,
            "optionA": "Swap souls and bodies with any person of your choice for 24 hours",
            "optionB": "Summon 3 exact clones of yourself to work your job and do chores for you",
            "category": "Doppelganger"
      },
      {
            "id": 28,
            "optionA": "Eyes of Truth: See a glowing red aura whenever anyone tells a lie",
            "optionB": "Eyes of Death: See a countdown timer of remaining lifespan above people's heads",
            "category": "Mystic Eyes"
      },
      {
            "id": 29,
            "optionA": "Complete biological immunity to every known virus, poison, and toxin",
            "optionB": "Perpetual comfortable body temperature with immunity to heat waves and freezing cold",
            "category": "Immunity"
      },
      {
            "id": 30,
            "optionA": "Gain godlike superpowers, but be permanently banned from internet/smartphones",
            "optionB": "Remain an ordinary human, but receive $100 Million cash deposited into your bank",
            "category": "Ultimate Choice"
      }
],
  },

  'zoom_daily_objects': {
    'en': [
      {
            "id": 1,
            "answer": "Pizza",
            "aliases": [
                  "pizza",
                  "pepperoni pizza"
            ],
            "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80",
            "focusX": 45,
            "focusY": 55
      },
      {
            "id": 2,
            "answer": "Apple",
            "aliases": [
                  "apple",
                  "red apple"
            ],
            "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
            "focusX": 60,
            "focusY": 40
      },
      {
            "id": 3,
            "answer": "Smartphone",
            "aliases": [
                  "smartphone",
                  "phone",
                  "cellphone",
                  "mobile phone"
            ],
            "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
            "focusX": 48,
            "focusY": 50
      },
      {
            "id": 4,
            "answer": "Basketball",
            "aliases": [
                  "basketball",
                  "ball"
            ],
            "image": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 40
      },
      {
            "id": 5,
            "answer": "Coffee Cup",
            "aliases": [
                  "coffee",
                  "coffee cup",
                  "mug"
            ],
            "image": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 30
      },
      {
            "id": 6,
            "answer": "Keyboard",
            "aliases": [
                  "keyboard",
                  "computer keyboard"
            ],
            "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 7,
            "answer": "Jeans",
            "aliases": [
                  "jeans",
                  "denim",
                  "pants"
            ],
            "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80",
            "focusX": 45,
            "focusY": 55
      },
      {
            "id": 8,
            "answer": "Tennis Ball",
            "aliases": [
                  "tennis ball",
                  "ball"
            ],
            "image": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 9,
            "answer": "Strawberry",
            "aliases": [
                  "strawberry",
                  "berries"
            ],
            "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 10,
            "answer": "Hamburger",
            "aliases": [
                  "burger",
                  "hamburger",
                  "cheeseburger"
            ],
            "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 11,
            "answer": "Apple",
            "aliases": [
                  "green apple",
                  "red apple",
                  "apple"
            ],
            "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 12,
            "answer": "Cheeseburger",
            "aliases": [
                  "burger",
                  "hamburger",
                  "cheeseburger"
            ],
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 13,
            "answer": "Tiger",
            "aliases": [
                  "tiger",
                  "big cat"
            ],
            "image": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 45
      },
      {
            "id": 14,
            "answer": "Soccer Ball",
            "aliases": [
                  "football",
                  "soccer ball",
                  "ball"
            ],
            "image": "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 15,
            "answer": "Sunglasses",
            "aliases": [
                  "sunglasses",
                  "shades",
                  "glasses"
            ],
            "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 16,
            "answer": "Bicycle",
            "aliases": [
                  "bike",
                  "bicycle",
                  "cycle"
            ],
            "image": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 17,
            "answer": "Guitar",
            "aliases": [
                  "guitar",
                  "acoustic guitar"
            ],
            "image": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80",
            "focusX": 45,
            "focusY": 50
      },
      {
            "id": 18,
            "answer": "Airplane",
            "aliases": [
                  "airplane",
                  "plane",
                  "aircraft"
            ],
            "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 19,
            "answer": "Popcorn",
            "aliases": [
                  "popcorn",
                  "corn"
            ],
            "image": "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 20,
            "answer": "Chocolate",
            "aliases": [
                  "chocolate",
                  "candy bar"
            ],
            "image": "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 21,
            "answer": "Watermelon",
            "aliases": [
                  "watermelon",
                  "melon"
            ],
            "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 22,
            "answer": "Wristwatch",
            "aliases": [
                  "watch",
                  "wristwatch",
                  "clock"
            ],
            "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 23,
            "answer": "Smartphone",
            "aliases": [
                  "smartphone",
                  "iphone",
                  "galaxy",
                  "phone"
            ],
            "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 24,
            "answer": "Headphones",
            "aliases": [
                  "headphones",
                  "headset",
                  "earphones"
            ],
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      },
      {
            "id": 25,
            "answer": "Piano",
            "aliases": [
                  "piano",
                  "keyboard"
            ],
            "image": "https://images.unsplash.com/photo-1520523839898-507125cd53c1?w=800&auto=format&fit=crop&q=80",
            "focusX": 50,
            "focusY": 50
      }
],
  },

  'trivia_elementary': {
    'en': [
      {
            "question": "What is the capital city of Australia?",
            "options": [
                  "Sydney",
                  "Canberra",
                  "Melbourne",
                  "Brisbane"
            ],
            "answerIndex": 1,
            "explanation": "Canberra was chosen in 1908 as the compromise capital between Sydney and Melbourne."
      },
      {
            "question": "Which planet in our solar system is famously known as the Red Planet?",
            "options": [
                  "Venus",
                  "Mars",
                  "Jupiter",
                  "Mercury"
            ],
            "answerIndex": 1,
            "explanation": "Mars appears reddish because of the abundance of iron oxide (rust) on its dusty surface."
      },
      {
            "question": "How many confirmed chemical elements are on the modern periodic table?",
            "options": [
                  "108",
                  "112",
                  "118",
                  "124"
            ],
            "answerIndex": 2,
            "explanation": "The periodic table has exactly 118 verified elements, ending with Oganesson."
      },
      {
            "question": "What is the fastest land animal on Earth over short sprint distances?",
            "options": [
                  "Cheetah",
                  "Pronghorn Antelope",
                  "African Lion",
                  "Greyhound"
            ],
            "answerIndex": 0,
            "explanation": "The cheetah can reach sprint speeds of up to 120 km/h (75 mph)."
      },
      {
            "question": "Which ocean is the largest and deepest ocean on planet Earth?",
            "options": [
                  "Atlantic Ocean",
                  "Indian Ocean",
                  "Arctic Ocean",
                  "Pacific Ocean"
            ],
            "answerIndex": 3,
            "explanation": "The Pacific Ocean covers over 30% of Earth's surface, larger than all land combined."
      },
      {
            "question": "Who painted the world-famous Mona Lisa portrait?",
            "options": [
                  "Vincent van Gogh",
                  "Leonardo da Vinci",
                  "Pablo Picasso",
                  "Michelangelo"
            ],
            "answerIndex": 1,
            "explanation": "Leonardo da Vinci painted the Mona Lisa during the Italian Renaissance."
      },
      {
            "question": "What is the hardest natural substance known on Earth?",
            "options": [
                  "Titanium",
                  "Quartz",
                  "Diamond",
                  "Tungsten"
            ],
            "answerIndex": 2,
            "explanation": "Diamond scores a maximum 10 on the Mohs scale of mineral hardness."
      },
      {
            "question": "Which vital human organ is primarily responsible for pumping blood throughout the body?",
            "options": [
                  "Lungs",
                  "Liver",
                  "Heart",
                  "Kidneys"
            ],
            "answerIndex": 2,
            "explanation": "The human heart beats roughly 100,000 times a day to sustain blood flow."
      },
      {
            "question": "What is the largest living mammal currently found in the world?",
            "options": [
                  "African Bush Elephant",
                  "Blue Whale",
                  "Colossal Squid",
                  "Giraffe"
            ],
            "answerIndex": 1,
            "explanation": "The Blue Whale can reach weights of up to 200 tons and lengths of nearly 30 meters."
      },
      {
            "question": "In which country are the ancient Great Pyramids of Giza located?",
            "options": [
                  "Greece",
                  "Peru",
                  "Egypt",
                  "Mexico"
            ],
            "answerIndex": 2,
            "explanation": "The Great Pyramids were built along the Nile River in Egypt as royal tombs."
      },
      {
            "question": "How many hours are there in one complete standard Earth day?",
            "options": [
                  "12 hours",
                  "24 hours",
                  "36 hours",
                  "48 hours"
            ],
            "answerIndex": 1,
            "explanation": "Earth rotates once on its axis roughly every 24 hours."
      },
      {
            "question": "Excluding wisdom teeth, how many permanent teeth does a typical adult human have?",
            "options": [
                  "20 teeth",
                  "24 teeth",
                  "28 teeth",
                  "36 teeth"
            ],
            "answerIndex": 2,
            "explanation": "A full set of adult human teeth without wisdom teeth consists of 28 teeth."
      },
      {
            "question": "What is the first and outermost color seen in a typical natural rainbow spectrum?",
            "options": [
                  "Red",
                  "Yellow",
                  "Green",
                  "Violet"
            ],
            "answerIndex": 0,
            "explanation": "Rainbow colors follow ROYGBIV: Red, Orange, Yellow, Green, Blue, Indigo, Violet."
      },
      {
            "question": "Which famous admiral invented the ironclad Turtle Ship (Geobukseon)?",
            "options": [
                  "Admiral Nelson",
                  "Admiral Yi Sun-sin",
                  "General MacArthur",
                  "Napoleon Bonaparte"
            ],
            "answerIndex": 1,
            "explanation": "Admiral Yi Sun-sin engineered the legendary armor-plated Turtle Ships."
      },
      {
            "question": "What is the scientific term for a solid substance turning directly into a liquid?",
            "options": [
                  "Freezing",
                  "Melting (Fusion)",
                  "Vaporization",
                  "Sublimation"
            ],
            "answerIndex": 1,
            "explanation": "Melting, or fusion, is the phase transition from solid state to liquid state."
      }
],
  },

  'trivia_middle': {
    'en': [
      {
            "question": "What is the chemical symbol for Gold on the periodic table of elements?",
            "options": [
                  "Ag",
                  "Au",
                  "Fe",
                  "Gd"
            ],
            "answerIndex": 1,
            "explanation": "Au originates from the Latin word \"Aurum\", signifying \"shining dawn\"."
      },
      {
            "question": "In what year did Neil Armstrong become the first human to step onto the Moon?",
            "options": [
                  "1965",
                  "1969",
                  "1972",
                  "1959"
            ],
            "answerIndex": 1,
            "explanation": "Apollo 11 landed on the lunar surface on July 20, 1969."
      },
      {
            "question": "Which atmospheric gas accounts for approximately 78% of Earth's breathable atmosphere?",
            "options": [
                  "Oxygen",
                  "Carbon Dioxide",
                  "Nitrogen",
                  "Argon"
            ],
            "answerIndex": 2,
            "explanation": "Nitrogen comprises roughly 78% of Earth's dry atmosphere, while oxygen is 21%."
      },
      {
            "question": "What is the official currency used across the United Kingdom?",
            "options": [
                  "Euro",
                  "British Pound Sterling",
                  "Swiss Franc",
                  "Crown"
            ],
            "answerIndex": 1,
            "explanation": "The British Pound Sterling (GBP) is the official legal tender of the UK."
      },
      {
            "question": "Which of the following is traditionally recognized as the longest river in the world?",
            "options": [
                  "Amazon River",
                  "Nile River",
                  "Yangtze River",
                  "Mississippi River"
            ],
            "answerIndex": 1,
            "explanation": "The Nile stretches about 6,650 km (4,132 miles) through northeast Africa."
      },
      {
            "question": "Which historical leader unified the Three Kingdoms of ancient Korea in 676 AD?",
            "options": [
                  "King Munmu",
                  "King Jinheung",
                  "King Muyeol",
                  "Queen Seondeok"
            ],
            "answerIndex": 0,
            "explanation": "King Munmu of Silla successfully concluded the unification wars in 676 AD."
      },
      {
            "question": "What biological process allows green plants to convert sunlight into glucose energy?",
            "options": [
                  "Cellular Respiration",
                  "Photosynthesis",
                  "Transpiration",
                  "Fermentation"
            ],
            "answerIndex": 1,
            "explanation": "Chloroplasts absorb photons to produce sugars through photosynthesis."
      },
      {
            "question": "According to Article 1 of many democratic constitutions, what form of government is established?",
            "options": [
                  "Democratic Republic",
                  "Constitutional Monarchy",
                  "Federation",
                  "Oligarchy"
            ],
            "answerIndex": 0,
            "explanation": "Most modern representative democracies declare themselves Democratic Republics."
      },
      {
            "question": "Approximately what is the speed of light traveling through a vacuum?",
            "options": [
                  "30,000 km/s",
                  "300,000 km/s",
                  "3,000,000 km/s",
                  "30,000,000 km/s"
            ],
            "answerIndex": 1,
            "explanation": "Light travels at approximately 299,792 km/s (roughly 300,000 km/s)."
      },
      {
            "question": "Which theorem states that in a right triangle, a² + b² = c²?",
            "options": [
                  "Pythagorean Theorem",
                  "Euclidean Theorem",
                  "Fermat's Theorem",
                  "Thales's Theorem"
            ],
            "answerIndex": 0,
            "explanation": "The Pythagorean theorem relates the lengths of legs and hypotenuse in right triangles."
      },
      {
            "question": "What was the elite aristocratic youth warrior corps in the ancient Silla kingdom?",
            "options": [
                  "Hwarangdo",
                  "Samgukji",
                  "Byelmuban",
                  "Hwarang"
            ],
            "answerIndex": 3,
            "explanation": "The Hwarang (Flower Boys) were trained in martial arts, poetry, and philosophy."
      },
      {
            "question": "What type of magnetic force causes identical poles (e.g. North and North) to push apart?",
            "options": [
                  "Attractive Force",
                  "Repulsive Force",
                  "Frictional Force",
                  "Gravitational Force"
            ],
            "answerIndex": 1,
            "explanation": "Like magnetic poles repel each other via repulsive magnetic force."
      },
      {
            "question": "What is the largest geographical island in the world that is not a continent?",
            "options": [
                  "Greenland",
                  "Madagascar",
                  "Borneo",
                  "New Guinea"
            ],
            "answerIndex": 0,
            "explanation": "Greenland is the world's largest island with an area of over 2.1 million km²."
      },
      {
            "question": "What fundamental subatomic structure consists of a nucleus surrounded by orbiting electrons?",
            "options": [
                  "Molecule",
                  "Atom",
                  "Ion",
                  "Cell"
            ],
            "answerIndex": 1,
            "explanation": "The atom is the basic building block of chemical elements."
      },
      {
            "question": "How many degrees do the internal angles of any Euclidean triangle always sum up to?",
            "options": [
                  "90 degrees",
                  "180 degrees",
                  "270 degrees",
                  "360 degrees"
            ],
            "answerIndex": 1,
            "explanation": "The interior angles of any triangle in flat geometry always total 180 degrees."
      }
],
  },

  'trivia_adult': {
    'en': [
      {
            "question": "Which treaty signed in 1919 officially brought an end to World War I?",
            "options": [
                  "Treaty of Versailles",
                  "Treaty of Paris",
                  "Geneva Convention",
                  "Treaty of Utrecht"
            ],
            "answerIndex": 0,
            "explanation": "The Treaty of Versailles was formally signed in the Hall of Mirrors in France in 1919."
      },
      {
            "question": "Who published the groundbreaking General Theory of Relativity in 1915?",
            "options": [
                  "Isaac Newton",
                  "Albert Einstein",
                  "Niels Bohr",
                  "Max Planck"
            ],
            "answerIndex": 1,
            "explanation": "Albert Einstein demonstrated that gravity is the curvature of spacetime caused by mass."
      },
      {
            "question": "What is the largest organ of the human body by total surface area and weight?",
            "options": [
                  "Liver",
                  "Brain",
                  "Skin (Integumentary)",
                  "Large Intestine"
            ],
            "answerIndex": 2,
            "explanation": "Human skin weighs about 16% of total body mass and covers up to 2 square meters."
      },
      {
            "question": "What does the abbreviation CPU stand for in computer hardware architecture?",
            "options": [
                  "Central Power Unit",
                  "Central Processing Unit",
                  "Core Processing Utility",
                  "Compute Program User"
            ],
            "answerIndex": 1,
            "explanation": "The Central Processing Unit (CPU) executes instructions comprising a computer program."
      },
      {
            "question": "Which continent is NOT represented by any of the 5 Olympic Rings?",
            "options": [
                  "Asia",
                  "Europe",
                  "Antarctica",
                  "Africa"
            ],
            "answerIndex": 2,
            "explanation": "The 5 rings symbolize the inhabited continents: Africa, Americas, Asia, Europe, Oceania."
      },
      {
            "question": "Which animal symbolizes a declining, pessimistic financial market trend?",
            "options": [
                  "Bull",
                  "Bear",
                  "Wolf",
                  "Eagle"
            ],
            "answerIndex": 1,
            "explanation": "A falling market is termed a \"Bear Market\", while a rising market is a \"Bull Market\"."
      },
      {
            "question": "What is the standard constitutional term length for a member of the US House of Representatives?",
            "options": [
                  "2 years",
                  "4 years",
                  "6 years",
                  "8 years"
            ],
            "answerIndex": 0,
            "explanation": "US House Representatives serve 2-year terms, while US Senators serve 6-year terms."
      },
      {
            "question": "Which of the following is NOT one of the three primary commercial coffee species?",
            "options": [
                  "Arabica",
                  "Robusta",
                  "Liberica",
                  "Geisha"
            ],
            "answerIndex": 3,
            "explanation": "The 3 primary species are Arabica, Robusta, and Liberica; Geisha is a cultivar of Arabica."
      },
      {
            "question": "Who was the second astronaut to step onto the surface of the Moon during Apollo 11?",
            "options": [
                  "Buzz Aldrin",
                  "Michael Collins",
                  "Yuri Gagarin",
                  "Alan Shepard"
            ],
            "answerIndex": 0,
            "explanation": "Buzz Aldrin walked on the Moon roughly 19 minutes after mission commander Neil Armstrong."
      },
      {
            "question": "Which human blood type is considered the universal red blood cell donor?",
            "options": [
                  "Type A",
                  "Type B",
                  "Type O Negative",
                  "Type AB Positive"
            ],
            "answerIndex": 2,
            "explanation": "Type O negative red blood cells lack A, B, and Rh antigens, making them universally compatible."
      },
      {
            "question": "What economic phenomenon occurs when high inflation combines with stagnant economic growth?",
            "options": [
                  "Stagflation",
                  "Deflation",
                  "Recession",
                  "Hyperinflation"
            ],
            "answerIndex": 0,
            "explanation": "Stagflation portmanteaus stagnation and inflation, posing difficult dilemmas for monetary policy."
      },
      {
            "question": "In the web URL security protocol \"https://\", what does the \"s\" specifically designate?",
            "options": [
                  "Speed",
                  "Secure (SSL/TLS)",
                  "Server",
                  "System"
            ],
            "answerIndex": 1,
            "explanation": "The \"s\" stands for Secure, indicating cryptographic encryption via SSL/TLS."
      },
      {
            "question": "Which famous river flows right through the historic heart of Paris, France?",
            "options": [
                  "Thames",
                  "Seine",
                  "Danube",
                  "Rhine"
            ],
            "answerIndex": 1,
            "explanation": "The Seine River winds 777 kilometers through northern France, dividing Paris into Left and Right Banks."
      },
      {
            "question": "Which iconic 9-story wooden pagoda at Hwangnyongsa was destroyed during Mongol invasions?",
            "options": [
                  "Hwangnyongsa 9-story Pagoda",
                  "Dabotap",
                  "Mireuksa Stone Pagoda",
                  "Seokgatap"
            ],
            "answerIndex": 0,
            "explanation": "Constructed in 645 AD, Hwangnyongsa pagoda was tragically burned down in 1238 AD."
      },
      {
            "question": "What is the name of the international standard metric system created in 1960?",
            "options": [
                  "Imperial Units",
                  "International System of Units (SI)",
                  "CGS System",
                  "Planck Units"
            ],
            "answerIndex": 1,
            "explanation": "The International System of Units (SI) is the modern metric standard used across science globally."
      }
],
  },

  'trivia_professor': {
    'en': [
      {
            "question": "What is the precise theoretical value of absolute zero temperature in Celsius?",
            "options": [
                  "-273.15 °C",
                  "-250.00 °C",
                  "-300.15 °C",
                  "-212.00 °C"
            ],
            "answerIndex": 0,
            "explanation": "Absolute zero corresponds to 0 Kelvin or exactly -273.15 °C where thermodynamic entropy vanishes."
      },
      {
            "question": "Which mathematical Millennium Prize Problem was solved by Grigori Perelman in 2003?",
            "options": [
                  "Riemann Hypothesis",
                  "Poincaré Conjecture",
                  "P vs NP Problem",
                  "Navier-Stokes Existence"
            ],
            "answerIndex": 1,
            "explanation": "Grigori Perelman proved Thurston's geometrization conjecture, resolving the century-old Poincaré conjecture."
      },
      {
            "question": "What game-theoretic concept describes a state where no player gains by unilaterally changing strategy?",
            "options": [
                  "Pareto Optimality",
                  "Nash Equilibrium",
                  "Invisible Hand",
                  "Keynesian Equilibrium"
            ],
            "answerIndex": 1,
            "explanation": "Formulated by John Nash, a Nash equilibrium represents mutual best response strategies."
      },
      {
            "question": "Which of the following is NOT one of the three periods of the Mesozoic Era?",
            "options": [
                  "Triassic",
                  "Jurassic",
                  "Cretaceous",
                  "Cambrian"
            ],
            "answerIndex": 3,
            "explanation": "The Cambrian period belongs to the early Paleozoic Era, preceding the Mesozoic by over 250 million years."
      },
      {
            "question": "Which French physician proposed the design of the Guillotine as a humane execution device?",
            "options": [
                  "Joseph-Ignace Guillotin",
                  "Maximilien Robespierre",
                  "Georges Danton",
                  "Jean-Paul Marat"
            ],
            "answerIndex": 0,
            "explanation": "Dr. Joseph-Ignace Guillotin advocated for an egalitarian, painless mechanical method of capital punishment."
      },
      {
            "question": "For which specific discovery was Albert Einstein awarded the 1921 Nobel Prize in Physics?",
            "options": [
                  "Special Relativity",
                  "General Relativity",
                  "Photoelectric Effect",
                  "Brownian Motion"
            ],
            "answerIndex": 2,
            "explanation": "Einstein received the Nobel Prize for his law of the photoelectric effect, proving light quantization."
      },
      {
            "question": "In Dante's Inferno, which three traitors are eternally chewed in Lucifer's three mouths?",
            "options": [
                  "Judas, Brutus, and Cassius",
                  "Nero, Pontius Pilate, and Judas",
                  "Cain, Judas, and Mordred",
                  "Brutus, Cassius, and Antony"
            ],
            "answerIndex": 0,
            "explanation": "Dante placed Judas Iscariot (betrayer of Christ) and Brutus & Cassius (betrayers of Caesar) in the 9th circle."
      },
      {
            "question": "In computability theory, what classic decision problem did Alan Turing prove undecidable in 1936?",
            "options": [
                  "P versus NP",
                  "The Halting Problem",
                  "Seven Bridges of Königsberg",
                  "Post Correspondence Problem"
            ],
            "answerIndex": 1,
            "explanation": "Turing proved that no general algorithm can determine whether an arbitrary program will halt or loop indefinitely."
      },
      {
            "question": "Which mineral serves as the benchmark definition for a rating of 10 on Mohs hardness scale?",
            "options": [
                  "Corundum (Ruby)",
                  "Diamond",
                  "Topaz",
                  "Quartz"
            ],
            "answerIndex": 1,
            "explanation": "Diamond defines the apex rating 10 of Mohs relative hardness due to its covalent carbon lattice."
      },
      {
            "question": "Which region of the human cerebral cortex is primarily involved in speech production and articulation?",
            "options": [
                  "Broca's Area",
                  "Wernicke's Area",
                  "Hippocampus",
                  "Amygdala"
            ],
            "answerIndex": 0,
            "explanation": "Broca's area in the frontal lobe directs speech production; Wernicke's area is responsible for comprehension."
      },
      {
            "question": "According to the Second Law of Thermodynamics, which physical quantity never decreases in an isolated system?",
            "options": [
                  "Enthalpy",
                  "Entropy",
                  "Gibbs Free Energy",
                  "Kinetic Energy"
            ],
            "answerIndex": 1,
            "explanation": "Entropy, a measure of molecular disorder and unavailable thermal energy, always increases or stays constant."
      },
      {
            "question": "Which Prague-born existentialist author wrote the classic novellas The Metamorphosis and The Trial?",
            "options": [
                  "Franz Kafka",
                  "Albert Camus",
                  "Jean-Paul Sartre",
                  "Milan Kundera"
            ],
            "answerIndex": 0,
            "explanation": "Franz Kafka created Gregor Samsa's surreal transformation into a monstrous vermin in The Metamorphosis."
      },
      {
            "question": "What mysterious repulsive cosmological entity is hypothesized to drive the accelerated expansion of the universe?",
            "options": [
                  "Dark Matter",
                  "Dark Energy",
                  "Tachyon Radiation",
                  "Quantum Vacuum Fluctuations"
            ],
            "answerIndex": 1,
            "explanation": "Dark energy constitutes roughly 68% of the total energy density of the observable universe."
      },
      {
            "question": "What groundbreaking truth did Kurt Gödel establish regarding axiomatic mathematical systems in 1931?",
            "options": [
                  "All mathematical statements can be proven",
                  "In any consistent axiomatic system, there exist unprovable true statements",
                  "Arithmetic contains inherent logical contradictions",
                  "Zero cannot be mathematically defined"
            ],
            "answerIndex": 1,
            "explanation": "Gödel's First Incompleteness Theorem demonstrated that consistency and completeness cannot coexist."
      },
      {
            "question": "While Johann Sebastian Bach is often termed the \"Father of Music\", who is often called the \"Mother of Music\"?",
            "options": [
                  "Wolfgang Amadeus Mozart",
                  "Ludwig van Beethoven",
                  "George Frideric Handel",
                  "Franz Joseph Haydn"
            ],
            "answerIndex": 2,
            "explanation": "Handel, born in Germany the same year as Bach (1685), is traditionally commemorated as the \"Mother of Music\"."
      }
],
  },

  'voice_real_meme_korean': {
    'en': [
      {
            "character": "Kim Du-han (Rustic Period)",
            "line": "Four dollars! Let's settle at four dollars!",
            "hint": "Legendary aggressive negotiation shout",
            "audioUrl": "/audio/voice-battle/saddalra.mp3"
      },
      {
            "character": "Monster Rat",
            "line": "Don't talk back! Stop talking back!",
            "hint": "High-pitched furious comedic roar",
            "audioUrl": "/audio/voice-battle/maldaeggu.mp3"
      },
      {
            "character": "Squid Game Doll",
            "line": "Red light... Green light!",
            "hint": "Chilling robotic monotone chant",
            "audioUrl": "/audio/voice-battle/squid_mugunghwa.mp3"
      },
      {
            "character": "PSY",
            "line": "Oppa Gangnam Style!",
            "hint": "Explosive party anthem signature shout",
            "audioUrl": "/audio/voice-battle/gangnam_style.mp3"
      },
      {
            "character": "Lee Byung-hun (Inside Men)",
            "line": "Let's drink a Mojito in the Maldives!",
            "hint": "Smug gravelly voice with a crooked smile",
            "audioUrl": "/audio/voice-battle/mojito.mp3"
      },
      {
            "character": "Ralo",
            "line": "Are you looking down on me?!",
            "hint": "Passionate squeaky streamer outburst",
            "audioUrl": "/audio/voice-battle/ralo_musina.mp3"
      },
      {
            "character": "Gamst",
            "line": "G-A-M-S-T Gamst in the house!",
            "hint": "Rhythmic table-slamming rap shout",
            "audioUrl": "/audio/voice-battle/gamst_injoong.mp3"
      },
      {
            "character": "Faker (T1)",
            "line": "All roads lead to me.",
            "hint": "Calm, kingly, unshakeable confidence",
            "audioUrl": "/audio/voice-battle/faker_all_roads.mp3"
      },
      {
            "character": "Kwak Cheol-yong (Tazza)",
            "line": "Did you think of me as an easy joke?!",
            "hint": "Deep veteran mobster menace",
            "audioUrl": "/audio/voice-battle/kwak_bingda.mp3"
      },
      {
            "character": "Yong-sik (Extreme Job)",
            "line": "Until now, there has never been a taste like this!",
            "hint": "Frantic chicken restaurant telephone pitch",
            "audioUrl": "/audio/voice-battle/chicken_taste.mp3"
      },
      {
            "character": "Shim Young",
            "line": "A doctor! What is this madness?!",
            "hint": "Melodramatic hospital bed revelation",
            "audioUrl": "/audio/voice-battle/kr_shimyoung_doctor.mp3"
      },
      {
            "character": "Grandma Moon-hee",
            "line": "Pumpkin sweet potato! PUMPKIN SWEET POTATO!",
            "hint": "Hysterical dining table breakdown screech",
            "audioUrl": "/audio/voice-battle/kr_sweet_potato.mp3"
      },
      {
            "character": "Chul-goo",
            "line": "Soy milk punch! Soy milk punch!",
            "hint": "Frantic streamer slap comedy roar",
            "audioUrl": "/audio/voice-battle/kr_chulgoo_punch.mp3"
      },
      {
            "character": "Mr. Geoje",
            "line": "Yaa-hooo! Looking at Geoje Island!",
            "hint": "Full-lung mountaintop echo shout",
            "audioUrl": "/audio/voice-battle/kr_geoje_yaho.mp3"
      }
],
  },

  'voice_real_games': {
    'en': [
      {
            "character": "Yasuo (League of Legends)",
            "line": "Sorye ge ton! (Last Breath)",
            "hint": "Wind-slashing ultimate katana roar",
            "audioUrl": "/audio/voice-battle/yasuo_soriegeton.mp3"
      },
      {
            "character": "Lee Sin (League of Legends)",
            "line": "Iku! (Dragon's Rage)",
            "hint": "Disciplined martial arts roundhouse strike",
            "audioUrl": "/audio/voice-battle/leesin_iku.mp3"
      },
      {
            "character": "Teemo (League of Legends)",
            "line": "Captain Teemo on duty!",
            "hint": "Innocent, squeaky, high-pitched troll scout",
            "audioUrl": "/audio/voice-battle/teemo_duty.mp3"
      },
      {
            "character": "Battlecruiser (StarCraft)",
            "line": "Battlecruiser operational.",
            "hint": "Deep robotic radio communication captain",
            "audioUrl": "/audio/voice-battle/battlecruiser_op.mp3"
      },
      {
            "character": "Ghost (StarCraft)",
            "line": "Nuclear launch detected.",
            "hint": "Cold, spine-chilling computerized warning siren",
            "audioUrl": "/audio/voice-battle/nuclear_launch.mp3"
      },
      {
            "character": "Jett (Valorant)",
            "line": "Watch this! (Blade Storm)",
            "hint": "Cocky wind-blade throwing dash",
            "audioUrl": "/audio/voice-battle/jett_watch_this.mp3"
      },
      {
            "character": "Ahri (League of Legends)",
            "line": "Shall we have some fun? (Spirit Rush)",
            "hint": "Playful and seductive nine-tailed fox giggle",
            "audioUrl": "/audio/voice-battle/ahri_charm.mp3"
      },
      {
            "character": "Siege Tank (StarCraft)",
            "line": "Ready to roll out! (Siege Mode)",
            "hint": "Heavy mechanized iron treads locking into place",
            "audioUrl": "/audio/voice-battle/siege_tank.mp3"
      },
      {
            "character": "Sova (Valorant)",
            "line": "I am the hunter! (Hunter's Fury)",
            "hint": "Resolute Russian archer firing sonic arrows",
            "audioUrl": "/audio/voice-battle/sova_hunter.mp3"
      },
      {
            "character": "SCV (StarCraft)",
            "line": "SCV good to go, sir!",
            "hint": "Energetic Southern mechanical worker drill",
            "audioUrl": "/audio/voice-battle/scv_ready.mp3"
      }
],
  },

  'voice_real_anime': {
    'en': [
      {
            "character": "Naruto",
            "line": "Rasengan! (Spiraling Sphere)",
            "hint": "Spirited shonen ninja roar",
            "audioUrl": "/audio/voice-battle/rasengan.mp3"
      },
      {
            "character": "Sasuke",
            "line": "Chidori! (One Thousand Birds)",
            "hint": "Lightning-crackling intense scream",
            "audioUrl": "/audio/voice-battle/chidori.mp3"
      },
      {
            "character": "Luffy (One Piece)",
            "line": "Gum-Gum... Pistol!",
            "hint": "Stretching rubber punch warrior shout",
            "audioUrl": "/audio/voice-battle/gomugomu_pistol.mp3"
      },
      {
            "character": "Sukuna (Jujutsu Kaisen)",
            "line": "Domain Expansion: Malevolent Shrine.",
            "hint": "Arrogant demonic king whisper",
            "audioUrl": "/audio/voice-battle/fukuma_mizushi.mp3"
      },
      {
            "character": "Kenshiro (Fist of the North Star)",
            "line": "Omae wa mou shindeiru. (You are already dead)",
            "hint": "Low, stone-cold decisive execution line",
            "audioUrl": "/audio/voice-battle/omae_wa.mp3"
      },
      {
            "character": "Dio Brando (JoJo)",
            "line": "WRYYYYYY! ZA WARUDO!",
            "hint": "Vampiric unhinged screaming laughter",
            "audioUrl": "/audio/voice-battle/dio_wryyy.mp3"
      },
      {
            "character": "Goku (Dragon Ball)",
            "line": "Kamehamehaaaaa!",
            "hint": "Cosmic energy blast gathering scream",
            "audioUrl": "/audio/voice-battle/kamehameha.mp3"
      },
      {
            "character": "Saitama (One Punch Man)",
            "line": "Consecutive Normal Punches.",
            "hint": "Completely unbothered, nonchalant deadpan delivery",
            "audioUrl": "/audio/voice-battle/normal_punches.mp3"
      },
      {
            "character": "Pikachu (Pokémon)",
            "line": "Pika... Pika... Pika-chuuuu!",
            "hint": "High-voltage adorable lightning shout",
            "audioUrl": "/audio/voice-battle/pikachu_thunder.mp3"
      },
      {
            "character": "Rengoku (Demon Slayer)",
            "line": "Set your heart ablaze! Flame Breathing!",
            "hint": "Passionate roaring warrior spirit",
            "audioUrl": "/audio/voice-battle/rengoku_flame.mp3"
      },
      {
            "character": "Levi Ackerman (Attack on Titan)",
            "line": "Just shut up and invest everything in me.",
            "hint": "Cold, emotionless precision captain",
            "audioUrl": "/audio/voice-battle/levi_invest.mp3"
      },
      {
            "character": "Gojo Satoru (Jujutsu Kaisen)",
            "line": "Domain Expansion: Infinite Void.",
            "hint": "Effortless godly smirk and whisper",
            "audioUrl": "/audio/voice-battle/gojo_muryo.mp3"
      }
],
  },

  'voice_real_sfx': {
    'en': [
      {
            "character": "Meme Crowd",
            "line": "OHHHHHHHHH! (Supa Hot Fire)",
            "hint": "Explosive hype crowd reaction scream",
            "audioUrl": "/audio/voice-battle/ohhhhh.mp3"
      },
      {
            "character": "Heavy Driver",
            "line": "Fa! Fa! Fa! Fa! Fa!",
            "hint": "Rapid rhythmic mouth-beat engine sound",
            "audioUrl": "/audio/voice-battle/fa_fa_fa.mp3"
      },
      {
            "character": "Vitas (7th Element)",
            "line": "Blblblblblblbl! Ha ha ha!",
            "hint": "Alien tongue-fluttering high falsetto",
            "audioUrl": "/audio/voice-battle/vitas_blbl.mp3"
      },
      {
            "character": "What Does The Fox Say",
            "line": "Ring-ding-ding-ding-dingeringeding!",
            "hint": "Goofy Nordic electronic fox noises",
            "audioUrl": "/audio/voice-battle/fox_say.mp3"
      },
      {
            "character": "IShowSpeed",
            "line": "Woof woof woof! Barking madness!",
            "hint": "Uncontrollable intense streamer barking",
            "audioUrl": "/audio/voice-battle/ishowspeed_bark.mp3"
      },
      {
            "character": "Metal Gear Guard",
            "line": "Huh?! What was that noise?! [!]",
            "hint": "Sudden startled alert scream",
            "audioUrl": "/audio/voice-battle/metal_gear_alert.mp3"
      },
      {
            "character": "Roblox Player",
            "line": "OOF! (Lego Bone Crunch)",
            "hint": "Sharp, dry, instantaneous death grunt",
            "audioUrl": "/audio/voice-battle/roblox_oof.mp3"
      },
      {
            "character": "Gordon Ramsay",
            "line": "It's raw! You idiot sandwich!",
            "hint": "Vein-bulging kitchen rage scream",
            "audioUrl": "/audio/voice-battle/ramsay_idiot.mp3"
      },
      {
            "character": "Sad Violin",
            "line": "Wah-wah-wah-wahhhhh (Sad Trombone)",
            "hint": "Comedic tragic failure sound effect",
            "audioUrl": "/audio/voice-battle/sad_trombone.mp3"
      },
      {
            "character": "Air Horn DJ",
            "line": "Bwa-bwa-bwa-bwaaa! (MLG Dubstep)",
            "hint": "Obnoxious high-frequency victory blast",
            "audioUrl": "/audio/voice-battle/air_horn.mp3"
      },
      {
            "character": "Slap Sound FX",
            "line": "Pffft-THWACK! Crisp face slap!",
            "hint": "Hyper-resonant cartoon comedic slap",
            "audioUrl": "/audio/voice-battle/crisp_slap.mp3"
      },
      {
            "character": "Dramatic Gopher",
            "line": "Dun-dun-DUNNNN! (Dramatic Stare)",
            "hint": "Over-the-top suspense orchestral crescendo",
            "audioUrl": "/audio/voice-battle/dramatic_dun.mp3"
      }
],
  },

  'voice_kr_streamer_memes': {
    'en': [
      {
            "character": "Gamst",
            "line": "Did you eat the dog fruit?!",
            "hint": "Throat-shredding furious desk-slamming roar",
            "audioUrl": "/audio/voice-battle/kr_gamst_fruit.mp3"
      },
      {
            "character": "Monster Rat",
            "line": "Why are you talking back?!",
            "hint": "Whiny, rapid-fire indignant stream outburst",
            "audioUrl": "/audio/voice-battle/kr_rat_maldaeggu.mp3"
      },
      {
            "character": "Ralo",
            "line": "Is this real life right now?!",
            "hint": "Philosophical, squeaky gamer crisis of faith",
            "audioUrl": "/audio/voice-battle/kr_ralo_real.mp3"
      },
      {
            "character": "Grandma Moon-hee",
            "line": "Pumpkin sweet potato! PUMPKIN SWEET POTATO!",
            "hint": "Iconic hysterical family sitcom scream",
            "audioUrl": "/audio/voice-battle/kr_sweet_potato.mp3"
      },
      {
            "character": "Shim Young",
            "line": "Doctor, am I impotent?! What is this?!",
            "hint": "The most tragic hospital bed meme in history",
            "audioUrl": "/audio/voice-battle/kr_shimyoung_doctor.mp3"
      },
      {
            "character": "Mr. Geoje",
            "line": "Yaaaa-hooooo! Geoje Island!",
            "hint": "Mountaintop morning shout ringing in ears",
            "audioUrl": "/audio/voice-battle/kr_geoje_yaho.mp3"
      },
      {
            "character": "Chul-goo",
            "line": "Soy milk punch! Soy milk punch!",
            "hint": "Slapstick chaotic streamer catchphrase",
            "audioUrl": "/audio/voice-battle/kr_chulgoo_punch.mp3"
      },
      {
            "character": "Woowakgood",
            "line": "Hey! Are you crazy?!",
            "hint": "Crisp, punchy VTuber manager reprimand",
            "audioUrl": "/audio/voice-battle/kr_wakgood_hey.mp3"
      },
      {
            "character": "Pungwolryang",
            "line": "Wait, wait! Let me explain myself!",
            "hint": "Flustered friendly gamer bargaining for life",
            "audioUrl": "/audio/voice-battle/kr_pung_wait.mp3"
      },
      {
            "character": "Korean Zombie",
            "line": "I don't back down! Come at me!",
            "hint": "Fierce UFC octagon warrior battle cry",
            "audioUrl": "/audio/voice-battle/kr_zombie_shout.mp3"
      },
      {
            "character": "Kim Gye-ran",
            "line": "Physical 100! Let's go workout!",
            "hint": "Thick bald muscular fitness enthusiast roar",
            "audioUrl": "/audio/voice-battle/kr_gyeran_workout.mp3"
      },
      {
            "character": "Charming Jo",
            "line": "Jazz piano solo! Scat singing!",
            "hint": "Smooth, soulful acoustic music scatting",
            "audioUrl": "/audio/voice-battle/kr_charming_scat.mp3"
      }
],
  },

  'voice_legendary_games': {
    'en': [
      {
            "character": "League of Legends Announcer",
            "line": "PENTAKILL!",
            "hint": "Legendary booming announcer roar for team wipe",
            "audioUrl": "/audio/voice-battle/game_pentakill.mp3"
      },
      {
            "character": "Valorant Announcer",
            "line": "ACE! (Enemy team wiped out)",
            "hint": "Sharp, satisfying tactical combat announcer tone",
            "audioUrl": "/audio/voice-battle/game_valorant_ace.mp3"
      },
      {
            "character": "Valorant Agent",
            "line": "Spike has been planted!",
            "hint": "Urgent countdown beeping with site callout",
            "audioUrl": "/audio/voice-battle/game_spike_planted.mp3"
      },
      {
            "character": "League of Legends",
            "line": "Enemy Missing Ping (? ? ?)",
            "hint": "Rapid spamming of high-pitched question mark pings",
            "audioUrl": "/audio/voice-battle/game_mia_ping.mp3"
      },
      {
            "character": "Minecraft Steve",
            "line": "Oof! (Taking fall damage / hit)",
            "hint": "Classic low-pitched wooden damage grunt",
            "audioUrl": "/audio/voice-battle/game_minecraft_hurt.mp3"
      },
      {
            "character": "Minecraft",
            "line": "Level-up chiming experience orbs!",
            "hint": "Glittering high-pitched celebratory chiming",
            "audioUrl": "/audio/voice-battle/game_minecraft_xp.mp3"
      },
      {
            "character": "Roblox",
            "line": "Classic OOF death sound!",
            "hint": "The internet's favorite dry bone-break sound",
            "audioUrl": "/audio/voice-battle/roblox_oof.mp3"
      },
      {
            "character": "Among Us",
            "line": "Emergency Meeting Siren!",
            "hint": "High-tension emergency buzzer and gavel strike",
            "audioUrl": "/audio/voice-battle/game_amongus_meeting.mp3"
      },
      {
            "character": "Among Us Impostor",
            "line": "Kill Sound (Violin Stab + Thud)",
            "hint": "Sneaky behind-the-back execution slice",
            "audioUrl": "/audio/voice-battle/game_amongus_kill.mp3"
      },
      {
            "character": "StarCraft",
            "line": "Not enough minerals!",
            "hint": "Stern robotic system advisor reminder",
            "audioUrl": "/audio/voice-battle/game_sc_minerals.mp3"
      },
      {
            "character": "Overwatch",
            "line": "Play of the Game! (Trumpet Fanfare)",
            "hint": "Triumphant brass cinematic replay anthem",
            "audioUrl": "/audio/voice-battle/game_ow_potg.mp3"
      },
      {
            "character": "Dark Souls",
            "line": "YOU DIED (Deep gong of despair)",
            "hint": "Ominous brass chord and fading heartbeat",
            "audioUrl": "/audio/voice-battle/game_souls_died.mp3"
      }
],
  },

  'voice_daily_sfx_notif': {
    'en': [
      {
            "character": "Discord",
            "line": "Incoming Voice Call (Ring-ring-dong-dong)",
            "hint": "Melodic digital chime loop echoing in your ears",
            "audioUrl": "/audio/voice-battle/sfx_discord_call.mp3"
      },
      {
            "character": "Discord",
            "line": "User Connected / Disconnected chime",
            "hint": "The familiar pop-in and drop-out tone",
            "audioUrl": "/audio/voice-battle/sfx_discord_join.mp3"
      },
      {
            "character": "Discord",
            "line": "Message Notification (Blip!)",
            "hint": "Subtle high-frequency notification ding",
            "audioUrl": "/audio/voice-battle/sfx_discord_msg.mp3"
      },
      {
            "character": "Subway System",
            "line": "Approaching Train Arrival Chime",
            "hint": "Joyful musical fanfare signaling the train entry",
            "audioUrl": "/audio/voice-battle/sfx_subway_chime.mp3"
      },
      {
            "character": "School Chime",
            "line": "End of Class Bell (Ding-dong-dang-dong)",
            "hint": "Nostalgic 4-tone chime signaling freedom",
            "audioUrl": "/audio/voice-battle/sfx_school_bell.mp3"
      },
      {
            "character": "Physics Gag",
            "line": "Metal Pipe Falling onto Concrete Floor",
            "hint": "Reverberating, deafening metallic clang",
            "audioUrl": "/audio/voice-battle/sfx_metal_pipe.mp3"
      },
      {
            "character": "Apple Pay",
            "line": "Success Ding & Haptic Beep",
            "hint": "Pleasant, rich cash-register chime",
            "audioUrl": "/audio/voice-battle/sfx_apple_pay.mp3"
      },
      {
            "character": "Windows OS",
            "line": "Critical Error Stop Sound (Bonk!)",
            "hint": "The dreaded blue screen modal dialogue gong",
            "audioUrl": "/audio/voice-battle/sfx_windows_error.mp3"
      },
      {
            "character": "Police / Meme",
            "line": "FBI OPEN UP! (Door kicked open)",
            "hint": "Explosive megaphone shout and wood splinters",
            "audioUrl": "/audio/voice-battle/sfx_fbi_open_up.mp3"
      },
      {
            "character": "Mic Feedback",
            "line": "Ear-Piercing High Frequency Screech",
            "hint": "The nightmare screech of an unshielded microphone",
            "audioUrl": "/audio/voice-battle/sfx_mic_screech.mp3"
      },
      {
            "character": "Camera Shutter",
            "line": "Click-Whirr vintage mechanical shutter",
            "hint": "Crisp mechanical exposure snap",
            "audioUrl": "/audio/voice-battle/sfx_camera_shutter.mp3"
      },
      {
            "character": "Boxing Bell",
            "line": "Ding! Ding! Ding! Round begins!",
            "hint": "Sharp brass bell commanding both fighters forward",
            "audioUrl": "/audio/voice-battle/sfx_boxing_bell.mp3"
      }
],
  },

  'voice_anime_pop_bgm': {
    'en': [
      {
            "character": "Detective Conan",
            "line": "Main Deduction Theme Saxophone Solo",
            "hint": "Dynamic jazz saxophone uncovering the truth",
            "audioUrl": "/audio/voice-battle/anime_conan.mp3"
      },
      {
            "character": "Gojo Satoru (Jujutsu Kaisen)",
            "line": "Infinite Void Bass Drop & Bells",
            "hint": "Hypnotic otherworldly domain soundscape",
            "audioUrl": "/audio/voice-battle/anime_gojo_bgm.mp3"
      },
      {
            "character": "JoJo's Bizarre Adventure",
            "line": "Golden Wind Piano Solo (Il vento d'oro)",
            "hint": "The unbeatable 3:45 piano beatdown anthem",
            "audioUrl": "/audio/voice-battle/anime_jojo_piano.mp3"
      },
      {
            "character": "Michael Jackson",
            "line": "Hee-Hee! Shamone! (Smooth Criminal)",
            "hint": "High-pitched breathy pop falsetto shout",
            "audioUrl": "/audio/voice-battle/pop_mj_heehee.mp3"
      },
      {
            "character": "Harry Potter",
            "line": "Hedwig's Theme Played Terribly on a Recorder",
            "hint": "Horribly squeaky out-of-tune meme recorder",
            "audioUrl": "/audio/voice-battle/meme_hp_recorder.mp3"
      },
      {
            "character": "SpongeBob SquarePants",
            "line": "Two Hours Later... (French Narrator)",
            "hint": "Droll romantic French accent over calm accordion",
            "audioUrl": "/audio/voice-battle/meme_two_hours_later.mp3"
      },
      {
            "character": "Death Note",
            "line": "L's Theme (Eerie Staccato Piano Chords)",
            "hint": "Calculated, chilling analytical keyboard motif",
            "audioUrl": "/audio/voice-battle/anime_death_note_l.mp3"
      },
      {
            "character": "Neon Genesis Evangelion",
            "line": "Decisive Battle (Timpani & Horn March)",
            "hint": "Tense rhythmic countdown to angel confrontation",
            "audioUrl": "/audio/voice-battle/anime_eva_decisive.mp3"
      },
      {
            "character": "Super Mario Bros",
            "line": "Underground Theme (Doo-doo doo-doo-doo)",
            "hint": "Classic subterranean 8-bit walking bassline",
            "audioUrl": "/audio/voice-battle/game_mario_underground.mp3"
      },
      {
            "character": "Titanic",
            "line": "My Heart Will Go On (Awful Flute Version)",
            "hint": "Completely off-pitch plastic recorder disaster",
            "audioUrl": "/audio/voice-battle/meme_titanic_flute.mp3"
      }
],
  },

  'voice_global_en': {
    'en': [
      {
            "character": "SpongeBob SquarePants",
            "line": "I'm ready! I'm ready! I'm ready!",
            "hint": "High-pitched excited laugh and bounce",
            "audioUrl": "/audio/voice-battle/meme_two_hours_later.mp3"
      },
      {
            "character": "Gordon Ramsay",
            "line": "Where is the lamb sauce?!",
            "hint": "Furious red-faced chef screaming across the kitchen",
            "audioUrl": "/audio/voice-battle/ramsay_idiot.mp3"
      },
      {
            "character": "Steven He",
            "line": "Emotional Damage! (Shoe slap)",
            "hint": "Sarcastic Asian dad roasting life choices",
            "audioUrl": "/audio/voice-battle/crisp_slap.mp3"
      },
      {
            "character": "Cristiano Ronaldo",
            "line": "SIUUUUUUUU!",
            "hint": "Mid-air jump spin and explosive stadium shout",
            "audioUrl": "/audio/voice-battle/ohhhhh.mp3"
      },
      {
            "character": "StarCraft Marine",
            "line": "You want a piece of me, boy?",
            "hint": "Gruff armored terran infantry grunt",
            "audioUrl": "/audio/voice-battle/game_sc_minerals.mp3"
      },
      {
            "character": "Super Mario",
            "line": "It's-a me, Mario! Yahoo!",
            "hint": "Cheerful Italian plumber accent and jump",
            "audioUrl": "/audio/voice-battle/game_mario_underground.mp3"
      },
      {
            "character": "Valorant Phoenix",
            "line": "Watch your eyes! (Curveball flash)",
            "hint": "Swaggering London accent flame thrower",
            "audioUrl": "/audio/voice-battle/jett_watch_this.mp3"
      },
      {
            "character": "The Terminator",
            "line": "Hasta la vista, baby.",
            "hint": "Monotone Austrian cybernetic assassin line",
            "audioUrl": "/audio/voice-battle/nuclear_launch.mp3"
      },
      {
            "character": "Star Wars Darth Vader",
            "line": "I am your father.",
            "hint": "Deep baritone mechanical respirator rumble",
            "audioUrl": "/audio/voice-battle/battlecruiser_op.mp3"
      },
      {
            "character": "Batman",
            "line": "I'm Batman.",
            "hint": "Throaty gravelly vigilante whisper from shadows",
            "audioUrl": "/audio/voice-battle/omae_wa.mp3"
      }
],
  },

  'voice_global_ja': {
    'en': [
      {
            "character": "NARUTO - Naruto Uzumaki",
            "line": "Rasengan! (Spiraling Sphere)",
            "hint": "Spirited ninja scream gathering chakra",
            "audioUrl": "/audio/voice-battle/rasengan.mp3"
      },
      {
            "character": "ONE PIECE - Monkey D. Luffy",
            "line": "I'm gonna be King of the Pirates!",
            "hint": "Grinning energetic straw hat hero shout",
            "audioUrl": "/audio/voice-battle/gomugomu_pistol.mp3"
      },
      {
            "character": "JUJUTSU KAISEN - Satoru Gojo",
            "line": "Daijoubu, boku saikyou dakara. (Don't worry, I'm the strongest)",
            "hint": "Playful cocky smile of the unrivaled sorcerer",
            "audioUrl": "/audio/voice-battle/gojo_muryo.mp3"
      },
      {
            "character": "JOJO - Dio Brando",
            "line": "Kono DIO da! (It was me, DIO!)",
            "hint": "Theatrical megalomaniac vampire shout",
            "audioUrl": "/audio/voice-battle/dio_wryyy.mp3"
      },
      {
            "character": "FIST OF THE NORTH STAR - Kenshiro",
            "line": "You are already dead. (Omae wa mou shindeiru)",
            "hint": "Cold, low-pitched conclusive finishing line",
            "audioUrl": "/audio/voice-battle/omae_wa.mp3"
      },
      {
            "character": "POKEMON - Pikachu",
            "line": "Pika Pika! Pikachuuuu!",
            "hint": "High-voltage beloved electric mascot roar",
            "audioUrl": "/audio/voice-battle/pikachu_thunder.mp3"
      },
      {
            "character": "DRAGON BALL - Son Goku",
            "line": "Kamehamehaaaaa!",
            "hint": "Gathering blue ki wave at the hip",
            "audioUrl": "/audio/voice-battle/kamehameha.mp3"
      },
      {
            "character": "DEMON SLAYER - Kyojuro Rengoku",
            "line": "Set your heart ablaze!",
            "hint": "Roaring impassioned Flame Hashira spirit",
            "audioUrl": "/audio/voice-battle/rengoku_flame.mp3"
      },
      {
            "character": "ATTACK ON TITAN - Eren Yeager",
            "line": "I will destroy every last one of them!",
            "hint": "Fierce desperate vengeance scream",
            "audioUrl": "/audio/voice-battle/levi_invest.mp3"
      },
      {
            "character": "BLEACH - Ichigo Kurosaki",
            "line": "Bankai! Tensa Zangetsu!",
            "hint": "Black reiatsu explosion blade release",
            "audioUrl": "/audio/voice-battle/chidori.mp3"
      }
],
    'ja': [
      {
            "character": "NARUTO - ナルト",
            "line": "螺旋丸！(らせんがん！)",
            "hint": "手のひらにチャクラを回転させて叫ぶ熱血ボイス",
            "audioUrl": "/audio/voice-battle/rasengan.mp3"
      },
      {
            "character": "ONE PIECE - ルフィ",
            "line": "海賊王に、おれはなる！",
            "hint": "ニッと笑って叫ぶ麦わらのルフィの決めゼリフ",
            "audioUrl": "/audio/voice-battle/gomugomu_pistol.mp3"
      },
      {
            "character": "呪術廻戦 - 五条悟",
            "line": "大丈夫、僕 最強だから。",
            "hint": "ニヒルに笑って余裕たっぷりに言い放つ最強の呪術師",
            "audioUrl": "/audio/voice-battle/gojo_muryo.mp3"
      },
      {
            "character": "ジョジョの奇妙な冒険 - DIO",
            "line": "このDIOだッ！",
            "hint": "圧倒的悪のカリスマが放つ伝説の決め台詞",
            "audioUrl": "/audio/voice-battle/dio_wryyy.mp3"
      },
      {
            "character": "北斗の拳 - ケンシロウ",
            "line": "お前はもう、死んでいる。",
            "hint": "低く冷徹に言い放つ北斗神拳伝承者の決め台詞",
            "audioUrl": "/audio/voice-battle/omae_wa.mp3"
      },
      {
            "character": "ポケットモンスター - ピカチュウ",
            "line": "ピカッ！ピカピカ〜！ピカチュウウウ！",
            "hint": "可愛さと電撃を込めて叫ぶピカチュウの声真似",
            "audioUrl": "/audio/voice-battle/pikachu_thunder.mp3"
      },
      {
            "character": "ドラゴンボール - 孫悟空",
            "line": "か〜め〜は〜め〜波ーーッ！",
            "hint": "腰だめで気をためて一気に解き放つ咆哮",
            "audioUrl": "/audio/voice-battle/kamehameha.mp3"
      },
      {
            "character": "鬼滅の刃 - 煉獄杏寿郎",
            "line": "心を燃やせ！",
            "hint": "魂を揺さぶる炎柱の熱き叫び",
            "audioUrl": "/audio/voice-battle/rengoku_flame.mp3"
      },
      {
            "character": "進撃の巨人 - エレン・イェーガー",
            "line": "駆逐してやる…この世から、一匹残らず！",
            "hint": "巨人への憎悪を込めて絞り出すような叫び",
            "audioUrl": "/audio/voice-battle/levi_invest.mp3"
      },
      {
            "character": "BLEACH - 黒崎一護",
            "line": "卍解…！天鎖斬月！",
            "hint": "漆黒の霊圧を放ちながら呟く死神代行の切り札",
            "audioUrl": "/audio/voice-battle/chidori.mp3"
      }
],
  },

};
