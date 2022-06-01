import styled from 'styled-components';

export const StyledDropdownMenu = styled.div`
  & {
    position: relative;
  }

  button {
    cursor: pointer;

    padding: 16px;
    
    border: none;
    background-color: #3498DB;
    color: white;
    
    font-size: 1em;
  }

  button:hover, button:focus {
    background-color: #2980B9;
  }

  .content {
    display: none;

    min-width: 160px;
    position: absolute;
    
    background-color: #f1f1f1;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    p {
      color: var(--rich-black-fogra);
      padding: 12px 16px;
      text-decoration: none;
    }

    p:hover {
      background-color: #ddd;
    }
  }

  .content.show {
    display: block; 
  }
`;