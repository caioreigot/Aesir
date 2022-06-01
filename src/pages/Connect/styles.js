import styled from 'styled-components';

export const StyledConnect = styled.div`
  & {
    display: flex;
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

  main {
    width: clamp(420px, 40%, 500px);

    animation: enter-from-left 400ms ease forwards;
  }

  /***** Inputs *****/

  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    height: 100%;
  }

  input {
    width: 100%;
  }

  input:not(:first-child) {
    margin-top: 8px;
  }

  /***** Fim Inputs *****/
`;