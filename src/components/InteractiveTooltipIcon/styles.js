import styled, { css } from 'styled-components';

export const StyledInteractiveTooltipIcon = styled.div`
  .fa-circle-question {
    cursor: pointer;
    color: var(--imperial-red);
    z-index: 2;

    ${props => props.$fixedPosition && css`
      position: fixed;

      top: ${props.top};
      right: ${props.right};
      bottom: ${props.bottom};
      left: ${props.left};
    `}
  }

  .fa-circle-question:hover {
    filter: brightness(var(--hover-brightness-base));
  }

  & .tooltip-modal {
    position: fixed;
    top: 0;
    left: 0;

    display: none;
    align-items: center;
    justify-content: center;
    
    opacity: 0;

    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    
    z-index: 1;
  }

  & .tooltip-modal.show {
    display: flex;
    opacity: 1;
    
    animation: fade-in 200ms ease forwards;
  }

  & .tooltip-modal.show p {
    animation: emerge 500ms ease forwards;
  }

  & .tooltip-modal p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;

    box-shadow: 0px 0px 1px 2px rgba(var(--imperial-red-values), .8);

    border: 0;
    border-radius: 8px;

    padding: 60px 30px;

    color: var(--cultured);
    background-color: var(--eerie-black);

    width: clamp(500px, 50%, 900px);
    
    /* Posicionando o centro da div no meio da tela */
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;