import React, { useEffect, useCallback } from 'react';

import { 
  StyledSideMinorInterface,
  StyledChat,
  TopContainer
} from './styles';

import {
  MinimalistInput
} from '@components';

/* TODO 
  Fazer do resize um react component
  Reformular o código e perfomatizar o resize
*/

const resize = (e) => {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.firstChild.style.userSelect = 'none';

  const parentElement = document.querySelector('.resizer').parentElement;
  parentElement.style.height = (e.clientY - parentElement.offsetTop) + 'px';

  const value = (window.innerHeight - e.clientY);
  chatContainer.style.height = `${value}px`;
}

const stopResize = _ => {
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);

  document.querySelector('.chat-content').style.userSelect = 'auto';
}

const initResize = (e) => {
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
}

const addResizerEventListener = () => {
  const resizer = document.querySelector('.resizer');
  
  resizer.addEventListener('mousedown', 
    e => initResize(e, resizer.parentElement));
}

const resizeChatContent = () => {
  const interfaceContainer = document.querySelector('.single-image-preview')
    .parentElement
    .parentElement;
  
  const topContainer = document.querySelector('.single-image-preview').parentElement;
  const bottomContainer = document.querySelector('.chat-container');

  const emptySpace = 
    interfaceContainer.clientHeight 
    - topContainer.clientHeight
    - bottomContainer.clientHeight

  const chatContainerNewSize =  bottomContainer.clientHeight + emptySpace;
  
  bottomContainer.style.height = `${chatContainerNewSize}px`;
}

function MinorSideInterface() {
  useEffect(() => {
    resizeChatContent();
    addResizerEventListener();

    window.addEventListener('resize', resizeChatContent);

    return function cleanup() {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    }
  }, []);

  return(
    <StyledSideMinorInterface>
      <TopContainer>
        <p className="card-preview-text">Card Preview</p>
        <img alt="Card Preview" className="single-image-preview hidden" />
        <div className="resizer">
          <div></div>
        </div>
      </TopContainer>
      <StyledChat className="chat-container">
        <div className="chat-content">
          <p><strong>Caio:</strong> oi oi</p>
          <p><strong>Jãozinho nome grande:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, pariatur.</p>
          <p><strong>Pedrão digita muito:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt molestiae nemo illum veniam perferendis similique quam, culpa enim ipsam modi voluptatum? Laborum, alias. Adipisci exercitationem nemo repudiandae. Enim, nam!</p>
          <p><strong>Pedrão digita muito:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt molestiae nemo illum veniam perferendis similique quam, culpa enim ipsam modi voluptatum? Laborum, alias. Adipisci exercitationem nemo repudiandae. Enim, nam!</p>
          <p><strong>Pedrão digita muito:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt molestiae nemo illum veniam perferendis similique quam, culpa enim ipsam modi voluptatum? Laborum, alias. Adipisci exercitationem nemo repudiandae. Enim, nam!</p>
        </div>
        <MinimalistInput className="chat-input" />
      </StyledChat>
    </StyledSideMinorInterface>
  );
}

export default MinorSideInterface;