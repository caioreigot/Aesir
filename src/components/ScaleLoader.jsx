import '@styles/components/ScaleLoader.css';

const getLoaderBarSizes = (maxHeight) => {
  // As barras laterais são 57% do tamanho da barra central
  const sidebarHeight = parseInt(maxHeight) * 0.57;
  return [sidebarHeight, parseInt(maxHeight), sidebarHeight];
}

function ScaleLoader(props) {
  const barHeights = getLoaderBarSizes(props.size);

  return(
    <div className='scale-loader'>
      <span style={{height: barHeights[0]}} className="bar"></span>
      <span style={{height: barHeights[1]}} className="bar"></span>
      <span style={{height: barHeights[2]}} className="bar"></span>
    </div>
  );
}

export default ScaleLoader;