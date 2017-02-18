import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import {
  EnterData,
  Menu,
  Test,
  Categories
} from './components';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={Menu}>
      <Route path="/" component={EnterData}/>
      <Route path="test" component={Test}/>
      <Route path="categories" component={Categories}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
