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
      scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic.jpg',
      sunroomPano: '',
      cabinetsPano: '',
    };

    this._updateScene = this.updateScene.bind(this);
    this._handleCabs = this.handleCabs.bind(this);
  }

  componentWillMount() {
    this._updateScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateScene(nextProps);
  }

  handleCabs(props) {
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

  updateScene(props) {
    if (props.elevation === 'american classic') {
      if (props.sunroomOn) {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic_Sunroom.jpg',});
      } else {
        this.setState({scenePano: 'panos/Foster_Int_Kitchen_AmericanClassic.jpg'});
      }
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
    this._handleCabs(props);
  }

  render() {
    console.log(this.state.scenePano);
    console.log(this.props.cabinets);
    console.log(this.props.cabinetsPano);
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          {this.props.elevation !== 'american classic' && this.props.sunroomOn ? (
            <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } />
          ) : (
            <View />
          )}
          {this.props.cabinets !== 'option1' ? (
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
