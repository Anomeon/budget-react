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
    this.handleDownload = this.handleDownload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.focus = this.focus.bind(this);

    let categories = {categories: this.storage.getItems('categories', true)};
    let tags = {tags: this.storage.getItems('tags', true)};
    this.state = (Object.assign(this.updateState(), categories, tags));
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    [...e.target.querySelectorAll('input')]
      .forEach(el => formData[el.name] = el.value);
    [...e.target.querySelectorAll('select:not([name=tags])')]
      .forEach(el => formData[el.name] = el.value);
    formData['tags'] = [...document.querySelector('[name=tags]').options]
      .filter(option => option.selected)
      .map(option => option.value);
    if (formData['type'] === 'expenses') formData['sum'] = parseFloat(formData['sum']) * -1;
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
                .reduce((prev, curr) => { return prev + curr });
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
    this.storage.storage.clear();
    let categories = {categories: this.storage.getItems('categories', true)};
    let tags = {tags: this.storage.getItems('tags', true)};
    this.setState(Object.assign(this.updateState(), categories));
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

  handleDownload(e) {
    let json = JSON.stringify(this.storage.storage)
    let blob = new Blob([json], {type: "application/json"});
    let url  = URL.createObjectURL(blob);
    let a = e.target;
    a.download = `backup_${Date.now()}.json`;
    a.href = url;
  }

  handleUpload(e) {
    e.preventDefault();
    let input = e.target.querySelector('input');
    let fr = new FileReader();

    fr.onload = (e) => {
      let json = JSON.parse(e.target.result);
      for (let key in json) {
        this.storage.storage.setItem(key, json[key]);
      }
    }

    fr.readAsText(input.files.item(0));
    e.target.reset();
    this.storage.storage.clear();
    setTimeout(() => {
      let categories = {categories: this.storage.getItems('categories', true)};
      this.setState(Object.assign(this.updateState(), categories));
    }, 200)
  }

  handleUploadCheck(e) {
    let form = e.target.parentNode;
    if (form.querySelector('input').files.length !== 0) {
      form.querySelector('button').removeAttribute('disabled');
    } else {
      form.querySelector('button').setAttribute('disabled', '');
    }
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
            <option readOnly defaultValue label=" "></option>
            {
              this.state.categories.map(category => <option key={category.id}>{category.category}</option>)
            }
          </select>
          <select name="type">
            <option>expenses</option>
            <option>income</option>
          </select>
          <select name="tags" multiple="true">
            {
              this.state.tags.map(tag => <option key={tag.id}>{tag.tag}</option>)
            }
          </select>
          <button type="submit">Send</button>
          <button type="button" onClick={this.handleClearAll}>Clear All</button>
        </form>
        <a href="" onClick={this.handleDownload}>Download data</a>
        <form onSubmit={this.handleUpload}>
          <input type="file" onChange={this.handleUploadCheck}/>
          <button type="submit" disabled>Upload data</button>
        </form>
        <div>Total: {this.state.balance}</div>
        <nav>
          <Link to='/' onClick={this.handleCategoryClick}>All</Link>
          {
            this.state.categories.map((category) => {
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
