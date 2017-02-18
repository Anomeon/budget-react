import React from 'react';
import {ItemStorage} from '../services/item-storage';
import {List} from './index';

export class EnterData extends React.Component {

  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.focus = this.focus.bind(this);
    this.state = {
      items: this.storage.getItems('items', true)
    }
    this.categories = this.storage.getItems('categories', true)
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    Array.prototype.slice.call(document.querySelectorAll('input'))
      .forEach(el => formData[el.name] = el.value);
    let select = document.querySelector('select')
    formData[select.name] = select.value;
    this.storage.addItem('items', formData);
    e.target.reset();
    this.focus();
    this.setState({items: this.storage.getItems('items', true)})
  }

  focus() {
    this.itemInput.focus();
  }

  handleClearAll() {
    this.storage.deleteItems(
      this.state.items.map((item) => {
        return item.id;
      })
    );
    this.setState({items: this.storage.getItems('items', true)})
  }

  render() {
    let itemInput = (input) => { this.itemInput = input; }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="item" type="string" id="item" placeholder="Enter item" autoFocus={true} ref={itemInput}/>
          <input name="sum" type="number" id= "sum" placeholder="Enter sum"/>
          <select name="category">
            {
              this.categories.map((category) => {
                return <option key={category.id}>{category.category}</option>
              })
            }
          </select>
          <button>Send</button>
          <button type="button" onClick={this.handleClearAll}>Clear All</button>
        </form>
        <List items={this.state.items}/>
      </div>
    );
  }
};
