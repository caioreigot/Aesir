import { StyledSnackbar } from './styles';

export function Snackbar(props) { 
  return(
    <StyledSnackbar className="snackbar">
      {props.children}
    </StyledSnackbar>
  );
}

export function showSnackbar(message, type = 'error') {
  const snackbar = document.querySelector('.snackbar');

  snackbar.innerText = message;
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