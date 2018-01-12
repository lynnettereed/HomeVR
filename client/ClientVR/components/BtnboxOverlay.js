import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const BtnboxOverlay = (props) => {
  return (
    <div className='overlay'>
      <div className='btn-container-a'>
        <div className='btn-a' onClick={ props.handleClick } />
      </div>
      <div className='btn-container-b'>
        <div className='btn-b' onClick={ props.handleClick } />
      </div>
    </div>
  );
};

export default BtnboxOverlay;
