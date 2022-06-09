import React from 'react'

import { StyledProgressBar, StyledProgressValue } from './styles';

function ProgressBar({ $progress, $widthPercentage, $height }) {
  return(
    <StyledProgressBar
      className="progress-bar hidden"
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