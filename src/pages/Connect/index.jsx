import { Component } from 'react';
import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';
import InteractiveTooltipIcon from '@components/InteractiveTooltipIcon';
import MinimalistButton from '@components/MinimalistButton';
import MinimalistInput from '@components/MinimalistInput';
import { Snackbar, showSnackbar } from '@components/Snackbar';

import { StyledConnect } from './styles';

const onConnectClick = () => {
  const nicknameEntered = document.querySelector('.nickname-input').value;
  const ipEntered = document.querySelector('.ip-input').value;
  const portEntered = document.querySelector('.port-input').value;

  // Se algum campo estiver vazio
  if (!nicknameEntered.trim() || !ipEntered.trim() || !portEntered.trim()) {
    showSnackbar('Preencha todos os campos!', 'error');
  }
}

class Connect extends Component {
  componentDidMount() {
    const portInput = document.querySelector('.port-input');

    // Caso o usuário tenha pressionado enter no input de porta
    // chama o método para se conectar
    portInput.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        onConnectClick();
      }
    });
  }

  render() {
    return(
      <StyledConnect>
        <Link to="/">
          <FaArrowLeft />
        </Link>

        <main>
          <div className='container'>
            <MinimalistInput className='nickname-input' placeholder="Nickname" />
            <MinimalistInput className='ip-input' placeholder="IP" />
            <MinimalistInput className='port-input' placeholder="Porta" />
            <MinimalistButton onClick={onConnectClick}>
              CONECTAR
            </MinimalistButton>
          </div>
        </main>

        <InteractiveTooltipIcon 
          size="2x"
          $fixedPosition bottom='20px' right='20px'
        >
          Você precisa fornecer um nickname para se identificar
          dentro da sala do jogo. Também é preciso do endereço e
          porta em que o servidor da sala está aberto. Peça estas 
          informações ao criador da sala!
        </InteractiveTooltipIcon>

        <Snackbar />
      </StyledConnect>
    );
  } 
}

export default Connect;