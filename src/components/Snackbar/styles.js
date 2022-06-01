import styled, { keyframes } from 'styled-components';

const snackbarInKeyframes = keyframes`
  from { bottom: 0; opacity: 0; }
  to { bottom: var(--snackbar-bottom-offset); opacity: 1; }
`;

const snackbarOutKeyframes = keyframes`
  from { bottom: var(--snackbar-bottom-offset); opacity: 1; }
  to { bottom: 0; opacity: 0; }
`;

export const StyledSnackbar = styled.div`
  & {
    visibility: hidden;

    font-size: 1.2rem;
    min-width: 250px;
    transform: translateX(-50%);
    padding: 16px;

    background-color: #333;
    color: var(--cultured);

    text-align: center;
    border-radius: 4px;
    
    z-index: 1;
    
    position: fixed;
    left: 50%;
    bottom: var(--snackbar-bottom-offset);
  }

  &.error {
    background-color: var(--imperial-red);
  }

  &.success {
    background-color: var(--snackbar-green);
  }

  &.show {
    visibility: visible;
    animation: ${snackbarInKeyframes} 0.5s, 
      ${snackbarOutKeyframes} 0.5s 2.5s forwards;
  }
`;