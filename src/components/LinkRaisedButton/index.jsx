import { StyledLink } from './styles';

function LinkRaisedButton(props) {
  return (
    <StyledLink {...props}>
      {props.children}
    </StyledLink>
  );
}

export default LinkRaisedButton;