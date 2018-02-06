import React from 'react';
import {
  View,
  VrButton,
  Image,
  StyleSheet,
  asset
} from 'react-vr';

const IconButton = (props) => {
  return (
    <View>
      <VrButton style={ styles.iconContainer }
                onClick={ props.toggleModal }>
        <Image
          style={ styles.icon }
          source={ asset('icons/info-circle.png') }
        />
      </VrButton>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#FFF',
    borderWidth: 0.025,
    borderRadius: 1,
    width: 1.3,
    height: 1.3,
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [7.2, -2, -14]},
                {rotateY: -30}],
  },
  icon: {
    width: 0.75,
    height: 0.75,
  }
})

export default IconButton;
