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
  Categories,
  ItemEdit,
  Tags
} from './components';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={Menu}>
      <Route path="/" component={EnterData}/>
      <Route path="/items/:category" component={EnterData}/>
      <Route path="/items/:id/edit" component={ItemEdit}/>
      <Route path="test" component={Report}/>
      <Route path="categories" component={Categories}/>
      <Route path="tags" component={Tags}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
