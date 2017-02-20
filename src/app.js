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
  Report,
  Categories
} from './components';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={Menu}>
      <Route path="/" component={EnterData}/>
      <Route path="/items/:category" component={EnterData}/>
      <Route path="test" component={Report}/>
      <Route path="categories" component={Categories}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
