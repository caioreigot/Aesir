import { join } from 'path';

import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

function createWindow() {
  // Cria a browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  /* E carrega o index.html da aplicação
  win.loadFile("index.html") */
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

/* Esse método será chamado quando o Electron tiver terminado de 
inicializar e estiver pronto para criar a janela browser.
Algumas APIs podem ser usadas somente depois que este evento ocorre. */
app.whenReady().then(createWindow);

/* Fecha quando todas as janelas forem fechadas, exceto no macOS.
É comum para as aplicações e suas barras de menu ficarem ativas
até que o usuário feche explicitamente com CMD + Q. */
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