import { StyledDropdownMenu } from './styles';

function DropdownMenu() {
  return(
    <StyledDropdownMenu>
      <button>Dropdown</button>
      <div className="content show">
        <p>Português</p>
        <p>Inglês</p>
      </div>
    </StyledDropdownMenu>
  );
}

export default DropdownMenu;