import WebVRPolyfill from 'webvr-polyfill';
import '../process';
import { VRInstance } from 'react-vr-web';
import DomOverlayModule from '../modules/DomOverlayModule';
import RCTPanoLayer from '../views/PanoLayer';

const polyfill = new WebVRPolyfill();

function init(bundle, parent, options) {
  // Create divs where the overlays will be displayed in the DOM.
  const domOverlayContainer = document.createElement('div');
  const domPersistentContainer = document.createElement('div');
  const domModalContainer = document.createElement('div');
  const domLoadingContainer = document.createElement('div');
  domOverlayContainer.id = 'dom-overlay';
  domPersistentContainer.id = 'persistent-overlay';
  domModalContainer.id = 'modal-overlay';
  domLoadingContainer.id = 'loading-overlay';
  // Create an instance of the module, to be registered below.
  const domOverlayModule = new DomOverlayModule(domOverlayContainer, domPersistentContainer, domModalContainer, domLoadingContainer);

  const vr = new VRInstance(bundle, 'ClientVR', parent, {
    // Add custom options here
    ...options,
    // Register dom overlay module upon initialization.
    nativeModules: [domOverlayModule],
    // Register custom PanoLayer view to the ReactVR context
    customViews: [{name: 'PanoLayer', view: RCTPanoLayer}],
  });

  // RN context has been initialized, add it to the module
  domOverlayModule.rnctx = vr.rootView.context;

  // Inject DOM overlay containers to the player so that it is rendered properly.
  vr.player._wrapper.appendChild(domOverlayContainer);
  vr.player._wrapper.appendChild(domPersistentContainer);
  vr.player._wrapper.appendChild(domModalContainer);
  vr.player._wrapper.appendChild(domLoadingContainer);

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here

  };
  // Begin the animation loop
  vr.start();
  vr.rootView.context.bridge._worker.addEventListener('message', onVRMessage);
  return vr;
}

window.ReactVR = {init};

function onVRMessage(e) {
  if (e.data.type === 'exit VR') {
    console.log(e);
    // Define data and attach to custom 'exitVRMode' event
    const eventData = { message: 'exit VR'};
    const exitVRMode = new CustomEvent('exitVRMode', { detail: eventData });
    // Dispatch event to parent window
    window.parent.document.dispatchEvent(exitVRMode);
  } else if (e.data.type === 'init VR') {
    console.log(e);
  }
}
