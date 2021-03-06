import React from 'react';
import {Link} from 'react-router';

export class ListItem extends React.Component {
  render() {
    const {id, item, sum, category, type, tags} = this.props.item;
    return (
      <div>
        <div>item: {item}</div>
        <div>sum: {Math.abs(sum)}</div>
        <div>category: {category}</div>
        <div>type: {type}</div>
          <div>tags: {tags.join(', ')}</div>
        <Link to={`items\/${id}\/edit`}>Edit</Link>
      </div>
    );
  }
};
