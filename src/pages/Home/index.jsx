import { Link } from 'react-router-dom';
import FaGear from '@components/FaGear';
import InteractiveTooltipIcon from '@components/InteractiveGitHubIcon/index';
import LinkRaisedButton from '@components/LinkRaisedButton/index';

import { StyledHome, StyledAppName } from './styles';

function Home() {
  return (
    <StyledHome>
      <header>
        <StyledAppName>Aesir</StyledAppName>
        <Link to='/configurations' id='config-btn'>
          <FaGear size='2x' />
        </Link>
      </header>

      <main>
        <LinkRaisedButton to='/pre-game-room'>CRIAR SALA</LinkRaisedButton>
        <LinkRaisedButton to='/connect'>SE CONECTAR</LinkRaisedButton>
      </main>

      <InteractiveTooltipIcon 
        href='https://www.github.com/caioreigot/Aesir'
        title='Veja o projeto no GitHub'
        absolutePosition bottom='20px' right='20px'
        margin='15px' />
    </StyledHome>
  );
}

export default Home;