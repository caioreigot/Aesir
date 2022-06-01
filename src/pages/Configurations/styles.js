import styled from 'styled-components';

export const StyledConfigurations = styled.div`
  .fa-arrow-left {
    cursor: pointer;

    position: fixed;
    top: 15px;
    left: 20px;

    color: var(--imperial-red);
  }

  .fa-arrow-left:hover {
    filter: brightness(var(--hover-brightness-base));
  }

  & {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
  }

  .container {
    height: 100%;
    width: 650px;
    padding: 40px 20px;
  }
`;