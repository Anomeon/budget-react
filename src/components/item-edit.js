import React from 'react';
import {ItemStorage} from '../services';

export class ItemEdit extends React.Component {
  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.categories = this.storage.getItems('categories', true);
    this.tags = this.storage.getItems('tags', true);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.itemId = this.props.params.id;
    this.item = this.storage.getItems('items')[this.itemId];
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    [...document.querySelectorAll('input')]
      .forEach(el => formData[el.name] = el.value);
    [...e.target.querySelectorAll('select:not([name=tags])')]
      .forEach(el => formData[el.name] = el.value);
    formData['tags'] = [...document.querySelector('[name=tags]').options]
      .filter(option => option.selected)
      .map(option => option.value);
    this.storage.updateItem('items', this.itemId, formData);
    window.location.hash = '#';
  }

  handleDelete(e) {
    this.storage.deleteItems('items', [this.itemId]);
    window.location.hash = '#';
  }

  render() {
    const {item, sum, category} = this.item;
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="item" type="string" id="item" placeholder="Enter item" autoFocus={true} defaultValue={item}/>
        <input name="sum" type="number" id= "sum" placeholder="Enter sum" defaultValue={sum}/>
        <select name="category" defaultValue={category}>
          <option readOnly defaultValue label=" "></option>
          {
            this.categories.map(category => <option key={category.id}>{category.category}</option>)
          }
        </select>
        <select name="type">
          <option>expenses</option>
          <option>income</option>
        </select>
        <select name="tags" multiple>
          {
            this.tags.map(tag => <option key={tag.id}>{tag.tag}</option>)
          }
        </select>
        <button type="submit">Save</button>
        <button onClick={this.handleDelete} type="button">Delete</button>
      </form>
    );
  }
};
