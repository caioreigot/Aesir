import { StyledOptionDropdownMenu } from './styles';

const getListItems = (children) => {
    const listItems = children.map(
      (text, i) => 
        <li key={i}>{text}</li>
    );

    return listItems;
}

function OptionDropdownMenu(props) {
  return(
    <StyledOptionDropdownMenu {...props}>
      <label htmlFor="touch">
        <span>{props.optionSelected}</span>
      </label>
      <input type="checkbox" id="touch" /> 

      <ul className="slide">
        {getListItems(props.children)}
      </ul>
    </StyledOptionDropdownMenu>
  );
}

export default OptionDropdownMenu;