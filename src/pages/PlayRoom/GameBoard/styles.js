import styled from 'styled-components';

export const StyledGameBoard = styled.div`
  & {
    display: flex;
    flex-direction: column;

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
    border-bottom: 2px solid var(--eerie-black);
  }

  p {
    margin: 0 10px;
  }
`;

export const StyledBoardArea = styled.div`
  & {
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-template-rows: 1fr 80px;

    

    flex-grow: 1;
    width: 100%;
  }

  .commanders-area {
    background-color: var(--imperial-red);
    filter: brightness(0.95);
  }

  .bigger-area {
    background-color: #0f0f0f;
  }

  .hand-area {
    margin: 5px;
    border: 1px solid var(--cultured);
    border-radius: 15px;
    grid-column-end: span 2;
  }
`;