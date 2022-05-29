import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import './Connect.css';

function Connect() {
  return (
    <>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </>
  );
}

export default Connect;