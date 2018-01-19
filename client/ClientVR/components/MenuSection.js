import React, { Component } from 'react';

import MenuOption from './MenuOption';

class MenuSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuListOpen: false,
    };

    this._toggleMenuList = this.toggleMenuList.bind(this);
  }

  toggleMenuList() {
    this.setState({menuListOpen: !this.state.menuListOpen})
  }

  render() {
    const listOptions = this.props.options.map((option, index) => {
      return (
        <MenuOption key={ index }
                    header={ this.props.header }
                    option={ option }
                    handleClick={ this.props.handleClick } />
      );
    });

    if (this.state.menuListOpen) {
      return (
        <div className='menu-section'>
          <h4 className='menu-header' onClick={ this._toggleMenuList }>{this.props.header}</h4>
          <ul className='menu-list open'>{listOptions}</ul>
        </div>
      )
    } else {
      return (
        <div className='menu-section'>
          <h4 className='menu-header' onClick={ this._toggleMenuList }>{ this.props.header }</h4>
          <ul className='menu-list'>{listOptions}</ul>
        </div>
      )
    }
  }
}

export default MenuSection;
