import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const ModalOverlay = (props) => {
  const refrigerator = props.data;

  return (
    <div className='container-modal'>
      <div className='close' onClick={ props.closeModal } />
      <section className='section-a'>
        <div className='modal-details'>
          <h1>{ refrigerator.title }</h1>
          <p>model #: { refrigerator.model }</p>
          <p>msrp: { refrigerator.msrp }</p>
        </div>
        <figure>
          <img src={ refrigerator.imgSrc } alt='refrigerator'/>
        </figure>
      </section>
    </div>
  );
};

export default ModalOverlay;
