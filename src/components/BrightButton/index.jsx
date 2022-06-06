import { StyledBrightButton } from './styles';

function BrightButton(props) {
  return(
    <StyledBrightButton {...props}>
      {props.children}
    </StyledBrightButton>
  );
}

export default BrightButton;