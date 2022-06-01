import styled, { keyframes } from 'styled-components';

const scaleUpKeyframe = keyframes`
  20% {
    background-color: var(--imperial-red);
    transform: scaleY(1.2);
  }
  40% {
    transform: scaleY(1);
  }
`;

export const StyledScaleLoader = styled.div`
  & {
    display: none;
    align-items: center;
  }

  .bar {
    display: inline-block;
    width: 4px;
    height: ${props => props.barHeights 
      ? `${props.barHeights[0]}px` 
      : '20px'
    };
    
    background-color: rgba(var(--imperial-red-values), .4);
    
    border-radius: 10px;
    animation: ${scaleUpKeyframe} 1s linear infinite;
  }

  .bar:nth-child(2) {
    height: ${props => props.barHeights 
      ? `${props.barHeights[1]}px`
      : '35px'
    };

    margin: 0 5px;
    animation-delay: 250ms;
  }

  .bar:nth-child(3) {
    animation-delay: 500ms;
  }
`;