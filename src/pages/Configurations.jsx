import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import '@styles/pages/Configurations.css';

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