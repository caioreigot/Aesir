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