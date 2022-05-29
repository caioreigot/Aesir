import FaGear from '@components/FaGear';
import LinkRaisedButton from '@components/LinkRaisedButton/LinkRaisedButton';

import './Home.css';

function Home() {
  return (
    <div className="home">
      <header>
        <h1>Aesir</h1>
        <FaGear size="2x" />
      </header>

      <main>
        <LinkRaisedButton to="/play-room">CRIAR SALA</LinkRaisedButton>
        <LinkRaisedButton to="/connect">SE CONECTAR</LinkRaisedButton>
      </main>
    </div>
  );
}

export default Home;