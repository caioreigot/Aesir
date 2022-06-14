/*
  Usa a API do scryfall para pegar os objetos
  das cartas que estão no deck importado.
  
  (pega os nomes das cartas no arquivo .txt e
  faz uma requisição GET para a API retornar
  o objeto da carta e depois de pegar todas, 
  retorna um array contendo todos os objetos)
*/

const axios = require('axios');

function getCardObjects(
  deckInformation,
  onProgressCallback
) {
  return new Promise((resolve, reject) => {
    // Se o array "cardsName" estiver vazio
    if (!deckInformation.length) {
      console.warn('Array passado para "getCardsObject" está vazio.');
      resolve([]);
    }

    const cardObjects = [];
    const timeoutIds = [];
    const cardsName = deckInformation.map(card => card.name);
  
    for (let i = 0; i < cardsName.length; i++) {      
      const currentTimeoutId = setTimeout(async () => {
        const cardObject = await getCardObject(cardsName[i])
          .catch(e => {
            clearTimeouts(timeoutIds);
            reject(e);
          });
        
        cardObjects.push(cardObject);
        
        const progress = ((i / cardsName.length) * 100)
          .toFixed(0);
        
        // Passando o progresso ao cliente
        onProgressCallback(progress);

        // Na ultima iteração, resolver a promise
        if (i === cardsName.length - 1) {
          resolve(cardObjects);
        }
      /* Coloquei um delay de 100 ms por requisição
      pois o site pede para que coloque, muitas
      requisições à API pode resultar em um
      HTTP 429 Too Many Requests, que pode levar
      a um ban temporario ou permanente do IP */
      }, i * 100);

      timeoutIds.push(currentTimeoutId);
    }
  });
}

const clearTimeouts = (timeoutIds) => {
  for (let i = 0; i < timeoutIds.length; i++) {
    clearTimeout(timeoutIds[i]);
  }
}

const getCardObject = async (cardName) => {
  return new Promise((resolve, reject) => {
    const apiBase = 'https://api.scryfall.com/cards/named?fuzzy=';
  
    const formattedName = cardName
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s+/g, '+');
  
    axios.get(`${apiBase}${formattedName}`)
      .then(response => {
        const card = response.data;
        resolve(card);
      })
      .catch(err => {
        const reason = err.response.data.details;
        reject(reason);
      });
  });
}

module.exports = getCardObjects;