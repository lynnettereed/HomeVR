import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const BtnboxOverlay = (props) => {
  return (
    <div className='overlay'>
      <div className='btn-container-a'>
        <div className='btn-a' onClick={ () => props.handleClick('exitVR button') }>
          <i className="fa fa-lg fa-sign-out" aria-hidden="true"></i>
        </div>
      </div>
      <div className='btn-container-b'>
        <div className='btn-b' onClick={ () => props.handleClick('menu button') }>
          <i className="fa fa-lg fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default BtnboxOverlay;
