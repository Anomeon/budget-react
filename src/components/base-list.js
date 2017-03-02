import React from 'react';

export class BaseList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.items.map((item) => {
            return <li key={item.id}>{item[this.props.type]}</li>
          })
        }
      </ul>
    );
  }
};
