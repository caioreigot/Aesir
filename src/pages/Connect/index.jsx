import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  FaArrowLeft,
  InteractiveTooltipIcon,
  BrightButton,
  ScaleLoader,
  MinimalistInput,
  Snackbar,
  showSnackbar
} from '@components';

import { StyledConnect } from './styles';

const { ipcRenderer } = window.require('electron');

function Connect() {
  const { t } = useTranslation();
  let showLoaderTimeout;

  const showLoader = () => {
    document.querySelector('.connect-button')
      .classList.add('hidden');
    
    document.querySelector('.scale-loader')
      .classList.remove('hidden');
  }

  const hideLoader = () => {
    if (showLoaderTimeout) {
      clearTimeout(showLoaderTimeout);
    }

    document.querySelector('.scale-loader')
      .classList.add('hidden');

    document.querySelector('.connect-button')
      .classList.remove('hidden');
  }

  const onConnectClick = () => {
    const nickname = document.querySelector('.nickname-input').value;
    const ip = document.querySelector('.ip-input').value;
    const port = document.querySelector('.port-input').value;

    if (showLoaderTimeout) {
      clearTimeout(showLoaderTimeout);
    }

    showLoaderTimeout = setTimeout(showLoader, 200);
  
    // Se algum campo estiver vazio
    if (!nickname.trim() || !ip.trim() || !port.trim()) {
      hideLoader();
      showSnackbar('fill_all_fields', 'error');
      return;
    }

    const connectInformations = { nickname, ip, port }

    /* Manda para o Main Process as informações necessárias
    para o connect. Caso consiga se conectar, o Main Process
    carrega a nova URL da sala de pré jogo */
    ipcRenderer.send(
      'connect-to',
      window.location.origin,
      connectInformations
    );
  }

  useEffect(() => {
    const portInput = document.querySelector('.port-input');
    const connectButton = document.querySelector('.connect-button');

    /* Caso o usuário tenha pressionado enter no input
    de porta, o código clica no botão de connect */
    portInput.addEventListener('keyup', event => {
      if (event.keyCode !== 13) return;
      connectButton.click();
    });

    ipcRenderer.on('error', (_, error) => {
      hideLoader();
      showSnackbar(error, 'error');
    });

    return function cleanup() {
      ipcRenderer.removeAllListeners('error');
    }
  }, []);

  return(
    <StyledConnect>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <div className="container">
        <MinimalistInput className="nickname-input" placeholder={t('your-nickname')} />
        <MinimalistInput className="ip-input" placeholder="IP" />
        <MinimalistInput className="port-input" placeholder={t('port')} />
        <BrightButton className="connect-button" 
          $allCaps onClick={onConnectClick}>
          {t('connect')}
        </BrightButton>
        <ScaleLoader $size="45"/>
      </div>

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