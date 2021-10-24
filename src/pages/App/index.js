import React, { Component } from 'react';
import './style.css';
import Login from '../App/Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <h1>Remora</h1>
    </div>
    );
  }
}

export default App;