import React from 'react';

const MenuOption = (props) => {
  const details = {
    header: props.header,
    option: props.option
  }

  return (
    <li className='menu-list-option' onClick={() => props.handleClick(details) }>{props.option}</li>
  );
};

export default MenuOption;
