const Peer = require('./p2p/Peer');
const DataType = require('./p2p/enums/DataType');
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
    currentPeer.onData = (socket, data) => {
      // TODO
      console.log(data.content);
    };

    addPeerListeners(currentPeer, webContents);
  });

  ipcMain.on('connect-to', (_, originLocation, name, ip, port) => {    
    const connectToRoom = () => {
      currentPeer.onConnection = (socket, peerName) => {};
      currentPeer.onData = (socket, data) => {
        // TODO
        console.log(data.content);
      };
  
      currentPeer.connectTo(ip, port, {
        onConnect: () => {
          const preGameRoomUrl = originLocation
            + `/#/pre-game-room?name=${name}`;
          
          renderer.loadURL(preGameRoomUrl);
        }
      });
    }

    // Se o servidor deste peer ainda não foi aberto, abre
    if (!currentPeer) {
      // E após abrir o servidor, se conecta
      currentPeer = new Peer(name)
        .createServer(connectToRoom);
      
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
    const data = {
      type: DataType.MESSAGE,
      senderName: currentPeer.name,
      content: message
    }

    currentPeer.broadcast(data);
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
  if (progress % 5 === 0) {
    renderer.send('load-cards-progress', progress);
  }
}

const sendCardObjectsToRenderer = (cardObjects) => {
  renderer.send('cards-loaded', { 
    structure: currentDeckStructure,
    cards: cardObjects 
  });
}

module.exports = addMainListeners;