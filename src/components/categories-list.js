import React from 'react';

export class CategoriesList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.items.map((item) => {
            return <li key={item.id}>{item.category}</li>
          })
        }
      </ul>
    );
  }
};
