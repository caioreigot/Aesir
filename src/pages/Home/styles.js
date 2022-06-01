import styled from 'styled-components';

export const StyledAppName = styled.h1`
  & {
    color: var(--imperial-red);

    user-select: none;

    font-family: 'Orbitron';
    font-weight: 400;
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const StyledHome = styled.div`
  & {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /***** Header *****/
  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 70px;
    padding: 10px 20px;

    background-color: var(--rich-black-fogra);
    color: var(--cultured);
    border-bottom: 4px solid var(--cultured);
  }

  #config-btn {
    margin-left: auto;
    cursor: pointer;
    color: var(--cultured);
  }

  #config-btn:hover {
    animation: slight-rotation 500ms ease-out;
    filter: brightness(var(--hover-brightness-base));
  }
  /***** Fim Header *****/

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
  }

  @keyframes slight-rotation {
    to {
      transform: rotate(180deg);
    }
  }
`;