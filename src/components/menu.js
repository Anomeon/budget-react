import React from 'react';
import {Link} from 'react-router';

export class Menu extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
          <Link to="/categories">Categories</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
};
