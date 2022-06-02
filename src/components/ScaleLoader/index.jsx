import { StyledScaleLoader } from './styles';

const getLoaderBarSizes = (maxHeight) => {
  maxHeight = parseInt(maxHeight);

  // As barras laterais são 57% do tamanho da barra central
  const sidebarHeight = maxHeight * 0.57;
  return [sidebarHeight, maxHeight, sidebarHeight];
}

function ScaleLoader(props) {
  const barHeights = getLoaderBarSizes(props.size);

  return(
    <StyledScaleLoader 
      barHeights={barHeights} 
      className="scale-loader"
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </StyledScaleLoader>
  );
}

export default ScaleLoader;