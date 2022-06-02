import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { StyledInteractiveTooltipIcon } from './styles';

const onIconMouseOver = () => {
  const tooltip = document.querySelector('.tooltip-modal');
  tooltip.classList.add('show');
}

const onIconMouseLeave = () => {
  const tooltip = document.querySelector('.tooltip-modal');
  tooltip.classList.remove('show');
}

function InteractiveTooltipIcon(props) {
  return (
    <StyledInteractiveTooltipIcon {...props}>
      <div className="tooltip-modal">
        <p>{props.children}</p>
      </div>

      <FontAwesomeIcon
        className="fa-circle-question"
        onMouseOver={onIconMouseOver}
        onMouseLeave={onIconMouseLeave}
        icon={faCircleQuestion}
        size={props.size} />
    </StyledInteractiveTooltipIcon>
  );
}

export default InteractiveTooltipIcon;