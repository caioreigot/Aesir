const electron = require('electron');
const dialog = electron.dialog;

const loadDeckEnUsTranslation = require('../i18n/locales/en-US/loadDeck');
const loadDeckPtBrTranslation = require('../i18n/locales/pt-BR/loadDeck');

const getTranslation = (language) => {
  let translationFile;

  switch(language) {
    case 'en-US':
      translationFile = loadDeckEnUsTranslation;
      break;
    case 'pt-BR':
      translationFile = loadDeckPtBrTranslation;
      break;
    default:
      console.error('Language not supported.');
      return;
  }

  return {
    title: translationFile.title,
    buttonLabel: translationFile.buttonLabel,
    textFiles: translationFile.textFiles, 
    allFiles: translationFile.allFiles
  }
}

function loadDeck(language) {
  return new Promise((resolve, reject) => {
    const translation = getTranslation(language);

    dialog.showOpenDialog({
        title: translation.title,
        buttonLabel: translation.buttonLabel,
        filters: [
          { name: translation.textFiles, extensions: ['txt'] },
          { name: translation.allFiles, extensions: ['*'] }
        ],
        properties: ['openFile']
    })
      .then(file => {
        if (!file.canceled) {
          const filepath = file.filePaths[0].toString();
          resolve(filepath);
        }
      }).catch(reject);
  });
}

module.exports = loadDeck;