import { Lang } from '@/store/useStore';
import enTranslations from '@/i18n/ui.en.json';
import taTranslations from '@/i18n/ui.ta.json';
import hiTranslations from '@/i18n/ui.hi.json';

const translations = {
  en: enTranslations,
  ta: taTranslations,
  hi: hiTranslations,
};

export const t = (key: string, lang: Lang, params?: Record<string, string>): string => {
  let text = translations[lang]?.[key as keyof typeof translations[typeof lang]] || 
             translations.en[key as keyof typeof translations.en] || 
             key;

  // Replace parameters if provided
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(`{${paramKey}}`, paramValue);
    });
  }

  return text;
};