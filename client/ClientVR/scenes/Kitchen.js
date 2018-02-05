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

function decreasePanosLoading(state, props) {
  return {
    panosLoading: state.panosLoading - 1
  };
}

class Kitchen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenePano: '',
      sunroomPano: '',
      cabinetsPano: '',
      backsplashPano: '',
      counterPano: '',
      sceneUpdated: false,
      panosLoading: 0,
    };
  }

  componentWillMount() {
    this.initScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.elevation !== nextProps.elevation ||
        this.props.backsplash !== nextProps.backsplash ||
        this.props.cabinets !== nextProps.cabinets ||
        this.props.counter !== nextProps.counter ||
        this.props.sunroomOn !== nextProps.sunroomOn) {
      this.updateScene(nextProps);
    }
  }

  updateStateAndStorage = (panoKey, storageKey, uri) => {
    AsyncStorageUtils.setPano(storageKey, uri);
    const stateObj = {
      key: panoKey,
      value: uri
    }
    return [stateObj];
  }

  updateManyStateAndStorage = (stateStorageArr) => {
    const storageArr = [];
    const stateObjArr = []

    stateStorageArr.forEach(el => {
      const storageKey = el[1];
      const storageVal = el[2];
      const storageArrEntry = [storageKey, storageVal];
      storageArr.push(storageArrEntry);

      const objKey = el[0];
      const objVal = el[2];
      const stateObjArrEntry = {
        key: objKey,
        value: objVal
      }
      stateObjArr.push(stateObjArrEntry);
    });

    AsyncStorageUtils.setManyPano(...storageArr);
    return stateObjArr;
  }

  handleCabs = async (props) => {
    if (props.cabinets === 'option2') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Sunroom_Cabs2.png')
        : await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Cabs2.png')
    } else if (props.cabinets === 'option3') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Sunroom_Cabs3.png')
        : await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Cabs3.png')
    } else if (props.cabinets === 'option4') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Sunroom_Cabs4.png')
        : await this.updateStateAndStorage('cabinetsPano', props.storageKeyData.kitchen.cabinets, 'layers/Kitchen_AC_Cabs4.png')
    }
  }

  handleBacksplash = async (props) =>  {
    if (props.backsplash === 'option2') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Sunroom_Backsplash2.png')
        : await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Backsplash2.png')
    } else if (props.backsplash === 'option3') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Sunroom_Backsplash3.png')
        : await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Backsplash3.png')
    } else if (props.backsplash === 'option4') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Sunroom_Backsplash4.png')
        : await this.updateStateAndStorage('backsplashPano', props.storageKeyData.kitchen.backsplash, 'layers/Kitchen_AC_Backsplash4.png')
    }
  }

  handleCounter = async (props) => {
    if (props.counter === 'option2') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Sunroom_Counter2.png')
        : await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Counter2.png')
    } else if (props.counter === 'option3') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Sunroom_Counter3.png')
        : await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Counter3.png')
    } else if (props.counter === 'option4') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Sunroom_Counter4.png')
        : await this.updateStateAndStorage('counterPano', props.storageKeyData.kitchen.counter, 'layers/Kitchen_AC_Counter4.png')
    }
  }

  handleElevation = async (props) => {
    if (props.elevation === 'american classic') {
      return props.sunroomOn
        ? await this.updateStateAndStorage('scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg')
        : await this.updateStateAndStorage('scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_AmericanClassic.jpg')
    } else if (props.elevation === 'bella vista') {
      return props.sunroomOn
        ? await this.updateManyStateAndStorage([['scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVista.jpg'], ['sunroomPano', props.storageKeyData.kitchen.sunroom, 'panos/Foster_Int_Kitchen_BellaVista_Sunroom.png']])
        : await this.updateStateAndStorage('scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVista.jpg')
    } else if (props.elevation === 'bella vista brick') {
      return props.sunroomOn
        ? await this.updateManyStateAndStorage([['scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg'], ['sunroomPano', props.storageKeyData.kitchen.sunroom, 'panos/Foster_Int_Kitchen_BellaVistaBrick_Sunroom.png']])
        : await this.updateStateAndStorage('scenePano', props.storageKeyData.kitchen.scene, 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg')
    }
  }

  initScene = async (props) => {
    const result = await Promise.all([this.handleElevation(props),
                                      this.handleCabs(props),
                                      this.handleBacksplash(props),
                                      this.handleCounter(props)]);
    const stateObj = {};
    result.forEach(el => {
      if (el) {
        el.forEach(item => {
          stateObj[item.key] = item.value;
        });
      }
    });
    console.log(stateObj);
    this.setState(stateObj);
  }

  updateScene = async (props) => {
    const promiseArr = [];
    if (props.elevation !== this.props.elevation || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleElevation(props));
    }
    if (props.cabinets !== this.props.cabinets || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleCabs(props));
    }
    if (props.backsplash !== this.props.backsplash || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleBacksplash(props));
    }
    if (props.counter !== this.props.counter || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleCounter(props));
    }
    const result = await Promise.all([...promiseArr]);
    const stateObj = {};
    result.forEach(el => {
      if (el) {
        el.forEach(item => {
          stateObj[item.key] = item.value;
        });
      }
    });
    console.log(stateObj);
    const updateNumber = Object.keys(stateObj).length;
    this.initLoadingHandler(updateNumber);
    this.setState(stateObj);
  }

  initLoadingHandler = async (updateNumber) => {
    await this.setState({
      sceneUpdated: false,
      panosLoading: updateNumber
    });
    console.log(this.state.panosLoading);
  }

  sceneOnLoad = () => {
    console.log('pano loading');
  }

  sceneOnLoadEnd = async () => {
    console.log('pano loaded');
    if (this.state.panosLoading !== 0) {
      await this.setState(decreasePanosLoading);
      console.log(this.state.panosLoading);
    }
  }

  render() {
    if (this.state.scenePano !== '') {
      return (
        <View>
          <Pano source={ asset(this.state.scenePano) }
                onLoad={ this.sceneOnLoad }
                onLoadEnd={ this.sceneOnLoadEnd }>
            {this.props.elevation !== 'american classic' && this.props.sunroomOn && this.state.sunroomPano !== '' ? (
              <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
            ) : (
              <View />
            )}
            {this.props.cabinets !== 'option1' && this.state.cabinetsPano !== '' ? (
              <PanoLayer radius={980} source={ asset(this.state.cabinetsPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
            ) : (
              <View />
            )}
            {this.props.backsplash !== 'option1' && this.state.backsplashPano !== '' ? (
              <PanoLayer radius={970} source={ asset(this.state.backsplashPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
            ) : (
              <View />
            )}
            {this.props.counter !== 'option1' && this.state.counterPano !== '' ? (
              <PanoLayer radius={960} source={ asset(this.state.counterPano)  } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
            ) : (
              <View />
            )}
          </Pano>
          <IconButton toggleModal={ this.props.toggleModal } />
          {this.props.renderVrMenu && <MenuVr text={ this.props.vrMenuContent } />}
        </View>
      );
    } else {
      return (
        <View />
      )
    }

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
