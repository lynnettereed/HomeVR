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
import PanoSwitch from '../components/PanoSwitch';

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
      updatePhase: 'A',
      showLayerA: false,
      showLayerB: true,
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

  initScene = async (props) => {
    const result = await Promise.all(
      [
        this.initElevation(props),
        this.handleSunroom(props),
        this.handleCabs(props),
        this.handleBacksplash(props),
        this.handleCounter(props)
      ]
    );
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
    // TODO: set updatePhase to 'A'
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
    if (this.state.updatePhase === 'A') {
      this.setState({updatePhase: 'B'});
    } else {
      this.setState({updatePhase: 'A'});
    }
    this.setState(stateObj);
  }

  handleCabs = async (props) => {
    if (props.cabinets === 'option2') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.sunroom.option2
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.option2
        );
    } else if (props.cabinets === 'option3') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.sunroom.option3
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.option3
        );
    } else if (props.cabinets === 'option4') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.sunroom.option4
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'cabinetsPano',
          props.storageKeyData.kitchen.cabinets,
          props.panoUriData.kitchen.cabinets.option4
        );
    }
  }

  handleBacksplash = async (props) =>  {
    if (props.backsplash === 'option2') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.sunroom.option2
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.option2
        );
    } else if (props.backsplash === 'option3') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.sunroom.option3
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.option3
        );
    } else if (props.backsplash === 'option4') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.sunroom.option4
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'backsplashPano',
          props.storageKeyData.kitchen.backsplash,
          props.panoUriData.kitchen.backsplash.option4
        );
    }
  }

  handleCounter = async (props) => {
    if (props.counter === 'option2') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.sunroom.option2
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.option2
        );
    } else if (props.counter === 'option3') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.sunroom.option3
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.option3
        );
    } else if (props.counter === 'option4') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.sunroom.option4
        )
        : await this.buildPanoStateAndSetAsyncStorage(
          'counterPano',
          props.storageKeyData.kitchen.counter,
          props.panoUriData.kitchen.counter.option4
        );
    }
  }

  handleSunroom = async (props) => {
    if (props.elevation === 'bella vista') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
          'sunroomPano',
          props.storageKeyData.kitchen.sunroom,
          props.panoUriData.kitchen.sunroom.bellaVista
        )
        : console.log('sunroom off')
    } else if (props.elevation === 'bella vista brick') {
      return props.sunroomOn
        ? await this.buildPanoStateAndSetAsyncStorage(
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

  buildPanoStateAndSetAsyncStorage = (stateKey, storageKey, uri) => {
    let uriString;
    uri instanceof Array ? uriString = JSON.stringify(uri) : uriString = uri;
    const stateObj = {
      key: stateKey,
      value: uri
    };
    AsyncStorageUtils.setPano(storageKey, uri);
    return [stateObj];
  }

  initLoadingHandler = async (updateNumber) => {
    await this.setState({
      sceneLoading: true,
      panosLoading: updateNumber
    });
    this.props.toggleLoading(this.state.sceneLoading)
    console.log(this.state.panosLoading);
  }

  updateLoadingHandler = async () => {
    if (this.state.sceneLoading && this.state.panosLoading === 0) {
      await this.setState({
        sceneLoading: !this.state.sceneLoading,
      });
      this.props.toggleLoading(this.state.sceneLoading);
      this.setState({
        showLayerA: !this.state.showLayerA,
        showLayerB: !this.state.showLayerB
      });
      console.log('scene loaded');
    }
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
          <PanoSwitch radius={1000}
                      panoOnLoad={this.sceneOnLoad}
                      panoOnLoadEnd={this.sceneOnLoadEnd}
                      showLayerA={this.state.showLayerA}
                      showLayerB={this.state.showLayerB}
                      updatePhase={this.state.updatePhase}
                      uri={this.state.scenePano}
          />
          {this.props.elevation !== 'american classic' && this.props.sunroomOn &&
           this.state.sunroomPano.length > 0 ? (
            <PanoSwitch radius={990}
                        panoOnLoad={this.sceneOnLoad}
                        panoOnLoadEnd={this.sceneOnLoadEnd}
                        showLayerA={this.state.showLayerA}
                        showLayerB={this.state.showLayerB}
                        updatePhase={this.state.updatePhase}
                        uri={this.state.sunroomPano}
            />
          ) : (
            <View />
          )}
          {this.props.cabinets !== 'option1' && this.state.cabinetsPano.length > 0 ? (
            <PanoSwitch radius={980}
                        panoOnLoad={this.sceneOnLoad}
                        panoOnLoadEnd={this.sceneOnLoadEnd}
                        showLayerA={this.state.showLayerA}
                        showLayerB={this.state.showLayerB}
                        updatePhase={this.state.updatePhase}
                        uri={this.state.cabinetsPano}
            />
          ) : (
            <View />
          )}
          {this.props.backsplash !== 'option1' && this.state.backsplashPano.length > 0 ? (
            <PanoSwitch radius={970}
                        panoOnLoad={this.sceneOnLoad}
                        panoOnLoadEnd={this.sceneOnLoadEnd}
                        showLayerA={this.state.showLayerA}
                        showLayerB={this.state.showLayerB}
                        updatePhase={this.state.updatePhase}
                        uri={this.state.backsplashPano}
            />
          ) : (
            <View />
          )}
          {this.props.counter !== 'option1' && this.state.counterPano.length > 0 ? (
            <PanoSwitch radius={960}
                        panoOnLoad={this.sceneOnLoad}
                        panoOnLoadEnd={this.sceneOnLoadEnd}
                        showLayerA={this.state.showLayerA}
                        showLayerB={this.state.showLayerB}
                        updatePhase={this.state.updatePhase}
                        uri={this.state.counterPano}
            />
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
