import styled from 'styled-components';

const resizeWidth = 50;

export const StyledResizer = styled.div`
  & {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: ${resizeWidth}px;
    height: 10px;
    
    position: absolute;
    right: calc(50% - ${resizeWidth / 2}px);
    bottom: 0;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    
    background-color: var(--imperial-red);
    cursor: s-resize;

    > div {
      width: 40%;
      height: 20%;
      background-color: var(--cultured);
    }
  }
`;