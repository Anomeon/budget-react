import React from 'react';
import renderer from 'react-test-renderer';
import {List} from '../../../src/components';
import {ItemStorage} from '../../../src/services/item-storage';

let storage = new ItemStorage(localStorage);

it('renders correctly', () => {
  const tree = renderer.create(
    <List items={storage.getItems('items', true)}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
