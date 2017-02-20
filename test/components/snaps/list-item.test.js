import React from 'react';
import renderer from 'react-test-renderer';
import {ListItem} from '../../../src/components';
import {ItemStorage} from '../../../src/services/item-storage';

let storage = new ItemStorage(localStorage);

it('renders correctly', () => {
  const tree = renderer.create(
    <ListItem item={storage.getItems('items', true)[0]}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
