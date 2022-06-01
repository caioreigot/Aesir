import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import InteractiveTooltipIcon from '@components/InteractiveTooltipIcon/index';
import MinimalistButton from '@components/MinimalistButton/index';
import MinimalistInput from '@components/MinimalistInput/index';

import { StyledConnect } from './styles';

function Connect() {
  return (
    <StyledConnect>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>

      <main>
        <div className='inputs'>
          <MinimalistInput placeholder="Nickname" spellCheck="false" />
          <MinimalistInput placeholder="IP" spellCheck="false" />
          <MinimalistInput placeholder="Porta" spellCheck="false" />
          <MinimalistButton 
            onClick={() => console.log('TODO')}
            width='100%'
            margin='8px 0 0 0'
          >
            CONECTAR
          </MinimalistButton>
        </div>
      </main>

      <InteractiveTooltipIcon 
        size="2x"
        fixedPosition bottom='20px' right='20px'
      >
        Você precisa fornecer um nickname para se identificar
        dentro da sala do jogo. Também é preciso do endereço e
        porta em que o servidor da sala está aberto. Peça estas 
        informações ao criador da sala!
      </InteractiveTooltipIcon>
    </StyledConnect>
  );
}

export default Connect;