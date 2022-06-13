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
    const tellRendererThatServerOpened = () =>
      renderer.send('server-created', currentPeer.port);

    // Se o servidor deste peer não estiver aberto, abre
    if (!currentPeer) {
      // E após abrir, avisa ao render process
      currentPeer = new Peer(name)
        .createServer(tellRendererThatServerOpened);

      addPeerListeners(currentPeer, webContents);
      return;
    }

    tellRendererThatServerOpened();
  });

  ipcMain.on('connect-to', (_, originLocation, connectInformations) => {
    const { nickname, ip, port } = connectInformations;

    const connectToRoom = () => {
      currentPeer.connectTo(ip, port, {
        onConnect: () => {
          const preGameRoomUrl = originLocation
            + `/#/pre-game-room?name=${currentPeer.name}`;
          
          renderer.loadURL(preGameRoomUrl);
        }
      });
    }

    // Se o servidor deste peer não estiver aberto, abre
    if (!currentPeer) {
      // E após abrir, se conecta à sala
      currentPeer = new Peer(nickname)
        .createServer(connectToRoom);

      addPeerListeners(currentPeer, webContents);
      return;
    }

    connectToRoom();
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

const sendErrorToRenderer = (error) =>
  renderer.send('error', error);

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