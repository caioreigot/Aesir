import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: 'Ubuntu', 'Roboto', sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    background-color: var(--rich-black-fogra);
    color: #fff;
  }

  :root {
    /***** Paleta de Cores *****/
    --rich-black-fogra: #0b090aff;
    --eerie-black: #161a1dff;
    --ruby-red: #a4161aff;
    --carnelian: #ba181bff;
    --imperial-red: #e5383bff;
    --black-shadows: #b1a7a6ff;
    --light-gray: #d3d3d3ff;
    --cultured: #f5f3f4ff;
    --white: #ffffffff;

    --rich-black-fogra-values: 11, 9, 10;
    --eerie-black-values: 22, 26, 29;
    --ruby-red-values: 164, 22, 26;
    --carnelian-values: 186, 24, 27;
    --imperial-red-values: 229, 56, 59;
    --black-shadows-values: 177, 167, 166;
    --light-gray-values: 211, 211, 211;
    --cultured-values: 245, 243, 244;
    --white-values: 255, 255, 255;
    /***** Fim Paleta de Cores *****/

    /***** Outras Cores *****/
    --snackbar-green: #3e8e41;
    /***** Fim Outras Cores *****/

    /***** Fontes *****/
    --font-family-sans-serif: 'Ubuntu', 'Roboto', sans-serif;
    /***** Fim Fontes *****/

    /***** Bases *****/
    --hover-brightness-base: 110%;
    --snackbar-bottom-offset: 20px;
    /***** Fim Bases *****/
  }

  /***** Animações *****/
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes enter-from-left {
    from {
      opacity: 0;
      transform: translateX(-10%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes emerge {
    from {
      opacity: 0;
      transform: translate(-50%, calc(-50% + 15%));
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  /***** Fim Animações *****/
`;