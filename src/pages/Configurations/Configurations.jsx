import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import './Configurations.css';

function Configurations() {
  return (
    <div className='configurations'>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>
    </div>
  );
}

export default Configurations;