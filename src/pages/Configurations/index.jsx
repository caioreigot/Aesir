import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import { 
  FaArrowLeft,
  OptionDropdownMenu
} from '@components';

import { StyledConfigurations } from './styles';

const getCurrentLanguage = () => {
  switch (i18n.language) {
    case 'en-US':
      return 'English';
    case 'pt-br':
      return 'Portuguese';
    default:
      break;
  }
}

const changeToBr = () => {
  i18n.changeLanguage("pt-br");
}

function Configurations() {
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  return(
    <StyledConfigurations>
      <Link to="/">
        <FaArrowLeft />
      </Link>
      <div className="container">
       <h2>{t('Language')}:</h2> 
       <OptionDropdownMenu 
        optionSelected={t(currentLanguage)}
        optionsQuantity={2}>
         {t('Portuguese')}
         {t('English')}
       </OptionDropdownMenu>
      </div>
    </StyledConfigurations>
  );
}

export default Configurations;