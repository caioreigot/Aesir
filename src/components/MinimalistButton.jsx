import '@styles/components/MinimalistButton.css';

function MinimalistButton(props) {
  return(
    <button
      className='minimalist-button'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default MinimalistButton;