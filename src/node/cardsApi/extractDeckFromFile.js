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

const isFileFormatValid = (content) => {
  // Remove tudo que dá match com o padrão /^[0-9]+ .*/gm do conteudo
  const cleanContent = content.replace(/^[0-9]+ .*/gm, '');
  const cleanContentLength = cleanContent.trim().length;

  /* Se o tamanho do conteudo limpo pelo regex for
  igual a 0, então o arquivo é válido */
  return cleanContentLength === 0;
}

function extractDeckFromText(pathToFile) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pathToFile)) {
      reject('O arquivo não existe ou foi movido.');
    }
    
    const deckStructure = [];
    const content = fs.readFileSync(pathToFile, 'utf-8');

    // Se o arquivo do deck não for válido, rejeita a promise
    if (!isFileFormatValid(content)) {
      reject('O arquivo não está no formato correto.');
    }

    const lines = content.split('\n');
    let cardsQuantity = 0;
    
    // Itera entre todas as linhas do arquivo
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Se a linha estiver vazia, vá pra próxima
      if (line === '') continue;
      
      // Quantidade de cartas
      const quantity = parseInt(line.substring(0, line.indexOf(' ')).trim());

      // Nome da carta
      const name = line.substring(line.indexOf(' ') + 1).trim();

      cardsQuantity += quantity;

      if (cardsQuantity > 300) {
        reject('As quantidades de cartas ultrapassam os 300.');
      }
      
      deckStructure.push({ quantity, name });
    }
  
    resolve(deckStructure);
  });
}

module.exports = extractDeckFromText;