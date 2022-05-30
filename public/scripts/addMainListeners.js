const { ipcMain } = require('electron');
const Peer = require('./p2p/Peer');
const addPeerListeners = require('./addPeerListeners');

let currentPeer;

function addMainListeners(webContents) {
  ipcMain.on('room-created', name => {
    currentPeer = new Peer(name)
      .createServer();

    addPeerListeners(currentPeer, webContents);
  });
}

module.exports = addMainListeners;