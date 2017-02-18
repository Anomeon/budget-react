import React from 'react';
import {Link} from 'react-router';

export class Menu extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
};
