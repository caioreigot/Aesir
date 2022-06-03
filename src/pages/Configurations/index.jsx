import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import { 
  FaArrowLeft,
  OptionDropdownMenu,
  OptionDropdownMenuItem
} from '@components';

import { StyledConfigurations } from './styles';

const getCurrentLanguage = () => {
  switch (i18n.language) {
    case 'en-US':
      return 'english';
    case 'pt-BR':
      return 'portuguese';
    default:
      return '?';
  }
}

const changeLanguageToPtBr = () => { i18n.changeLanguage("pt-BR"); }
const changeLanguageToEnUs = () => { i18n.changeLanguage("en-US"); }

function Configurations() {
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  return(
    <StyledConfigurations>
      <Link to="/"><FaArrowLeft /></Link>
      <div className="container">
        <h2>{t('language')}:</h2> 

        <OptionDropdownMenu 
          optionSelected={t(currentLanguage)}
          optionsQuantity={2}
        >
          <OptionDropdownMenuItem onClick={changeLanguageToPtBr}>
            {t('portuguese')}
          </OptionDropdownMenuItem>
          <OptionDropdownMenuItem onClick={changeLanguageToEnUs}>
            {t('english')}
          </OptionDropdownMenuItem>
       </OptionDropdownMenu>
       
      </div>
    </StyledConfigurations>
  );
}

export default Configurations;