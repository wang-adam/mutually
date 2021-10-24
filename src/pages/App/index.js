import React, { Component } from 'react';
import './style.css';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/login">Log In</Link>
        <br></br>
        <Link to="/register">Sign Up</Link>
        <br></br>
        <h1>Remora</h1>
    </div>
    );
  }
}

export default App;