// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import '../process';
import {VRInstance} from 'react-vr-web';
import DomOverlayModule from '../components/DomOverlayModule';

function init(bundle, parent, options) {
  // Create divs where the overlays will be displayed in the DOM.
  const domOverlayContainer = document.createElement('div');
  const domPersistentContainer = document.createElement('div');
  domOverlayContainer.id = 'dom-overlay';
  domPersistentContainer.id = 'persistent-overlay';
  // Create an instance of the module, to be registered below.
  const domOverlayModule = new DomOverlayModule(domOverlayContainer, domPersistentContainer);

  const vr = new VRInstance(bundle, 'ClientVR', parent, {
    // Add custom options here
    ...options,
    // Register dom overlay module upon initialization.
    nativeModules: [domOverlayModule],
  });

  // RN context has been initialized, add it to the module
  domOverlayModule.rnctx = vr.rootView.context;

  // Inject DOM overlay containers to the player so that it is rendered properly.
  vr.player._wrapper.appendChild(domOverlayContainer);
  vr.player._wrapper.appendChild(domPersistentContainer);

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
