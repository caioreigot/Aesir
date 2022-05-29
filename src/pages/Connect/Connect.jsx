import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import './Connect.css';

function Connect() {
  return (
    <div className='connect'>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </div>
  );
}

export default Connect;