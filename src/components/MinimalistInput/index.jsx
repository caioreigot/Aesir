import { StyledInput } from './styles';

function MinimalistInput(props) {
  // Se não foi passado o atributo type à tag, ela é 'text' por padrão
  const typeAttribute = props.text || 'text';

  return(
    <StyledInput
      type={typeAttribute}
      spellCheck="false"
      {...props} />
  );
}

export default MinimalistInput;