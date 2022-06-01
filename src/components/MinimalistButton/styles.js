import styled from 'styled-components';

export const StyledButton = styled.button`
  & {
    outline: none;
    cursor: pointer;

    padding: 22px 10px;

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