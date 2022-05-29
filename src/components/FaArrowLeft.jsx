import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function FaArrowLeft(props) {
  return (
    <FontAwesomeIcon 
      id="fa-arrow-left" 
      icon={faArrowLeft} 
      size={props.size} />
  );
}

export default FaArrowLeft;