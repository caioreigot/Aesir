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

import { 
  StyledPreGameRoom,
  EnterNicknameContainer,
  PreGameRoomContainer,
  LeftSideContainer,
  DeckPreview,
  DeckPreviewRow,
  LeftSideButtonsContainer,
  RightSideContainer
} from './styles';

const { ipcRenderer } = window.require('electron');

const onConfirmNickname = () => {
  const nameInput = document.querySelector('#nickname-input');
  const nameEntered = nameInput.value;

  const scaleLoader = document.querySelector('.scale-loader');
  
  if (nameEntered.trim() === '') {
    showSnackbar('Nickname fornecido não é valido!', 'error');
    return;
  }

  // Esconde o container do input
  document.querySelector('.enter-nickname-container')
    .style.display = 'none';

  // Se o servidor demorar mais de 500ms para abrir, exibe o loader
  const showLoaderTimeout = setTimeout(() => {
    scaleLoader.style.display = 'flex';
  }, 500);

  // Avisa ao Main Process que o usuário criou uma sala
  ipcRenderer.send('room-created', nameEntered);

  // Resposta do Main Process pra quando o servidor foi criado
  ipcRenderer.on('server-created', (event, port) => {
    clearTimeout(showLoaderTimeout);
    scaleLoader.style.display = 'none';
  });
}

function PreGameRoom() {
  const { t } = useTranslation();

  // useEffect(() => {
  //   const nicknameInput = document.querySelector('#nickname-input');

  //   // Caso o usuário tenha pressionado enter, chama o método de confirmação
  //   nicknameInput.addEventListener("keyup", event => {
  //     if (event.keyCode === 13) {
  //       onConfirmNickname();
  //     }
  //   });
  // }, []);

  return(
    <StyledPreGameRoom>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      {/* <EnterNicknameContainer>
        <MinimalistInput id="nickname-input" placeholder="Nickname" />
        <MinimalistButton $allCaps onClick={onConfirmNickname}>
          {t('confirm')}
        </MinimalistButton>
      </EnterNicknameContainer>

      <ScaleLoader size="45"/> */}
      
      <PreGameRoomContainer>
        <LeftSideContainer>
          <DeckPreview>
            <p>100 cartas</p>
            <DeckPreviewRow>
              Artefatos
            </DeckPreviewRow>
            <DeckPreviewRow>
              Creature
            </DeckPreviewRow>
            <DeckPreviewRow>
              Enchantment
            </DeckPreviewRow>
            <DeckPreviewRow>
              Instant
            </DeckPreviewRow>
            <DeckPreviewRow>
              Land
            </DeckPreviewRow>
            <DeckPreviewRow>
              Sorcery
            </DeckPreviewRow>
          </DeckPreview>

          <LeftSideButtonsContainer>

            <MinimalistButton $allCaps>
              {t('preGameRoom:load_deck')}
            </MinimalistButton>
            <MinimalistButton $allCaps>
              {t('preGameRoom:ready')}
            </MinimalistButton>

          </LeftSideButtonsContainer>
        </LeftSideContainer>

        <RightSideContainer>

        </RightSideContainer>
      </PreGameRoomContainer>

      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;