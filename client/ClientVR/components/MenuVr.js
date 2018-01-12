import React from 'react';
import {
  Text,
  View
} from 'react-vr';

const MenuVr = (props) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        transform: [{rotateX: -20}, {translateZ: -3}],
        height: 0.8,
        width: 4,
        backgroundColor: '#000',
      }}>
      <Text style={{
        alignSelf: 'center',
        fontSize: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
      }}>
      {props.text}
      </Text>
    </View>
  );
}

export default MenuVr;
