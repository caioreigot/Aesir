import { StyledOptionDropdownMenu } from './styles';

const menuItemOnClick = (props) => {
  // Roda o onClick fornecido nas props
  props.onClick();

  // Fecha o menu
  document.querySelector('#touch').checked = false;
}

function OptionDropdownMenuItem(props) {
  return(
    <li onClick={() => menuItemOnClick(props)}>
      {props.children}
    </li>
  );
}

function OptionDropdownMenu(props) {
  return(
    <StyledOptionDropdownMenu {...props}>
      <label htmlFor="touch">
        <span>{props.optionSelected || '...'}</span>
      </label>
      <input type="checkbox" id="touch" /> 

      <ul className="slide">
        {props.children}
      </ul>
    </StyledOptionDropdownMenu>
  );
}

export { OptionDropdownMenu, OptionDropdownMenuItem };