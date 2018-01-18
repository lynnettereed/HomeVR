'use strict';

import React from 'react';
import NativeMethodsMixin from 'NativeMethodsMixin';
import PropTypes from 'prop-types';
import ReactNativeViewAttributes from 'ReactNativeViewAttributes';
import View from 'View';
import StyleSheetPropType from 'StyleSheetPropType';
import LayoutAndTransformTintPropTypes from 'LayoutAndTransformTintPropTypes';

import createReactClass from 'create-react-class';
import requireNativeComponent from 'requireNativeComponent';
import resolveAssetSource from 'resolveAssetSource';

/**
 * A Sphere of @param radius(m, default = 1000) with center located at the local transform origin.
 * By default this is `position:'absolute'`.
 *
 * PanoLayers are images projected onto a sphere that fully surrounds the viewer.
 * Radius and transparency settings allow for many PanoLayers to layer ontop a
 * Pano or another PanoLayer component.
 */
const PanoLayer = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformTintPropTypes),
    radius: PropTypes.number,

    /**
     * source image in the form of
     * `{uri: 'http'}` for a panorama
     * or
     * `[{uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'}]` for a cubemap
     * or
     * `[{uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'}]` for a stereo
     * cubemap where the first 6 images are the left eye cubemap and the
     * following 6 are the right eye cubemap.
     *
     * stereo(optional): the stereo format of a panorama: '2D' | 'TOP_BOTTOM_3D' |
     * 'BOTTOM_TOP_3D' | 'LEFT_RIGHT_3D' | 'RIGHT_LEFT_3D'
     *
     * If stereo is not a supported stereo format, it'll by default use '2D'
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        stereo: PropTypes.string,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
        })
      ),
      PropTypes.shape({
        tile: PropTypes.string,
        maxDepth: PropTypes.number,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),

    /**
     * Option onLoad callback called on success
     **/
    onLoad: PropTypes.func,

    /**
     * Option onLoadEnd callback called on success or failure
     **/
    onLoadEnd: PropTypes.func,
  },

  viewConfig: {
    uiViewClassName: 'PanoLayer',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      radius: true,
    },
  },

  _onLoad: function() {
    this.props.onLoad && this.props.onLoad();
  },

  _onLoadEnd: function() {
    this.props.onLoadEnd && this.props.onLoadEnd();
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    const props = {...this.props} || {};
    props.style = props.style || {};
    if (!props.style.position) {
      props.style.position = 'absolute';
    }
    // default panos to being a render group
    if (!props.style.renderGroup) {
      props.style.renderGroup = true;
    }

    // Default pano radius to 1000m
    props.radius = props.radius || 1000;

    const source = resolveAssetSource(this.props.source);
    if (!source) {
      // If source is not defined, set uri to undefined and RCTPanoLayer will
      // handle the undefined uri
      props.source = {uri: undefined};
    } else {
      props.source = source;
    }

    return (
      <RKPanoLayer
        {...props}
        onLoad={this._onLoad}
        onLoadEnd={this._onLoadEnd}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKPanoLayer>
    );
  },
});

const RKPanoLayer = requireNativeComponent('PanoLayer', PanoLayer, {
  nativeOnly: {},
});

export default PanoLayer;
