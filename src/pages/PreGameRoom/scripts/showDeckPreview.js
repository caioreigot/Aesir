import DeckStorage from '@DeckStorage';
import onCardMouseOver from './onCardMouseOver';

function showDeckPreview(
  deck,
  totalCardsSetter,
  cardsQuantitySetter
) {
  const deckPreviewRows = document.querySelectorAll('.deck-preview-row');

  const rowsAmount = new Array(6).fill(0);
  const rowsType = [
    'Artifact',
    'Creature',
    'Enchantment',
    'Instant',
    'Sorcery',
    'Land'
  ];

  const increaseAmountAndRender = (rowIndex, card) => {
    const row = deckPreviewRows[rowIndex];

    // Se o tipo da carta corresponder ao tipo da linha
    const cardBelongsToThisRow = card.type_line
      .toLowerCase()
      .indexOf(rowsType[rowIndex].toLowerCase()) >= 0;
  
    if (cardBelongsToThisRow) {
      // Pega a quantidade presente desta carta no deck
      const cardQuantity = deck.structure
        .filter(c => c.name === card.name)[0].quantity;
  
      // Renderiza mais de 1x a carta caso tenha várias dela no deck
      for (let i = 0; i < cardQuantity; i++) {
        const img = document.createElement('img');
        img.src = card.image_uris.small;
        
        /* Adiciona um event listener para
        quando o mouse passar sobre a img */
        img.addEventListener('mouseover', 
          () => onCardMouseOver(card));

        row.appendChild(img);
        rowsAmount[rowIndex]++;
      }
    }
  }

  for (let i = 0; i < deckPreviewRows.length; i++) {
    deckPreviewRows.forEach(row => {
      addRowMouseScrollListener(row);
    })

    /* Pra cada objeto de carta da API, incrementa a quantidade
    do mesmo tipo de carta e então renderiza ela na tela */
    deck.cards.forEach(card => increaseAmountAndRender(i, card));
  }

  totalCardsSetter(DeckStorage.getTotalCards());

  cardsQuantitySetter({
    Artifact: rowsAmount[0],
    Creature: rowsAmount[1],
    Enchantment: rowsAmount[2],
    Instant: rowsAmount[3],
    Sorcery: rowsAmount[4],
    Land: rowsAmount[5]
  });
}

const addRowMouseScrollListener = (row) => {
  row.addEventListener("wheel", e => {
    e.preventDefault();
    row.scrollLeft += e.deltaY * 0.5;
  });
}

export default showDeckPreview;