const { ipcMain } = require('electron');
const Peer = require('./p2p/Peer');
const addPeerListeners = require('./addPeerListeners');

let currentPeer;

function addMainListeners(webContents) {
  ipcMain.on('room-created', (event, name) => {
    // Se um servidor já estiver rodando, fecha-lo
    if (currentPeer && currentPeer.server) {
      currentPeer.server.close();
    }

    currentPeer = new Peer(name)
      .createServer(() => onServerCreated(webContents));

    addPeerListeners(currentPeer, webContents);
  });
}

const onServerCreated = (webContents) => 
  webContents.send('server-created', currentPeer.port);

module.exports = addMainListeners;