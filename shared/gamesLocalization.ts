// shared/gamesLocalization.ts
import { GameInfo, SupportedLanguage } from './types';

interface GameTranslation {
  title: string;
  subtitle: string;
  description: string;
  rulesOverview: string[];
  tags: string[];
}

export const GAME_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, GameTranslation>>> = {
  'liar-game': {
    en: {
      title: '🤫 The Liar Game',
      subtitle: 'Find the liar hiding among the citizens!',
      description: 'Take turns asking hint questions around the table. Can the liar figure out the secret word and snatch victory?',
      rulesOverview: [
        'All players receive a secret keyword, except for the Liar.',
        'Players take turns asking each other questions with clever hints.',
        'The Liar can attempt to guess the secret word at any moment to win.',
        'At the end, everyone votes on who they think is the Liar.'
      ],
      tags: ['Social Deduction', 'Bluffing', 'Must-Play', 'Voice Chat']
    },
    ja: {
      title: '🤫 ライアーゲーム',
      subtitle: '市民の中に潜む嘘つきを見破れ！',
      description: '円卓で質問リレー！ライアーはお題を推測して逆転できるか？スリル満点の心理戦パーティーゲーム。',
      rulesOverview: [
        'ライアー以外の全プレイヤーに秘密のお題が配られます。',
        '順番に他のプレイヤーを指名し、ヒントになる質問をします。',
        'ライアーはお題を看破して逆転回答することが可能です。',
        '全員の質問終了後、投票でライアーを暴き出します。'
      ],
      tags: ['人狼', '心理戦', '定番', 'ボイス推奨']
    },
    'zh-TW': {
      title: '🤫 誰是臥底 (Liar Game)',
      subtitle: '找出隱藏在市民之中的臥底！',
      description: '圍繞圓桌進行提問接力！臥底能否猜出謎底關鍵詞絕地反擊？刺激的即時心理戰。',
      rulesOverview: [
        '除臥底外，所有玩家皆會收到相同的秘密關鍵字。',
        '依序向其他玩家提問，給予微小提示。',
        '臥底在遊戲中隨時可以嘗試猜出謎底以反敗為勝。',
        '所有發言結束後，全體投票抓出臥底。'
      ],
      tags: ['陣營推理解謎', '心理戰', '派對必備', '語音推薦']
    },
    de: {
      title: '🤫 Das Lügner-Spiel',
      subtitle: 'Entlarvt den Lügner unter den Bürgern!',
      description: 'Reihum Fragen stellen! Kann der Lügner das geheime Wort erraten und das Spiel drehen?',
      rulesOverview: [
        'Alle Spieler bis auf den Lügner erhalten das geheime Wort.',
        'Reihum stellt man anderen Spielern Hinweisfragen.',
        'Der Lügner kann jederzeit versuchen, das Wort zu erraten.',
        'Am Ende stimmt die Gruppe ab, wer der Lügner ist.'
      ],
      tags: ['Deduktion', 'Bluffen', 'Party', 'Voice-Chat']
    },
    pt: {
      title: '🤫 O Jogo do Mentiroso',
      subtitle: 'Encontre o mentiroso entre os cidadãos!',
      description: 'Façam perguntas em turnos! O mentiroso conseguirá descobrir a palavra secreta e virar o jogo?',
      rulesOverview: [
        'Todos recebem a palavra secreta, exceto o Mentiroso.',
        'Os jogadores fazem perguntas entre si dando dicas sutis.',
        'O Mentiroso pode tentar adivinhar a palavra secreta a qualquer momento.',
        'Ao final, todos votam em quem acreditam ser o Mentiroso.'
      ],
      tags: ['Dedução Social', 'Blefe', 'Festa', 'Chat de Voz']
    },
    es: {
      title: '🤫 El Juego del Mentiroso',
      subtitle: '¡Encuentra al mentiroso oculto entre los ciudadanos!',
      description: '¡Ronda de preguntas con pistas! ¿Podrá el mentiroso adivinar la palabra secreta y ganar?',
      rulesOverview: [
        'Todos reciben la palabra secreta, excepto el Mentiroso.',
        'Los jugadores se hacen preguntas con pistas sutiles por turnos.',
        'El Mentiroso puede intentar adivinar la palabra en cualquier momento.',
        'Al final, todos votan para descubrir quién es el Mentiroso.'
      ],
      tags: ['Deducción', 'Engaño', 'Fiesta', 'Voz Recomendada']
    },
    fr: {
      title: '🤫 Le Jeu du Menteur',
      subtitle: 'Démasquez le menteur caché parmi les citoyens !',
      description: 'Posez des questions d\'indices à tour de rôle ! Le menteur découvrira-t-il le mot secret pour l\'emporter ?',
      rulesOverview: [
        'Tous les joueurs reçoivent le mot secret sauf le Menteur.',
        'Posez des questions avec des indices subtils aux autres.',
        'Le Menteur peut deviner le mot secret à tout moment.',
        'Votez à la fin pour démasquer le Menteur.'
      ],
      tags: ['Déduction Sociale', 'Bluff', 'Soirée', 'Vocal']
    }
  },

  'voice-battle': {
    en: {
      title: '🎙️ Voice Mimic 1v1 Battle',
      subtitle: 'Listen to famous voice clips & mimic them on mic!',
      description: 'Tournament brackets matching! Listen to iconic anime, gaming, and movie voice clips and perform live. Spectators vote in real-time!',
      rulesOverview: [
        'Players enter 1v1 tournament brackets with character lines played.',
        'Both contenders mimic the voice line on their microphones.',
        'All spectators vote live for the most accurate performance.'
      ],
      tags: ['Voice Battle', 'Audition', 'Anime & Games', 'Hilarious']
    },
    ja: {
      title: '🎙️ 声真似 1v1 トーナメント',
      subtitle: '本家の音声を聴いてシンクロ率で対決！',
      description: '1対1トーナメント！アニメ・ゲーム・名言の名セリフ音声を聞いてマイクで全力声真似。観戦者がリアルタイム投票！',
      rulesOverview: [
        '1対1の対戦組み合わせが組まれ、ミッション音声が再生されます。',
        '2人の対戦者が順番にマイクで声真似を披露します。',
        '他の観戦者全員がリアルタイムでより似ていた方に投票します。'
      ],
      tags: ['声真似', 'オーディション', 'ボイスバトル', '爆笑']
    },
    'zh-TW': {
      title: '🎙️ 聲優模仿 1v1 錦標賽',
      subtitle: '聆聽經典原聲，麥克風同台飆戲對決！',
      description: '1對1錦標賽配對！聆聽動漫、遊戲與電影經典名台詞原聲並即時模仿，全場觀眾盲測即時投票！',
      rulesOverview: [
        '系統安排 1對1 對戰表並播放指定台詞原音。',
        '兩位選手依序開啟麥克風進行聲音模仿。',
        '其他所有觀眾即時投票選出模仿最傳神的選手。'
      ],
      tags: ['聲音模仿', '海選對決', '聲優挑戰', '派對爆笑']
    },
    de: {
      title: '🎙️ Stimm-Imitation 1v1',
      subtitle: 'Höre ikonische Zitate und imitiere sie live im Mikrofon!',
      description: '1v1-Turnierbaum! Höre weltberühmte Anime-, Gaming- und Filmstimmen und mache sie nach. Zuschauer stimmen live ab!',
      rulesOverview: [
        '1v1-Turnierpaarungen mit originalen Sprachclips.',
        'Beide Teilnehmer imitieren die Stimme nacheinander im Mikrofon.',
        'Alle Zuschauer stimmen live über den besten Auftritt ab.'
      ],
      tags: ['Stimm-Battle', 'Imitation', 'Gaming & Meme', 'Spaß']
    },
    pt: {
      title: '🎙️ Batalha de Imitação 1v1',
      subtitle: 'Ouça falas clássicas e imite no microfone!',
      description: 'Torneio 1 contra 1! Escute áudios icônicos de animes, jogos e memes e imite ao vivo. A plateia vota em tempo real!',
      rulesOverview: [
        'Chaveamento de torneio 1v1 com reprodução de áudios icônicos.',
        'Os dois competidores imitam a voz em seus microfones.',
        'Todos os espectadores votam ao vivo na melhor imitação.'
      ],
      tags: ['Batalha de Voz', 'Imitação', 'Meme', 'Diversão']
    },
    es: {
      title: '🎙️ Batalla de Imitación 1v1',
      subtitle: '¡Escucha frases legendarias e imítalas al micrófono!',
      description: '¡Torneo 1 contra 1! Escucha voces originales de anime, videojuegos y películas e imítalas. ¡Los espectadores votan en vivo!',
      rulesOverview: [
        'Emparejamientos en torneo 1v1 con frases legendarias.',
        'Los dos duelistas imitan la voz con su micrófono.',
        'Todos los espectadores votan en vivo por la mejor actuación.'
      ],
      tags: ['Imitación de Voz', 'Doblaje', 'Anime & Juegos', 'Risas']
    },
    fr: {
      title: '🎙️ Tournoi d\'Imitation Vocale 1v1',
      subtitle: 'Écoutez des répliques cultes et imitez-les au micro !',
      description: 'Arbre de tournoi 1v1 ! Écoutez des extraits cultes d\'animés, jeux et films et reproduisez-les. Vote en direct des spectateurs !',
      rulesOverview: [
        'Tableau de tournoi 1v1 avec répliques cultes diffusées.',
        'Les deux participants s\'affrontent au micro à tour de rôle.',
        'Tous les spectateurs votent en direct pour la meilleure imitation.'
      ],
      tags: ['Battle Vocale', 'Imitation', 'Animés & Jeux', 'Fou rire']
    }
  },

  'balance-game': {
    en: {
      title: '⚖️ Ultimate Balance Debate Battle',
      subtitle: 'The hardest Would You Rather dilemnas!',
      description: 'Split into A vs B and debate passionately! Can you convince the opposite side to change their vote?',
      rulesOverview: [
        'An extreme dilemna appears with two impossible choices.',
        'Choose your side and passionately argue your perspective.',
        'Vote again after hearing all arguments to see the final victor.'
      ],
      tags: ['Debate', 'Would You Rather', 'Social', 'Discussion']
    },
    ja: {
      title: '⚖️ 究極の究極選択ディベート',
      subtitle: '一生どちらかしか選べないならどっち！？',
      description: 'A派 vs B派に分かれて全力ディベート！相手チームの心を動かして寝返らせることができるか？白熱の討論ゲーム。',
      rulesOverview: [
        '究極の2択お題が表示されます。',
        'どちらの選択肢を選ぶか直感で投票し、チームに分かれます。',
        'お互いに熱いプレゼンと討論を行い、最終投票で決着をつけます。'
      ],
      tags: ['ディベート', '究極の選択', '討論', '盛り上がる']
    },
    'zh-TW': {
      title: '⚖️ 終極二選一 辯論擂台',
      subtitle: '無法抉擇的世紀終極兩難對決！',
      description: '分成 A 隊與 B 隊展開唇槍舌戰！你能否說服對手陣營倒戈轉移陣營？最激烈的派對辯論。',
      rulesOverview: [
        '出現極度糾結的二選一難題。',
        '玩家各自選擇支持的選項並分組。',
        '進行限時辯論與拉票，最終由全體票數決定獲勝立場。'
      ],
      tags: ['辯論對決', '終極二選一', '話題爆棚', '唇槍舌戰']
    },
    de: {
      title: '⚖️ Das Ultimative Dilemma-Duell',
      subtitle: 'Würdest du lieber...? Extreme Entscheidungen!',
      description: 'Teilt euch in Team A und B auf und diskutiert! Wer überzeugt die Gegenseite?',
      rulesOverview: [
        'Ein extremes 2-Optionen-Dilemma wird vorgegeben.',
        'Jeder wählt seine Seite und begründet seine Entscheidung.',
        'Nach der Debatte stimmen alle erneut ab.'
      ],
      tags: ['Debatte', 'Würdest du eher', 'Social', 'Diskussion']
    },
    pt: {
      title: '⚖️ Batalha do Dilema Supremo',
      subtitle: 'Você prefere...? O debate mais difícil da sua vida!',
      description: 'Dividam-se em Time A vs Time B e debatam com paixão! Quem convencerá a equipe adversária?',
      rulesOverview: [
        'Um dilema extremo com duas escolhas quase impossíveis.',
        'Cada jogador escolhe seu lado e defende seu ponto de vista.',
        'Nova votação final após o debate.'
      ],
      tags: ['Você Prefere', 'Debate', 'Social', 'Opinião']
    },
    es: {
      title: '⚖️ Duelo de Dilemas Extremos',
      subtitle: '¿Qué prefieres...? ¡El debate más difícil de tu vida!',
      description: '¡Divídanse en Opción A vs B y debatan con pasión! ¿Lograrás que la otra parte cambie de opinión?',
      rulesOverview: [
        'Se presenta un dilema extremo entre dos opciones.',
        'Cada jugador elige un bando y defiende su postura.',
        'Votación final tras escuchar todos los argumentos.'
      ],
      tags: ['¿Qué Prefieres?', 'Debate', 'Social', 'Polémica']
    },
    fr: {
      title: '⚖️ Le Dilemme Ultime',
      subtitle: 'Tu préfères... ? Le débat le plus corsé de votre vie !',
      description: 'Divisez-vous en Équipe A contre B et débattez ! Arriverez-vous à faire changer d\'avis l\'autre camp ?',
      rulesOverview: [
        'Un dilemme extrême à deux choix impossibles apparaît.',
        'Choisissez votre camp et défendez votre point de vue.',
        'Vote final après le débat pour désigner le vainqueur.'
      ],
      tags: ['Tu préfères', 'Débat', 'Social', 'Ambiance']
    }
  },

  'worldcup': {
    en: {
      title: '👑 Real-time Ideal Type World Cup',
      subtitle: 'Vote together live in tournament brackets!',
      description: 'Food, Anime, Gaming, Music! Vote live round by round with friends to crown the ultimate champion.',
      rulesOverview: [
        'Matches from Round of 32, 16, Quarterfinals to Finals.',
        'All players vote in real-time within the time limit.',
        'Tie-breakers trigger instant sudden-death coin flips.'
      ],
      tags: ['Tournament', 'Voting', 'Bracket', 'Social']
    },
    ja: {
      title: '👑 リアルタイム 理想カップ (ワールドカップ)',
      subtitle: 'トーナメント方式でみんなで投票対決！',
      description: '料理、アニメキャラ、ゲーム、名作！友達と一緒にリアルタイムで2者択一を投票し、最強の優勝者を決定！',
      rulesOverview: [
        '32強、16強、ベスト8、準決勝、決勝と進行します。',
        '制限時間内に全員でどちらか一方に投票します。',
        '同点時はサドンデス自動判定が発動します。'
      ],
      tags: ['トーナメント', '投票', '定番', 'みんなで決める']
    },
    'zh-TW': {
      title: '👑 即時理想型世界盃',
      subtitle: '淘汰賽錦標賽，全場即時投票決選！',
      description: '美食、動漫、遊戲、名曲！與好友一同在各輪次即時二選一投票，選出全場公認的最終冠軍。',
      rulesOverview: [
        '從 32 強、16 強、八強一路推進至冠軍總決賽。',
        '所有玩家在時限內即時投票表決。',
        '票數平手時自動觸發驟死賽判定。'
      ],
      tags: ['淘汰錦標賽', '即時投票', '二選一', '多人互動']
    },
    de: {
      title: '👑 Live-Turnier World Cup',
      subtitle: 'Stimmt gemeinsam live in Turnierrunden ab!',
      description: 'Essen, Anime, Gaming! Wählt Runde für Runde den ultimativen Champion eurer Discord-Gruppe.',
      rulesOverview: [
        'Turnierrunden von Sechzehntelfinale bis zum großen Finale.',
        'Alle Spieler stimmen gemeinsam in Echtzeit ab.',
        'Bei Gleichstand entscheidet der Sudden-Death.'
      ],
      tags: ['Turnier', 'Voting', 'Multiplayer', 'Spannung']
    },
    pt: {
      title: '👑 Copa do Mundo em Tempo Real',
      subtitle: 'Votem juntos no chaveamento do torneio!',
      description: 'Comida, Anime, Jogos! Votem ao vivo rodada por rodada com seus amigos para escolher o campeão supremo.',
      rulesOverview: [
        'Chaveamento eliminatório das oitavas até a grande final.',
        'Todos os jogadores votam em tempo real dentro do prazo.',
        'Empates ativam morte súbita instantânea.'
      ],
      tags: ['Torneio', 'Votação', 'Copa', 'Social']
    },
    es: {
      title: '👑 Copa Mundial en Tiempo Real',
      subtitle: '¡Voten juntos en vivo en eliminatorias!',
      description: 'Comida, anime, videojuegos. Vota ronda por ronda con tus amigos para coronar al campeón indiscutible.',
      rulesOverview: [
        'Enfrentamientos desde dieciseisavos hasta la gran final.',
        'Todos los jugadores votan en tiempo real.',
        'En caso de empate se activa el desempate súbito.'
      ],
      tags: ['Torneo', 'Votación', 'Eliminatoria', 'Diversión']
    },
    fr: {
      title: '👑 Coupe du Monde en Direct',
      subtitle: 'Votez ensemble en tournoi éliminatoire !',
      description: 'Nourriture, animés, jeux vidéo ! Votez en direct à chaque manche pour couronner le grand champion.',
      rulesOverview: [
        'Matchs éliminatoires des huitièmes jusqu\'à la grande finale.',
        'Tous les joueurs votent en direct dans le temps imparti.',
        'En cas d\'égalité, une mort subite automatique départage.'
      ],
      tags: ['Tournoi', 'Vote en direct', 'Bracket', 'Convivial']
    }
  },

  'telepathy': {
    en: {
      title: '🧠 Telepathy Mind Sync',
      subtitle: 'Say the exact same word together!',
      description: 'Read the prompt and type the first thing that comes to your mind. How many teammates share your brainwave?',
      rulesOverview: [
        'A shared topic prompt is revealed to everyone.',
        'Everyone secretly submits their keyword within the timer.',
        'Points are awarded according to how many players matched your answer!'
      ],
      tags: ['Mind Sync', 'Telepathy', 'Casual', 'Cooperative']
    },
    ja: {
      title: '🧠 テレパシー 心のシンクロ',
      subtitle: 'せーので同じ言葉を連想できるか！？',
      description: 'お題を見てパッと思い浮かんだワードを入力！友達とどれだけ思考が一致しているかテストする共感ゲーム。',
      rulesOverview: [
        '全員に共通のお題が表示されます。',
        '制限時間内に頭に浮かんだワードを秘密裏に入力します。',
        '同じ答えを出した人数が多いほど高得点を獲得します！'
      ],
      tags: ['テレパシー', '共感ゲーム', 'シンクロ', '定番']
    },
    'zh-TW': {
      title: '🧠 心電感應 默契大考驗',
      subtitle: '同一道題目，你們能否給出完全一樣的答案？',
      description: '看見題目後輸入第一瞬間閃過的詞彙！測試你們的腦波頻率是否完全同步。',
      rulesOverview: [
        '全體揭曉一道共同聯想題目。',
        '每人在時限內秘密輸入第一時間想到的詞。',
        '寫出相同答案的人數越多，獲得的默契積分越高！'
      ],
      tags: ['心電感應', '默契測試', '同頻共振', '好友考驗']
    },
    de: {
      title: '🧠 Telepathie-Gedankensync',
      subtitle: 'Schreibt exakt dasselbe Wort auf!',
      description: 'Lest den Begriff und tippt das Erste, was euch einfällt. Wer denkt genauso wie du?',
      rulesOverview: [
        'Ein gemeinsamer Themenbegriff wird aufgedeckt.',
        'Jeder tippt geheim sein Wort innerhalb der Zeit.',
        'Je mehr Spieler deine Antwort teilen, desto mehr Punkte gibt es!'
      ],
      tags: ['Telepathie', 'Mind Sync', 'Kooperativ', 'Party']
    },
    pt: {
      title: '🧠 Telepatia: Sintonia Mental',
      subtitle: 'Falem exatamente a mesma palavra juntos!',
      description: 'Veja o tema e digite a primeira coisa que vier à cabeça! Quem no grupo pensa exatamente como você?',
      rulesOverview: [
        'Um tema comum é revelado para todos os jogadores.',
        'Cada um digita secretamente sua resposta no tempo.',
        'Ganha mais pontos quem coincidir com mais amigos!'
      ],
      tags: ['Telepatia', 'Sintonia', 'Casual', 'Amizade']
    },
    es: {
      title: '🧠 Telepatía: Sincronía Mental',
      subtitle: '¡Escriban exactamente la misma palabra al mismo tiempo!',
      description: 'Lee el tema y escribe lo primero que se te venga a la mente. ¿Cuántos amigos piensan igual que tú?',
      rulesOverview: [
        'Se revela un tema común para todos los participantes.',
        'Cada jugador escribe su palabra en secreto antes de que acabe el tiempo.',
        '¡Más puntos mientras más jugadores coincidan con tu respuesta!'
      ],
      tags: ['Telepatía', 'Conexión Mental', 'Casual', 'Amigos']
    },
    fr: {
      title: '🧠 Télépathie Synchronisée',
      subtitle: 'Écrivez exactement le même mot ensemble !',
      description: 'Lisez le thème et tapez la première idée qui vous vient. Êtes-vous sur la même longueur d\'onde ?',
      rulesOverview: [
        'Un thème commun est dévoilé à tous les participants.',
        'Chacun saisit secrètement son mot dans le temps imparti.',
        'Plus vous avez de réponses identiques avec vos amis, plus vous marquez !'
      ],
      tags: ['Télépathie', 'Synchronisation', 'Casual', 'Complices']
    }
  },

  'quick-draw': {
    en: {
      title: '🎨 Real-time CatchMind (Draw & Guess)',
      subtitle: 'Draw on canvas & guess the word live!',
      description: 'One artist draws on the live synced canvas while everyone else races to guess the word in chat!',
      rulesOverview: [
        'The artist receives a secret word and draws on canvas.',
        'Others type guesses in the chat in real-time.',
        'The first correct guesser and the artist both earn points.'
      ],
      tags: ['Drawing', 'Guessing', 'Pictionary', 'Classic']
    },
    ja: {
      title: '🎨 リアルタイム お絵かきクイズ (キャッチマインド)',
      subtitle: 'キャンバスに描いてリアルタイムで当てよう！',
      description: '出題者がリアルタイムキャンバスに絵を描き、回答者たちがチャットで素早く正解を言い当てる王道ゲーム！',
      rulesOverview: [
        '出題者に秘密のお題が与えられ、絵を描きます。',
        '回答者はチャットで答えを素早く推測して入力します。',
        '一番早く当てた回答者と絵を描いた出題者に得点が入ります。'
      ],
      tags: ['お絵かき', 'クイズ', '定番', '爆笑']
    },
    'zh-TW': {
      title: '🎨 即時塗鴉猜猜畫 (CatchMind)',
      subtitle: '即時同步畫板，比比誰畫得像、誰猜得快！',
      description: '出題者在畫板上作畫，其餘玩家在聊天室瘋狂搶答！經典必玩的多人猜謎遊戲。',
      rulesOverview: [
        '出題者獲得秘密題目並在線上畫板作畫。',
        '其他玩家在即時聊天框輸入答案搶答。',
        '最快答對的猜題者與畫圖者皆可獲得積分。'
      ],
      tags: ['你畫我猜', '塗鴉猜謎', '益智歡樂', '經典必玩']
    },
    de: {
      title: '🎨 Montagsmaler (Zeichnen & Raten)',
      subtitle: 'Zeichne auf der Leinwand und errate das Wort!',
      description: 'Ein Spieler zeichnet live auf der synchronisierten Leinwand, während alle anderen im Chat raten!',
      rulesOverview: [
        'Der Zeichner erhält ein geheimes Wort und malt es.',
        'Die anderen Spieler tippen ihre Vermutungen in den Chat.',
        'Der schnellste Rater und der Zeichner erhalten Punkte.'
      ],
      tags: ['Zeichnen', 'Raten', 'Klassiker', 'Kreativ']
    },
    pt: {
      title: '🎨 Desenhe e Adivinhe (Gartic)',
      subtitle: 'Desenhe na tela e adivinhe ao vivo!',
      description: 'Um desenhista desenha na lousa compartilhada enquanto os outros correm para adivinhar no chat!',
      rulesOverview: [
        'O desenhista recebe uma palavra secreta e desenha.',
        'Os outros jogadores digitam seus palpites no chat.',
        'O primeiro a acertar e o desenhista ganham pontos.'
      ],
      tags: ['Desenho', 'Adivinhação', 'Criatividade', 'Clássico']
    },
    es: {
      title: '🎨 Dibuja y Adivina (Pinturillo)',
      subtitle: '¡Dibuja en el lienzo digital y adivina en vivo!',
      description: '¡Uno dibuja en la pizarra sincronizada mientras todos los demás intentan adivinar en el chat!',
      rulesOverview: [
        'El dibujante recibe una palabra secreta y la ilustra.',
        'Los demás participantes escriben sus respuestas en el chat.',
        'El más rápido en acertar y el dibujante ganan puntos.'
      ],
      tags: ['Dibujo', 'Adivinanzas', 'Pinturillo', 'Clásico']
    },
    fr: {
      title: '🎨 Dessinez c\'est Gagné (Esquissé)',
      subtitle: 'Dessinez sur la toile et devinez en direct !',
      description: 'Un joueur dessine en direct sur le tableau partagé tandis que tous les autres tentent de deviner dans le chat !',
      rulesOverview: [
        'Le dessinateur reçoit un mot secret et le dessine.',
        'Les autres joueurs tapent leurs propositions dans le chat.',
        'Le premier joueur qui trouve et le dessinateur marquent des points.'
      ],
      tags: ['Dessin', 'Devinettes', 'Pictionary', 'Créatif']
    }
  },

  'five-sec-rule': {
    en: {
      title: '⏱️ 3-Second Brain Freeze Speed',
      subtitle: 'Name 3 things in 3 seconds!',
      description: '"Name 3 pizza toppings!", "Name 3 excuses to be late!" Shout 3 answers before the buzzer sounds!',
      rulesOverview: [
        'A rapid question requires naming 3 specific things.',
        'You only have 3 seconds on the live countdown timer!',
        'The room judges whether your answers were valid.'
      ],
      tags: ['Speed', 'Brain Freeze', 'Trivia', 'Quick Reaction']
    },
    ja: {
      title: '⏱️ 3秒ルール 脳停止スピード',
      subtitle: '3秒以内に3つの回答を叫べ！',
      description: '「ピザのトッピング3つ！」「遅刻の言い訳3つ！」タイマーが鳴る前にテンパりながら叫ぶ爆笑瞬発力ゲーム。',
      rulesOverview: [
        '3つの答えを要求するお題が表示されます。',
        '制限時間はたったの3秒間！',
        '回答が正当かどうかを部屋の全員で判定します。'
      ],
      tags: ['瞬発力', '3秒ルール', 'スピード', 'パニック']
    },
    'zh-TW': {
      title: '⏱️ 3秒爆腦急速挑戰',
      subtitle: '在 3 秒內講出 3 個指定答案！',
      description: '「講出 3 種披薩配料！」「講出 3 個遲到的藉口！」在倒數計時結束前語無倫次秒答的爆笑遊戲。',
      rulesOverview: [
        '每道題目要求說出 3 個符合條件的答案。',
        '即時倒數計時僅有極短的 3 秒鐘！',
        '由房間全體玩家即時判定回答是否合格。'
      ],
      tags: ['反應速度', '急速限時', '極限腦力', '爆笑慌亂']
    },
    de: {
      title: '⏱️ 3-Sekunden-Blackout',
      subtitle: 'Nenne 3 Dinge in 3 Sekunden!',
      description: '"Nenne 3 Pizza-Beläge!", "Nenne 3 Ausreden fürs Zuspätkommen!" Antworte bevor der Timer abläuft!',
      rulesOverview: [
        'Nenne 3 Dinge zu einer bestimmten Kategorie.',
        'Du hast genau 3 Sekunden auf der Uhr!',
        'Die Gruppe entscheidet, ob deine Antwort zählt.'
      ],
      tags: ['Tempo', 'Reaktion', 'Schnelligkeit', 'Panik']
    },
    pt: {
      title: '⏱️ Regra dos 3 Segundos',
      subtitle: 'Fale 3 coisas em 3 segundos!',
      description: '"Cite 3 sabores de pizza!", "Cite 3 desculpas para atrasos!" Fale antes que o alarme toque!',
      rulesOverview: [
        'Uma pergunta rápida exigindo 3 respostas específicas.',
        'Você tem apenas 3 segundos no cronômetro!',
        'Os outros jogadores julgam se a resposta foi válida.'
      ],
      tags: ['Rapidez', 'Reflexo', 'Agilidade', 'Desafio']
    },
    es: {
      title: '⏱️ Regla de los 3 Segundos',
      subtitle: '¡Nombra 3 cosas en 3 segundos!',
      description: '"¡Nombra 3 ingredientes de pizza!", "¡3 excusas para llegar tarde!" ¡Responde antes de que suene la alarma!',
      rulesOverview: [
        'Responde nombrando 3 cosas de la categoría indicada.',
        '¡Tienes solo 3 segundos en el cronómetro!',
        'La sala vota si tus respuestas fueron válidas.'
      ],
      tags: ['Velocidad', 'Reflejos', 'Pánico', 'Risas']
    },
    fr: {
      title: '⏱️ La Règle des 3 Secondes',
      subtitle: 'Citez 3 choses en 3 secondes chrono !',
      description: '« Citez 3 garnitures de pizza ! », « 3 excuses de retard ! » Répondez avant la sonnerie fatidique !',
      rulesOverview: [
        'Une question exigeant 3 éléments précis.',
        'Vous n\'avez que 3 petites secondes au compteur !',
        'Les autres joueurs valident si vos réponses sont acceptées.'
      ],
      tags: ['Réflexe', 'Vitesse', 'Panique', 'Délire']
    }
  }
};

export function getLocalizedGame(game: GameInfo, lang: SupportedLanguage = 'ko'): GameInfo {
  if (lang === 'ko') return game;

  const trans = GAME_TRANSLATIONS[game.id]?.[lang];
  if (!trans) return game;

  return {
    ...game,
    title: trans.title || game.title,
    subtitle: trans.subtitle || game.subtitle,
    description: trans.description || game.description,
    rulesOverview: trans.rulesOverview || game.rulesOverview,
    tags: trans.tags || game.tags,
  };
}
