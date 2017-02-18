import React from 'react';

export class ListItem extends React.Component {
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
