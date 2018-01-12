import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  View,
  NativeModules,
  StyleSheet,
  Text,
  VrButton,
  VrHeadModel
} from 'react-vr';

import TextboxVr from './components/TextboxVr';

// const domTextboxContent = {
//   header: 'This is a DOM Overlay!',
//   description: 'A dom overlay is a 2D window that takes over the 3D world, allowing for better interactivity and content consumption outside of VR. DOM Overlays are implemented as Native Modules, for more info on native modules, check the following links:',
// };

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const vrTextboxContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class ClientVR extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrTextbox: false,
      renderVrBtnbox: false,
      menuActive: false,
    };

    this.domTextboxContent = {
      header: 'This is a DOM Overlay!',
      description: 'A dom overlay is a 2D window that takes over the 3D world, allowing for better interactivity and content consumption outside of VR. DOM Overlays are implemented as Native Modules, for more info on native modules, check the following links:',
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
    this._togglePersistent = this.togglePersistent.bind(this);
  }

  componentWillMount() {
    this._togglePersistent();
    RCTDeviceEventEmitter.addListener('overlayButtonEvent', (e) => {
      console.log(e);
      this._toggleDisplay();
    });
  }

  // Determine whether content should be displayed on the dom overlay, or as a
  // react-vr component based on VrHeadModel's inVR API.
  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else if (!this.state.menuActive) {
      this.setState({menuActive: !this.state.menuActive})
      NativeModules.DomOverlayModule.openOverlay(this.domTextboxContent);
    } else {
      this.setState({menuActive: !this.state.menuActive})
      NativeModules.DomOverlayModule.closeOverlay();
    }
  }

  togglePersistent() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrBtnbox: !this.state.renderVrBtnbox});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openPersistent();
    }
  }

  render() {
    console.log(this.state.menuActive);
    return (
      <View style={ styles.rootView }>
        <Pano source={ asset('chess-world.jpg') } />
        {this.state.renderVrTextbox && <TextboxVr text={ vrTextboxContent } />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    layoutOrigin: [0.5, 0.5],
    position: 'absolute',
  },
});

AppRegistry.registerComponent('ClientVR', () => ClientVR);
