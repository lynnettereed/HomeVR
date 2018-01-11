import React from 'react';
import ReactDOM from 'react-dom';
import { Module } from 'react-vr-web';

import TextboxOverlay from './TextboxOverlay';

// Module
class DomOverlayModule extends Module {
  constructor(overlayContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._overlayContainer = overlayContainer;
  }

  // Open the overlay for display
  openOverlay(props) {
    ReactDOM.render(
      <TextboxOverlay { ...props } onClose={this._closeOverlay} />,
      this._overlayContainer
    );
  }

  // Close the overlay
  closeOverlay() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
  }
}

export default DomOverlayModule;
