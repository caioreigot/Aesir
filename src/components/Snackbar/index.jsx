import { StyledSnackbar } from './styles';
import i18n from 'i18next';

import us from '@locales/en-us/snackbar.json';
import br from '@locales/pt-br/snackbar.json';

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
      textToDisplay = us.fill_all_fields;
      break;
    case 'pt-BR':
      textToDisplay = br.fill_all_fields;
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