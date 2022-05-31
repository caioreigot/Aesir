import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import InterativeTooltipIcon from '@components/InterativeTooltipIcon';
import MinimalistButton from '@components/MinimalistButton';
import MinimalistInput from '@components/MinimalistInput';

import '@styles/pages/Connect.css';

function Connect() {
  return (
    <div className='connect'>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>

      <main>
        <div className='inputs'>
          <MinimalistInput placeholder="Nickname" spellCheck="false" />
          <MinimalistInput placeholder="IP" spellCheck="false" />
          <MinimalistInput placeholder="Porta" spellCheck="false" />
          <MinimalistButton onClick={() => console.log('TODO')}>
            CONECTAR
          </MinimalistButton>
        </div>
      </main>

      <InterativeTooltipIcon size="2x">
        Você precisa fornecer um nickname para se identificar
        dentro da sala do jogo. Também é preciso do endereço e
        porta em que o servidor da sala está aberto. Peça estas 
        informações ao criador da sala!
      </InterativeTooltipIcon>
    </div>
  );
}

export default Connect;