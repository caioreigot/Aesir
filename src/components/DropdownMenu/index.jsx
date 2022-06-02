import { StyledDropdownMenu } from './styles';

function DropdownMenu(props) {
  return(
    <StyledDropdownMenu listSize={props.children.length}>
      <label htmlFor='touch'>
        <span>{props.optionSelected}</span>
      </label>
      <input type='checkbox' id='touch' /> 

      <ul className='slide'>
        {props.children}
      </ul>
    </StyledDropdownMenu>
  );
}

export default DropdownMenu;