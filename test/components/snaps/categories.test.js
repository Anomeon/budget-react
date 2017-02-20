import React from 'react';
import {Categories} from '../../../src/components';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Categories/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
