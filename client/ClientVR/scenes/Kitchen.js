import React, { Component } from 'react';
import {
  View,
  asset,
  Pano,
  VrButton,
  Text,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-vr';

import AsyncStorageUtils from '../utils/AsyncStorageUtils';

import MenuVr from '../components/MenuVr';
import PanoLayer from '../components/PanoLayer';
import IconButton from '../components/IconButton';

class Kitchen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenePano: '',
      sunroomPano: '',
      cabinetsPano: '',
      backsplashPano: '',
      counterPano: '',
    };
  }

  componentWillMount() {
    this.initScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateScene(nextProps);
  }

  componentDidUpdate() {
    //console.log('component updated');
  }

  handleCabs = (props) => {
    if (props.cabinets === 'option2') {
      props.sunroomOn
        ? this.setState({cabinetsPano: 'layers/Kitchen_AC_Sunroom_Cabs2.png'})
        : this.setState({cabinetsPano: 'layers/Kitchen_AC_Cabs2.png'})
    } else if (props.cabinets === 'option3') {
      props.sunroomOn
        ? this.setState({cabinetsPano: 'layers/Kitchen_AC_Sunroom_Cabs3.png'})
        : this.setState({cabinetsPano: 'layers/Kitchen_AC_Cabs3.png'})
    } else if (props.cabinets === 'option4') {
      props.sunroomOn
        ? this.setState({cabinetsPano: 'layers/Kitchen_AC_Sunroom_Cabs4.png'})
        : this.setState({cabinetsPano: 'layers/Kitchen_AC_Cabs4.png'})
    }
  }

  handleBacksplash = (props) => {
    if (props.backsplash === 'option2') {
      props.sunroomOn
        ? this.setState({backsplashPano: 'layers/Kitchen_AC_Sunroom_Backsplash2.png'})
        : this.setState({backsplashPano: 'layers/Kitchen_AC_Backsplash2.png'})
    } else if (props.backsplash === 'option3') {
      props.sunroomOn
        ? this.setState({backsplashPano: 'layers/Kitchen_AC_Sunroom_Backsplash3.png'})
        : this.setState({backsplashPano: 'layers/Kitchen_AC_Backsplash3.png'})
    } else if (props.backsplash === 'option4') {
      props.sunroomOn
        ? this.setState({backsplashPano: 'layers/Kitchen_AC_Sunroom_Backsplash4.png'})
        : this.setState({backsplashPano: 'layers/Kitchen_AC_Backsplash4.png'})
    }
  }

  handleCounter = (props) => {
    if (props.counter === 'option2') {
      props.sunroomOn
        ? this.setState({counterPano: 'layers/Kitchen_AC_Sunroom_Counter2.png'})
        : this.setState({counterPano: 'layers/Kitchen_AC_Counter2.png'})
    } else if (props.counter === 'option3') {
      props.sunroomOn
        ? this.setState({counterPano: 'layers/Kitchen_AC_Sunroom_Counter3.png'})
        : this.setState({counterPano: 'layers/Kitchen_AC_Counter3.png'})
    } else if (props.counter === 'option4') {
      props.sunroomOn
        ? this.setState({counterPano: 'layers/Kitchen_AC_Sunroom_Counter4.png'})
        : this.setState({counterPano: 'layers/Kitchen_AC_Counter4.png'})
    }
  }

  handleElevation = (props) => {
    if (props.elevation === 'american classic') {
      if (props.sunroomOn) {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg'});
        AsyncStorageUtils.setPano(props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg');
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic.jpg'});
        AsyncStorageUtils.setPano(props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_AmericanClassic.jpg');
      }
    } else if (props.elevation === 'bella vista') {
      if (props.sunroomOn) {
        this.setState({
          scenePano: 'panos/Foster_Int_Kitchen_BellaVista.jpg',
          sunroomPano: 'panos/Foster_Int_Kitchen_BellaVista_Sunroom.png',
        });
        AsyncStorageUtils.setManyPano([props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVista.jpg'],
                                      [props.storageKeyData.kitchen.sunroom, 'panos/Foster_Int_Kitchen_BellaVista_Sunroom.png']);
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_BellaVista.jpg'});
        AsyncStorageUtils.setPano(props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVista.jpg');
      }
    } else if (props.elevation === 'bella vista brick') {
      if (props.sunroomOn) {
        this.setState({
          scenePano: 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg',
          sunroomPano: 'panos/Foster_Int_Kitchen_BellaVistaBrick_Sunroom.png',
        });
        AsyncStorageUtils.setManyPano([props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg'],
                                      [props.storageKeyData.kitchen.sunroom, 'panos/Foster_Int_Kitchen_BellaVistaBrick_Sunroom.png'])
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg'});
        AsyncStorageUtils.setPano(props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg');
      }
    }
  }

  initScene = (props) => {
    this.handleElevation(props);
    this.handleCabs(props);
    this.handleBacksplash(props);
    this.handleCounter(props);
  }

  updateScene = (props) => {
    if (props.elevation !== this.props.elevation || props.sunroomOn !== this.props.sunroomOn) {
      this.handleElevation(props);
    }
    if (props.cabinets !== this.props.cabinets || props.sunroomOn !== this.props.sunroomOn) {
      this.handleCabs(props);
    }
    if (props.backsplash !== this.props.backsplash || props.sunroomOn !== this.props.sunroomOn) {
      this.handleBacksplash(props);
    }
    if (props.counter !== this.props.counter || props.sunroomOn !== this.props.sunroomOn) {
      this.handleCounter(props);
    }
  }

  sceneOnLoad = () => {
    //console.log('pano loading');
  }

  sceneOnLoadEnd = () => {
    //console.log('pano loaded');
  }

  render() {
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }
              onLoad={ this.sceneOnLoad }
              onLoadEnd={ this.sceneOnLoadEnd }>
          {this.props.elevation !== 'american classic' && this.props.sunroomOn ? (
            <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
          {this.props.cabinets !== 'option1' ? (
            <PanoLayer radius={980} source={ asset(this.state.cabinetsPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
          {this.props.backsplash !== 'option1' ? (
            <PanoLayer radius={970} source={ asset(this.state.backsplashPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
          {this.props.counter !== 'option1' ? (
            <PanoLayer radius={960} source={ asset(this.state.counterPano)  } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
        </Pano>
        <IconButton toggleModal={ this.props.toggleModal } />
        {this.props.renderVrMenu && <MenuVr text={ this.props.vrMenuContent } />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#777879',
    fontSize: 0.8,
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [{translate: [7, -2, -14]},
                {rotateY: -30}],
  }
});

export default Kitchen;
