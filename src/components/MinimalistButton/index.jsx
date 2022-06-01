import { StyledButton } from './styles';

function MinimalistButton(props) {
  return(
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  );
}

export default MinimalistButton;