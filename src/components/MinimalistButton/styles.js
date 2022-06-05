import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  & {
    cursor: pointer;
    outline: none;

    padding: 22px 15px;

    ${props => props.$allCaps && css`
      text-transform: uppercase;
    `}

    font-size: 1.4em;
    font-weight: bold;

    border: 0;
    border-radius: 3px;

    letter-spacing: 2px;
    white-space: normal;

    color: #fff;
    background-color: var(--imperial-red);

    transition: filter 200ms ease;
  }

  &:hover {
    filter: brightness(var(--hover-brightness-base));
  }
`;