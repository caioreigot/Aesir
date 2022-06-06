function showDeckPreview(deck, cardObjects, callback) {
  const deckPreviewRows = document.querySelectorAll('.deck-preview-row');

  let totalCards = 0;
  const rowsAmount = new Array(6).fill(0);
  const rowsType = [
    'Artifact',
    'Creature',
    'Enchantment',
    'Instant',
    'Land',
    'Sorcery'
  ];

  const increaseAmountAndRender = (rowIndex, card) => {
    const row = deckPreviewRows[rowIndex];

    const cardTypeFitsLineType = card.type_line
      .toLowerCase()
      .indexOf(rowsType[rowIndex].toLowerCase()) >= 0;
  
    if (cardTypeFitsLineType) {
      // Pega a quantidade de cartas iguais presente no deck
      const cardQuantity = deck
        .filter(c => c.name === card.name)[0].quantity;
  
      // Renderiza mais de 1x a carta caso tenha várias dela no deck
      for (let i = 0; i < cardQuantity; i++) {
        const img = document.createElement('img');
        img.src = card.image_uris.small;
        row.appendChild(img);
        
        rowsAmount[rowIndex]++;
        totalCards++;
      }
    }
  }

  for (let i = 0; i < deckPreviewRows.length; i++) {
    /* Pra cada objeto de carta da API, incrementa a quantidade
    do mesmo tipo de carta e então renderiza ela na tela */
    cardObjects.forEach(card => increaseAmountAndRender(i, card));
  }

  callback(totalCards, rowsAmount);
}

module.exports = showDeckPreview;