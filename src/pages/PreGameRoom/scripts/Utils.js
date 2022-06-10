class Utils {

  static queryLoadDeckButton = '#load-deck-button';
  static queryReadyButton = '#ready-button';
  static queryProgressBar = '.progress-bar';
  static queryDeckPreviewRow = '.deck-preview-row';

  static validateNicknameAndCreateServer(
    ipcRenderer,
    serverCreatedCallback
  ) {
    const nameInput = document.querySelector('.nickname-input');
    const nameEntered = nameInput.value;
  
    const scaleLoader = document.querySelector('.scale-loader');
    
    if (nameEntered.trim() === '') {
      serverCreatedCallback('fill_all_fields');
      return;
    }
  
    // Esconde o container do input
    document.querySelector('.enter-nickname-container')
      .classList.add('hidden');
  
    // Se o servidor demorar mais de 500ms para abrir, exibe o loader
    const showLoaderTimeout = setTimeout(() => {
      scaleLoader.style.display = 'flex';
    }, 500);
  
    // Avisa ao Main Process que o usuário criou uma sala
    ipcRenderer.send('room-created', nameEntered);
  
    // Resposta do Main Process pra quando o servidor foi criado
    ipcRenderer.on('server-created', (_, port) => {
      clearTimeout(showLoaderTimeout);
      scaleLoader.classList.add('hidden');
      
      serverCreatedCallback(null, port);
    });
  }

  static hideButtonsAndShowLoader() {
    document.querySelector(this.queryLoadDeckButton).classList.add('hidden');
    document.querySelector(this.queryReadyButton).classList.add('hidden');
    document.querySelector(this.queryProgressBar).classList.remove('hidden');
  }
  
  static showButtonsAndHideLoader() {
    document.querySelector(this.queryLoadDeckButton).classList.remove('hidden');
    document.querySelector(this.queryReadyButton).classList.remove('hidden');
    document.querySelector(this.queryProgressBar).classList.add('hidden');
  }

  static clearDeckPreviewRows() {
    const rows = [...document.querySelectorAll(this.queryDeckPreviewRow)];

    rows.forEach(row => {
      while (row.firstChild) {
        row.firstChild.remove();
      }
    })
  }

  static resetCardsQuantity(setter) {
    setter({
      Artifact: 0,
      Creature: 0,
      Enchantment: 0,
      Instant: 0,
      Land: 0,
      Sorcery: 0
    });
  }
}

export default Utils;