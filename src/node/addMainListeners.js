const { ipcMain } = require('electron');
const { setPlayerReadyStatus } = require('./preGameRoomState');
const Utils = require('./Utils');
const Peer = require('./p2p/Peer');
const P2PDataType = require('./p2p/enums/P2PDataType');
const addPeerListeners = require('./addPeerListeners');
const loadDeckInformation = require('./loadDeckInformation');
const extractDeckFromFile = require('./cardsApi/extractDeckFromFile');
const getCardObjects = require('./cardsApi/getCardObjects');
const PeerStorage = require('./PeerStorage');

let currentDeckStructure;

function addMainListeners(webContents) {
  ipcMain.on('room-created', (_, name) => {
    const tellRendererThatServerOpened = () => {
      const peer = PeerStorage.getPeer();
      webContents.send('server-created', peer.port);
    }

    // Se o servidor deste peer não estiver aberto, abre
    if (!PeerStorage.getPeer()) {
      // E após abrir, avisa ao render process
      const currentPeer = new Peer(name)
        .createServer(() => {
          PeerStorage.setPeer(currentPeer);
          tellRendererThatServerOpened();
        });
      
      addPeerListeners(currentPeer, webContents);
      return;
    }

    tellRendererThatServerOpened();
  });

  ipcMain.on('connect-to', (_, connectInformations) => {
    const { nickname, ip, port } = connectInformations;

    const connectToRoom = () => {
      const peer = PeerStorage.getPeer();

      peer.connectTo(ip, port, {
        onConnect: () => {
          const endUrl = `pre-game-room?name=${peer.name}`;
          Utils.loadURL(webContents, endUrl);
        }
      });
    }

    // Se o servidor deste peer não estiver aberto, abre
    if (!PeerStorage.getPeer()) {
      // E após abrir, se conecta à sala
      const currentPeer = new Peer(nickname)
        .createServer(() => {
          PeerStorage.setPeer(currentPeer);
          connectToRoom();
        });

      addPeerListeners(currentPeer, webContents);
      return;
    }

    connectToRoom();
  });

  ipcMain.on('disconnect-player', () => {
    const peer = PeerStorage.getPeer();
    if (!peer) return;
    
    peer.closeServerAndConnections();
  });

  ipcMain.on('load-deck-button-clicked', (_, language) => {
    loadDeckInformation(language)
      .then(extractDeckFromFile)
      .then(saveDeckAndGetCardObjects)
      .then(sendCardObjectsToRenderer)
      .catch(sendErrorToRenderer);
  });

  ipcMain.on('ready-button-clicked', (_, isReady) => {
    const peer = PeerStorage.getPeer();

    setPlayerReadyStatus(peer.name, isReady, () => {
      Utils.loadURL(webContents, 'play-room');
    });

    // Avisa aos outros peers que este peer está pronto
    const P2PDataTemplate = {
      type: P2PDataType.READY,
      senderName: peer.name,
      content: isReady
    }

    peer.broadcast(P2PDataTemplate);
  });

  ipcMain.on('message-sent', (_, message) => {
    const peer = PeerStorage.getPeer();

    const P2PDataTemplate = {
      type: P2PDataType.MESSAGE,
      senderName: peer.name,
      content: message
    }

    peer.broadcast(P2PDataTemplate);
  });

  /* Funções auxiliares */

  const sendErrorToRenderer = (error) => {
    webContents.send('error', error);
  }

  const saveDeckAndGetCardObjects = (deckStructure) => {
    currentDeckStructure = deckStructure;
    webContents.send('deck-selected');

    return getCardObjects(
      deckStructure,
      sendProgressToRenderer,
      sendErrorToRenderer
    );
  }

  const sendProgressToRenderer = (progress) => {
    if (progress % 5 !== 0) return;
    webContents.send('load-cards-progress', progress);
  }

  const sendCardObjectsToRenderer = (cardObjects) => {
    webContents.send('cards-loaded', { 
      structure: currentDeckStructure,
      cards: cardObjects 
    });
  }
}

module.exports = addMainListeners;