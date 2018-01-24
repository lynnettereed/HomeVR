import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const ModalOverlay = (props) => {

  return (
    <div className='container-modal'>
      <div className='close' onClick={ props.closeModal } />
    </div>
  );
};

export default ModalOverlay;
