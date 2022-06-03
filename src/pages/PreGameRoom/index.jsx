import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { 
  FaArrowLeft, 
  MinimalistButton,
  MinimalistInput,
  ScaleLoader,
  Snackbar,
  showSnackbar
} from '@components'

import { StyledPreGameRoom } from './styles';

const { ipcRenderer } = window.require('electron');

const onConfirmNickname = () => {
  const nameInput = document.querySelector('#nickname-input');
  const nameEntered = nameInput.value;
  
  if (nameEntered.trim() === '') {
    showSnackbar('Nickname fornecido não é valido!', 'error');
    return;
  }

  // Esconde o container do input
  document.querySelector('.enter-nickname-container')
    .style.display = 'none';

  // Exibe o loader
  document.querySelector('.scale-loader')
    .style.display = 'flex';

  // Avisa ao Main Process que o usuário criou uma sala
  ipcRenderer.send('room-created', nameEntered);

  // Resposta do Main Process pra quando o servidor foi criado
  ipcRenderer.on('server-created', (event, port) => {
    // TODO: mostrar a janela para importar o deck e mostrar a porta
  });
}

function PreGameRoom() {
  const { t } = useTranslation();

  useEffect(() => {
    const nicknameInput = document.querySelector('#nickname-input');

    // Caso o usuário tenha pressionado enter, chama o método de confirmação
    nicknameInput.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        onConfirmNickname();
      }
    });
  }, []);

  return(
    <StyledPreGameRoom>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <div className="enter-nickname-container">
        <MinimalistInput 
          id="nickname-input"
          placeholder="Nickname"
          spellCheck="false" />
        
        <MinimalistButton $allCaps onClick={onConfirmNickname}>
          {t('confirm')}
        </MinimalistButton>
      </div>

      <ScaleLoader size="45"/>
      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;