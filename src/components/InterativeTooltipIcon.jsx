import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import '@styles/components/InterativeTooltipIcon.css';

const onIconMouseOver = () => {
  const tooltip = document.querySelector('.tooltip');
  tooltip.classList.add('show');
}

const onIconMouseLeave = () => {
  const tooltip = document.querySelector('.tooltip');
  tooltip.classList.remove('show');
}

function InterativeTooltipIcon(props) {
  return (
    <>
      <div className='tooltip'>
        <p>{props.children}</p>
      </div>

      <FontAwesomeIcon
        className='fa-circle-question'
        onMouseOver={onIconMouseOver}
        onMouseLeave={onIconMouseLeave}
        icon={faCircleQuestion}
        size={props.size} />
    </>
  );
}

export default InterativeTooltipIcon;