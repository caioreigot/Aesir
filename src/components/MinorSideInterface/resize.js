export const addResizerEventListener = () => {
  document.querySelector('.resizer')
    .addEventListener('mousedown', initResize);
}

const initResize = () => {
  blockUserSelect();
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
}

// Não deixa o mouse selecionar algo enquanto estiver dando resize
const blockUserSelect = () => {
  // Cria uma div do tamanho da tela
  const div = document.createElement('div');
  div.className = 'resizer-blocker';
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.zIndex = '9999';
  div.style.backgroundColor = 'transparent';

  // Adiciona esta div ao body
  document.body.appendChild(div);
}

// Remove a tela transparente que não permite o usuário selecionar algo
const unblockUserSelect = () =>
  document.querySelector('.resizer-blocker').remove();

export const resize = (e) => {
  const chatContainer = document.querySelector('.chat-container');
  const parentElement = document.querySelector('.resizer').parentElement;
  const newParentElementHeight = e.clientY - parentElement.offsetTop;
  const newChatContainerHeight = (window.innerHeight - e.clientY);

  parentElement.style.height = `${newParentElementHeight}px`;
  chatContainer.style.height = `${newChatContainerHeight}px`;
}

export const stopResize = () => {
  unblockUserSelect();
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
}

export const resizeChatContent = () => {
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