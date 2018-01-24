import React from 'react';
import {
  View,
  VrButton,
  Image,
  StyleSheet,
  asset
} from 'react-vr';

const IconButton = () => {
  return (
    <VrButton style={styles.iconContainer}>
      <Image
        style={styles.icon}
        source={ asset('icons/info-circle.png') }
      />
    </VrButton>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#FFF',
    borderWidth: 0.025,
    borderRadius: 1,
    paddingLeft: 0.3,
    paddingRight: 0.3,
    paddingTop: 0.2,
    paddingBottom: 0.2,
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [7, -2, -14]},
                {rotateY: -30}],
  },
  icon: {
    width: 0.75,
    height: 0.75,
  }
})

export default IconButton;
