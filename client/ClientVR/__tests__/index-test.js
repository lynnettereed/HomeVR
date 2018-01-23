import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import 'react-native';
import 'react-vr';
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

  it('renders correctly', () => {
    const wrapper = shallow(
      <ClientVR />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
