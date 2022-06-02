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
    display: flex;
    flex-direction: column;
    align-items: center;

    height: calc(100% - 80px);
    width: 650px;

    overflow-x: hidden;
    overflow-y: auto;
    
    margin-top: 80px;
    padding: 0 20px;
  }

  .container h2 {
    margin-bottom: 15px;
  }
`;