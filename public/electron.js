const path = require('path');

const { BrowserWindow, app } = require('electron');
const addMainListeners = require('../src/node/addMainListeners');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Cria a Browser Window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    minWidth: 880,
    minHeight: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // E carrega o index.html da aplicação
  mainWindow.loadURL(
    isDev
      ? `http://localhost:${process.env.PORT || 3000}`
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Abre o DevTools
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.webContents.setWindowOpenHandler(details => {
    return {
      action: 'allow'
    }
  });

  // Install React Dev Tools
  const { 
    default: installExtension, 
    REACT_DEVELOPER_TOOLS 
  } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
      console.log(`Extensão adicionada:  ${name}`);
  })
  .catch((err) => {
      console.log('Ocorreu um erro: ', err);
  });

  /* Adiciona os listeners ao main process
  (que também contem listeners para as conexões
  P2P, possibilitando o jogo online) */
  addMainListeners(mainWindow.webContents);
}

/* Esse método será chamado quando o Electron tiver terminado de 
inicializar e estiver pronto para criar a janela browser.
Algumas APIs podem ser usadas somente depois que este evento ocorre */
app.whenReady()
  .then(createWindow);

/* Fecha quando todas as janelas forem fechadas, exceto no macOS.
É comum para as aplicações e suas barras de menu ficarem ativas
até que o usuário feche explicitamente com CMD + Q */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});