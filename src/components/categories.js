import React from 'react';
import {BaseList} from './index';
import {ItemStorage} from '../services';

export class Categories extends React.Component {
  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: this.storage.getItems('categories', true)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    [...document.querySelectorAll('input')]
      .forEach(el => formData[el.name] = el.value);
    this.storage.addItem('categories', formData);
    e.target.reset();
    this.setState({items: this.storage.getItems('categories', true)});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="category" placeholder="Enter category" autoFocus={true}/>
          <button>Add category</button>
        </form>
        <BaseList items={this.state.items} type="category"/>
      </div>
    );
  }
};
