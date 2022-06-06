const Peer = require('./p2p/Peer');
const addPeerListeners = require('./addPeerListeners');
const loadDeck = require('./loadDeck');
const extractDeckFromFile = require('./cardsApi/extractDeckFromFile');
const getCardObjects = require('./cardsApi/getCardObjects');
const { ipcMain } = require('electron');

let renderer;
let currentPeer;

let deckLoaded;

function addMainListeners(webContents) {
  renderer = webContents;

  ipcMain.on('room-created', (event, name) => {
    // Se um servidor já estiver rodando, fecha-lo
    if (currentPeer && currentPeer.server) {
      currentPeer.server.close();
    }

    currentPeer = new Peer(name)
      .createServer(onServerCreated);

    addPeerListeners(currentPeer, webContents);
  });

  ipcMain.on('load-deck', (event, language) => {
    loadDeck(language)
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

const onDeckFileSelected = () =>
  renderer.send('deck-selected');

const saveDeckAndGetCardObjects = (deck) => {
  deckLoaded = deck;
  onDeckFileSelected();

  return getCardObjects(
    deck,
    sendProgressToRenderer
  );
}

const sendProgressToRenderer = (progress) =>
  renderer.send('load-cards-progress', progress);

const sendCardObjectsToRenderer = (cardObjects) =>
  renderer.send('cards-loaded', deckLoaded, cardObjects);

module.exports = addMainListeners;