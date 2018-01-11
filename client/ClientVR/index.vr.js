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

const domTextboxContent = {
  header: 'This is a DOM Overlay!',
  description: 'A dom overlay is a 2D window that takes over the 3D world, allowing for better interactivity and content consumption outside of VR. DOM Overlays are implemented as Native Modules, for more info on native modules, check the following links:',
}

const vrTextboxContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class ClientVR extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrTextbox: false,
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
  }

  // Determine whether content should be displayed on the dom overlay, or as a
  // react-vr component based on VrHeadModel's inVR API.
  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openOverlay(domTextboxContent);
    }
  }

  render() {
    return (
      <View style={ styles.rootView }>
        <Pano source={ asset('chess-world.jpg') } />
        <View style={ styles.triggerContainer }>
          <VrButton style={ styles.triggerButton } onClick={ this._toggleDisplay }>
            <Text style={ styles.triggerText }>Click Me!</Text>
          </VrButton>
        </View>
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
  triggerContainer: {
    transform: [{rotateY: 0}, {translateZ: -3}],
  },
  triggerButton: {
    borderRadius: 0.05,
    height: 1,
    width: 1,
    backgroundColor: '#F00',
    justifyContent: 'center',
  },
  triggerText: {
    alignSelf: 'center',
    fontSize: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

AppRegistry.registerComponent('ClientVR', () => ClientVR);
