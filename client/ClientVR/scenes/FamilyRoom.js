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
      sunroomPano: '',
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

  render() {
    return (
      <View>
        <Pano source={ asset(this.state.scenePano) }>
          {this.props.elevation !== 'american classic' && this.props.sunroomOn ? (
            <PanoLayer radius={990} source={ asset(this.state.sunroomPano) } />
          ) : (
            <View />
          )}
        </Pano>
        {this.props.renderVrMenu && <MenuVr text={ this.props.vrMenuContent } />}
      </View>
    );
  }
}

export default FamilyRoom;
