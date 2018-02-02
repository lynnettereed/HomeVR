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
      scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg',
      sunroomPano: '',
      prefetchUris: [],
    };
  }

  componentWillMount() {
    this.updateScene(this.props);
  }

  componentDidMount() {
    //this.setPrefetchUris(this.props.asyncStorageKeys);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    this.updateScene(nextProps);
    this.updatePrefetchUris(nextProps.storageKeyData.kitchen.all);
  }

  updateScene = (props) => {
    if (props.elevation === 'american classic') {
      if (props.sunroomOn) {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic_Sunroom.jpg'});
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg'});
      }
    } else if (props.elevation === 'bella vista') {
      if (props.sunroomOn) {
        this.setState({
          sunroomPano: 'layers/Foster_Int_FamilyRoom_BellaVista_Sunroom.png',
          scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg',
        });
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg'});
      }
    } else if (props.elevation === 'bella vista brick') {
      if (props.sunroomOn) {
        this.setState({
          sunroomPano: 'layers/Foster_Int_FamilyRoom_BellaVistaBrick_Sunroom.png',
          scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg',
        });
      } else {
        this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg'});
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
    console.log(`prefetchUris cleared: ${this.state.prefetchUris}`);
  }

  buildPrefetchArr = async (keys) => {
    let valueArr = [];
    const keyValues = await AsyncStorage.multiGet(keys);
    keyValues.forEach((keyValue) => {
      const key = keyValue[0];
      const value = keyValue[1];
      if (value !== null) {
        console.log(`${key}: ${value}`);
        valueArr.push(value)
      } else {
        if (key === 'KitchenScenePano') {
          console.log(`${key} not set...setting ${key} default`);
          valueArr.push('panos/Foster_Int_Kitchen_AmericanClassic.jpg');
        } else {
          console.log(`${key} not set`);
        }
      }
    });
    return valueArr;
  }

  pushToPrefetchUris = async (valueArr) => {
    await this.setState(prevState => ({
      prefetchUris: [...prevState.prefetchUris, ...valueArr]
    }));
  }

  render() {
    const listPrefetch = this.state.prefetchUris.map((uri) => {
      return (
        <Prefetch key={uri} source={asset(uri)} />
      );
    });
    console.log(this.state.prefetchUris);

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
