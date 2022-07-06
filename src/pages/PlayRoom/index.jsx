import GameBoard from './GameBoard';

import {
  MinorSideInterface
} from '@components';

import { StyledPlayRoom } from './styles';

function PlayRoom() {
  return(
    <StyledPlayRoom>
      <GameBoard />
      <MinorSideInterface />
    </StyledPlayRoom>
  );
}

export default PlayRoom;