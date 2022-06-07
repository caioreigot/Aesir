class Utils {

  static queryLoadDeckButton = '#load-deck-button';
  static queryReadyButton = '#ready-button';
  static queryProgressBar = '.progress-bar';
  static queryDeckPreviewRow = '.deck-preview-row';

  static validateNicknameAndCreateServer(ipcRenderer, onErrorCallback) {
    const nameInput = document.querySelector('#nickname-input');
    const nameEntered = nameInput.value;
  
    const scaleLoader = document.querySelector('.scale-loader');
    
    if (nameEntered.trim() === '') {
      onErrorCallback('fill_all_fields');
      return;
    }
  
    // Esconde o container do input
    document.querySelector('.enter-nickname-container')
      .style.display = 'none';
  
    // Se o servidor demorar mais de 500ms para abrir, exibe o loader
    const showLoaderTimeout = setTimeout(() => {
      scaleLoader.style.display = 'flex';
    }, 500);
  
    // Avisa ao Main Process que o usuário criou uma sala
    ipcRenderer.send('room-created', nameEntered);
  
    // Resposta do Main Process pra quando o servidor foi criado
    ipcRenderer.on('server-created', (event, port) => {
      clearTimeout(showLoaderTimeout);
      scaleLoader.style.display = 'none';
    });
  }

  static hideButtonsAndShowLoader() {
    document.querySelector(this.queryLoadDeckButton).style.display = 'none';
    document.querySelector(this.queryReadyButton).style.display = 'none';
    document.querySelector(this.queryProgressBar).style.display = 'flex';
  }
  
  static showButtonsAndHideLoader() {
    document.querySelector(this.queryLoadDeckButton).style.display = 'block';
    document.querySelector(this.queryReadyButton).style.display = 'block';
    document.querySelector(this.queryProgressBar).style.display = 'none';
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