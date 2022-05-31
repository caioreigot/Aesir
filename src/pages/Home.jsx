import { Link } from 'react-router-dom';
import FaGear from '@components/FaGear';
import InterativeGitHubIcon from '@components/InterativeGitHubIcon';
import LinkRaisedButton from '@components/LinkRaisedButton';

import '@styles/pages/Home.css';

function Home() {
  return (
    <div className='home'>
      <header>
        <h1 className='app-name'>Aesir</h1>
        <Link to='/configurations' id='config-btn'>
          <FaGear size='2x' />
        </Link>
      </header>

      <main>
        <LinkRaisedButton to='/pre-game-room'>CRIAR SALA</LinkRaisedButton>
        <LinkRaisedButton to='/connect'>SE CONECTAR</LinkRaisedButton>
      </main>

      <InterativeGitHubIcon 
        size='2x'
        href='https://www.github.com/caioreigot/Aesir'
        title='Veja o projeto no GitHub' />
    </div>
  );
}

export default Home;