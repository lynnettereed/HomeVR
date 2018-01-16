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

$(document).ready(() => {
  $('.input-dom').on('click', function() {
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

    const elevation = $('.input-dom[name="elevation"]:checked').val();
    const garage = $('.input-dom[name="garage"]:checked').val();
    const sunroom = $('.input-dom[name="sunroom"]:checked').val();
    const view = $('.input-dom[name="view"]:checked').val();

    let imgSrc = '../static_assets/images-2D/Foster_Ext_';
    let currentSrc = imgSrc;

    switch (view) {
      // View: FrontRight
      case options.view[0]:
        $(`#${anchors.sunroom}`).removeClass('active');
        concatSrc(view);
        switch (elevation) {
          // Elevation: AmericanClassic
          case options.elevation[0]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
          // Elevation: BellaVista
          case options.elevation[1]:
            concatSrc(elevation);
            switch (garage) {
            // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
          // Elevation: BellaVistaBrick
          case options.elevation[2]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
        }
        break;
      // View: FrontLeft
      case options.view[1]:
        $(`#${anchors.sunroom}`).removeClass('active');
        concatSrc(view);
        switch (elevation) {
          // Elevation: AmericanClassic
          case options.elevation[0]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
          // Elevation: BellaVista
          case options.elevation[1]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
          // Elevation: BellaVistaBrick
          case options.elevation[2]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                break;
              // Garage: 3Car
              case options.garage[1]:
                handleCaseGarage(view, garage);
                break;
            }
            break;
        }
        break;
      // View: Back
      case options.view[2]:
        concatSrc(view);
        switch (elevation) {
          // Elevation: AmericanClassic
          case options.elevation[0]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
              case options.garage[1]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
            }
            break;
          // Elevation: BellaVista
          case options.elevation[1]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
              case options.garage[1]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
            }
            break;
          // Elevation: BellaVistaBrick
          case options.elevation[2]:
            concatSrc(elevation);
            switch (garage) {
              // Garage: 2Car
              case options.garage[0]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
              case options.garage[1]:
                handleCaseGarage(view, garage);
                handleCaseSunroom(sunroom);
                break;
            }
            break;
        }
        break;
    }

    function concatSrc(data) {
      const snippet = `${data}_`;
      imgSrc = imgSrc.concat(snippet);
      console.log(imgSrc);
    }

    function capSrc(ext) {
      imgSrc = imgSrc.slice(0, -1);
      imgSrc = imgSrc.concat(ext)
      console.log(imgSrc);
    }

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

    function handleCaseGarage(view, garage) {
      if (view === options.view[0] || view === options.view[1] || view === options.view[2]) {
        if (garage === options.garage[0]) {
          currentSrc = imgSrc;
          capSrc('.jpg');
          updateImg(anchors.base, imgSrc);
          $(`#${anchors.garage}`).removeClass('active');
          imgSrc = currentSrc;
        } else {
          currentSrc = imgSrc;
          capSrc('.jpg');
          updateImg(anchors.base, imgSrc);
          imgSrc = currentSrc;
          currentSrc = imgSrc;
          concatSrc(garage);
          capSrc('.png');
          updateImg(anchors.garage, imgSrc);
          imgSrc = currentSrc;
          console.log(imgSrc);
        }
      }
    }

    function handleCaseSunroom(sunroom) {
      if (sunroom === options.sunroom[0]) {
        concatSrc(sunroom);
        capSrc('.png');
        updateImg(anchors.sunroom, imgSrc);
      } else {
        $(`#${anchors.sunroom}`).removeClass('active');
      }
    }
  });
});
