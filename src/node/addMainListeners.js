const { ipcMain } = require('electron');
const Peer = require('./p2p/Peer');
const P2PDataType = require('./p2p/enums/P2PDataType');
const addPeerListeners = require('./addPeerListeners');
const loadDeckInformation = require('./loadDeckInformation');
const extractDeckFromFile = require('./cardsApi/extractDeckFromFile');
const getCardObjects = require('./cardsApi/getCardObjects');

let renderer;
let currentPeer;
let currentDeckStructure;

function addMainListeners(webContents) {
  renderer = webContents;

  ipcMain.on('room-created', (_, name) => {
    /* Caso o servidor já esteja aberto, 
    fecha ele antes de abrir um novo */
    if (currentPeer) {
      currentPeer.closeServerAndConnections();
    }

    const tellRendererThatServerOpened = () =>
      renderer.send('server-created', currentPeer.port);

    currentPeer = new Peer(name)
      .createServer(tellRendererThatServerOpened);

    addPeerListeners(currentPeer, webContents);
  });

  ipcMain.on('connect-to', (_, originLocation, connectInformations) => {
    const { nickname, ip, port } = connectInformations;

    const connectToRoom = () => {
      currentPeer.connectTo(ip, port, {
        onConnect: () => {
          const preGameRoomUrl = originLocation
            + `/#/pre-game-room?name=${currentPeer.name}`;
          
          renderer.loadURL(preGameRoomUrl);
          addPeerListeners(currentPeer, webContents);
        }
      });
    }

    // Caso o servidor esteja aberto, fecha ele
    if (currentPeer) {
      currentPeer.closeServerAndConnections();
    }

    /* E então abre o servidor para este peer,
    após abrir, se conecta à sala */
    currentPeer = new Peer(nickname)
      .createServer(connectToRoom);
  });

  ipcMain.on('load-deck', (_, language) => {
    loadDeckInformation(language)
      .then(extractDeckFromFile)
      .then(saveDeckAndGetCardObjects)
      .then(sendCardObjectsToRenderer)
      .catch(sendErrorToRenderer);
  });

  ipcMain.on('message-sent', (_, message) => {
    const P2PDataTemplate = {
      type: P2PDataType.MESSAGE,
      senderName: currentPeer.name,
      content: message
    }

    currentPeer.broadcast(P2PDataTemplate);
  });

  ipcMain.on('disconnect-player', () => {
    if (!currentPeer) return;
    currentPeer.closeServerAndConnections();
  });
}

const sendErrorToRenderer = (err) =>
  renderer.send('error', err);

const saveDeckAndGetCardObjects = (deckStructure) => {
  currentDeckStructure = deckStructure;
  renderer.send('deck-selected');

  return getCardObjects(
    deckStructure,
    sendProgressToRenderer
  );
}

const sendProgressToRenderer = (progress) => {
  if (progress % 5 !== 0) return;
  renderer.send('load-cards-progress', progress);
}

const sendCardObjectsToRenderer = (cardObjects) => {
  renderer.send('cards-loaded', { 
    structure: currentDeckStructure,
    cards: cardObjects 
  });
}

module.exports = addMainListeners;