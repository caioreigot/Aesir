// Clase responsável por armazenar o peer do jogador
class PeerStorage {
  static _peer;

  static getPeer = () => {
    return this._peer;
  }

  static setPeer = (peer) => {
    this._peer = peer;
  }
}

module.exports = PeerStorage;