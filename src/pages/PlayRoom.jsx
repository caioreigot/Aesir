import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';

import '@styles/pages/PlayRoom.css';

function PlayRoom() {
  return (
    <div className='play-room'>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </div>
  );
}

export default PlayRoom;