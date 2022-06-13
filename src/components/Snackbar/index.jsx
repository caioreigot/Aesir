import { StyledSnackbar } from './styles';
import i18n from 'i18next';

import enUsSnackbarTranslation from '@locales/en-US/snackbar.json';
import ptBrSnackbarTranslation from '@locales/pt-BR/snackbar.json';

let displayTimeTimeout;
let hideAnimationTimeout;
let canShowSnackbar = true;

const closeSnackbar = () => {
  const snackbar = document.querySelector('.snackbar');

  snackbar.classList.remove(
    'visible',
    'hidding',
    'error',
    'success'
  );

  snackbar.removeChild(snackbar.lastChild);

  canShowSnackbar = true;
}

const onCloseButtonClicked = () => {
  if (displayTimeTimeout) {
    clearTimeout(displayTimeTimeout);
  }

  if (hideAnimationTimeout) {
    clearTimeout(hideAnimationTimeout);
  }

  closeSnackbar();
}

function Snackbar() { 
  return(
    <StyledSnackbar className="snackbar">
      <div 
        className="close-button" 
        onClick={onCloseButtonClicked}
      >
        &#10005;
      </div>
    </StyledSnackbar>
  );
}

const calculateTextReadingTimeInMs = (text) => {
  const words = text.split(' ');
  const wordsPerMinute = 200;
  const timeInMinutes = words.length / wordsPerMinute;
  const timeInSeconds = timeInMinutes * 60;
  const timeInMiliseconds = timeInSeconds * 1000;
  return timeInMiliseconds;
}

function showSnackbar(messageType, type = 'error') {
  if (!canShowSnackbar) return;
  canShowSnackbar = false;

  const snackbar = document.querySelector('.snackbar');

  let textToDisplay;

  switch (i18n.language) {
    case 'en-US':
      textToDisplay = enUsSnackbarTranslation[messageType];
      break;
    case 'pt-BR':
      textToDisplay = ptBrSnackbarTranslation[messageType];
      break;
    default:
      textToDisplay = 'Message not found.';
      break;
  }

  if (!textToDisplay) {
    textToDisplay = messageType;
  }

  const p = document.createElement('p').innerText = textToDisplay;
  snackbar.append(p);
  snackbar.classList.add('visible', type);

  // A duração tem o mínimo de 500ms + o tempo médio de leitura de um texto
  const textDisplayTimeInMs = 500 + calculateTextReadingTimeInMs(textToDisplay);

  // Espera o tempo de exibição do snackbar
  displayTimeTimeout = setTimeout(() => { 
    snackbar.classList.add('hidding');

    // Espera o tempo da animação de desaparecer acabar
    hideAnimationTimeout = setTimeout(() => {
      closeSnackbar();
    }, 500);
  }, textDisplayTimeInMs);
}

export { Snackbar, showSnackbar }