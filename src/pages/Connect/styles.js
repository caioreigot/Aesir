import styled from 'styled-components';

export const StyledConnect = styled.div`
  & {
    display: flex;
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

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
    width: clamp(420px, 40%, 500px);
    height: fit-content;

    animation: enter-from-left 400ms ease forwards;

    button {
      width: 100%;
      margin-top: 8px;
    }
    
    input {
      width: 100%;
    }

    input:not(:first-child) {
      margin-top: 8px;
    }

    div:last-child {
      margin-top: 18px;
    }
  }
`;