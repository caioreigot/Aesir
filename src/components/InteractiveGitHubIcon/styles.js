import styled, { css } from 'styled-components';

export const StyledInteractiveGitHubIcon = styled.a`
  & {
    width: fit-content;
    cursor: pointer;

    ${props => props.absolutePosition && css`
      position: absolute;

      top: ${props.top};
      right: ${props.right};
      bottom: ${props.bottom};
      left: ${props.left};
    `}
  }

  & svg {
    color: var(--cultured);
    transition: all 200ms ease-out;

    position: absolute;
    top: 14px;
    left: 14px;
  }

  &::before {
    display: block;
    transform: scale(1);
    content: " ";
    
    width: 60px;
    height: 60px;
    
    border-radius: 100%;
    background: linear-gradient(43deg, #eb6868 0%,
    rgb(255, 63, 63) 46%,rgba(237, 76, 61, 0.9) 100%);

    transition: all 200ms ease-out;
  }

  &:hover::before {
    transform: scale(0);
    transition: all 200ms ease-in;
  }

  &:hover svg {
    color: var(--imperial-red);
    transform: scale(1.8);
    transition: all 200ms ease-in;
  }
`;