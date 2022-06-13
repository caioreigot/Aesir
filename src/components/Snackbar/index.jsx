import { useEffect } from 'react';
import { StyledSnackbar } from './styles';
import i18n from 'i18next';

import enUsSnackbarTranslation from '@locales/en-US/snackbar.json';
import ptBrSnackbarTranslation from '@locales/pt-BR/snackbar.json';

let displayTimeTimeout;
let hideAnimationTimeout;
let canShowSnackbar = true;

const closeSnackbar = () => {
  const snackbar = document.querySelector('.snackbar');

  // Se a snackbar já foi destruida
  if (!snackbar) {
    // Volta a booleana para seu valor padrão
    canShowSnackbar = true;
    return;
  }

  snackbar.classList.remove(
    'visible',
    'hidding',
    'error',
    'success'
  );

  const message = snackbar.querySelector('.message');

  if (message) {
    // Remove o node da mensagem dentro da snackbar
    snackbar.removeChild(message);
  }

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
  useEffect(() => {
    return closeSnackbar;
  }, [])

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
  text = text.toString();
  const words = text.split(' ');
  const wordsPerMinute = 180;
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
      textToDisplay = null;
      break;
  }

  if (!textToDisplay) {
    textToDisplay = messageType;
  }

  const p = document.createElement('p');
  p.className = 'message';
  p.innerText = textToDisplay;
  snackbar.append(p);
  snackbar.classList.add('visible', type);

  // A duração tem o tempo de 1s + o tempo médio de leitura de um texto
  const textDisplayTimeInMs = 1000 + calculateTextReadingTimeInMs(textToDisplay);

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