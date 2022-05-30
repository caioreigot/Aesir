import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import InterativeTooltipIcon from '@components/InterativeTooltipIcon';
import MinimalistButton from '@components/MinimalistButton';

import '@styles/pages/Connect.css';

function Connect() {
  return (
    <div className='connect'>
      <Link to="/">
        <FaArrowLeft size="2x" />
      </Link>

      <main>
        <div className='inputs'>
          <input type="text" placeholder="IP" />
          <input type="text" placeholder="Porta" />
          <MinimalistButton onClick={() => console.log('TODO')}>
            CONECTAR
          </MinimalistButton>
        </div>
      </main>

      <InterativeTooltipIcon size="2x">
        Você precisa fornecer o endereço e a porta em que
        o servidor da sala está aberto. Peça estas 
        informações ao criador da sala!
      </InterativeTooltipIcon>
    </div>
  );
}

export default Connect;