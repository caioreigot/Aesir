import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';

import { StyledPlayRoom } from './styles';

function PlayRoom() {
  return (
    <StyledPlayRoom>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </StyledPlayRoom>
  );
}

export default PlayRoom;