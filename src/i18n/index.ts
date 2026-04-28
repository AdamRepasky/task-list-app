import { EN } from './en'

// Future languages can be added here
// import { ES } from './es'

export const translations = {
  en: EN,
  // es: ES,
} as const

export type Locale = keyof typeof translations

export const useTranslation = (locale: Locale = 'en') => {
  return translations[locale]
}

// Default to English for now
export const t = translations.en
