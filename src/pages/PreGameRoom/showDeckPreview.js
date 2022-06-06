function showDeckPreview(deck, callback) {
  const deckPreviewRows = document.querySelectorAll('.deck-preview-row');

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
      const cardQuantity = deck.structure
        .filter(c => c.name === card.name)[0].quantity;
  
      // Renderiza mais de 1x a carta caso tenha várias dela no deck
      for (let i = 0; i < cardQuantity; i++) {
        const img = document.createElement('img');
        img.src = card.image_uris.small;
        row.appendChild(img);
        
        rowsAmount[rowIndex]++;
      }
    }
  }

  for (let i = 0; i < deckPreviewRows.length; i++) {
    /* Pra cada objeto de carta da API, incrementa a quantidade
    do mesmo tipo de carta e então renderiza ela na tela */
    deck.cards.forEach(card => increaseAmountAndRender(i, card));
  }

  callback(rowsAmount);
}

module.exports = showDeckPreview;