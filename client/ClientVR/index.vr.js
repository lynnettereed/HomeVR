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
  VrHeadModel,
  Prefetch,
  AsyncStorage
} from 'react-vr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import axios from 'react-native-axios';
import fakeAPI from './fakeAPI';
import AsyncStorageUtils from './utils/AsyncStorageUtils';

import MenuVr from './components/MenuVr';
import PanoLayer from './components/PanoLayer';

import FamilyRoom from './scenes/FamilyRoom';
import Kitchen from './scenes/Kitchen';

const sceneSelection = ['FamilyRoom', 'Kitchen'];

const vrMenuContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class ClientVR extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrMenu: false,
      renderVrBtnbox: false,
      renderVrModal: false,
      renderVrLoading: false,
      menuActive: false,
      sunroomOn: false,
      elevation: 'american classic',
      cabinets: 'option1',
      backsplash: 'option1',
      counter: 'option1',
      currentScene: sceneSelection[0],
      menuData: {},
      modalData: {},
      storageKeyData: {},
      panoUriData: {},
      hasData: false,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    //this._fetchApiData(); // <-- TODO: fix CORS issue or find workaround
    // Init persistent overlay
    this.togglePersistent();
    this.addOverlayButtonListeners();
    this.addOverlayOptionListeners();
    this.fetchFakeApiData();
  }

  fetchFakeApiData = () => {
    Promise.all([
      fakeAPI.getMenuData(), fakeAPI.getModalData(),
      fakeAPI.getStorageKeyData(), fakeAPI.getPanoUriData()
    ])
    .then(data => {
      const menuData = data[0];
      const modalData = data[1];
      const storageKeyData = data[2];
      const panoUriData = data[3];

      this.setState({
        menuData: menuData,
        modalData: modalData,
        storageKeyData: storageKeyData,
        panoUriData: panoUriData
      });
    }).then(() => {
      AsyncStorageUtils.clearAsyncStorage(this.state.storageKeyData.all);
      this.setState({hasData: true});
    }).catch(err => {
      throw new Error(`failed to fetch fakeAPI data: ${err}`);
    });
  }

  // TODO: uncomment and implement when API access cleared
  // fetchApiData() {
  //   axios.get('https://customerdemo.kovasolutions.com/KovaBIMaireWebConfigurator/api/v4/Test')
  //   .then(response => {
  //     console.log(response);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

  addOverlayButtonListeners = () => {
    RCTDeviceEventEmitter.addListener('overlayButtonEvent', (e) => {
      console.log(e); // <-- for debugging purposes TODO: remove this line
      e === 'exitVR button clicked!' ? postMessage({ type: 'exit VR'}) : this.toggleDisplay();
    });
  }

  addOverlayOptionListeners = () => {
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
        this.initSceneChange(e.option);
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
  toggleDisplay = () => {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrMenu: !this.state.renderVrMenu});
    } else if (!this.state.menuActive) {
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

  togglePersistent = () => {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrBtnbox: !this.state.renderVrBtnbox});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openPersistent();
    }
  }

  toggleModal = () => {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrModal: !this.state.renderVrModal});
    } else {
      // Not in VR, use the dom overlay
      NativeModules.DomOverlayModule.openModal(this.state.modalData.appliances.refrigerator);
    }
  }

  toggleLoading = (isLoading) => {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrLoading: !this.state.renderVrLoading});
    } else if (isLoading) {
      NativeModules.DomOverlayModule.openLoadingOverlay();
    } else {
      NativeModules.DomOverlayModule.closeLoadingOverlay();
    }
  }

  initSceneChange = (nextScene) => {
    if (nextScene === this.state.currentScene) {
      return;
    } else if (sceneSelection.indexOf(nextScene) !== -1) {
      switch (nextScene) {
        case sceneSelection[0]:
          this.setState({currentScene: sceneSelection[0]});
          this.toggleDisplay();
          break;
        case sceneSelection[1]:
          this.setState({currentScene: sceneSelection[1]});
          this.toggleDisplay();
          break;
        default:
          console.error('scene does not exist');
      }
    }
  }

  // TODO: create BtnboxVr component and add conditional below TextboxVr
  render() {
    const scene = this.state.currentScene;
    if (this.state.hasData) {
      return (
        <View>
          {{
            FamilyRoom: <FamilyRoom renderVrMenu={ this.state.renderVrMenu }
                                    menuData={ this.state.menuData.menuFamilyRoom }
                                    storageKeyData={ this.state.storageKeyData }
                                    panoUriData={ this.state.panoUriData }
                                    elevation={ this.state.elevation }
                                    sunroomOn={ this.state.sunroomOn }/>,
            Kitchen: <Kitchen renderVrMenu={ this.state.renderVrMenu }
                              menuData={ this.state.menuData.menuKitchen }
                              storageKeyData={ this.state.storageKeyData }
                              panoUriData={ this.state.panoUriData }
                              toggleModal={ this.toggleModal }
                              toggleLoading={ this.toggleLoading }
                              elevation={ this.state.elevation }
                              sunroomOn={ this.state.sunroomOn }
                              cabinets={ this.state.cabinets }
                              backsplash={ this.state.backsplash }
                              counter = { this.state.counter }/>,

          }[scene]}
        </View>
      );
    } else {
      return (
        <View>
        </View>
      )
    }
  }
}

AppRegistry.registerComponent('ClientVR', () => ClientVR);
