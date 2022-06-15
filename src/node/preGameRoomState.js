const PeerStorage = require('./PeerStorage');

const preGameRoomState = {
  readyStatus: []
}

const addPlayerToPreGameState = (playerNickname) => {
  preGameRoomState.readyStatus.push({
    nickname: playerNickname,
    ready: false
  });
}

const setPlayerReadyStatus = (
  playerNickname,
  isReady,
  whenAllReadyCallback
) => {
  const peer = PeerStorage.getPeer();

  /* Vê se o nickname deste peer já está em algum
  dos objetos dentro de readyStatus */
  const isAlreadyInReadyStatus = preGameRoomState.readyStatus.some(
    (readyStatusObject) => readyStatusObject.nickname === playerNickname
  );

  // Se não estiver, adiciona o nome do peer ao objeto readyStatus
  if (!isAlreadyInReadyStatus) {
    const status = {
      nickname: playerNickname,
      isReady
    }

    preGameRoomState.readyStatus.push(status);
  } else {
    // Acha o objeto que contem o nickname do peer e troca o status de ready
    const readyStatusObject = preGameRoomState.readyStatus.find(
      (readyStatusObject) => readyStatusObject.nickname === playerNickname
    );

    readyStatusObject.isReady = isReady;
  }

  const allReadyStatesAreTrue = preGameRoomState.readyStatus.every(
    (readyStatusObject) => readyStatusObject.isReady
  );

  /* Se todos os estados salvos tiverem com o ready igual a true
  e o número de estados salvos for igual ao número de pessoas na sala */
  const allPlayersInRoomAreReady = allReadyStatesAreTrue &&
    preGameRoomState.readyStatus.length === peer.getNetworkSize();

  if (allPlayersInRoomAreReady) {
    whenAllReadyCallback();
  }
}

module.exports = {
  setPlayerReadyStatus,
  addPlayerToPreGameState
}