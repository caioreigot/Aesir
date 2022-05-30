const path = require('path');

const { app, BrowserWindow, shell } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Cria a Browser Window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    minHeight: 600,
    minWidth: 650,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // E carrega o index.html da aplicação
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Abre o DevTools
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

/* Esse método será chamado quando o Electron tiver terminado de 
inicializar e estiver pronto para criar a janela browser.
Algumas APIs podem ser usadas somente depois que este evento ocorre */
app.whenReady().then(createWindow);

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

mainWindow.webContents.on('new-window', function(e, url) {
  e.preventDefault();
  shell.openExternal(url);
});