import styled from 'styled-components';

export const StyledPreGameRoom = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
  }

  .fa-arrow-left {
    cursor: pointer;

    position: fixed;
    top: 15px;
    left: 20px;

    color: var(--imperial-red);
  }

  .fa-arrow-left:hover {
    filter: brightness(var(--hover-brightness-base));
  }
`;

export const StyledEnterNicknameContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    width: clamp(420px, 40%, 500px);
    animation: enter-from-left 400ms ease forwards;
  }

  & button,
  & input {
    width: 100%;
  }

  & button {
    margin-top: 10px;
  }
`;

export const StyledPreGameRoomContainer = styled.div`
  & {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
`;

/***** Left Side Container *****/
export const StyledLeftSideContainer = styled.div`
  & {
    height: 100%;
    width: 75%;
    
    padding: 65px 20px 20px 20px;
  }

  & .progress-bar {
    display: none;
  }
`;

export const StyledDeckPreview = styled.div`
  & {
    display: grid;
    grid-template-rows: 5% repeat(6, 15.833%);
    grid-template-columns: 120px 1fr;

    height: 89%;
    max-height: 700px;

    border: 1px solid rgba(var(--imperial-red-values), .7);
    border-radius: 5px;

    background-color: var(--eerie-black);

    > h3:nth-of-type(1) {
      height: fit-content;
      align-self: center;
      
      font-size: 15px;

      text-align: center;

      grid-column-end: span 2;
    }
  }
`;

export const StyledPreviewLeftBox = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    
    border: 0;
    border-right: 1px solid rgba(var(--imperial-red-values), .7);
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 80%;
  }
`;

export const StyledPreviewRow = styled.div`
  & {
    display: flex;
    flex-direction: row;

    overflow-x: auto;

    border: 0;
    border-top: 1px solid rgba(var(--imperial-red-values), .7);
    border-bottom: 1px solid rgba(var(--imperial-red-values), .7);
    border-radius: 4px;

    ::-webkit-scrollbar {
      height: 9px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(var(--imperial-red-values), .92);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--imperial-red);
    }
  }

  & img {
    border: 1px solid transparent;
    border-radius: 8%;
  }

  & img:hover {
    cursor: pointer;
    border: 1px solid var(--cultured);
  }
`;

export const StyledLeftSideButtonsContainer = styled.div`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 9%;
    max-height: 80px;
    
    margin-top: 12px;

    button {
      font-size: 1.1rem;
      height: 100%;
      width: 50%;
    }

    button:first-child {
      margin-right: 10px;
    }
  }

  @media (max-height: 760px) {
    & button {
      padding: 0;
    }
  }
`;
/***** Fim Left Side Container *****/

/***** Right Side Container *****/
export const StyledRightSideContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 25%;

    background-color: var(--eerie-black);
  }

  & div:first-child {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    margin: 0 5px;

    height: 60%;
    max-height: 70%;
    min-height: 30%;

    resize: vertical;
    overflow: hidden;
  }

  & .single-image-preview {
    height: 100%;
    width: 100%;

    object-fit: contain;
    user-select: none;
  }

  & .chat {
    flex-grow: 1;

    padding: 15px;
  }
`;
/***** Fim Right Side Container *****/