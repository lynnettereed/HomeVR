import React from 'react';
import ReactDOM from 'react-dom';
import { Module } from 'react-vr-web';

import TextboxOverlay from './TextboxOverlay';
import BtnboxOverlay from './BtnboxOverlay';

// Module
class DomOverlayModule extends Module {
  constructor(overlayContainer, persistentContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._openOverlay = this.openOverlay.bind(this);
    this._handleBtnClick = this.handleBtnClick.bind(this);
    this._handleXBtnClick = this.handleXBtnClick.bind(this);
    this._overlayContainer = overlayContainer;
    this._persistentContainer = persistentContainer;
  }

  // Open the overlay for display
  openOverlay(props) {
    ReactDOM.render(
      <TextboxOverlay { ...props } onClose={ this._handleXBtnClick } />,
      this._overlayContainer
    );
  }

  handleBtnClick() {
    if (this.rnctx) {
      const data = 'menu button clicked!';
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
