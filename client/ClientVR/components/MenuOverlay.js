import React from 'react';

import MenuSection from './MenuSection';

// Gets props via the DomOverlayModule and uses those to render content
const MenuOverlay = (props) => {
  const menu = props.menuData;
  const listMenu = menu.map((menuSection, index) => {
    return (
      <MenuSection header={ menuSection.sectionHeader }
                   options={ menuSection.sectionOptions }
                   handleClick={ props.handleClick }
                   key={index} />
    );
  });

  return (
    <div className='container'>
      <div className='content'>
        <div className='close' onClick={ props.onClose } />
        <div className='menu'>
          {listMenu}
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
