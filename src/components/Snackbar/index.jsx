import { StyledSnackbar } from './styles';
import i18n from 'i18next';

import enUsSnackbarTranslation from '@locales/en-US/snackbar.json';
import ptBrSnackbarTranslation from '@locales/pt-BR/snackbar.json';

function Snackbar(props) { 
  return(
    <StyledSnackbar className="snackbar">
      {props.children}
    </StyledSnackbar>
  );
}

function showSnackbar(messageType, type = 'error') {
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

  snackbar.innerText = textToDisplay;
  snackbar.classList.add('show', type);

  setTimeout(() => { 
    snackbar.classList.remove('show', 'error', 'success');
  }, 3000);
}

export { Snackbar, showSnackbar }