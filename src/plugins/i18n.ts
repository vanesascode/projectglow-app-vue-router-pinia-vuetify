import { createI18n } from 'vue-i18n';
import ES from '../locales/es-ES.json';
import EN from '../locales/en-EN.json';

type MessageSchema = typeof ES | typeof EN;

const defaultLanguage = 'es-Es';

export function getVueI18n(language: string | undefined) {
  const storedLanguage = localStorage.getItem('language') || language || 'es-ES';
  return createI18n<[MessageSchema], 'es-Es' | 'en-EN'>({
    legacy: false,
    locale: storedLanguage,
    fallbackLocale: language || 'es-ES',
    messages: {
      'es-Es': ES,
      'en-EN': EN,
    },
  });
}

export default getVueI18n(defaultLanguage);
