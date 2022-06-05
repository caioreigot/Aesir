import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

function getTranslations(language) {
  return {
    common: require(`./locales/${language}/common.json`),
    tooltip: require(`./locales/${language}/tooltip.json`),
    home: require(`./locales/${language}/home.json`),
    config: require(`./locales/${language}/config.json`),
    playRoom: require(`./locales/${language}/playRoom.json`)
  }
}

const resources = {
  'pt-BR': getTranslations('pt-BR'),
  'en-US': getTranslations('en-US')
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