import styled from 'styled-components';

import { baseVerticalScroll } from '@/GlobalStyles.style';

export const StyledSideMinorInterface = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    width: 25%;
    max-width: 320px;

    background-color: var(--eerie-black);
  }

  & .single-image-preview {
    height: 100%;
    width: 100%;

    object-fit: contain;
    
    -webkit-user-drag: none;
    user-select: none;
  }
`;

export const TopContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    
    width: 100%;

    height: 60%;
    max-height: 70%;
    min-height: 30%;
    
    position: relative;
    border: 2px solid rgba(var(--imperial-red-values), 0.7);
    overflow: hidden;

    .card-preview-text {
      font-size: 1.2em;
      color: var(--cultured);
      align-self: center;
      user-select: none;
    }
  }
`;

export const StyledChat = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    flex-grow: 1;
    height: 30%;
    overflow: hidden;

    .chat-content {
      flex-grow: 1;

      width: 100%;
      padding: 5px;

      overflow-y: auto;
      overflow-x: hidden;

      ${baseVerticalScroll}

      p {
        margin: 5px 0;

        font-size: 1em;
        text-align: left;

        > strong {
          color: var(--imperial-red);
          font-weight: bold;
        }
      }
    }

    .chat-input {
      margin: 6px;

      height: 15%;
      max-height: 50px;

      font-size: 1em;
    }
  }
`;