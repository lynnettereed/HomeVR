import React, { Component } from 'react';
import {
  View,
  asset,
  Pano
} from 'react-vr';

import MenuVr from '../components/MenuVr';
import PanoLayer from '../components/PanoLayer';

class Kitchen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg',
      sunroomPano: '',
      cabinetsPano: '',
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
      this.setState({scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg'});
    } else if (props.elevation === 'bella vista') {
      if (props.sunroomOn) {
        this.setState({
          scenePano: 'panos/Foster_Int_Kitchen_BellaVista.jpg',
          sunroomPano: 'panos/Foster_Int_Kitchen_BellaVista_Sunroom.png',
        });
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_BellaVista.jpg'});
      }
    } else if (props.elevation === 'bella vista brick') {
      if (props.sunroomOn) {
        this.setState({
          scenePano: 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg',
          sunroomPano: 'panos/Foster_Int_Kitchen_BellaVistaBrick_Sunroom.png',
        });
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_BellaVistaBrick.jpg'});
      }
    }
    if (props.cabinets === 'option2') {
      this.setState({cabinetsPano: 'layers/Kitchen_AC_Cabs4.png'});
    }
  }

  render() {
    console.log(this.state.scenePano);
    console.log(this.props.cabinets);
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          {this.props.elevation !== 'american classic' && this.props.sunroomOn ? (
            <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } />
          ) : (
            <View />
          )}
          {this.props.cabinets === 'option2' ? (
            <PanoLayer radius={980} source={ asset(this.state.cabinetsPano) } />
          ) : (
            <View />
          )}
        </Pano>
        {this.props.renderVrMenu && <MenuVr text={ this.props.vrMenuContent } />}
      </View>
    );
  }
}

export default Kitchen;
