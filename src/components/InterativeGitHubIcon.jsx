import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons' 

import '@styles/components/InterativeGitHubIcon.css';

function FaGitHub(props) {
  return (
    <a 
      className='fa-github' 
      href={props.href}
      target="_blank"
      rel="noreferrer"
      title='Apoie o projeto no GitHub'
    >
      <FontAwesomeIcon 
        icon={faGithub}
        size={props.size}
        onClick={props.onClick} />
    </a>
  );
}

export default FaGitHub;