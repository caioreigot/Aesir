import FaArrowLeft from '@components/FaArrowLeft';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import MinimalistButton from '@components/MinimalistButton';
import MinimalistInput from '@components/MinimalistInput';

import '@styles/pages/ChooseDeckRoom.css';

const { ipcRenderer } = window.require('electron');

class ChooseDeckRoom extends Component {
  componentDidMount() {
    ipcRenderer.send('room-created');
  }

  render() {
    return (
      <div className='choose-deck-room'>
        <Link to="/">
          <FaArrowLeft size="2x" />
        </Link>

        <div className='enter-name-container'>
          <MinimalistInput placeholder="Nome" spellCheck="false" />
          <MinimalistButton>
            CONFIRMAR
          </MinimalistButton>
        </div>
      </div>
    );
  }
}

export default ChooseDeckRoom;