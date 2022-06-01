import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons' 

import { StyledInteractiveGitHubIcon } from './styles';

function FaGitHub(props) {
  return (
    <StyledInteractiveGitHubIcon
      href={props.href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <FontAwesomeIcon 
        icon={faGithub}
        size='2x' />
    </StyledInteractiveGitHubIcon>
  );
}

export default FaGitHub;