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
      scenePano: [],
      sunroomPano: [],
      cabinetsPano: [],
      backsplashPano: [],
      counterPano: [],
      sceneLoading: false,
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

  componentDidUpdate() {
    this.updateLoadingHandler();
  }

  updateLoadingHandler = async () => {
    if (this.state.sceneLoading && this.state.panosLoading === 0) {
      await this.setState({sceneLoading: !this.state.sceneLoading});
      this.props.toggleLoading(this.state.sceneLoading);
      console.log('scene loaded');
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

  buildPanoStateAndSetAsyncStorage = (stateKey, storageKey, uriArray) => {
    const uriString = JSON.stringify(uriArray);
    const stateObj = {
      key: stateKey,
      value: uriArray
    };
    AsyncStorageUtils.setPano(storageKey, uriString);
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

  handleSunroom = async (props) => {
    if (props.elevation === 'bella vista') {
      return props.sunroomOn
        ? await this.updateStateAndStorage(
          'sunroomPano',
          props.storageKeyData.kitchen.sunroom,
          props.panoUriData.kitchen.sunroom.bellaVista
        )
        : console.log('sunroom off')
    } else if (props.elevation === 'bella vista brick') {
      return props.sunroomOn
        ? await this.updateStateAndStorage(
          'sunroomPano',
          props.storageKeyData.kitchen.sunroom,
          props.panoUriData.kitchen.sunroom.bellaVistaBrick
        )
        : console.log('sunroom off');
    }
  }

  handleElevation = async (props) => {
    if (props.elevation === 'american classic') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'scenePano',
          props.storageKeyData.kitchen.scene,
          props.panoUriData.kitchen.scene.americanClassicSunroom
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'scenePano',
          props.storageKeyData.kitchen.scene,
          props.panoUriData.kitchen.scene.americanClassic
        );
    } else if (props.elevation === 'bella vista' && props.elevation !== this.props.elevation) {
      return await this.buildPanoStateAndSetAsyncStorage(
        'scenePano',
        props.storageKeyData.kitchen.scene,
        props.panoUriData.kitchen.scene.bellaVista
      );
    } else if (props.elevation === 'bella vista brick' && props.elevation !== this.props.elevation) {
      return await this.buildPanoStateAndSetAsyncStorage(
        'scenePano',
        props.storageKeyData.kitchen.scene,
        props.panoUriData.kitchen.scene.bellaVistaBrick
      );
    }
  }

  initElevation = async (props) => {
    if (props.elevation === 'american classic') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'scenePano',
          props.storageKeyData.kitchen.scene,
          props.panoUriData.kitchen.scene.americanClassicSunroom
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'scenePano',
          props.storageKeyData.kitchen.scene,
          props.panoUriData.kitchen.scene.americanClassic
        );
    } else if (props.elevation === 'bella vista') {
      return await this.buildPanoStateAndSetAsyncStorage(
        'scenePano',
        props.storageKeyData.kitchen.scene,
        props.panoUriData.kitchen.scene.bellaVista
      );
    } else if (props.elevation === 'bella vista brick') {
      return await this.buildPanoStateAndSetAsyncStorage(
        'scenePano',
        props.storageKeyData.kitchen.scene,
        props.panoUriData.kitchen.scene.bellaVistaBrick
      );
    }
  }

  initScene = async (props) => {
    const result = await Promise.all([this.initElevation(props),
                                      this.handleSunroom(props),
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
    const updateNumber = Object.keys(stateObj).length;
    this.initLoadingHandler(updateNumber);
    this.setState(stateObj);
  }

  updateScene = async (props) => {
    const promiseArr = [];
    if (props.elevation !== this.props.elevation || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleElevation(props));
    }
    if (props.elevation !== this.props.elevation || props.sunroomOn !== this.props.sunroomOn) {
      promiseArr.push(this.handleSunroom(props));
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
      sceneLoading: true,
      panosLoading: updateNumber
    });
    this.props.toggleLoading(this.state.sceneLoading)
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
    if (this.state.scenePano.length > 0) {
      return (
        <View>
          <Pano onLoad={ this.sceneOnLoad }
                onLoadEnd={ this.sceneOnLoadEnd }
                source={
                  [
                    asset(this.state.scenePano[0]), asset(this.state.scenePano[1]),
                    asset(this.state.scenePano[2]), asset(this.state.scenePano[3]),
                    asset(this.state.scenePano[4]), asset(this.state.scenePano[5])
                  ]
                } 
          />
          {this.props.elevation !== 'american classic' && this.props.sunroomOn && this.state.sunroomPano.length > 0 ? (
            <PanoLayer radius={990}
                       onLoad={this.sceneOnLoad}
                       onLoadEnd={this.sceneOnLoadEnd}
                       source={ asset(this.state.sunroomPano) }
            />
          ) : (
            <View />
          )}
          {this.props.cabinets !== 'option1' && this.state.cabinetsPano.length > 0 ? (
            <PanoLayer radius={980} source={ asset(this.state.cabinetsPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
          {this.props.backsplash !== 'option1' && this.state.backsplashPano.length > 0 ? (
            <PanoLayer radius={970} source={ asset(this.state.backsplashPano) } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
          {this.props.counter !== 'option1' && this.state.counterPano.length > 0 ? (
            <PanoLayer radius={960} source={ asset(this.state.counterPano)  } onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd} />
          ) : (
            <View />
          )}
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

export default Kitchen;
