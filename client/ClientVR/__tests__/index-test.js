import 'react-native';
import 'react-vr';
import {
  NativeModules
} from 'react-native';
import React from 'react';
import Index from '../index.vr.js';
import DomOverlayModule from '../modules/DomOverlayModule.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Index', () => {
  beforeAll(() => {
    jest.mock('DomOverlayModule', () => 'Test');
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <Index />
    );
  });
});
