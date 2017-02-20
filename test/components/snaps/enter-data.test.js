import React from 'react';
import renderer from 'react-test-renderer';
import {EnterData} from '../../../src/components';

it('renders correctly', () => {
  const tree = renderer.create(
    <EnterData params={{category: 'test'}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
