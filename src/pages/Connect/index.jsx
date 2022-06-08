import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  FaArrowLeft,
  InteractiveTooltipIcon,
  BrightButton,
  MinimalistInput,
  Snackbar,
  showSnackbar
} from '@components';

import { StyledConnect } from './styles';

const onConnectClick = () => {
  const ipEntered = document.querySelector('.ip-input').value;
  const portEntered = document.querySelector('.port-input').value;

  // Se algum campo estiver vazio
  if (!ipEntered.trim() || !portEntered.trim()) {
    showSnackbar('fill_all_fields', 'error');
  }
}

function Connect() {
  const { t } = useTranslation();

  useEffect(() => {
    const portInput = document.querySelector('.port-input');

    /* Caso o usuário tenha pressionado enter no input
    de porta, chama a função de connect */
    portInput.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        onConnectClick();
      }
    });
  }, []);

  return(
    <StyledConnect>
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <main>
        <div className="container">
          <MinimalistInput className="ip-input" placeholder="IP" />
          <MinimalistInput className="port-input" placeholder={t('port')} />
          <BrightButton $allCaps onClick={onConnectClick}>
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