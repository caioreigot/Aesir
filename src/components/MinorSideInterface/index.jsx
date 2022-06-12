import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { 
  StyledSideMinorInterface,
  StyledChat,
  TopContainer,
} from './styles';

import {
  MinimalistInput,
  Resizer
} from '@components';

import {
  addResizerEventListener,
  resizerCleanup
} from './resize';

const { ipcRenderer } = window.require('electron');
export let sendMessageToChat;

function MinorSideInterface() {
  const { t } = useTranslation();
  const [chatMessages, setChatMessages] = useState([]);

  sendMessageToChat = ({ author, message }) => {
    let key = Date.now();
    let newMessage;
    
    // Se não há um autor, então é o sistema
    if (!author) {
      newMessage = <p key={key}><strong>{message}</strong></p>;
    } else {
      key += author;
      newMessage = <p key={key}><strong>{author}</strong>: {message}</p>;
    }

    setChatMessages([...chatMessages, newMessage]);
  }

  const implementSendMessageSystem = () => {
    const chatInput = document.querySelector('.chat-input');
    
    chatInput.addEventListener("keyup", event => {
      // Se não foi pressionado o enter ou a mensagem está vazia, retorne
      if (event.keyCode !== 13 || chatInput.value.trim().length === 0) return;
      
      const author = localStorage.getItem('nickname');
      const message = { author, message: chatInput.value };

      sendMessageToChat(message);
      ipcRenderer.send('message-sent', message);
      
      // Limpa o input
      chatInput.value = '';
    });
  }

  const implementReceiveMessageSystem = () => {
    ipcRenderer.on('new-message', (_, senderName, message) => {
      sendMessageToChat(message);
    });

    ipcRenderer.on('log-chat', (_, log) => {
      sendMessageToChat({ message: log });
    });
  }

  useEffect(() => {
    addResizerEventListener();
    implementSendMessageSystem();
    implementReceiveMessageSystem();

    return resizerCleanup;
  }, []);

  return(
    <StyledSideMinorInterface>
      <TopContainer>
        <p className="card-preview-text">Card Preview</p>
        <img alt="Card Preview" className="single-image-preview hidden" />
        <Resizer />
      </TopContainer>
      <StyledChat className="chat-container">
        <div className="chat-content">
          {chatMessages}
        </div>
        <MinimalistInput 
          className="chat-input" 
          placeholder={t('message')} />
      </StyledChat>
    </StyledSideMinorInterface>
  );
}

export default MinorSideInterface;