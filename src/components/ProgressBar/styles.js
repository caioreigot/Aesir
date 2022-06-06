import styled, { css } from "styled-components";

export const StyledProgressBar = styled.div`
  & {
    display: flex;
    position: relative;
    
    height: 40px;

    ${props => props.$height && css`
      height: ${props.$height}px;
    `}

    width: 100%;

    ${props => props.$widthPercentage && css`
      width: ${props.$widthPercentage}%;
    `}

    padding: 0 5px;
    
    background: rgba(255, 255, 255, 0.1);
    
    justify-content: flex-start;
    align-items: center;
  }
`;

export const StyledProgressValue = styled.div`
  & {
    ${props => props.$progress && css`
      width: ${props.$progress}%;
    `}

    height: 30px;

    ${props => props.$height && css`
      height: ${props.$height - 10}px;
    `}

    box-shadow: 0 10px 40px -10px var(--imperial-red);
    background: var(--imperial-red);

    transition: width 400ms ease;
  }
`;