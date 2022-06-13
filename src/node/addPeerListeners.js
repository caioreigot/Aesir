const P2PDataType = require('./p2p/enums/P2PDataType');
const ErrorContext = require('./p2p/enums/ErrorContext');
const ErrorMessage = require('./p2p/enums/ErrorMessage');

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
    switch (P2PDataTemplate.type) {
      case P2PDataType.STATE:
        peer.state = P2PDataTemplate.content;
        webContents.send('set-state', P2PDataTemplate.content);
        break;

      case P2PDataType.MESSAGE:
        webContents.send('new-message', P2PDataTemplate.content);
        break;

      default:
        break;
    }
  }

  // Função chamada quando ocorre algum erro no Peer
  function onError(err, context) {
    let errorMessage = ErrorMessage.UNEXPECTED;

    switch (context) {
      case ErrorContext.CONNECT:  
        if (err.message.includes('ETIMEDOUT')) {
          errorMessage = ErrorMessage.ETIMEDOUT;
        } else if (err.message.includes('ECONNREFUSED')) {
          errorMessage = ErrorMessage.ECONNREFUSED;
        } else if (err.message.includes('ENOTFOUND')) {
          errorMessage = ErrorMessage.ENOTFOUND;
        }
    
        // dialog.showErrorBox(
        //   'Connection Error',
        //   errorMessage.concat(`\n\n${err.message}`)
        // );
    
        webContents.send('connect-error');
        break;
      
      case ErrorContext.SERVER:
        if (err.message.includes('EADDRINUSE')) {
          errorMessage = ErrorMessage.EADDRINUSE;
        }
    
        // dialog.showErrorBox(
        //   'Connection Error',
        //   errorMessage.concat(`\n\n${err.message}`)
        // );
    
        webContents.send('listen-port-error');
        break;

      default:
        break;
    }
  }
}

module.exports = addPeerListeners;