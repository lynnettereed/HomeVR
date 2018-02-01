import React, { Component } from 'react';
import {
  Pano,
  View,
  asset,
  AsyncStorage,
  Prefetch
} from 'react-vr';

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

    this._updateScene = this.updateScene.bind(this);
  }

  componentWillMount() {
    this._updateScene(this.props);
  }

  componentDidMount() {
    this.initScene();
  }

  componentWillReceiveProps(nextProps) {
    this._updateScene(nextProps);
  }

  updateScene(props) {
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

  initScene = async () => {
    const keys = ['KitchenScenePano', 'SunroomPano'];
    try {
      keys.forEach(async (key) => {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          this.setState(prevState => ({
            prefetchUris: [...prevState.prefetchUris, value]
          }));
          console.log(`${key}: ${value}`);
          console.log(this.state.prefetchUris);
        } else {
          console.log(`${key} not set`);
        }
      })
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const listPrefetch = this.state.prefetchUris.map((uri, index) => {
      return (
        <Prefetch key={index} source={asset(uri)}/>
      );
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
