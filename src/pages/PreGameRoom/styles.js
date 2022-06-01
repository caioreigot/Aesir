import styled from 'styled-components';

export const StyledPreGameRoom = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

  .enter-nickname-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    width: clamp(420px, 40%, 500px);
    animation: enter-from-left 400ms ease forwards;
  }

  .enter-nickname-container button,
  .enter-nickname-container input {
    width: 100%;
  }

  .enter-nickname-container button {
    margin-top: 10px;
  }
`;