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
       <h2>Linguagem:</h2> 
       <DropdownMenu optionSelected='Português'>
         <li>Português</li>
         <li>Inglês</li>
       </DropdownMenu>
      </div>
    </StyledConfigurations>
  );
}

export default Configurations;