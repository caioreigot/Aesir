import styled, { css } from 'styled-components';

export const StyledBrightButton = styled.button`
  & {
    cursor: pointer;
    outline: none;

    padding: 22px 15px;

    ${props => props.$allCaps && css`
      text-transform: uppercase;
    `}

    font-size: 1.4em;
    font-weight: bold;

    border: 3px solid var(--imperial-red);
    border-radius: 3px;

    letter-spacing: 3px;
    white-space: normal;

    color: #fff;
    background-color: transparent;

    box-shadow: 
      inset 0 0 0.4em rgba(251, 81, 81, 0.4), 
      0 0 0.4em rgba(251, 81, 81, 0.4);
		
    border: #fb5454 solid 2px;

    transition: background-color 240ms, box-shadow 240ms;
  }

  &:hover {
    background-color: var(--imperial-red);

    background-color: #fb5454;
		box-shadow: 
      inset 0 0 0 rgba(251, 81, 81, 0.4), 
      0 0 0.8em rgba(251, 81, 81, 0.6);
  }

  &:active {
    filter: brightness(110%);
  }
`;