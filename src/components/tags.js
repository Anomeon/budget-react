import React from 'react';
import {BaseList} from './index';
import {ItemStorage} from '../services';

export class Tags extends React.Component {
  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: this.storage.getItems('tags', true)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    Array.prototype.slice.call(document.querySelectorAll('input'))
      .forEach(el => formData[el.name] = el.value);
    this.storage.addItem('tags', formData);
    e.target.reset();
    this.setState({items: this.storage.getItems('tags', true)});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="tag" placeholder="Enter tag" autoFocus={true}/>
          <button>Add tag</button>
        </form>
        <BaseList items={this.state.items} type="tag"/>
      </div>
    );
  }
};
