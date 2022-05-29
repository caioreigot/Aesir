import FaGear from '@components/FaGear';
import LinkRaisedButton from '@components/LinkRaisedButton/LinkRaisedButton';
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <div className="home">
      <header>
        <h1 className='app-name'>Aesir</h1>
        <Link to="/configurations" id="config-btn">
          <FaGear size="2x" />
        </Link>
      </header>

      <main>
        <LinkRaisedButton to="/play-room">CRIAR SALA</LinkRaisedButton>
        <LinkRaisedButton to="/connect">SE CONECTAR</LinkRaisedButton>
      </main>
    </div>
  );
}

export default Home;