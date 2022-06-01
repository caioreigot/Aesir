import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: var(--imperial-red);
    box-shadow: rgba(var(--imperial-red-values), 0.6) 4px 4px 0px;
    color: var(--cultured);

    padding: 20px;
    border: none;
    border-radius: 6px;

    transition: transform 80ms, box-shadow 80ms;
    
    font-size: 1.4em;
    font-weight: bold;
    text-decoration: none;

    animation: fade-in 300ms ease forwards;

    ${props => props.$uppercase && css`
      text-transform: uppercase;
    `}
  }

  &:hover {
    filter: brightness(var(--hover-brightness-base));
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: rgba(var(--imperial-red-values), 0.6) 0px 0px 0px;
  }
`;