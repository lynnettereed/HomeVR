import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const TextboxOverlay = (props) => {
  return (
    <div className='container'>
      <div className='content'>
        <div className='close' onClick={ props.onClose } />
        <div>
          <h2>{ props.header }</h2>
          <p>{ props.description }</p>
        </div>
      </div>
    </div>
  );
};

export default TextboxOverlay;
