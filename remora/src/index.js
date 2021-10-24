import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route } from 'react-router';
import NotFound from './Pages/notfound.js';
import Requests from './Pages/requests.js';
import Contribute from './Pages/contribute.js';
import Vote from './Pages/vote.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/requests" component={Requests} />
    <Route path="/contribute" component={Contribute} />
    <Route path="/vote" component={Vote} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
