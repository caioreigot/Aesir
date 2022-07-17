import React from 'react';

import { Link } from 'react-router-dom';
import FaArrowLeft from '@components/FaArrowLeft';

import { 
  StyledGameBoard,
  StyledTopRow,
  StyledBoardArea
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
      <StyledBoardArea>
        <div className='commanders-area'></div>
        <div className='bigger-area'></div>
        <div className='hand-area'></div>
      </StyledBoardArea>
    </StyledGameBoard>
  );
}

export default GameBoard;