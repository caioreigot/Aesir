import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import './PlayRoom.css';

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