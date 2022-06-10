import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import showDeckPreview from './scripts/showDeckPreview';
import DeckStorage from '@DeckStorage';
import Utils from './scripts/Utils';
import i18n from 'i18next';

import { 
  FaArrowLeft, 
  BrightButton,
  ProgressBar,
  MinimalistInput,
  ScaleLoader,
  Snackbar,
  showSnackbar,
  MinorSideInterface
} from '@components'

import {
  StyledPreGameRoom,
  StyledEnterNicknameContainer,
  StyledPreGameRoomContainer,
  StyledBiggerSideInterface,
  StyledDeckPreview,
  StyledPreviewRow,
  StyledPreviewLeftBox,
  StyledLeftSideButtonsContainer,
} from './styles';

const { ipcRenderer } = window.require('electron');

function BiggerSideInterface() {
  const { t } = useTranslation();

  const [getCardsProgress, setGetCardsProgress] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [cardsQuantity, setCardsQuantity] = useState({
    Artifact: 0,
    Creature: 0,
    Enchantment: 0,
    Instant: 0,
    Sorcery: 0,
    Land: 0
  });

  useEffect(() => {
    /* Ao clicar no botão de carregar deck, pede para o processo
    main abrir a tela para o usuário escolher um arquivo */
    document.querySelector('#load-deck-button').onclick = () => {
      ipcRenderer.send('load-deck', i18n.language);
    }

    // Quando o usuário selecionar o arquivo do deck
    ipcRenderer.on('deck-selected', _ => {
      Utils.clearDeckPreviewRows();
      Utils.resetCardsQuantity(setCardsQuantity);
      Utils.hideButtonsAndShowLoader();
    });

    // Progresso do "download" do deck pela API
    ipcRenderer.on('load-cards-progress', (_, progress) => {
      setGetCardsProgress(progress);
    });

    // Quando os objetos das cartas forem pegos da API
    ipcRenderer.on('cards-loaded', (_, deck) => {
      DeckStorage.set(deck);

      Utils.showButtonsAndHideLoader();
      setGetCardsProgress(0);

      showDeckPreview(deck, setTotalCards, setCardsQuantity);
    });

    // Antes deste componente ser destruido, esta função limpa os listeners
    return function cleanup() {
      ipcRenderer.removeAllListeners('deck-selected');
      ipcRenderer.removeAllListeners('load-cards-progress');
      ipcRenderer.removeAllListeners('cards-loaded');
    }
  }, []);

  return(
    <StyledBiggerSideInterface>
      <StyledDeckPreview className="deck-preview">
        <h3>{t('preGameRoom:deck_size', { totalCards })}</h3>
        <StyledPreviewLeftBox>
            <h3>{t('preGameRoom:artifact')}</h3>
            <h3>({cardsQuantity.Artifact})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
        <StyledPreviewLeftBox>
          <h3>{t('preGameRoom:creature')}</h3>
          <h3>({cardsQuantity.Creature})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
        <StyledPreviewLeftBox>
          <h3>{t('preGameRoom:enchantment')}</h3>
          <h3>({cardsQuantity.Enchantment})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
        <StyledPreviewLeftBox>
          <h3>{t('preGameRoom:instant')}</h3>
          <h3>({cardsQuantity.Instant})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
        <StyledPreviewLeftBox>
          <h3>{t('preGameRoom:sorcery')}</h3>
          <h3>({cardsQuantity.Sorcery})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
        <StyledPreviewLeftBox>
          <h3>{t('preGameRoom:land')}</h3>
          <h3>({cardsQuantity.Land})</h3>
        </StyledPreviewLeftBox>
        <StyledPreviewRow className="deck-preview-row" />
      </StyledDeckPreview>

      <StyledLeftSideButtonsContainer>
        <BrightButton $allCaps id="load-deck-button">
          {t('preGameRoom:load_deck')}
        </BrightButton>
        <BrightButton $allCaps id="ready-button">
          {t('preGameRoom:ready')}
        </BrightButton>
        <ProgressBar
          $widthPercentage={90}
          $height={35}
          $progress={getCardsProgress} />
      </StyledLeftSideButtonsContainer>
    </StyledBiggerSideInterface>
  );
}

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

        document.querySelector('.preGameRoomContainer')
          .classList
          .remove('hidden')
    });
  }

  useEffect(() => {
    const nicknameInput = document.querySelector('.nickname-input');

    // Caso o usuário tenha pressionado enter, chama o método de confirmação
    nicknameInput.addEventListener("keyup", event => {
      // Se o espaço não foi pressionado, retorna
      if (event.keyCode !== 13) return;
      handleConfirmNickname();
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

      <StyledEnterNicknameContainer className="enter-nickname-container">
        <MinimalistInput className="nickname-input" placeholder="Nickname" />
        <BrightButton $allCaps 
          onClick={handleConfirmNickname}
        >
          {t('confirm')}
        </BrightButton>
      </StyledEnterNicknameContainer>

      <ScaleLoader size="45"/>
      
      <StyledPreGameRoomContainer className="preGameRoomContainer hidden">
        <BiggerSideInterface />
        <MinorSideInterface />
      </StyledPreGameRoomContainer>

      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;