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
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import MenuVr from './components/MenuVr';

const domMenuContent = {
  menuData: [
    {
      sectionHeader: 'Elevation',
      sectionOptions: ['American Classic', 'Bella Vista', 'Bella Vista Brick'],
    },
    {
      sectionHeader: 'Sunroom',
      sectionOptions: ['On', 'Off'],
    },
  ],
};

const vrMenuContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class ClientVR extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrMenu: false,
      renderVrBtnbox: false,
      menuActive: false,
      sunroom: 'off',
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
    this._togglePersistent = this.togglePersistent.bind(this);
  }

  componentWillMount() {
    // Init persistent overlay
    this._togglePersistent();
    // Listen for overlay button events
    RCTDeviceEventEmitter.addListener('overlayButtonEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      this._toggleDisplay();
    });
    // Listen for overlay option events
    RCTDeviceEventEmitter.addListener('overlayOptionEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      if (e.header === 'sunroom') {
        if (e.option === 'Off') {
          this.setState({sunroom: 'off'});
        } else if (e.option === 'On') {
          this.setState({sunroom: 'on'});
        } else {
          console.log('not sunroom input');
        }
      }
    });
  }

  // Determine whether content should be displayed on the dom overlay, or as a
  // react-vr component based on VrHeadModel's inVR API.
  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrMenu: !this.state.renderVrMenu});
    } else if (!this.state.menuActive) {
      this.setState({menuActive: !this.state.menuActive})
      NativeModules.DomOverlayModule.openOverlay(domMenuContent);
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
  // TODO: create BtnboxVr component and add conditional below TextboxVr
  render() {
    console.log('menuActive: ' + this.state.menuActive);
    console.log('sunroom: ' + this.state.sunroom);
    return (
      <View style={ styles.rootView }>
        <Pano source={ asset('panos/Foster_Int_FamilyRoom_AmericanClassic.jpg') } />
        {this.state.renderVrTextbox && <MenuVr text={ vrMenuContent } />}
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
