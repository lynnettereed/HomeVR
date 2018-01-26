import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  Pano,
  NativeModules,
  StyleSheet,
  Text,
  VrButton,
  VrHeadModel
} from 'react-vr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import axios from 'react-native-axios';
import fakeAPI from './fakeAPI';

import MenuVr from './components/MenuVr';
import PanoLayer from './components/PanoLayer';

import FamilyRoom from './scenes/FamilyRoom';
import Kitchen from './scenes/Kitchen';

const sceneSelection = ['FamilyRoom', 'Kitchen'];

const domMenuContent = {
  menuFamilyRoom: {
    menuData: [
      {
        sectionHeader: 'scene',
        sectionOptions: ['FamilyRoom', 'Kitchen'],
      },
      {
        sectionHeader: 'elevation',
        sectionOptions: ['american classic', 'bella vista', 'bella vista brick'],
      },
      {
        sectionHeader: 'sunroom',
        sectionOptions: ['on', 'off'],
      },
    ],
  },
  menuKitchen: {
    menuData: [
      {
        sectionHeader: 'scene',
        sectionOptions: ['FamilyRoom', 'Kitchen'],
      },
      {
        sectionHeader: 'elevation',
        sectionOptions: ['american classic', 'bella vista', 'bella vista brick'],
      },
      {
        sectionHeader: 'sunroom',
        sectionOptions: ['on', 'off'],
      },
      {
        sectionHeader: 'cabinets',
        sectionOptions: ['option1', 'option2', 'option3', 'option4'],
      },
      {
        sectionHeader: 'backsplash',
        sectionOptions: ['option1', 'option2', 'option3', 'option4'],
      },
      {
        sectionHeader: 'counter',
        sectionOptions: ['option1', 'option2', 'option3', 'option4'],
      },
    ],
  }
};

const modalContent = {
  appliances: {
    refrigerator: {
      data: {
        title: '36-inch Wide Side-by-Side Refrigerator - 28 cu. ft.',
        model: 'WRS588FIHV',
        msrp: '$1,899.00',
        quickFeatures: [
          '-Exterior Ice with EveryDrop™ Filtration',
          '-In-Door-Ice® Storage',
          '-Accu-Chill™ Temperature Management System'
        ],
        additionalFeatures: [
          {
            title: 'Exterior Ice and Water Dispenser with EveryDrop™ Filtration',
            info: 'Access fresh filtered water and ice without ever opening the refrigerator door.'
          },
          {
            title: 'In-Door-Ice® Storage',
            info: 'Get an extra full shelf in the freezer with an ice bin that\'s been moved to the door.'
          },
          {
            title: 'Accu-Chill™ Temperature Management System',
            info: 'Cool food quickly with technology that senses and adapts to create the ideal environment for food.'
          },
          {
            title: 'Frameless Glass Shelves',
            info: 'Store more items on each shelf with wall-to-wall frameless glass shelves, which offer greater storage flexibility.'
          }
        ],
        imgSrc: '/static_assets/images/refrigerator.png',
        colorOptions: [
          {
            name: 'black',
            value: '#000'
          },
          {
            name: 'fingerprint resistant black stainless',
            value: '#5B5959'
          },
          {
            name: 'white',
            value: '#FFF'
          },
          {
            name: 'fingerprint resistant stainless steel',
            value: '#D8D8D8'
          },
        ]
      }
    }
  }
}

const vrMenuContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class ClientVR extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrMenu: false,
      renderVrBtnbox: false,
      renderVrModal: false,
      menuActive: false,
      sunroomOn: false,
      elevation: 'american classic',
      cabinets: 'option1',
      backsplash: 'option1',
      counter: 'option1',
      currentScene: sceneSelection[0],
      menuData: {},
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
    this._togglePersistent = this.togglePersistent.bind(this);
    this._toggleModal = this.toggleModal.bind(this);
    this._addOverlayButtonListeners = this.addOverlayButtonListeners.bind(this);
    this._addOverlayOptionListeners = this.addOverlayOptionListeners.bind(this);
    this._fetchApiData = this.fetchApiData.bind(this);
    this._changeScene = this.changeScene.bind(this);
  }

  componentDidMount() {
    // Fetch API data
    //this._fetchApiData(); // <-- TODO: fix CORS issue or find workaround
    // Init persistent overlay
    this._togglePersistent();
    // Register overlay button event listeners
    this._addOverlayButtonListeners();
    // Register overlay option event listeners
    this._addOverlayOptionListeners();

    fakeAPI.getMenuContent()
    .then((data) => {
      console.log(data);
      this.setState({menuData: data});
    })
    .catch((e) => {
      console.log(e);
    })
  }

  fetchApiData() {
    axios.get('https://customerdemo.kovasolutions.com/KovaBIMaireWebConfigurator/api/v4/Test')
    .then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  addOverlayButtonListeners() {
    RCTDeviceEventEmitter.addListener('overlayButtonEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      if (e === 'exitVR button clicked!') {
        postMessage({ type: 'exit VR'});
      } else if (e === 'menu button clicked!') {
        this._toggleDisplay();
      } else if (e === 'menu escape clicked!') {
        this._toggleDisplay();
      }
    });
  }

  addOverlayOptionListeners() {
    RCTDeviceEventEmitter.addListener('overlayOptionEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      if (e.header === 'elevation') {
        if (e.option === 'american classic') {
          this.setState({elevation: 'american classic'});
        } else if (e.option === 'bella vista') {
          this.setState({elevation: 'bella vista'});
        } else if (e.option === 'bella vista brick') {
          this.setState({elevation: 'bella vista brick'});
        }
      } else if (e.header === 'sunroom') {
        if (e.option === 'off') {
          this.setState({sunroomOn: false});
        } else if (e.option === 'on') {
          this.setState({sunroomOn: true});
        } else {
          console.log('not sunroom input');
        }
      } else if (e.header === 'scene') {
        this._changeScene(e.option);
      } else if (e.header === 'cabinets') {
        this.setState({cabinets: e.option});
      } else if (e.header === 'backsplash') {
        this.setState({backsplash: e.option});
      } else if (e.header === 'counter') {
        this.setState({counter: e.option});
      }
    });
  }

  // Determine whether content should be displayed on the dom overlay, or as a
  // react-vr component based on VrHeadModel's inVR API.
  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrMenu: !this.state.renderVrMenu});
    } else if (!this.state.menuActive) {
      console.log(this.menuData);
      this.setState({menuActive: !this.state.menuActive})
      if (this.state.currentScene === 'FamilyRoom') {
        NativeModules.DomOverlayModule.openOverlay(this.state.menuData.menuFamilyRoom);
      } else {
        NativeModules.DomOverlayModule.openOverlay(this.state.menuData.menuKitchen);
      }
    } else {
      this.setState({menuActive: !this.state.menuActive})
      NativeModules.DomOverlayModule.closeOverlay();
    }
  }

  togglePersistent() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrBtnbox: !this.state.renderVrBtnbox});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openPersistent();
    }
  }

  toggleModal() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrBtnbox: !this.state.renderVrBtnbox});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openModal(modalContent.appliances.refrigerator);
    }
  }

  changeScene(nextScene) {
    if (nextScene === this.state.currentScene) {
      console.log('same scene');
      return;
    } else if (sceneSelection.indexOf(nextScene) !== -1) {
      switch (nextScene) {
        case sceneSelection[0]:
          this._toggleDisplay();
          this.setState({currentScene: sceneSelection[0]});
          break;
        case sceneSelection[1]:
          this._toggleDisplay();
          this.setState({currentScene: sceneSelection[1]});
          break;
        default:
          console.error('scene does not exist');
      }
    }
  }

  // TODO: create BtnboxVr component and add conditional below TextboxVr
  render() {
    const scene = this.state.currentScene;
    //console.log('menuActive: ' + this.state.menuActive); // <-- for debugging purposes only, TODO: delete this line
    //console.log('elevation: ' + this.state.elevation); // <-- for debugging purposes only, TODO: delete this line
    //console.log('sunroomOn: ' + this.state.sunroomOn); // <-- for debugging purposes only, TODO: delete this line
    //console.log('cabinets: ' + this.state.cabinets); // <-- for debugging purposes only, TODO: delete this line
    //console.log('backsplash: ' + this.state.backsplash); // <-- for debugging purposes only, TODO: delete this line
    //console.log('counter: ' + this.state.counter); // <-- for debugging purposes only, TODO: delete this line
    //console.log('scene: ' + this.state.currentScene); // <-- for debugging purposes only, TODO: delete this line
    return (
      <View>
        {{
          FamilyRoom: <FamilyRoom
                               renderVrMenu={ this.state.renderVrMenu }
                               elevation={ this.state.elevation }
                               sunroomOn={ this.state.sunroomOn }/>,
          Kitchen: <Kitchen renderVrMenu={ this.state.renderVrMenu }
                            toggleModal={ this._toggleModal }
                               elevation={ this.state.elevation }
                               sunroomOn={ this.state.sunroomOn }
                               cabinets={ this.state.cabinets }
                               backsplash={ this.state.backsplash }
                               counter = { this.state.counter }/>,

        }[scene]}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ClientVR', () => ClientVR);
