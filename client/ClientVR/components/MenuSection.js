import React from 'react';

import MenuOption from './MenuOption';

const MenuSection = (props) => {
  const listOptions = props.options.map((option, index) => {
    return (
      <MenuOption key={index} option={option} handleClick={ props.handleClick } />
    );
  });

  return (
    <div className='menu-section'>
      <h2 className='menu-header'>{props.header}</h2>
      <ul className='menu-list'>{listOptions}</ul>
    </div>
  )
}

export default MenuSection;
