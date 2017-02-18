import React from 'react';
import ReactDOM from 'react-dom';
import {ItemStorage} from './services/item-storage';

let storage = new ItemStorage(localStorage);

class EnterDataComponent extends React.Component {

  constructor(props) {
    super(props);
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
          <label htmlFor="item"> Item </label>
          <input name="item" type="string" id="item"/>
          <label htmlFor="sum"> Sum </label>
          <input name="sum" type="number" id= "sum"/>
          <button>Send</button>
          <button type="button" onClick={this.handleClearAll}>Clear All</button>
        </form>
        <ListComponent items={this.state.items}/>
      </div>
    );
  }
};

class ListItemComponent extends React.Component {
  render() {
    const {item, sum} = this.props.item;
    return (
      <div>
        <div>item: {item}</div>
        <div>sum: {sum}</div>
      </div>
    );
  }
};

class ListComponent extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => {
          return (
            <li key={item.id}>
              <ListItemComponent item={item}/>
            </li>
          )
        })}
      </ul>
    );
  }
};

ReactDOM.render(
  <EnterDataComponent/>,
  document.getElementById('app')
);
