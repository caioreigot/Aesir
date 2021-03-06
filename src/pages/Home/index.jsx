import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  FaGear,
  InteractiveGitHubIcon,
  LinkRaisedButton
} from '@components'

import { StyledHome, StyledAppName } from './styles';

function Home() {
  const { t } = useTranslation();

  return (
    <StyledHome>
      <header>
        <StyledAppName>Aesir</StyledAppName>
        <Link to="/configurations" className="config-btn">
          <FaGear title={t('home:configurations')}/>
        </Link>
      </header>

      <main>
        <LinkRaisedButton to="/pre-game-room" $uppercase>
          {t('home:create_room')}
        </LinkRaisedButton>
        <LinkRaisedButton to="/connect" $uppercase>
          {t('home:connect')}
        </LinkRaisedButton>
      </main>

      <InteractiveGitHubIcon 
        href="https://www.github.com/caioreigot/Aesir"
        title={t('home:see_project_github')}
        $absolutePosition bottom="20px" right="20px"
        margin="15px" />
    </StyledHome>
  );
}

export default Home;