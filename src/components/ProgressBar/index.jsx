import React from 'react'

import { StyledProgressBar, StyledProgressValue } from './styles';

function ProgressBar({ $widthPercentage, $height, $progress }) {
  return(
    <StyledProgressBar 
      className="progress-bar" 
      $widthPercentage={$widthPercentage} 
      $height={$height}
    >
      <StyledProgressValue 
        className="progress-value" 
        $progress={$progress}/>
    </StyledProgressBar>
  );
}

export default ProgressBar;