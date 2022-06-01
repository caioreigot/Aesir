import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import { StyledConfigurations } from './styles';

function Configurations() {
  return (
    <StyledConfigurations>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </StyledConfigurations>
  );
}

export default Configurations;