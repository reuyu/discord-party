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

  'chosung-quiz': {
    en: {
      title: '⏱️ Initial Consonant Speed Quiz',
      subtitle: 'Take turns hosting! Guess words before anyone else',
      description: 'One player hosts and inputs a secret keyword. Guess the word in real-time chat as hints and initials are revealed!',
      rulesOverview: [
        'Each round, one player hosts and sets a category with the target word.',
        'First player to guess the correct word in chat scores points.',
        'The host scores maximum points when around 50% of players guess correctly.',
        'If everyone votes to pass, the round is skipped.'
      ],
      tags: ['Speed Quiz', 'Word Game', 'Host Battle', 'Party']
    },
    ja: {
      title: '⏱️ スピード頭文字クイズ',
      subtitle: '順番に出題者！早押し単語当てバトル',
      description: '出題者がヒントとお題を出題！チャットで誰よりも早く正解を入力してポイントを獲得しよう。',
      rulesOverview: [
        '順番に1人が出題者となりカテゴリーと正解ワードを入力します。',
        'チャット欄に正解を素早く打ち込んでスコアを獲得します。',
        '参加者の約50%が正解した際に出題者に最高得点が入ります。'
      ],
      tags: ['クイズ', '早押し', '対戦', 'パーティー']
    },
    'zh-TW': {
      title: '⏱️ 開頭字母極速猜詞',
      subtitle: '輪流擔任出題者！搶先一步猜出關鍵詞',
      description: '出題者給出分類與提示，全場在聊天室中極速競猜！誰能最快搶答奪冠？',
      rulesOverview: [
        '每輪輪流由一人擔任出題者並設定答案。',
        '玩家在聊天框中搶先輸入正確單字得分。',
        '當約一半的玩家答對時，出題者獲得最高獎勵積分。'
      ],
      tags: ['益智猜謎', '極速搶答', '派對聚會', '熱門']
    }
  },

  'worldcup': {
    en: {
      title: '🏆 Ideal Matchup World Cup',
      subtitle: 'Tournament battle with live community voting!',
      description: 'Vote 1v1 with friends through intense knockout tournament brackets from Top 16 down to the grand championship!',
      rulesOverview: [
        'Two contenders face off on screen in a limited time showdown.',
        'Live voting gauges dynamically shift until time expires.',
        'The candidate with the majority vote advances to the next round.',
        'A celebratory ceremony crowns the ultimate tournament winner!'
      ],
      tags: ['Voting', 'Tournament', 'World Cup', 'Custom Packs']
    },
    ja: {
      title: '🏆 理想の選択！トーナメントワールドカップ',
      subtitle: 'みんなで投票する1対1勝ち抜きバトルトーナメント！',
      description: 'ディスコードの仲間と1対1のマッチアップでリアルタイム投票！数々のカスタム画像パックに対応。',
      rulesOverview: [
        '2つの候補が画面に登場し、制限時間内にAかBに投票します。',
        'リアルタイム得票ゲージが変動し、多数決で次のラウンドへ進出します。',
        '決勝戦の勝者が決まると豪華な優勝セレモニーが行われます。'
      ],
      tags: ['投票', 'ワールドカップ', 'トーナメント', 'カスタムパック']
    },
    'zh-TW': {
      title: '🏆 即時二選一 理想盃大賽',
      subtitle: '全員即時投票的 1v1 錦標賽對決！',
      description: '與好友一同觀看 1v1 對決並即時投票！支援自訂題庫包與多種圖片包。',
      rulesOverview: [
        '畫面出現兩位候選項目，在時限內投票選擇 A 或 B。',
        '即時得票率動態變化，多數決勝出者晉級下一輪。',
        '決賽決出總冠軍後將舉行盛大的優勝慶祝！'
      ],
      tags: ['即時投票', '理想盃', '錦標賽', '自訂題庫']
    }
  },

  'snake-royale': {
    en: {
      title: '🐍 Snake Royale Arena',
      subtitle: 'Classic snake battle! Be the last serpent slithering',
      description: 'Eat apples to grow longer and force rivals to crash into your body! A shrinking electric storm forces intense survival action.',
      rulesOverview: [
        'Use arrow keys or WASD to navigate your snake.',
        'Eat glowing food to grow longer and speed up.',
        'Crashing into walls or rival snake bodies will eliminate you.',
        'Last snake surviving wins the crown!'
      ],
      tags: ['Survival', 'Battle Royale', 'Action', 'Skill']
    },
    ja: {
      title: '🐍 スネーク・バトルロイヤル',
      subtitle: '生き残れ！最後の1匹を目指すヘビサバイバル',
      description: 'リンゴを食べて体を伸ばし、相手の頭を自分の胴体に激突させろ！電磁嵐が迫る白熱のバトルロイヤル。',
      rulesOverview: [
        '十字キーやWASDでヘビを直感操作。',
        'リンゴを食べて体を大きく成長させます。',
        '壁や他のヘビの体に頭が当たると即脱落。',
        '最後まで生き残った最後の1匹が勝者です！'
      ],
      tags: ['スネーク', 'アクション', 'サバイバル', '白熱']
    },
    'zh-TW': {
      title: '🐍 貪食蛇大逃殺',
      subtitle: '經典大逃殺！爭奪最後一條存活的神蛇',
      description: '吃蘋果讓身軀不斷變長，逼迫對手撞上你的身體！毒圈逐漸縮小的極限生存戰。',
      rulesOverview: [
        '使用方向鍵或 WASD 操控貪食蛇移動。',
        '吃下發光食物以增長體積並加速。',
        '撞上牆壁或其他蛇的身體將被立即淘汰。',
        '堅持到最後的唯一倖存者奪得皇冠！'
      ],
      tags: ['大逃殺', '極限生存', '動作競技', '技巧']
    }
  },

  'balance-debate': {
    en: {
      title: '⚖️ Extreme Balance Debate',
      subtitle: 'Pick the lesser evil in hilarious impossible choices!',
      description: 'Debate ridiculous life-or-death dilemmas! Vote secretly, defend your choice on voice, and see where the party stands.',
      rulesOverview: [
        'Two extreme and absurd scenarios are presented.',
        'Vote for your choice within the time limit.',
        'Defend your pick on microphone and view the group breakdown.'
      ],
      tags: ['Debate', 'Hilarious', 'Icebreaker', 'Voice Chat']
    },
    ja: {
      title: '⚖️ 究極の2択！バランスディベート',
      subtitle: 'どっちを選んでも地獄！？究極の選択討論ゲーム',
      description: '恋愛・友情・日常の極端な2択！制限時間内に選択し、マイクで自分の意見を熱く語り合おう。',
      rulesOverview: [
        '極端でユーモラスな2つのシチュエーションが提示されます。',
        '制限時間内に自分の選ぶ選択肢に投票します。',
        'なぜそちらを選んだのかボイスチャットで白熱トーク！'
      ],
      tags: ['究極の2択', '討論', 'ディベート', '盛り上がる']
    },
    'zh-TW': {
      title: '⚖️ 極限二選一 辯論修羅場',
      subtitle: '怎麼選都超崩潰！考驗人性的終極靈魂選擇',
      description: '愛情、友情與人生荒謬二選一！時限內做出選擇，開麥互相辯論誰的理由更合理。',
      rulesOverview: [
        '系統呈現兩種極端又荒謬的世紀難題。',
        '所有人在倒數計時結束前做出投票。',
        '透過語音發表自己的觀點，展開歡樂辯論！'
      ],
      tags: ['二選一', '即時辯論', '靈魂拷問', '破冰必備']
    }
  },

  'smart-mafia': {
    en: {
      title: '🕵️ Smart Mafia',
      subtitle: 'Psychological warfare! Mafia vs Citizens',
      description: 'The ultimate social deduction classic. Deceive during daytime trials and assassinate targets in the shadows of night.',
      rulesOverview: [
        'Roles are secretly assigned: Mafia, Police, Doctor, and Citizens.',
        'Discuss and vote to execute suspects during daytime.',
        'Special roles perform secret nighttime operations.',
        'Citizens win by eliminating all Mafia suspects.'
      ],
      tags: ['Mafia', 'Social Deduction', 'Strategy', 'Voice Chat']
    },
    ja: {
      title: '🕵️ スマート人狼 (Smart Mafia)',
      subtitle: '昼の舌戦と夜の暗殺！究極の心理サスペンス',
      description: '心理戦の金字塔！昼の処刑裁判と夜の特殊役職アクションで市民とマフィアが雌雄を決する。',
      rulesOverview: [
        'マフィア、警察、医者、市民の役職が秘密裏に割り振られます。',
        '昼の議論で怪しいプレイヤーを多数決で処刑。',
        '夜フェーズでは各役職が秘密裏に行動を起こします。'
      ],
      tags: ['人狼', '心理戦', '戦略', 'ボイス推奨']
    },
    'zh-TW': {
      title: '🕵️ 智慧狼人殺 (Smart Mafia)',
      subtitle: '白天的唇槍舌戰與黑夜暗殺！經典心理博弈',
      description: '經典陣營對決！透過白天的辯論審判與夜晚的特殊能力行動，村民與黑手黨殊死一戰。',
      rulesOverview: [
        '黑手黨、警察、醫生與平民等身分隨機秘密分發。',
        '白天透過語音展開討論，投票處決可疑嫌疑犯。',
        '夜晚特殊角色執行秘密搜查、保護或暗殺。'
      ],
      tags: ['狼人殺', '心理戰', '陣營對抗', '語音必備']
    }
  },

  'story-roulette': {
    en: {
      title: '🎡 Story Roulette & Penalties',
      subtitle: 'Spin the wheel, tell hilarious true stories!',
      description: 'A roulette spins to select the speaker and topic! Share unforgettable memories while the audience votes FUNNY or BORING with funny penalties!',
      rulesOverview: [
        'Spin the roulette wheel to select speaker and topic.',
        'Share a compelling, funny real-life story on voice mic.',
        'Audience votes whether it was entertaining (+50 pts) or boring (penalty roulette).'
      ],
      tags: ['Storytelling', 'Icebreaker', 'Hilarious', 'Party']
    },
    ja: {
      title: '🎡 ぶっちゃけルーレット＆罰ゲーム',
      subtitle: 'ルーレットでお題決定！爆笑トークフェスティバル',
      description: 'ルーレットで語り手とお題を抽選！面白い実話エピソードを語り、観客が「面白い」「つまらない」を判定。',
      rulesOverview: [
        'ルーレットで語り手とお題をルーレット抽選。',
        'マイクをオンにして臨場感たっぷりにエピソードを披露。',
        '聴衆が「大爆笑」か「イマイチ（罰ゲーム）」をリアルタイム判定！'
      ],
      tags: ['トーク', '雑談', '罰ゲーム', '爆笑']
    },
    'zh-TW': {
      title: '🎡 故事大輪盤與大冒險',
      subtitle: '轉動輪盤抽出主角！爆笑真實故事大公開',
      description: '轉動大輪盤選出說書人與主題！在麥克風前分享真實趣事，全體聽眾評分，失敗者接受大冒險！',
      rulesOverview: [
        '旋轉輪盤隨機抽出說書人與故事主題。',
        '說書人開啟麥克風，生動分享親身真實故事。',
        '聽眾即時投票評判是「超好笑」還是「無聊（大冒險處罰）」。'
      ],
      tags: ['真實故事', '歡樂破冰', '大冒險', '聚會狂歡']
    }
  },

  'voice-battle': {
    en: {
      title: '🎙️ Voice Mimic 1v1 Battle',
      subtitle: 'Listen to iconic voice clips & perform on mic!',
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
    }
  },

  'relay-novel': {
    en: {
      title: '📖 Relay Story Crafter',
      subtitle: 'One sentence at a time! Create crazy collective stories',
      description: 'Each player writes the next sentence without seeing the full story! Read out the bizarre, unpredictable collective masterpiece together.',
      rulesOverview: [
        'Players take turns adding a sentence to the evolving plot.',
        'Only the most recent prompt or hint is visible to you.',
        'Once all rounds end, the full hilarious tale is unveiled.'
      ],
      tags: ['Creative', 'Writing', 'Comedy', 'Casual']
    },
    ja: {
      title: '📖 リレー小説メーカー',
      subtitle: '1行ずつ書き足して完成させる爆笑共同小説！',
      description: '前の人の最後の一言だけを見て次の文を創作！予想の斜め上を行く奇想天外な大作小説が誕生。',
      rulesOverview: [
        '順番に文章を1文ずつ書き足していきます。',
        '前の人が書いた最後のフレーズだけをヒントに執筆。',
        '全ラウンド終了後、完成した名作小説をみんなで朗読！'
      ],
      tags: ['リレー小説', '創作', '文章', '爆笑']
    },
    'zh-TW': {
      title: '📖 接龍故事創作社',
      subtitle: '一人一句寫出腦洞大開的驚世奇作！',
      description: '每個人只能看見前一位玩家的最後一句話，接著往下創作！結尾全篇朗讀，保證全場笑翻。',
      rulesOverview: [
        '玩家依序在時限內為小說接續下一句話。',
        '你只能看見前一名玩家留下的提示片段。',
        '全部回合結束後，展示令人捧腹大笑的完整故事！'
      ],
      tags: ['故事接龍', '創意寫作', '腦洞大開', '休閒']
    }
  },

  'bomb-party': {
    en: {
      title: '💣 Word Bomb Party',
      subtitle: 'Pass the ticking bomb with matching words!',
      description: 'A bomb is ticking down with a random syllable or category! Say a matching word to pass the bomb before it blows up in your hands!',
      rulesOverview: [
        'A random syllable or prompt is displayed on screen.',
        'Type or shout a valid word containing the letters.',
        'Pass the bomb to the next victim before the fuse runs out.'
      ],
      tags: ['Quick Thinking', 'Vocabulary', 'Panic', 'Action']
    },
    ja: {
      title: '💣 ワード爆弾パニック',
      subtitle: '爆発する前に条件に合う単語を言ってパス！',
      description: '画面の中で導火線が燃え盛る爆弾！指定された文字を含む言葉を素早く叫んで隣の人にパスしよう。',
      rulesOverview: [
        '画面にお題となる文字やカテゴリーが表示されます。',
        '条件に合う正しい単語を入力または発言。',
        '爆発する前に次のプレイヤーへ爆弾を押し付けろ！'
      ],
      tags: ['爆弾ゲーム', '語彙力', 'パニック', '早押し']
    },
    'zh-TW': {
      title: '💣 單字炸彈接力',
      subtitle: '引信燃燒中！輸入指定單字即刻轉移炸彈',
      description: '炸彈隨時可能引爆！快速輸入包含指定字根的詞語，在炸彈爆炸前將危機轉嫁給下個倒楣鬼。',
      rulesOverview: [
        '螢幕上隨機顯示指定字母或字根。',
        '在時限內輸入包含該字根的合法單字。',
        '成功輸入後立即將炸彈傳遞給下一位玩家！'
      ],
      tags: ['炸彈接力', '詞彙挑戰', '極速反應', '緊張刺激']
    }
  },

  'anonymous-exposed': {
    en: {
      title: '🎭 Anonymous Confession Booth',
      subtitle: 'Secret questions answered anonymously by everyone',
      description: 'Vote anonymously on spicy and scandalous questions about the group! Guess who voted what while hilarious secrets are revealed.',
      rulesOverview: [
        'Spicy questions are prompted to all players.',
        'Everyone answers anonymously and honestly.',
        'Guess who voted for what and discuss the shocking results.'
      ],
      tags: ['Truth', 'Icebreaker', 'Spicy', 'Social']
    },
    ja: {
      title: '🎭 匿名アンケート暴露室',
      subtitle: '誰が回答した！？匿名だから言える本音調査',
      description: 'きわどい質問にみんなが匿名で本音投票！驚きの集計結果を見て誰が投票したかを推理し合おう。',
      rulesOverview: [
        '刺激的なアンケート質問が全員に提示されます。',
        '誰が押したか分からない完全匿名で正直に回答。',
        '衝撃の投票結果を肴にみんなで盛り上がろう！'
      ],
      tags: ['本音アンケート', '匿名', '暴露', '親睦']
    },
    'zh-TW': {
      title: '🎭 匿名真心話告白室',
      subtitle: '完全匿名！揭露朋友們最深處的秘密與真心話',
      description: '大膽辛辣的匿名問卷調查！看著全場不可思議的投票結果，推測到底是誰投下了關鍵的一票。',
      rulesOverview: [
        '系統隨機發布引人入勝的靈魂拷問題目。',
        '所有人在百分之百匿名保護下如實作答。',
        '揭曉全體統計數據，展開爆笑的追問與審判！'
      ],
      tags: ['真心話', '匿名問卷', '靈魂拷問', '社交破冰']
    }
  },

  'high-noon-duel': {
    en: {
      title: '🤠 High Noon Quick Draw Duel',
      subtitle: '0.001s reflex duel! Fire the moment the bell chimes',
      description: 'Stare down your opponent at high noon. Wait for the bell to toll, then draw your weapon with split-second reflexes!',
      rulesOverview: [
        'Keep your finger steady while the tense clock ticks.',
        'At 12:00 sharp, click immediately to shoot.',
        'Firing too early results in a misfire and instant loss!'
      ],
      tags: ['Reflex', 'Western', '1v1 Duel', 'Arcade']
    },
    ja: {
      title: '🤠 荒野の早撃ち決闘 (High Noon)',
      subtitle: '0.001秒の反射神経対決！鐘が鳴った瞬間に撃て！',
      description: '荒野の真昼、静寂を切り裂く鐘の音！合図が出た瞬間に誰よりも速くクリックして相手を撃ち倒せ。',
      rulesOverview: [
        '静まり返る緊張感の中、時計の針を凝視。',
        '合図が出た瞬間に素早くクリックして発砲。',
        'フライングはお手つきで即敗北！'
      ],
      tags: ['早撃ち', '反射神経', '1対1決闘', 'ウエスタン']
    },
    'zh-TW': {
      title: '🤠 正午西部快槍手對決',
      subtitle: '0.001秒神經反射！鐘聲響起的瞬間精準拔槍',
      description: '西部正午烈日當空！死盯著時鐘指針，在鐘聲響起的剎那極速拔槍，擊倒對決強敵。',
      rulesOverview: [
        '屏氣凝神等待倒數，指針指向正午12點。',
        '鐘聲與信號出現的瞬間立刻點擊開火。',
        '搶先開槍視同走火，直接判定失敗！'
      ],
      tags: ['快槍手', '反應速度', '1v1對決', '西部狂野']
    }
  },

  'clicker-clash': {
    en: {
      title: '⚡ Clicker Tug-of-War Clash',
      subtitle: 'Pure CPS speed! Rapid tap tug-of-war battle',
      description: 'Mash your mouse or screen as fast as humanly possible! Pull the rope to your side in 10 intense seconds of pure clicking adrenaline.',
      rulesOverview: [
        'Click repeatedly as fast as you can.',
        'Each tap pulls the tug-of-war bar toward your side.',
        'Highest clicks per second (CPS) wins the match!'
      ],
      tags: ['CPS', 'Tug of War', 'Clicker', 'Competitive']
    },
    ja: {
      title: '⚡ 連打スピード綱引き',
      subtitle: '圧倒的CPS力！指先が燃え尽きる極限の連打対決',
      description: '10秒間の限界連打！マウスやタップを限界速度で連打し、綱を自分の陣地に引き寄せろ。',
      rulesOverview: [
        'スタートの合図とともに全力でクリック連打！',
        'タップするたびに綱引きのゲージが自分側に移動。',
        '制限時間終了時に陣地を奪っていた方の勝利！'
      ],
      tags: ['連打', '綱引き', 'CPS対決', 'フィジカル']
    },
    'zh-TW': {
      title: '⚡ 極速連點拔河對決',
      subtitle: '純粹的CPS手速！在10秒內將拔河繩拽向己方',
      description: '燃燒你的指尖！以最快速度瘋狂連擊滑鼠或螢幕，在純粹的手速與耐力碰撞中奪取勝利。',
      rulesOverview: [
        '比賽開始後以超越極限的手速連續點擊。',
        '每次點擊都會將拔河能量條拉向己方陣營。',
        '時限倒數結束時，能量條偏向的一方獲勝！'
      ],
      tags: ['極速連點', '拔河對決', '手速競技', '熱血']
    }
  },

  'zoom-quiz': {
    en: {
      title: '🔍 Extreme Close-Up Zoom Quiz',
      subtitle: 'Guess everyday items from extreme 1500% macro view!',
      description: 'An object starts at 1500% extreme magnification and slowly zooms out! Guess the object before your friends to score highest.',
      rulesOverview: [
        'The quiz image begins at extreme microscopic zoom.',
        'Camera gradually zooms out over 20 seconds.',
        'Type your answer as early as possible for bonus points.'
      ],
      tags: ['Macro Zoom', 'Trivia', 'Observation', 'Competitive']
    },
    ja: {
      title: '🔍 超拡大ズームクイズ',
      subtitle: '1500%拡大から徐々に引く！これ一体なーんだ？',
      description: '超接写された画像がゆっくりズームアウト！一瞬の閃きで正解を当ててライバルに差をつけよう。',
      rulesOverview: [
        '身近な物の超近接写真からスタート。',
        '徐々にズームアウトして全体像が見えてきます。',
        '早く正解するほど高得点を獲得できます！'
      ],
      tags: ['ズームクイズ', 'ひらめき', '観察力', '早押し']
    },
    'zh-TW': {
      title: '🔍 極限微距放大特寫猜謎',
      subtitle: '從 1500% 極限特寫漸漸拉遠！猜猜這是什麼？',
      description: '微觀視角下的日常物品！鏡頭緩緩拉遠露出全貌，誰能憑藉觀察力搶先猜出正解？',
      rulesOverview: [
        '題目以極限顯微放大特寫呈現。',
        '隨時間流逝，鏡頭在20秒內緩慢拉遠。',
        '越早搶答出正確物品名稱，獲得的分數越高！'
      ],
      tags: ['特寫猜謎', '觀察力', '眼力大考驗', '趣味']
    }
  },

  'black-and-white': {
    en: {
      title: '🃏 Black & White Mind Duel',
      subtitle: 'The Genius mind game! Outwit your rival in 5 rounds',
      description: 'Inspired by The Genius! Secretly bid numbered black and white tiles. First player to score 5 wins takes the match.',
      rulesOverview: [
        'Players receive secret numbered tiles (0 to 8).',
        'Each turn, both secretly play a tile.',
        'Higher number wins the point; first to 5 wins takes the crown.'
      ],
      tags: ['Mind Game', 'Strategy', 'The Genius', '1v1']
    },
    ja: {
      title: '🃏 ブラック＆ホワイト頭脳戦',
      subtitle: '天才たちの心理戦！数字タイルを読み合え',
      description: '人気頭脳番組から着想！0〜8の白黒タイルを隠し持ち、相手の手の内を読み切って先に5勝をもぎ取れ。',
      rulesOverview: [
        '各プレイヤーに0から8までの数字タイルが配布。',
        '毎ターン裏向きでタイルを1枚提示。',
        'より大きい数字を出した方が1勝、先に5勝した方の勝利！'
      ],
      tags: ['頭脳戦', '心理戦', 'カードゲーム', '1対1']
    },
    'zh-TW': {
      title: '🃏 黑白心理卡牌博弈',
      subtitle: '天才大腦的巔峰心理對決！搶先贏得5勝',
      description: '源自經典智力博弈！手握 0~8 號黑白號碼牌，精確計算對手出牌規律並率先斬獲5勝奪冠。',
      rulesOverview: [
        '雙方各自持有 0 到 8 號的黑白卡牌。',
        '每輪暗出牌，數字較大者贏下該局。',
        '率先取得 5 場勝利的玩家榮獲大腦王者稱號！'
      ],
      tags: ['智力博弈', '心理卡牌', '策略計算', '1v1']
    }
  },

  'blind-drawing': {
    en: {
      title: '🎨 Blind Sketch & Guess',
      subtitle: 'Draw without seeing your canvas, guess the sketch!',
      description: 'You cannot see what you are drawing! Create chaotic masterpieces blindly on canvas while friends race to decipher the prompt.',
      rulesOverview: [
        'A secret prompt is given to the artist.',
        'Canvas strokes are hidden from the artist while drawing.',
        'Spectators attempt to guess the bizarre artwork in real-time.'
      ],
      tags: ['Drawing', 'Art', 'Hilarious', 'Creativity']
    },
    ja: {
      title: '🎨 見ないで描くお絵かきクイズ',
      subtitle: '画面を見ずに描いたカオスな絵をみんなで推理！',
      description: '自分の描いた線が見えないブラインド状態でお絵かき！崩壊していく絵から何を描いたかを当てろ！',
      rulesOverview: [
        '描き手にお題が配られます。',
        'キャンバスの線が見えない状態で手探りお絵描き。',
        '出来上がったカオスな絵を見てみんなでチャット回答！'
      ],
      tags: ['お絵かき', 'カオス', '爆笑', '創造力']
    },
    'zh-TW': {
      title: '🎨 盲畫猜圖挑戰',
      subtitle: '看不見畫布的盲畫體驗！猜測靈魂畫手的畫作',
      description: '作畫者完全看不見自己繪製的筆觸！在失控的混亂線條中，全體好友競猜真正的題目。',
      rulesOverview: [
        '繪畫者獲得指定題目單字。',
        '在畫筆軌跡完全隱藏的盲畫模式下作畫。',
        '觀眾與好友即時競猜這幅靈魂傑作到底是什麼！'
      ],
      tags: ['靈魂畫手', '繪畫猜謎', '歡樂爆笑', '創意']
    }
  },

  'fake-artist': {
    en: {
      title: '🎭 A Fake Artist Goes to New York',
      subtitle: 'One stroke each! Unmask the faker without giving away the word',
      description: 'Everyone contributes one single stroke to a communal drawing. The Fake Artist has no idea what the word is—can you catch them?',
      rulesOverview: [
        'All artists know the secret topic except the Fake Artist.',
        'Everyone adds exactly one continuous stroke in turn.',
        'Vote to unmask the Fake Artist at the end of round 2.'
      ],
      tags: ['Drawing', 'Social Deduction', 'Bluffing', 'Party']
    },
    ja: {
      title: '🎭 エセ芸術家ニューヨークへ行く',
      subtitle: '1筆ずつ描き足せ！偽物のエセ画伯を暴き出せ',
      description: '1人1筆ずつリレー描画！お題を知らないエセ芸術家が紛れ込んでいる。お題を悟られずにエセを検挙できるか？',
      rulesOverview: [
        'エセ芸術家以外の全員にお題が配られます。',
        '順番に1人1筆ずつ同じキャンバスに線を加えます。',
        '描き終わったら投票でエセ芸術家を指名検挙！'
      ],
      tags: ['エセ芸術家', 'お絵かき', '人狼', '心理戦']
    },
    'zh-TW': {
      title: '🎭 偽藝術家遊紐約',
      subtitle: '每人畫下一筆！在不洩漏謎底的情況下揪出冒牌畫家',
      description: '所有人輪流在一張畫布上添上一筆！偽畫家根本不知道題目是什麼，市民能否成功識破偽畫家？',
      rulesOverview: [
        '除了偽畫家之外，所有人都知道真正的繪畫主題。',
        '每位玩家輪流在共同畫布上畫下連續的一筆。',
        '繪製兩輪後全員投票，抓出混在其中的偽藝術家！'
      ],
      tags: ['偽藝術家', '繪圖推理', '社交陣營', '派對爆笑']
    }
  },

  'taboo-talk': {
    en: {
      title: '🤐 Forbidden Taboo Word Survival',
      subtitle: 'Your taboo word is floating over your head—never say it!',
      description: 'A taboo word is assigned to your forehead for everyone else to see! Bait your opponents into saying theirs while protecting your own.',
      rulesOverview: [
        'Everyone sees all players\' taboo words except their own.',
        'Engage in natural conversation and bait rivals into saying forbidden words.',
        'Click [EXPOSE 🚨] the instant someone utters their taboo word to eliminate them!'
      ],
      tags: ['Taboo', 'Survival', 'Conversation', 'Mind Game']
    },
    ja: {
      title: '🤐 絶対NGワードサバイバル',
      subtitle: '頭上に掲げられたNGワード！喋ったら即脱落！',
      description: '自分だけが見えないNGワードが頭上に！巧みなトーク誘導で相手にNGワードを言わせ、即座に指摘して脱落させろ。',
      rulesOverview: [
        '自分のNGワードは見えず、他人のNGワードは見えます。',
        '自然な会話の中で相手にNGワードを言わせるよう誘導。',
        '相手が言った瞬間に [指摘 🚨] ボタンを押して撃沈！'
      ],
      tags: ['NGワード', 'サバイバル', '雑談トーク', '心理戦']
    },
    'zh-TW': {
      title: '🤐 絕對禁忌詞生還戰',
      subtitle: '懸浮在頭頂的禁忌單字！一說出口立刻淘汰！',
      description: '唯獨自己看不見自己頭上的禁忌詞！巧妙透過對話誘使對方說出關鍵詞，抓包對手並成為最後生存者。',
      rulesOverview: [
        '每個人都可以看見所有其他人的禁忌詞，唯獨看不見自己的。',
        '自然聊天並設計圈套，誘使對手說出頭頂的禁忌詞。',
        '對方說出的瞬間立刻點擊 [抓包 🚨] 處決對手！'
      ],
      tags: ['禁忌詞', '極限生存', '語音聊天', '心理博弈']
    }
  },

  'five-sec-rule': {
    en: {
      title: '⏱️ 3-Second Rule Speed Challenge',
      subtitle: 'Name 3 things in 3 seconds flat!',
      description: '"Name 3 pizza toppings!", "3 excuses for being late!" Shout them out before the 3-second hourglass runs dry!',
      rulesOverview: [
        'A fast prompt requiring 3 specific answers.',
        'You only have 3 seconds on the timer!',
        'The audience judges whether your responses are valid.'
      ],
      tags: ['Speed', 'Reflexes', 'Panic', 'Hilarious']
    },
    ja: {
      title: '⏱️ 3秒ルール・脳停止スピード',
      subtitle: '3秒以内に指定された単語を3つ連続で言え！',
      description: '「ピザのトッピング3つ！」「遅刻の言い訳3つ！」砂時計が落ちる前にマイクで叫べ！究極のスピードパニック。',
      rulesOverview: [
        'お題に対して3秒以内に3つのワードを回答。',
        'マイクに向かって詰まらずに答えられるか？',
        '観客が「認定」か「不認定」をリアルタイム判定！'
      ],
      tags: ['3秒ルール', '早口', 'パニック', '爆笑']
    },
    'zh-TW': {
      title: '⏱️ 3秒極限腦力風暴',
      subtitle: '3秒之內連續說出 3 個指定答案！',
      description: '「說出3種披薩配料！」「3個遲到的藉口！」在沙漏漏完前立刻開麥大聲喊出來，挑戰極限手速與大腦反應！',
      rulesOverview: [
        '題目要求在3秒內給出3個符合條件的單字。',
        '倒數計時極速流逝，考驗大腦與嘴速極限。',
        '全體聽眾即時投票認證是否答對！'
      ],
      tags: ['3秒快問快答', '反應力', '緊張刺激', '派對爆笑']
    }
  },

  'trivia-quiz': {
    en: {
      title: '🎓 Survival Trivia Quiz Show',
      subtitle: '1v1, Solo Battle Royale & Red vs Blue Team Battles!',
      description: 'History, science, pop culture, movies, and fun facts! Compete in 1v1 brackets, all-player battle royale, or red vs blue team showdowns.',
      rulesOverview: [
        'Choose Individual Survival, 1v1 Tournament, or Red vs Blue Team mode.',
        'Answer 4-choice questions within 15 seconds.',
        'Fast answers award speed bonuses with comprehensive fact explanations.'
      ],
      tags: ['Trivia', 'Knowledge', 'Tournament', 'Massive Players']
    },
    ja: {
      title: '🎓 サバイバル雑学クイズショー',
      subtitle: '1対1トーナメント、個人戦、赤vs青チーム戦！',
      description: '歴史、科学、時事、映画、雑学クイズが集結！個人サバイバルやチーム対抗戦も楽しめる本格クイズショー。',
      rulesOverview: [
        '個人戦、1対1トーナメント、チーム対抗戦からモードを選択。',
        '4択問題に15秒以内に回答。',
        '正解スピードに応じたボーナススコアと丁寧な解説付き！'
      ],
      tags: ['雑学クイズ', '早押し', '対決', '大規模対応']
    },
    'zh-TW': {
      title: '🎓 終極生存百科問答秀',
      subtitle: '1v1 淘汰賽、個人大逃殺與紅藍組隊知識大對決！',
      description: '涵蓋歷史、科學、流行文化、電影與冷知識！支援 1v1 單挑、全員大逃殺生存模式及紅藍隊伍陣營戰。',
      rulesOverview: [
        '可自由選擇個人生存戰、1v1 淘汰錦標賽或紅藍陣營戰。',
        '在15秒時限內選出四選一題目的正解。',
        '依據答題手速獲得速度加分，並即時查看百科趣味詳解！'
      ],
      tags: ['百科問答', '知識對決', '錦標賽', '多人聚會']
    }
  }
};

export function getLocalizedGame(game: GameInfo, lang: SupportedLanguage = 'ko'): GameInfo {
  if (lang === 'ko') return game;

  const trans = GAME_TRANSLATIONS[game.id]?.[lang] || GAME_TRANSLATIONS[game.id]?.['en'];
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
