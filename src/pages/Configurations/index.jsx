import { Link } from 'react-router-dom';

import { 
  FaArrowLeft,
  DropdownMenu
} from '@components';

import { StyledConfigurations } from './styles';
// import i18n from 'i18next';

// const changeToBr = () => {
//   i18n.changeLanguage("pt-br");
// }

function Configurations() {
  return(
    <StyledConfigurations>
      <Link to="/">
        <FaArrowLeft />
      </Link>
      <div className="container">
       <DropdownMenu />
      </div>
    </StyledConfigurations>
  );
}

export default Configurations;