import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  Pano,
  NativeModules,
  StyleSheet,
  Text,
  VrButton,
  VrHeadModel
} from 'react-vr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import MenuVr from './components/MenuVr';
import PanoLayer from './components/PanoLayer';

const domMenuContent = {
  menuData: [
    {
      sectionHeader: 'elevation',
      sectionOptions: ['american classic', 'bella vista', 'bella vista brick'],
    },
    {
      sectionHeader: 'sunroom',
      sectionOptions: ['on', 'off'],
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
      sunroomOn: false,
      elevation: 'american classic',
      scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg',
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
    this._togglePersistent = this.togglePersistent.bind(this);
    this._updateScene = this.updateScene.bind(this);
  }

  componentWillMount() {
    // Init persistent overlay
    this._togglePersistent();
    // Listen for overlay button events
    RCTDeviceEventEmitter.addListener('overlayButtonEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      if (e === 'exitVR button clicked!') {
        postMessage({ type: 'exit VR'});
      } else if (e === 'menu button clicked!') {
        this._toggleDisplay();
      } else if (e === 'menu escape clicked!') {
        this._toggleDisplay();
      }
    });
    // Listen for overlay option events
    RCTDeviceEventEmitter.addListener('overlayOptionEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      if (e.header === 'elevation') {
        if (e.option === 'american classic') {
          this.setState({elevation: 'american classic'});
        } else if (e.option === 'bella vista') {
          this.setState({elevation: 'bella vista'});
        } else if (e.option === 'bella vista brick') {
          this.setState({elevation: 'bella vista brick'});
        }
      } else if (e.header === 'sunroom') {
        if (e.option === 'off') {
          this.setState({sunroomOn: false});
        } else if (e.option === 'on') {
          this.setState({sunroomOn: true});
        } else {
          console.log('not sunroom input');
        }
      }
      this._updateScene();
    });
  }

  updateScene() {
    if (this.state.elevation === 'american classic') {
      if (this.state.sunroomOn) {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic_Sunroom.jpg'});
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg'});
      }
    } else if (this.state.elevation === 'bella vista') {
      this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg'});
    } else if (this.state.elevation === 'bella vista brick') {
      this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg'});
    }
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
    console.log('elevation: ' + this.state.elevation);
    console.log('sunroomOn: ' + this.state.sunroomOn);
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          <PanoLayer radius={990} source={ asset('layers/Foster_Int_FamilyRoom_americanClassic_Fireplace.png') } />
        </Pano>
        {this.state.renderVrTextbox && <MenuVr text={ vrMenuContent } />}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ClientVR', () => ClientVR);
