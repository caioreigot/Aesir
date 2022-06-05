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

export const EnterNicknameContainer = styled.div`
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

export const PreGameRoomContainer = styled.div`
  & {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
`;

export const LeftSideContainer = styled.div`
  & {
    height: 100%;
    width: 75%;
    padding: 70px 20px 20px 20px;
  }
`;

export const DeckPreview = styled.div`
  & {
    display: grid;
    grid-template-rows: 5% repeat(6, 15.83%);
    grid-template-columns: 1fr;

    height: 85%;
    background-color: var(--eerie-black);
  }
`;

export const DeckPreviewRow = styled.div`
  & {
    display: flex;
    flex-direction: row;

    overflow-x: auto;
  }
`;

export const LeftSideButtonsContainer = styled.div`
  & {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 10%;
    margin-top: 15px;

    button {
      font-size: 1.3rem;
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

export const RightSideContainer = styled.div`
  & {
    height: 100%;
    width: 25%;

    background-color: var(--eerie-black);
  }
`;