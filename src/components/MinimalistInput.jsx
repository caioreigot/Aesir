import '@styles/components/MinimalistInput.css';

function MinimalistInput(props) {
  // Se não foi passado o atributo type à tag, ela é 'text' por padrão
  const typeAttribute = props.text || 'text';

  return(
    <input 
      className='minimalist-input'
      type={typeAttribute} 
      {...props} />
  );
}

export default MinimalistInput;