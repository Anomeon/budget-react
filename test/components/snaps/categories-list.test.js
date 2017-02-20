import React from 'react';
import renderer from 'react-test-renderer';
import {CategoriesList} from '../../../src/components';
import {ItemStorage} from '../../../src/services/item-storage';

let storage = new ItemStorage(localStorage);

it('renders correctly', () => {
  const tree = renderer.create(
    <CategoriesList items={storage.getItems('categories', true)}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
