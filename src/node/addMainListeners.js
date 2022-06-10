const Peer = require('./p2p/Peer');
const addPeerListeners = require('./addPeerListeners');
const loadDeckInformation = require('./loadDeckInformation');
const extractDeckFromFile = require('./cardsApi/extractDeckFromFile');
const getCardObjects = require('./cardsApi/getCardObjects');
const { ipcMain } = require('electron');

let renderer;
let currentPeer;

let currentDeckStructure;

function addMainListeners(webContents) {
  renderer = webContents;

  ipcMain.on('room-created', (_, name) => {
    // Se um servidor já estiver rodando, fecha ele
    if (currentPeer && currentPeer.server) {
      currentPeer.server.close();
    }

    currentPeer = new Peer(name)
      .createServer(onServerCreated);

    currentPeer.onConnection = (socket, peerName) => {};
    currentPeer.onData = (socket, data) => {};

    addPeerListeners(currentPeer, webContents);
  });

  ipcMain.on('connect-to', (_, name, ip, port) => {
    const connect = () => {
      console.log(`Connecting to ${ip}:${port}`);

      currentPeer.onConnection = (socket, peerName) => {};
      currentPeer.onData = (socket, data) => {};
  
      currentPeer.connectTo(ip, port, {
        onConnect: () => {
          console.log('Connected!');

          // TODO: Mandar ao ipcRenderer que o cliente está conectado
        }
      });
    }

    if (!currentPeer) {
      currentPeer = new Peer(name).createServer(connect);
      return;
    }

    connect();
  });

  ipcMain.on('load-deck', (_, language) => {
    loadDeckInformation(language)
      .then(extractDeckFromFile)
      .then(saveDeckAndGetCardObjects)
      .then(sendCardObjectsToRenderer)
      .catch(sendErrorToRenderer);
  });
}

const sendErrorToRenderer = (err) =>
  renderer.send('error', err);

const onServerCreated = () => 
  renderer.send('server-created', currentPeer.port);

const saveDeckAndGetCardObjects = (deckStructure) => {
  currentDeckStructure = deckStructure;
  renderer.send('deck-selected');

  return getCardObjects(
    deckStructure,
    sendProgressToRenderer
  );
}

const sendProgressToRenderer = (progress) => {
  renderer.send('load-cards-progress', progress);
}

const sendCardObjectsToRenderer = (cardObjects) => {
  renderer.send('cards-loaded', { 
    structure: currentDeckStructure,
    cards: cardObjects 
  });
}

module.exports = addMainListeners;