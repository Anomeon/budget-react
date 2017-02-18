import React from 'react';
import {ItemStorage} from '../services/item-storage';
import {List} from './index';

let storage = new ItemStorage(localStorage);

export class EnterData extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.state = {
      items: storage.getItems('items', true)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    Array.prototype.slice.call(document.querySelectorAll('input'))
      .forEach(el => formData[el.name] = el.value);
    storage.addItem('items', formData);
    e.target.reset();
    this.setState({items: storage.getItems('items', true)})
  }

  handleClearAll() {
    storage.deleteItems(
      this.state.items.map((item) => {
        return item.id;
      })
    );
    this.setState({items: storage.getItems('items', true)})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="item" type="string" id="item" placeholder="Enter item"/>
          <input name="sum" type="number" id= "sum" placeholder="Enter sum"/>
          <button>Send</button>
          <button type="button" onClick={this.handleClearAll}>Clear All</button>
        </form>
        <List items={this.state.items}/>
      </div>
    );
  }
};
