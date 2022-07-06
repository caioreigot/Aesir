import styled from 'styled-components';

export const StyledGameBoard = styled.div`
  & {
    height: 100%;
    flex-grow: 1;
  }

  .fa-arrow-left {
    cursor: pointer;
    margin-right: 20px;
    color: var(--imperial-red);
  }

  .fa-arrow-left:hover {
    filter: brightness(var(--hover-brightness-base));
  }
`;

// TODO
export const StyledTopRow = styled.div`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 15px 20px;
    border: 1px solid yellow;
  }

  p {
    margin: 0 10px;
  }
`;