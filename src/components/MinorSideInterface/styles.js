import styled from 'styled-components';

const resizeWidth = 50;

export const StyledSideMinorInterface = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    width: 25%;

    background-color: var(--eerie-black);
  }

  & .single-image-preview {
    height: 100%;
    width: 100%;

    object-fit: contain;
    
    -webkit-user-drag: none;
    user-select: none;
  }
`;

export const TopContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    
    width: 100%;

    height: 60%;
    max-height: 70%;
    min-height: 30%;
    
    position: relative;
    border: 2px solid rgba(var(--imperial-red-values), 0.7);
    overflow: hidden;

    .card-preview-text {
      font-size: 1.2em;
      color: var(--cultured);
      align-self: center;
      user-select: none;
    }

    .resizer {
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
  }
`;

export const StyledChat = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    min-height: 30%;
    overflow: hidden;

    .chat-content {
      flex-grow: 1;

      width: 100%;
      padding: 5px;

      overflow-y: auto;
      overflow-x: hidden;

      p {
        font-size: 1em;
      }
    }

    .chat-input {
      margin: 6px;

      height: 15%;
      max-height: 50px;

      font-size: 1em;
    }
  }
`;