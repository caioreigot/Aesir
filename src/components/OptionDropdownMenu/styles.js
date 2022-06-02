import styled from 'styled-components';

export const StyledOptionDropdownMenu = styled.nav`
  & {
    width: 240px; 
    background: #d9d9d9;
  }

  span {
    display: block;
    
    cursor: pointer;
    padding: 20px;

    background: var(--imperial-red); 
    color: white;

    border-bottom: 1px solid #FF8386;
    
    font-size: 1.2em;

    &::after {
      float: right;
      right: 10%;

      content: "+";
    }

    &:hover {
      filter: brightness(var(--hover-brightness-base));
    }
  }

  .slide {
    width: 100%;
    height: 0;

    background-color: #FF575A;
    
    clear: both;
    
    overflow: hidden;
    
    text-align: center;
    transition: height 250ms ease;

    li {
      cursor: pointer;
      padding: 20px;
      
      color: var(--cultured);

      text-decoration: none; 
      font-size: 1.2em;

      border-bottom: 1px solid #FF8386;

      &:hover {
        background-color: #FF6064;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  #touch {
    position: absolute;
    opacity: 0;
    height: 0px;
  }

  #touch:checked + .slide {
    height: calc(63px * ${props => props.optionsQuantity});
  } 
`;