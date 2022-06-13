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

    min-width: 250px;
    transform: translateX(-50%);
    padding: 20px 16px;
    position: fixed;
    left: 50%;

    background-color: #333;
    color: var(--cultured);

    font-size: 1.2rem;
    text-align: center;
    border-radius: 4px;
    
    user-select: none;
    z-index: 1;
    
    bottom: var(--snackbar-bottom-offset);

    .close-button {
      cursor: pointer;
      color: rgba(var(--cultured-values), 0.8);
      padding: 1px 3px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  &.error {
    background-color: var(--imperial-red);
  }

  &.success {
    background-color: var(--snackbar-green);
  }

  &.visible {
    visibility: visible;
    animation: ${snackbarInKeyframes} 500ms
  }

  &.hidding {
    visibility: visible;
    animation: ${snackbarOutKeyframes} 500ms forwards;
  }
`;