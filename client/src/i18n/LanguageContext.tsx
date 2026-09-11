// client/src/i18n/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../../../shared/types';
import { translations, SUPPORTED_LANGUAGES, LanguageOption } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  languages: LanguageOption[];
  currentLangOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectInitialLanguage(): SupportedLanguage {
  try {
    const saved = localStorage.getItem('partyhub_lang') as SupportedLanguage;
    if (saved && translations[saved]) {
      return saved;
    }
  } catch {}

  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('zh')) return 'zh-TW';
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('en')) return 'en';

  // 지원하지 않는 언어의 첫 방문자는 영어(국제 공용어)로 표시
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('partyhub_lang', language);
    } catch {}
    document.documentElement.lang = language;

    const titles: Record<SupportedLanguage, string> = {
      ko: 'PartyHub - 디스코드 파티게임 & 미니게임 플랫폼 | 웹 게임',
      en: 'PartyHub - Discord Party Games & Mini-Games Platform | Web Games',
      ja: 'PartyHub - Discord パーティーゲーム＆ミニゲーム | ウェブゲーム',
      'zh-TW': 'PartyHub - Discord 派對遊戲與迷你遊戲平台 | 網頁遊戲',
      de: 'PartyHub - Discord Partyspiele & Minispiele Plattform | Webspiele',
      pt: 'PartyHub - Jogos de festa e minigames para Discord | Jogos web',
      es: 'PartyHub - Juegos de fiesta y minijuegos para Discord | Juegos web',
      fr: 'PartyHub - Jeux de fête et mini-jeux pour Discord | Jeux Web'
    };

    if (titles[language]) {
      document.title = titles[language];
    }
  }, [language]);

  const setLanguage = (newLang: SupportedLanguage) => {
    if (translations[newLang]) {
      setLanguageState(newLang);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.ko;
    let str = dict[key] ?? translations.en[key] ?? translations.ko[key] ?? key;

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return str;
  };

  const currentLangOption =
    SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLangOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
