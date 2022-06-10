import React, { useState } from 'react'

import { StyledProgressBar, StyledProgressValue } from './styles';

export let setProgressValueTo;

function ProgressBar({ $widthPercentage, $height }) {
  const [progressValue, setProgressValue] = useState(0);

  setProgressValueTo = setProgressValue;

  return(
    <StyledProgressBar
      className="progress-bar hidden"
      $widthPercentage={$widthPercentage} 
      $height={$height}
    >
      <StyledProgressValue 
        className="progress-value" 
        $progress={progressValue}/>
      </StyledProgressBar>
  );
}

export default ProgressBar;