import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import './PlayRoom.css';

function PlayRoom() {
  return (
    <>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </>
  );
}

export default PlayRoom;