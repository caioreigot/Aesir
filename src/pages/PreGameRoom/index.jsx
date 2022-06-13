import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { sendMessageToChat } from '@components/MinorSideInterface';
import { setProgressValueTo } from '@components/ProgressBar';
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
  StyledPreGameBiggerSideInterface,
  StyledDeckPreview,
  StyledPreviewRow,
  StyledPreviewLeftBox,
  StyledLeftSideButtonsContainer,
} from './styles';

const { ipcRenderer } = window.require('electron');

function PreGameBiggerSideInterface() {
  const { t } = useTranslation();

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
      setProgressValueTo(progress);
    });

    // Quando os objetos das cartas forem pegos da API
    ipcRenderer.on('cards-loaded', (_, deck) => {
      DeckStorage.set(deck);

      Utils.showButtonsAndHideLoader();
      setProgressValueTo(0);

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
    <StyledPreGameBiggerSideInterface>
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
          $height={35} />
      </StyledLeftSideButtonsContainer>
    </StyledPreGameBiggerSideInterface>
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

        const nickname = document.querySelector('.nickname-input').value;
        localStorage.setItem('nickname', nickname);

        document.querySelector('.pre-game-room-container')
          .classList
          .remove('hidden')

        sendMessageToChat({ 
          message: t('preGameRoom:open_room_at_port', {port}) 
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
  
      // Caso o usuário tenha pressionado enter, chama o método de confirmação
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
      if (error.toLowerCase().includes('no cards found matching')) {
        // TODO: Traduzir o erro
        sendMessageToChat({ message: error });
        Utils.showButtonsAndHideLoader();
        return;
      }

      showSnackbar(error, 'error');
    });

    // Antes deste componente ser destruido, esta função limpa os listeners
    return function cleanup() {
      ipcRenderer.removeAllListeners('server-created');
    }
  }, []);

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
        <PreGameBiggerSideInterface />
        <MinorSideInterface />
      </StyledPreGameRoomContainer>

      <Snackbar />
    </StyledPreGameRoom>
  );
}

export default PreGameRoom;