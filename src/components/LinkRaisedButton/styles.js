import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: var(--imperial-red);
    box-shadow: rgba(var(--imperial-red-values), 0.6) 4px 4px 0px;

    border: none;
    border-radius: 6px;

    text-decoration: none;
    
    transition: transform 80ms, box-shadow 80ms;

    /***** TODO: Propriedades que podem ser customizadas *****/
    width: 350px;
    height: 100px;

    font-size: 1.4rem;
    font-weight: bold;
    
    color: var(--cultured);

    padding: 20px;
    margin: 10px;

    animation: fade-in 300ms ease forwards;
  }

  &:hover {
    filter: brightness(var(--hover-brightness-base));
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: rgba(var(--imperial-red-values), 0.6) 0px 0px 0px;
  }
`;