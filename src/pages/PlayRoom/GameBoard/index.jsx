import React from 'react';

import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';

import { 
  StyledGameBoard,
  StyledTopRow
} from './styles';

function GameBoard() {
  return(
    <StyledGameBoard>
      <StyledTopRow>
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <p>Nome & Vida</p>
        <p>Deck</p>
        <p>Mão</p>
        <p>Cemitério</p>
        <p>Exílio</p>
      </StyledTopRow>
    </StyledGameBoard>
  );
}

export default GameBoard;