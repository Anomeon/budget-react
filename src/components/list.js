import React from 'react';
import {Link} from 'react-router';
import {ListItem} from './index';
import {ItemStorage} from '../services';

export class List extends React.Component {

  constructor() {
    super();
    this.storage = new ItemStorage(localStorage);
    this.state = {
      searchString: '',
      categories: this.storage.getItems('categories', true)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchString: e.target.value
    })
  }

  render() {
    let searchString = this.state.searchString.trim().toLowerCase();
    let items = this.props.items;
    if (this.state.searchString.length > 0) {
      items = items.filter((item) => {
        return item.item.toLowerCase().match(searchString);
      })
    }
    return (
      <div>
        <br/>
        <form>
          <input onChange={this.handleChange} placeholder="Type to search.."/>
        </form>
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <ListItem item={item}/>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
};
