import React from 'react';
import {ListItem} from './index';

export class List extends React.Component {

  constructor() {
    super();
    this.state = {
      searchString: ''
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
