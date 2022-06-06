import React from 'react'

import { StyledProgressBar, StyledProgressValue } from './styles';

function ProgressBar(props) {
  return(
    <StyledProgressBar className="progress-bar" {...props}>
      <StyledProgressValue className="progress-value" {...props} />
    </StyledProgressBar>
  );
}

export default ProgressBar;