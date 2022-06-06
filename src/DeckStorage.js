/*
  Esta classe estática é responsável por
  armazenar o deck atualmente carregado
  pelo usuário.
*/

class Deck {

  static _structure = [];
  static _cards = [];

  static get() {
    return { 
      structure: this._structure, 
      cards: this._cards 
    };
  }

  static getTotalCards() {
    const reducer = (sum, structure) => sum + structure.quantity;
    const initialValue = 0;
    
    return this._structure.reduce(reducer, initialValue);
  }

  static set(deck) {
    this._structure = deck.structure;
    this._cards = deck.cards;
  }
}

module.exports = Deck;