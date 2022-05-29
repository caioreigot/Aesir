import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

function FaGear(props) {
  return (
    <FontAwesomeIcon 
      className="fa-gear"
      icon={faGear}
      size={props.size} />
  );
}

export default FaGear;