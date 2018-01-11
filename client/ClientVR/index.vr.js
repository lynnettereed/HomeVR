import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  View
} from 'react-vr';

export default class ClientVR extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
      </View>
    );
  }
}

AppRegistry.registerComponent('ClientVR', () => ClientVR);
