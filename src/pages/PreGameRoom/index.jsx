import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { sendMessageToChat } from '@components/MinorSideInterface';
import Utils from './scripts/Utils';
import DeckPreviewInterface from './DeckPreviewInterface';

import { 
  FaArrowLeft, 
  BrightButton,
  MinimalistInput,
  ScaleLoader,
  Snackbar,
  showSnackbar,
  MinorSideInterface
} from '@components'

import {
  StyledPreGameRoom,
  StyledEnterNicknameContainer,
  StyledPreGameRoomContainer
} from './styles';

const { ipcRenderer } = window.require('electron');

function PreGameRoom() {
  const { t } = useTranslation();

  const handleConfirmNickname = () => {
    Utils.validateNicknameAndCreateServer(
      ipcRenderer,
      (errorMessage, port) => {
        if (errorMessage) {
          showSnackbar(errorMessage, 'error');
          return;
        }

        const nickname = document.querySelector('.nickname-input').value;
        localStorage.setItem('nickname', nickname);

        document.querySelector('.pre-game-room-container')
          .classList
          .remove('hidden')

        sendMessageToChat({ 
          message: t('preGameRoom:open_room_at_port', { port }) 
        });
    });
  }

  const urlHasNameParameter = () => {
    const nameParameter = window.location.href.split('=')[1];

    if (nameParameter) {
      const nickname = nameParameter.replace(/%20/g, ' ');
      localStorage.setItem('nickname', nickname);
      
      return true;
    }

    return false;
  }

  useEffect(() => {
    // Se não houver o nickname no URL, pede para o usuário fornecer um
    if (!urlHasNameParameter()) {
      const nicknameInput = document.querySelector('.nickname-input');
      const confirmNicknameButton = document.querySelector('.confirm-nickname-button');
  
      // Caso o usuário tenha pressionado enter, clica no botão de confirmar
      nicknameInput.addEventListener('keyup', event => {
        if (event.keyCode !== 13) return;
        confirmNicknameButton.click();
      });
    } else {
      // Mostra a sala pré jogo
      const preGameRoomContainer = document.querySelector('.pre-game-room-container');
      preGameRoomContainer.classList.remove('hidden');
    }

    ipcRenderer.on('error', (_, error) => {
      Utils.showButtonsAndHideLoader();

      if (error.toLowerCase().includes('no cards found matching')) {
        const cardNameNotFound = error.slice(25).slice(0, -1);
        const message = { message: t('preGameRoom:card_not_found', { cardNameNotFound }) };
        sendMessageToChat(message);
        return;
      }

      showSnackbar(error, 'error');
    });

    // Antes deste componente ser destruido, esta função limpa os listeners
    return function cleanup() {
      ipcRenderer.removeAllListeners('server-created');
      ipcRenderer.removeAllListeners('error');
    }
  }, [t]);

  const disconnectPlayer = () =>
    ipcRenderer.send('disconnect-player');

  return(
    <StyledPreGameRoom>
      <Link to="/" onClick={disconnectPlayer}>
        <FaArrowLeft />
      </Link>

      {/* Se não houver o nickname na URL, mostra o
      input para o usuário fornece-lo */}
      {!urlHasNameParameter() && 
        <StyledEnterNicknameContainer className="enter-nickname-container">
          <MinimalistInput className="nickname-input" placeholder={t('your-nickname')} />
          <BrightButton className="confirm-nickname-button"
            $allCaps onClick={handleConfirmNickname}
          >
            {t('confirm')}
          </BrightButton>
        </StyledEnterNicknameContainer>
      }

      <ScaleLoader $size="45"/>
      
      <StyledPreGameRoomContainer className="pre-game-room-container hidden">
        <DeckPreviewInterface />
        <MinorSideInterface />
      </StyledPreGameRoomContainer>

      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;