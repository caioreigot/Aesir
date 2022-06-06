import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import i18n from 'i18next';
import showDeckPreview from './showDeckPreview';

import { 
  FaArrowLeft, 
  MinimalistButton,
  ProgressBar,
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
  DeckPreviewLeftBox,
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
  const [totalCards, setTotalCards] = useState(0);
  const [artifactAmount, setArtifactAmount] = useState(0);
  const [creatureAmount, setCreatureAmount] = useState(0);
  const [enchantmentAmount, setEnchantmentAmount] = useState(0);
  const [instantAmount, setInstantAmount] = useState(0);
  const [landAmount, setLandAmount] = useState(0);
  const [sorceryAmount, setSorceryAmount] = useState(0);

  const [progressValue, setProgressValue] = useState(0);

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

  useEffect(() => {
    const loadDeckButton = document.querySelector('#load-deck-button');
    const readyButton = document.querySelector('#ready-button');
    const progressBar = document.querySelector('.progress-bar');

    loadDeckButton.onclick = () => {
      ipcRenderer.send('load-deck', i18n.language);
    }

    ipcRenderer.on('deck-selected', event => {
      loadDeckButton.style.display = 'none';
      readyButton.style.display = 'none';
      progressBar.style.display = 'flex';
    });

    // Progresso do download do deck pela API
    ipcRenderer.on('load-cards-progress', (event, progress) => {
      setProgressValue(progress);
    });

    ipcRenderer.on('cards-loaded', (event, deck, cardObjects) => {
      // ! TODO: Sendo chamado multiplas vezes ao carregar denovo o deck

      setTimeout(() => {
        loadDeckButton.style.display = 'block';
        readyButton.style.display = 'block';
        
        progressBar.style.display = 'none';
        setProgressValue(0);
  
        showDeckPreview(deck, cardObjects, (totalCards, rowsAmount) => {
          setTotalCards(totalCards);
          setArtifactAmount(rowsAmount[0]);
          setCreatureAmount(rowsAmount[1]);
          setEnchantmentAmount(rowsAmount[2]);
          setInstantAmount(rowsAmount[3]);
          setLandAmount(rowsAmount[4]);
          setSorceryAmount(rowsAmount[5]);
        });
      }, 800);
    });
  }, []);

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
          <DeckPreview className="deck-preview">
            <h3>Total: {totalCards} cartas</h3>
            <DeckPreviewLeftBox>
                <h3>Artifact</h3>
                <h3>({artifactAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
            <DeckPreviewLeftBox>
              <h3>Creature</h3>
              <h3>({creatureAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
            <DeckPreviewLeftBox>
              <h3>Enchantment</h3>
              <h3>({enchantmentAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
            <DeckPreviewLeftBox>
              <h3>Instant</h3>
              <h3>({instantAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
            <DeckPreviewLeftBox>
              <h3>Land</h3>
              <h3>({landAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
            <DeckPreviewLeftBox>
              <h3>Sorcery</h3>
              <h3>({sorceryAmount})</h3>
            </DeckPreviewLeftBox>
            <DeckPreviewRow className="deck-preview-row" />
          </DeckPreview>

          <LeftSideButtonsContainer>
            <MinimalistButton $allCaps id="load-deck-button">
              {t('preGameRoom:load_deck')}
            </MinimalistButton>
            <MinimalistButton $allCaps id="ready-button">
              {t('preGameRoom:ready')}
            </MinimalistButton>
            <ProgressBar 
              $widthPercentage={75}
              $height={35}
              $progress={progressValue} />
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