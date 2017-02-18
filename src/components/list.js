import React from 'react';
import {ListItem} from './index';

export class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => {
          return (
            <li key={item.id}>
              <ListItem item={item}/>
            </li>
          )
        })}
      </ul>
    );
  }
};
