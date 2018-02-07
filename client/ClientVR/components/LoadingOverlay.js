import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const LoadingOverlay = (props) => {
  return (
    <div className='container-loading'>
      <div className='wrapper'>
        <div className='spinner'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className='label'>Loading</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
