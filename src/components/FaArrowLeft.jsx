import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function FaArrowLeft(props) {
  return (
    <FontAwesomeIcon
      className="fa-arrow-left" 
      icon={faArrowLeft} 
      size={props.size || "2x"} />
  );
}

export default FaArrowLeft;