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
  console.log(vr.rootView.context.bridge);
  vr.rootView.context.bridge._worker.addEventListener('message', onVRMessage);
  return vr;
}

window.ReactVR = {init};

function onVRMessage(e) {
  if (e.data.type === 'exit VR') {
    console.log(e);
    const content = '<div class="img-container"><img id="baseline" src="../static_assets/images-2D/Foster_Ext_FrontRight_AmericanClassic.jpg" alt=""></div>'
    $('#media-container').html('');
    $('#outer-menu').removeClass('vr-active');
    $('#media-container').removeClass('vr-active');
    $('#media-container').html(content);
  } else if (e.data.type === 'init VR') {
    console.log(e);
  }
}

function initVRButton() {
  $('#vr-btn').on('click', function() {
    $('#outer-menu').addClass('vr-active');
    $('#media-container').addClass('vr-active');
    setTimeout(function() {
      ReactVR.init(
        // When you're ready to deploy your app, update this line to point to
        // your compiled index.bundle.js
        '../index.vr.bundle?platform=vr&dev=true',
        // Attach it to the body tag
        //document.body
        document.getElementById('media-container')
      );
    }, 1000);
  })
}
initVRButton();
