import { Link } from "react-router-dom"
import './LinkRaisedButton.css';

function LinkRaisedButton(props) {
  return (
    <Link className="link-raised-button" to={props.to}>
      {props.children}
    </Link>
  );
}

export default LinkRaisedButton;