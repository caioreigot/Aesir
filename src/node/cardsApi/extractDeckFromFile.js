/* Pegando o nome das cartas de um deck importado
Modelo de deck importado (texto):
1 Boseiju, Who Endures
1 Treasure Vault
1 Path of Ancestry
...
O que a função devolve:
[
  { quantity: 1, name: "Boseiju Who Endures" },
  { quantity: 1, name: "Treasure Vault" },
  ...
]
*/

const fs = require('fs');

function extractDeckFromText(pathToFile) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pathToFile)) {
      reject('O arquivo não existe ou foi movido.');
    }
  
    const deckStructure = [];
    const content = fs.readFileSync(pathToFile, 'utf-8');
    
    const lines = content.split('\n');
    let cardsQuantity = 0;
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
  
      if (line !== '') {
        const quantity = parseInt(line.substring(0, line.indexOf(' ')));
        const cardName = line.substring(line.indexOf(' ') + 1);
  
        cardsQuantity += quantity;
  
        if (cardsQuantity >= 300) {
          return Error('Erro! As quantidades de cartas ultrapassam os 300.');
        }
    
        deckStructure.push({ quantity, name: cardName });
      }
    }
  
    resolve(deckStructure);
  });
}

module.exports = extractDeckFromText;