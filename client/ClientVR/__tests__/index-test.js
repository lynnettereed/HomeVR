import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import 'react-native';
import 'react-vr';
import sinon from 'sinon';
import { NativeModules } from 'react-native';
import { shallow } from 'enzyme';
import React from 'react';
import ClientVR from '../index.vr.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('NativeModules', () => {
  return {
    DomOverlayModule: {
      openPersistent: jest.fn(),
    },
  };
});

describe('<ClientVR />', () => {
  const openPersistentSpy = sinon.spy(NativeModules.DomOverlayModule, 'openPersistent');
  const wrapper = shallow(
    <ClientVR />
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls openPersistent method on render', () => {
    expect(openPersistentSpy.calledOnce).toBe(true);
  });
});
