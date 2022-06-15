import { useTranslation } from 'react-i18next'
import { setProgressValueTo } from '@components/ProgressBar';
import { useState, useEffect } from 'react';
import Utils from '../scripts/Utils';
import showDeckPreview from '../scripts/showDeckPreview';
import DeckStorage from '@DeckStorage';
import i18n from 'i18next';

import { 
  BrightButton,
  ProgressBar,
} from '@components'

import {
  StyledDeckPreviewInterface,
  StyledDeckPreview,
  StyledPreviewRow,
  StyledPreviewLeftBox,
  StyledLeftSideButtonsContainer
} from './styles';

const { ipcRenderer } = window.require('electron');

function DeckPreviewInterface() {
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
    const loadDeckButton = document.querySelector('#load-deck-button');
    const readyButton = document.querySelector('#ready-button');

    /* Ao clicar no botão de carregar deck, pede para o main
    process abrir a tela para o usuário escolher um arquivo */
    loadDeckButton.onclick = () => {
      ipcRenderer.send('load-deck-button-clicked', i18n.language);
    }
    
    /* Ao clicar no botão de preparado, ativa/desativa o botão e
    avisa ao main process que o botão foi ativo/desativo */
    readyButton.onclick = () => {
      const isEnabled = readyButton.classList.toggle('enabled');
      ipcRenderer.send('ready-button-clicked', isEnabled);
    }

    /* Quando o usuário selecionar o arquivo do deck, limpa o 
    preview do deck, a contagem de cartas e mostra o loader */
    ipcRenderer.on('deck-selected', _ => {
      Utils.clearDeckPreviewRows();
      Utils.resetCardsQuantity(setCardsQuantity);
      Utils.hideButtonsAndShowLoader();
    });

    // Recebe o progresso do "download" do deck pela API
    ipcRenderer.on('load-cards-progress', (_, progress) => {
      setProgressValueTo(progress);
    });

    // Recebe o deck pronto da API
    ipcRenderer.on('cards-loaded', (_, deck) => {
      DeckStorage.set(deck);
      Utils.showButtonsAndHideLoader();
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
    <StyledDeckPreviewInterface>
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
    </StyledDeckPreviewInterface>
  );
}

export default DeckPreviewInterface;