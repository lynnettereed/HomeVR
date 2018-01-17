// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"


// Auto-generated content.
import '../process';
import { VRInstance } from 'react-vr-web';
import DomOverlayModule from '../components/DomOverlayModule';
import RCTPanoLayer from '../views/PanoLayer';

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
    // Register custom PanoLayer view to the ReactVR context
    customViews: [{name: 'PanoLayer', view: RCTPanoLayer}],
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
  vr.rootView.context.bridge._worker.addEventListener('message', onVRMessage);
  return vr;
}

window.ReactVR = {init};

function onVRMessage(e) {
  if (e.data.type === 'exit VR') {
    console.log(e);
    const content = '<div class="img-container"><img id="img-baseline" src="../static_assets/images-2D/Foster_Ext_FrontRight_AmericanClassic.jpg" alt=""><img id="img-garage" class="overlay-img" src=""><img id="img-sunroom" class="overlay-img" src=""></div>'
    //const content = '<div class="img-container"><img id="img-baseline" src="static_assets/images-2D/Foster_Ext_FrontRight_AmericanClassic.jpg" alt=""><img id="img-garage" class="overlay-img" src=""><img id="img-sunroom" class="overlay-img" src=""></div>'
    // uncomment line above ^ when bundling
    $('#media-container').html('');
    $('#outer-menu').removeClass('vr-active');
    $('#media-container').removeClass('vr-active');
    $('#media-container').html(content);
    resetMenu();
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
        //'index.bundle.js', // <-- uncomment when bundling
        // Attach it to the body tag
        //document.body
        document.getElementById('media-container')
      );
    }, 1000);
  })
}
initVRButton();

function resetMenu() {
  const names = ['elevation', 'garage', 'sunroom', 'view'];
  names.forEach((element) => {
    const inputs = document.getElementsByName(element);
    for (let i = 0; i < inputs.length; i++) {
      if (i === 0) {
        inputs[0].checked = true;
      } else {
        inputs[i].checked = false;
      }
    }
  });
}

$(document).ready(() => {
  // Add 'click' event listener to inputs
  $('.input-dom').on('click', function() {
    // Define menu state options and tag id anchors
    const options = {
      elevation: ['AmericanClassic', 'BellaVista', 'BellaVistaBrick'],
      garage: ['2Car', '3Car'],
      sunroom: ['Sunroom', ''],
      view: ['FrontRight', 'FrontLeft', 'Back']
    };
    const anchors = {
      base: 'img-baseline',
      garage: 'img-garage',
      sunroom: 'img-sunroom'
    };

    // Store current menu state by input
    const elevation = $('.input-dom[name="elevation"]:checked').val();
    const garage = $('.input-dom[name="garage"]:checked').val();
    const sunroom = $('.input-dom[name="sunroom"]:checked').val();
    const view = $('.input-dom[name="view"]:checked').val();

    // Set base and current img src strings
    let imgSrc = '../static_assets/images-2D/Foster_Ext_';
    //let imgSrc = 'static_assets/images-2D/Foster_Ext_'; // <- uncomment when bundling
    let currentSrc = imgSrc;

    // Check if view = FrontRight or FrontLeft
    if (view === options.view[0] || view === options.view[1]) {
      // Deactivate sunroom img layer
      // TODO: check if class exists first
      $(`#${anchors.sunroom}`).removeClass('active');
      concatSrc(view);
      concatSrc(elevation);
      handleCaseGarage(view, garage);
    } else if (view === options.view[2]) {
      concatSrc(view);
      concatSrc(elevation);
      handleCaseGarage(view, garage);
      handleCaseSunroom(sunroom);
    }

   /**
    * Concat menu state value onto imgSrc string
    *
    * @param  {String} data
    * @return {Void}
    */
    function concatSrc(data) {
      // Add underscore
      const snippet = `${data}_`;
      // Concat to imgSrc
      imgSrc = imgSrc.concat(snippet);
    }

    /**
     * Finalize imgSrc string for insertion into 'src' attribute
     *
     * @param  {String} ext
     * @return {Void}
     */
    function capSrc(ext) {
      // Slice off underscore from end of imgSrc string
      imgSrc = imgSrc.slice(0, -1);
      // Concat extension (.jpg / .png) to end of imgSrc string
      imgSrc = imgSrc.concat(ext);
    }

    /**
     * Update img 'src' attribute by tag id anchor
     *
     * @param  {String} anchor
     * @param  {String} source
     * @return {Void}
     */
    function updateImg(anchor, source) {
      if (anchor === anchors.base) {
        $(`#${anchors.base}`).attr('src', source);
      } else if (anchor === anchors.garage) {
        $(`#${anchors.garage}`).attr('src', source);
        $(`#${anchors.garage}`).addClass('active');
      } else if (anchor === anchors.sunroom) {
        $(`#${anchors.sunroom}`).attr('src', source);
        $(`#${anchors.sunroom}`).addClass('active');
      }
    }

    /**
     * Handle garage case sequence
     *
     * @param  {String} view
     * @param  {String} garage
     * @return {Void}
     */
    function handleCaseGarage(view, garage) {
      if (view === options.view[0] || view === options.view[1] || view === options.view[2]) {
        if (garage === options.garage[0]) {
          // Garage: 2Car
          // Store ref to current imgSrc string
          currentSrc = imgSrc;
          capSrc('.jpg');
          updateImg(anchors.base, imgSrc);
          $(`#${anchors.garage}`).removeClass('active');
          // Reset imgSrc
          imgSrc = currentSrc;
        } else {
          // Garage: 3Car
          // Store ref to current imgSrc string
          currentSrc = imgSrc;
          capSrc('.jpg');
          updateImg(anchors.base, imgSrc);
          // Reset imgSrc
          imgSrc = currentSrc;
          // Store ref to current imgSrc string
          currentSrc = imgSrc;
          concatSrc(garage);
          capSrc('.png');
          updateImg(anchors.garage, imgSrc);
          // Reset imgSrc
          imgSrc = currentSrc;
          console.log(imgSrc);
        }
      }
    }

    /**
     * Handle sunroom case sequence
     *
     * @param  {String} sunroom
     * @return {Void}
     */
    function handleCaseSunroom(sunroom) {
      if (sunroom === options.sunroom[0]) {
        // Sunroom: sunroom (on)
        concatSrc(sunroom);
        capSrc('.png');
        updateImg(anchors.sunroom, imgSrc);
      } else {
        // Sunroom: '' (off)
        $(`#${anchors.sunroom}`).removeClass('active');
      }
    }
  });
});
