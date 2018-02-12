import React, { Component } from 'react';
import {
  Pano,
  View,
  asset,
  AsyncStorage,
  Prefetch
} from 'react-vr';
import AsyncStorageUtils from '../utils/AsyncStorageUtils';

import PanoLayer from '../components/PanoLayer';
import MenuVr from '../components/MenuVr';

class FamilyRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenePano: '',
      sunroomPano: '',
      prefetchUris: [],
    };
  }

  componentWillMount() {
    this.initScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateScene(nextProps);
    this.updatePrefetchUris(nextProps.storageKeyData.kitchen.all);
  }

  initScene = (props) => {
    this.handleElevation(props);
  }

  updateScene = (props) => {
    if (props.elevation !== this.props.elevation || props.sunroomOn !== this.props.sunroomOn) {
      this.handleElevation(props);
    }
  }

  handleElevation = (props) => {
    if (props.elevation === 'american classic') {
      if (props.sunroomOn) {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic_Sunroom.jpg'});
        AsyncStorageUtils.setPano(
          props.storageKeyData.kitchen.scene,
          JSON.stringify(props.panoUriData.kitchen.scene.americanClassicSunroom)
        );
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg'});
        AsyncStorageUtils.setPano(
          props.storageKeyData.kitchen.scene,
          JSON.stringify(props.panoUriData.kitchen.scene.americanClassic)
        );
      }
    } else if (props.elevation === 'bella vista') {
      if (props.sunroomOn) {
        this.setState({
          sunroomPano: 'layers/Foster_Int_FamilyRoom_BellaVista_Sunroom.png',
          scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg',
        });
        AsyncStorageUtils.setManyPano(
          [
            props.storageKeyData.kitchen.scene,
            JSON.stringify(props.panoUriData.kitchen.scene.bellaVista)
          ],
          [
            props.storageKeyData.kitchen.sunroom,
            JSON.stringify(props.panoUriData.kitchen.sunroom.bellaVista)
          ]
        );
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg'});
        AsyncStorageUtils.setPano(
          props.storageKeyData.kitchen.scene,
          JSON.stringify(props.panoUriData.kitchen.scene.bellaVista)
        );
      }
    } else if (props.elevation === 'bella vista brick') {
      if (props.sunroomOn) {
        this.setState({
          sunroomPano: 'layers/Foster_Int_FamilyRoom_BellaVistaBrick_Sunroom.png',
          scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg',
        });
        AsyncStorageUtils.setManyPano(
          [
            props.storageKeyData.kitchen.scene,
            JSON.stringify(props.panoUriData.kitchen.scene.bellaVistaBrick)
          ],
          [
            props.storageKeyData.kitchen.sunroom,
            JSON.stringify(props.panoUriData.kitchen.sunroom.bellaVistaBrick)
          ]
        );
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg'});
        AsyncStorageUtils.setPano(
          props.storageKeyData.kitchen.scene,
          JSON.stringify(props.panoUriData.kitchen.scene.bellaVistaBrick)
        );
      }
    }
  }

  updatePrefetchUris = async (keys) => {
    try {
      await this.clearPrefetchUris();
      await this.setPrefetchUris(keys);
    } catch (err) {
      throw new Error(`failed to update prefetchUris: ${err}`);
    }
  }

  setPrefetchUris = async (keys) => {
    try {
      const prefetchValueArr = await this.buildPrefetchArr(keys);
      await this.pushToPrefetchUris(prefetchValueArr);
    } catch (err) {
      throw new Error(`failed to set prefetchUris: ${err}`);
    }
  }

  clearPrefetchUris = () => {
    this.setState({prefetchUris: []});
  }

  buildPrefetchArr = async (keys) => {
    let valueArr = [];
    const keyValues = await AsyncStorage.multiGet(keys);
    keyValues.forEach((keyValue) => {
      const key = keyValue[0];
      let value = keyValue[1];
      if (isJsonString(value)) {
        value = JSON.parse(value);
      }
      if (value !== null) {
        valueArr.push(value)
      } else {
        if (key === 'KitchenScenePano') {
          console.log(`${key} undefined... setting ${key}`);
          valueArr.push(this.props.panoUriData.kitchen.scene.americanClassic);
        }
      }
    });
    return valueArr;

    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
  }

  pushToPrefetchUris = async (valueArr) => {
    await this.setState(prevState => ({
      prefetchUris: [...prevState.prefetchUris, ...valueArr]
    }));
  }

  render() {
    const listPrefetch = this.state.prefetchUris.map((uri) => {
      if (uri instanceof Array) {
        return (
          <Prefetch key={uri} source={
            [
              asset(uri[0]), asset(uri[1]), asset(uri[2]),
              asset(uri[3]), asset(uri[4]), asset(uri[5])
            ]
          } />
        );
      } else {
        return (
          <Prefetch key={uri} source={asset(uri)} />
        );
      }
    });

    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          {this.props.elevation !== 'american classic' && this.props.sunroomOn ? (
            <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } />
          ) : (
            <View />
          )}
        </Pano>
        {this.props.renderVrMenu && <MenuVr menuData={ this.props.menuData } />}
        {listPrefetch}
      </View>
    );
  }
}

export default FamilyRoom;
