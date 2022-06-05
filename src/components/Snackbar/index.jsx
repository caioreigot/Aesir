import { StyledSnackbar } from './styles';
import i18n from 'i18next';

import enUsSnackbarTranslation from '@locales/en-US/snackbar.json';
import ptBrSnackbarTranslation from '@locales/pt-BR/snackbar.json';

export function Snackbar(props) { 
  return(
    <StyledSnackbar className="snackbar">
      {props.children}
    </StyledSnackbar>
  );
}

export function showSnackbar(message, type = 'error') {
  const snackbar = document.querySelector('.snackbar');

  let textToDisplay = message;

  switch (i18n.language) {
    case 'en-US':
      textToDisplay = enUsSnackbarTranslation
        .fill_all_fields;
      break;
    case 'pt-BR':
      textToDisplay = ptBrSnackbarTranslation
        .fill_all_fields;
      break;
    default:
      break;
  }

  snackbar.innerText = textToDisplay;
  snackbar.classList.add('show');

  if (type === 'error') {
    snackbar.classList.add('error');
  } else if (type === 'success') {
    snackbar.classList.add('success');
  }

  setTimeout(() => { 
    snackbar.classList.remove('show', 'error', 'success');
  }, 3000);
}