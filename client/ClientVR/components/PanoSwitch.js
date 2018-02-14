import React, { Component } from 'react';
import {
  asset,
  StyleSheet,
  View
} from 'react-vr';

import PanoLayer from './PanoLayer';

class PanoSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panoUriA: [],
      panoUriB: []
    };

    this.styles = StyleSheet.create({
      panoLayerA: {
        display: this.props.showLayerA ? 'flex' : 'none'
      },
      panoLayerB: {
        display: this.props.showLayerB ? 'flex' : 'none'
      }
    });
  }

  componentDidMount() {
    this.setPanoSource(this.props.updatePhase, this.props.uri);
  }

  componentWillReceiveProps(nextProps) {
    this.setPanoSource(nextProps.updatePhase, nextProps.uri);
  }

  setPanoSource = (updatePhase, uri) => {
    updatePhase === 'A' ? this.setState({panoUriA: uri}) : this.setState({panoUriB: uri});
  }

  render() {
    // console.log(`updatePhase: ${this.props.updatePhase}`);
    // console.log(`uri: ${this.props.uri}`);
    // console.log(`panoUriA: ${this.state.panoUriA}`);
    // console.log(`panoUriB: ${this.state.panoUriB}`);
    // console.log(`showLayerA: ${this.props.showLayerA}`);
    // console.log(`showLayerB: ${this.props.showLayerB}`);

    const determineSource = (uri) => {
      if (uri instanceof Array) {
        return (
          [
            asset(uri[0]), asset(uri[1]),
            asset(uri[2]), asset(uri[3]),
            asset(uri[4]), asset(uri[5])
          ]
        );
      } else {
        return (asset(uri));
      }
    }

    if (this.state.panoUriA.length > 0 || this.state.panoUriB.length > 0) {
      return (
        <View>
          {this.state.panoUriA.length > 0 ? (
            <PanoLayer radius={this.props.radius} onLoad={this.props.panoOnLoad}
                       onLoadEnd={this.props.panoOnLoadEnd}
                       style={{ display: this.props.showLayerA ? 'flex' : 'none' }}
                       source={determineSource(this.state.panoUriA)}
            />
          ) : (
            <View />
          )}
          {this.state.panoUriB.length > 0 ? (
            <PanoLayer radius={this.props.radius} onLoad={this.props.panoOnLoad}
                       onLoadEnd={this.props.panoOnLoadEnd}
                       style={{ display: this.props.showLayerB ? 'flex' : 'none' }}
                       source={determineSource(this.state.panoUriB)}
            />
          ) : (
            <View />
          )}
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
  }
}

export default PanoSwitch;
