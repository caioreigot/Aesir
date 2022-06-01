import styled from 'styled-components';

export const StyledInput = styled.input`
  & {
    padding: 24px 15px;

    border: 0;
    border-radius: 3px;

    box-shadow: inset #abacaf 0 0 0 2px;
    appearance: none;
    position: relative;

    background: rgba(0, 0, 0, 0);
    color: var(--cultured);

    font-size: 1.6rem;
    transition: all .2s ease;
  }

  &::-webkit-input-placeholder {
    color: var(--black-shadows);
  }

  &:hover {
    box-shadow: 0 0 0 0 #fff inset, var(--imperial-red) 0 0 0 2px;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0 #fff inset, var(--imperial-red) 0 0 0 3px;
  }
`;