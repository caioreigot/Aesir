const electron = require('electron');
const dialog = electron.dialog;

const getTranslation = (language) => {
  // Se a linguagem não for conhecida, retorna o idioma padrão
  const translationFile = ['en-US', 'pt-BR'].indexOf(language) < 0
    ? require('../i18n/locales/en-US/loadDeckInformation')
    : require(`../i18n/locales/${language}/loadDeckInformation`);

  return {
    title: translationFile.title,
    buttonLabel: translationFile.buttonLabel,
    textFiles: translationFile.textFiles, 
    allFiles: translationFile.allFiles
  }
}

function loadDeckInformation(language) {
  return new Promise((resolve, reject) => {
    const translation = getTranslation(language);

    const openDialogOptions = {
      title: translation.title,
      buttonLabel: translation.buttonLabel,
      filters: [
        { name: translation.textFiles, extensions: ['txt'] },
        { name: translation.allFiles, extensions: ['*'] }
      ],
      properties: ['openFile']
    }

    dialog.showOpenDialog(openDialogOptions)
      .then(file => {
        if (!file.canceled) {
          const filepath = file.filePaths[0].toString();
          resolve(filepath);
        }
      }).catch(reject);
  });
}

module.exports = loadDeckInformation;