import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  FaArrowLeft,
  InteractiveTooltipIcon,
  BrightButton,
  MinimalistInput,
  Snackbar,
  showSnackbar
} from '@components';

import { StyledConnect } from './styles';

const { ipcRenderer } = window.require('electron');

function Connect() {
  const { t } = useTranslation();

  const onConnectClick = () => {
    const nicknameEntered = document.querySelector('.nickname-input').value;
    const ipEntered = document.querySelector('.ip-input').value;
    const portEntered = document.querySelector('.port-input').value;
  
    // Se algum campo estiver vazio
    if (!nicknameEntered.trim() || !ipEntered.trim() || !portEntered.trim()) {
      showSnackbar('fill_all_fields', 'error');
      return;
    }

    ipcRenderer.send(
      'connect-to',
      nicknameEntered,
      ipEntered,
      portEntered
    );

    // TODO: Receber do ipcRenderer o aviso de que a conexão foi feita
  }

  useEffect(() => {
    const portInput = document.querySelector('.port-input');
    const connectButton = document.querySelector('.connect-button');

    /* Caso o usuário tenha pressionado enter no input
    de porta, chama a função de connect */
    portInput.addEventListener("keyup", event => {
      if (event.keyCode !== 13) return;
      connectButton.click();
    });
  }, []);

  return(
    <StyledConnect>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <main>
        <div className="container">
          <MinimalistInput className="nickname-input" placeholder="Nickname" />
          <MinimalistInput className="ip-input" placeholder="IP" />
          <MinimalistInput className="port-input" placeholder={t('port')} />
          <BrightButton className="connect-button" 
            $allCaps onClick={onConnectClick}>
            {t('connect')}
          </BrightButton>
        </div>
      </main>

      <InteractiveTooltipIcon 
        size="2x"
        $fixedPosition bottom="20px" right="20px"
      >
        {t('tooltip:connect')}
      </InteractiveTooltipIcon>

      <Snackbar />
    </StyledConnect>
  );
}

export default Connect;