import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import PT_BR from './locales/pt/pt-br.json';
import EN_US from './locales/en/en-us.json';

const resources = {
  'pt-BR': PT_BR,
  'en-US': EN_US
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;