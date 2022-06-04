import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonTranslationPtBr from './locales/pt-br/common.json';
import playRoomTranslationPtBr from './locales/pt-br/playRoom.json';

import commonTranslationEnUs from './locales/en-us/common.json';
import playRoomTranslationEnUs from './locales/en-us/playRoom.json';

const resources = {
  'pt-BR': {
    common: commonTranslationPtBr,
    playRoom: playRoomTranslationPtBr
  },
  'en-US': {
    common: commonTranslationEnUs,
    playRoom: playRoomTranslationEnUs
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: "common",
    lng: navigator.language,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;