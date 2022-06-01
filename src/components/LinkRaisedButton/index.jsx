import { StyledLink } from './styles';

function LinkRaisedButton(props) {
  return (
    <StyledLink to={props.to}>
      {props.children}
    </StyledLink>
  );
}

export default LinkRaisedButton;