const { setPlayerReadyStatus } = require('./preGameRoomState.js');
const P2PDataType = require('./p2p/enums/P2PDataType');
const ErrorContext = require('./p2p/enums/ErrorContext');
const Utils = require('./Utils');

function addPeerListeners(peer, webContents) {
  peer.onConnection = onConnection;
  peer.onDisconnect = onDisconnect;
  peer.onError = onError;
  peer.onData = onData

  // Função chamada quando este peer recebe uma conexão
  function onConnection(socket, peerName) {
    webContents.send('player-connected', peerName);
  }

  // Função chamada quando um peer se desconecta
  function onDisconnect(socket, host) {
    webContents.send('player-disconnected', host.name);
  }

  // Função chamada quando este peer recebe uma informação
  function onData(socket, P2PDataTemplate) {
    const { type, senderName, content } = P2PDataTemplate;

    switch (type) {
      case P2PDataType.STATE:
        peer.state = content;
        webContents.send('set-state', content);
        break;

      case P2PDataType.MESSAGE:
        webContents.send('new-message', content);
        break;

      case P2PDataType.READY:
        setPlayerReadyStatus(senderName, content, () => {
          Utils.loadURL(webContents, 'play-room');
        });
        break;

      default:
        break;
    }
  }

  // Função chamada quando ocorre algum erro no peer
  function onError(error, context) {
    let errorTypeOrMessage = error;

    const errorMessageLowerCase = error.message
      ? error.message.toLowerCase()
      : error.toLowerCase();

    switch (context) {
      case ErrorContext.CONNECT:
        if (errorMessageLowerCase.includes('etimedout')) {
          errorTypeOrMessage = 'ETIMEDOUT';
        } else if (errorMessageLowerCase.includes('econnrefused')) {
          errorTypeOrMessage = 'ECONNREFUSED';
        } else if (errorMessageLowerCase.includes('enotfound')) {
          errorTypeOrMessage = 'ENOTFOUND';
        } else if (errorMessageLowerCase.includes('eai_again')) {
          errorTypeOrMessage = 'EAIAGAIN';
        } else if (errorMessageLowerCase.includes('port should be')) {
          errorTypeOrMessage = 'PORT_SHOULD_BE';
        }
        break;
      
      case ErrorContext.SERVER:
        if (errorMessageLowerCase.includes('eaddrinuse')) {
          errorTypeOrMessage = 'EADDRINUSE';
        }
        break;

      default:
        errorTypeOrMessage = error.message;
        break;
    }

    sendErrorToRenderer(webContents, errorTypeOrMessage);
  }
}

const sendErrorToRenderer = (webContents, error) => {
  webContents.send('error', error);
}

module.exports = addPeerListeners;