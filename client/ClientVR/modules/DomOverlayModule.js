import React from 'react';
import ReactDOM from 'react-dom';
import { Module } from 'react-vr-web';

import MenuOverlay from '../components/MenuOverlay';
import BtnboxOverlay from '../components/BtnboxOverlay';

// Module
class DomOverlayModule extends Module {
  constructor(overlayContainer, persistentContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._openOverlay = this.openOverlay.bind(this);
    this._handleBtnClick = this.handleBtnClick.bind(this);
    this._handleXBtnClick = this.handleXBtnClick.bind(this);
    this._handleOptionClick = this.handleOptionClick.bind(this);

    this._overlayContainer = overlayContainer;
    this._persistentContainer = persistentContainer;
  }

  // Open the overlay for display
  openOverlay(props) {
    ReactDOM.render(
      <MenuOverlay { ...props } onClose={ this._handleXBtnClick }
                                handleClick={ this._handleOptionClick } />,
      this._overlayContainer
    );
  }

  handleBtnClick(btn) {
    if (this.rnctx) {
      const data = `${btn} clicked!`;
      this.rnctx.callFunction(
        'RCTDeviceEventEmitter',
        'emit',
        ['overlayButtonEvent', data]
      );
    }
  }

  handleXBtnClick() {
    if (this.rnctx) {
      const data = 'menu escape clicked!';
      this.rnctx.callFunction(
        'RCTDeviceEventEmitter',
        'emit',
        ['overlayButtonEvent', data]
      );
    }
  }

  handleOptionClick(details) {
    if (this.rnctx) {
      const data = details;
      this.rnctx.callFunction(
        'RCTDeviceEventEmitter',
        'emit',
        ['overlayOptionEvent', data]
      );
    }
  }

  openPersistent() {
    ReactDOM.render(
      <BtnboxOverlay handleClick={ this._handleBtnClick} />,
      this._persistentContainer
    );
  }

  // Close the overlay
  closeOverlay() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
  }
}

export default DomOverlayModule;
