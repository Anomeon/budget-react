import React from 'react';
import {ItemStorage} from '../services';
import {List} from './index';
import {Link} from 'react-router';

export class EnterData extends React.Component {

  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.focus = this.focus.bind(this);
    this.categories = this.storage.getItems('categories', true);
    this.state = this.updateState();
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
    this.setState(this.updateState())
  }

  updateState() {
    let items = this.storage.getItems('items', true);
    if (items.length !== 0) {
      items = items
                .map((item) => { return parseFloat(item.sum) })
                .reduce((prev, curr) => { return prev + curr }) * -1;
    } else {
      items = 0;
    }
    return {
      items: this.storage.getItems('items', true, this.category),
      balance: items
    }
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
    this.setState(this.updateState())
  }

  componentWillMount() {
    this.category = this.props.params.category;
    this.setState({items: this.storage.getItems('items', true, this.category)});
  }

  handleCategoryClick() {
    setTimeout(()=>{
      this.category = this.props.params.category;
      this.setState({items: this.storage.getItems('items', true, this.category)});
    })
  }

  capitalize(str) {
    let arr = str.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
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
        <div>Total: {this.state.balance}</div>
        <nav>
          <Link to='/' onClick={this.handleCategoryClick}>All</Link>
          {
            this.categories.map((category) => {
              return (
                <Link key={category.id} to={`items/${category.category}`} onClick={this.handleCategoryClick}>
                  {this.capitalize(category.category)}
                </Link>
              )
            })
          }
        </nav>
        <List items={this.state.items}/>
      </div>
    );
  }
};
