import React from 'react';

// Gets props via the DomOverlayModule and uses those to render content
const ModalOverlay = (props) => {
  const devEnv = false;
  const refrigerator = props.data;
  let imgSrc;
  devEnv ? imgSrc = refrigerator.imgSrc : imgSrc = refrigerator.prodImgSrc;
  const listQuickFeatures = refrigerator.quickFeatures.map((feature, index) =>
    <li key={index}>{feature}</li>
  );
  const listColorOptions = refrigerator.colorOptions.map((option, index) =>
    <div key={index}
         className='option-block'
         style={{background: option.value}}>
    </div>
  );
  const listAdditionalFeatures = refrigerator.additionalFeatures.map((feature, index) =>
    <div key={index}>
      <h4>{feature.title}</h4>
      <p>{feature.info}</p>
    </div>
  );

  return (
    <div className='container-modal'>
      <div className='content-wrapper'>
        <div className='close' onClick={props.closeModal} />
        <section className='section-a'>
          <div className='modal-details'>
            <h1>{refrigerator.title}</h1>
            <p>Model #: {refrigerator.model}</p>
            <p className='msrp'>msrp: {refrigerator.msrp}</p>
            <ul>{listQuickFeatures}</ul>
          </div>
          <figure>
            <img src={imgSrc} alt='refrigerator'/>
            <div className='container-option-blocks'>{listColorOptions}</div>
          </figure>
        </section>
        <section className='section-b'>
          <h2>Additional Features</h2>
          <div className='container-additional-features'>{listAdditionalFeatures}</div>
        </section>
      </div>
    </div>
  );
};

export default ModalOverlay;
