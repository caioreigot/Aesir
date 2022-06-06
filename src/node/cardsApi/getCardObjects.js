const axios = require('axios');

/*
  Usa a API do scryfall para pegar os objetos
  das cartas que estão no deck importado.
  
  (pega os nomes das cartas no arquivo .txt e
  faz uma requisição GET para a API retornar
  o objeto da carta e depois de pegar todas, 
  retorna um array contendo todos os objetos)
*/

function getCardObjects(deckInformation, callback) {
  return new Promise((resolve, reject) => {
    const cardObjects = [];
    const apiBase = 'https://api.scryfall.com/cards/named?fuzzy=';
  
    // Se o array "cardsName" estiver vazio
    if (!deckInformation.length) {
      console.warn('Array passado para "getCardsObject" está vazio.');
      resolve([]);
    }

    const cardsName = deckInformation.map(card => card.name);
  
    for (let i = 0; i < cardsName.length; i++) {
      const formattedName = cardsName[i]
        .trimStart()
        .replace(/\s+/g, ' ')
        .replace(/\s+/g, '+');
      
      /* Coloquei um delay de 100 ms por requisição
      pois o site pede para que coloque, muitas
      requisições à API pode resultar em um
      HTTP 429 Too Many Requests, que pode levar
      a um ban temporario ou permanente do IP */
      setTimeout(async () => {
        await axios.get(`${apiBase}${formattedName}`)
          .then(response => {
            const card = response.data;
            cardObjects.push(card);
            
            const progress = ((i / cardsName.length) * 100)
              .toFixed(0);
            
            // Passando o progresso ao cliente
            callback(progress);
          })
          .catch(err => {
            console.warn(err);
            reject(err);
          });
        
        // Na ultima iteração, resolver a promise
        if (i === cardsName.length - 1) {
          resolve(cardObjects);
        }
      }, i * 100);
    }
  });
}

module.exports = getCardObjects;