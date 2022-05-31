import { Link } from 'react-router-dom';
import { Component } from 'react';
import FaArrowLeft from '@components/FaArrowLeft';
import MinimalistButton from '@components/MinimalistButton';
import MinimalistInput from '@components/MinimalistInput';
import ScaleLoader from '@components/ScaleLoader';
import { Snackbar, showSnackbar } from '@components/Snackbar';

import '@styles/pages/PreGameRoom.css';

const { ipcRenderer } = window.require('electron');

function onConfirmNickname() {
  const nameInput = document.querySelector('#nickname-input');
  const nameEntered = nameInput.value;
  
  if (nameEntered.trim() === '') {
    showSnackbar('Nickname fornecido não é valido!', 'error');
    return;
  }

  // Esconde o container do input
  document.querySelector('.enter-nickname-container')
    .style.display = 'none';

  // Exibe o loader
  document.querySelector('.scale-loader')
    .style.display = 'flex';

  // Avisa ao Main Process que o usuário criou uma sala
  ipcRenderer.send('room-created', nameEntered);

  // Resposta do Main Process pra quando o servidor foi criado
  ipcRenderer.on('server-created', (event, port) => {
    // TODO: mostrar a janela para importar o deck e mostrar a porta
  });
}

class PreGameRoom extends Component {
  // Roda depois do primeiro render()
  componentDidMount() {
    const nicknameInput = document.querySelector('#nickname-input');

    // Caso o usuário tenha pressionado enter, chama o método de confirmação
    nicknameInput.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        onConfirmNickname();
      }
    });
  }

  render() {
    return(
      <div className='pre-game-room'>
        <Link to='/'>
          <FaArrowLeft size='2x' />
        </Link>

        <div className='enter-nickname-container'>
          <MinimalistInput 
            id='nickname-input'
            placeholder='Nickname'
            spellCheck='false' />
          
          <MinimalistButton onClick={onConfirmNickname}>
            CONFIRMAR
          </MinimalistButton>
        </div>

        <ScaleLoader size="50"/>
        <Snackbar />
      </div>
    );
  }
}

export default PreGameRoom;