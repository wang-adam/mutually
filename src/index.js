import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route } from 'react-router';
import './index.css';

import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Requests from './pages/Requests';
import Contribute from './pages/Contribute';
import Vote from './pages/Vote';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/requests" component={Requests} />
    <Route path="/contribute" component={Contribute} />
    <Route path="/vote" component={Vote} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(
  <Routes history={hashHistory} />,
  document.getElementById('root')
);