import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import showDeckPreview from './showDeckPreview';
import DeckStorage from '@DeckStorage';
import i18n from 'i18next';

import { 
  FaArrowLeft, 
  BrightButton,
  SpreadButton,
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
  StyledLeftSideContainer,
  StyledRightSideContainer,
  DeckPreview,
  DeckPreviewRow,
  DeckPreviewLeftBox,
  LeftSideButtonsContainer,
} from './styles';

const { ipcRenderer } = window.require('electron');

const validateNicknameAndCreateServer = () => {
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

const hideButtonsAndShowLoader = () => {
  document.querySelector('#load-deck-button').style.display = 'none';
  document.querySelector('#ready-button').style.display = 'none';
  document.querySelector('.progress-bar').style.display = 'flex';
}

const showButtonsAndHideLoader = () => {
  document.querySelector('#load-deck-button').style.display = 'block';
  document.querySelector('#ready-button').style.display = 'block';
  document.querySelector('.progress-bar').style.display = 'none';
}

function LeftSideContainer() {
  const { t } = useTranslation();

  const [progressValue, setProgressValue] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [cardsQuantity, setCardsQuantity] = useState({
    Artifact: 0,
    Creature: 0,
    Enchantment: 0,
    Instant: 0,
    Land: 0,
    Sorcery: 0
  });

  useEffect(() => {
    const loadDeckButton = document.querySelector('#load-deck-button');

    loadDeckButton.onclick = () => {
      ipcRenderer.send('load-deck', i18n.language);
    }

    const clearDeckPreview = () => {
      const rows = [...document.querySelectorAll('.deck-preview-row')];
      rows.forEach(row => {
        while (row.firstChild) {
          row.firstChild.remove();
        }
      })

      setCardsQuantity({
        Artifact: 0,
        Creature: 0,
        Enchantment: 0,
        Instant: 0,
        Land: 0,
        Sorcery: 0
      });
    }

    // Quando o usuário selecionar o arquivo do deck
    ipcRenderer.on('deck-selected', _ => {
      clearDeckPreview();
      hideButtonsAndShowLoader();
    });

    // Progresso do "download" do deck pela API
    ipcRenderer.on('load-cards-progress', (_, progress) => {
      setProgressValue(progress);
    });

    // Quando os objetos das cartas forem pegos da API
    ipcRenderer.on('cards-loaded', (_, deck) => {
      showButtonsAndHideLoader();
      setProgressValue(0);

      DeckStorage.set(deck);
      setTotalCards(DeckStorage.getTotalCards());

      showDeckPreview(deck, rowsAmount => {
        setCardsQuantity({
          Artifact: rowsAmount[0],
          Creature: rowsAmount[1],
          Enchantment: rowsAmount[2],
          Instant: rowsAmount[3],
          Land: rowsAmount[4],
          Sorcery: rowsAmount[5]
        });
      });
    });

    // Antes deste componente ser destruido, esta função limpa os listeners
    return function cleanup() {
      ipcRenderer.removeAllListeners('deck-selected');
      ipcRenderer.removeAllListeners('load-cards-progress');
      ipcRenderer.removeAllListeners('cards-loaded');
    }
  }, []);

  return(
    <StyledLeftSideContainer>
      <DeckPreview className="deck-preview">
        <h3>Deck size: {totalCards} cards</h3>
        <DeckPreviewLeftBox>
            <h3>Artifact</h3>
            <h3>({cardsQuantity.Artifact})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
        <DeckPreviewLeftBox>
          <h3>Creature</h3>
          <h3>({cardsQuantity.Creature})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
        <DeckPreviewLeftBox>
          <h3>Enchantment</h3>
          <h3>({cardsQuantity.Enchantment})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
        <DeckPreviewLeftBox>
          <h3>Instant</h3>
          <h3>({cardsQuantity.Instant})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
        <DeckPreviewLeftBox>
          <h3>Land</h3>
          <h3>({cardsQuantity.Land})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
        <DeckPreviewLeftBox>
          <h3>Sorcery</h3>
          <h3>({cardsQuantity.Sorcery})</h3>
        </DeckPreviewLeftBox>
        <DeckPreviewRow className="deck-preview-row" />
      </DeckPreview>

      <LeftSideButtonsContainer>
        <BrightButton $allCaps id="load-deck-button">
          {t('preGameRoom:load_deck')}
        </BrightButton>
        <BrightButton $allCaps id="ready-button">
          {t('preGameRoom:ready')}
        </BrightButton>
        <ProgressBar 
          $widthPercentage={90}
          $height={35}
          $progress={progressValue} />
      </LeftSideButtonsContainer>
    </StyledLeftSideContainer>
  );
}

function RightSideContainer() {
  return(
    <StyledRightSideContainer />
  );
}

function PreGameRoom() {
  const { t } = useTranslation();

  useEffect(() => {
    const nicknameInput = document.querySelector('#nickname-input');

    // Caso o usuário tenha pressionado enter, chama o método de confirmação
    nicknameInput.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        validateNicknameAndCreateServer();
      }
    });

    // Antes deste componente ser destruido, esta função limpa os listeners
    return function cleanup() {
      document.removeEventListener('keyup', nicknameInput);
      ipcRenderer.removeAllListeners('server-created');
    }
  }, []);

  return(
    <StyledPreGameRoom>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <EnterNicknameContainer style={{display: 'none'}}>
        <MinimalistInput id="nickname-input" placeholder="Nickname" />
        <BrightButton $allCaps onClick={validateNicknameAndCreateServer}>
          {t('confirm')}
        </BrightButton>
      </EnterNicknameContainer>

      <ScaleLoader size="45"/>
      
      <PreGameRoomContainer>
        <LeftSideContainer />
        <RightSideContainer />
      </PreGameRoomContainer>

      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;