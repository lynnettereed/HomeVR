import React, { Component } from 'react';
import {
  Pano,
  View,
  asset
} from 'react-vr';

import PanoLayer from '../components/PanoLayer';
import MenuVr from '../components/MenuVr';

class FamilyRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenePano: 'panos/Foster_Int_FamilyRoom_AmericanClassic.jpg',
    };

    this._updateScene = this.updateScene.bind(this);
  }

  componentWillMount() {
    this._updateScene(this.props);
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
      this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVista.jpg'});
    } else if (props.elevation === 'bella vista brick') {
      this.setState({scenePano: 'panos/Foster_Int_FamilyRoom_BellaVistaBrick.jpg'});
    }
  }

  render() {
    console.log(this.state.scenePano);
    console.log(this.props.elevation);
    console.log(this.props.sunroomOn);
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          <PanoLayer radius={990} source={ asset('layers/Foster_Int_FamilyRoom_americanClassic_Fireplace.png') } />
        </Pano>
        {this.props.renderVrMenu && <MenuVr text={ this.props.vrMenuContent } />}
      </View>
    );
  }
}

export default FamilyRoom;
