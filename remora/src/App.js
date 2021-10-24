import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="about"
            style={{backgroundColor:'rgb(62, 139, 255)', textAlign:'center', padding:'1% 5%', textAlign: 'justify' }}>
            <p className="title" style={{textAlign:'center'}}>Remora</p>
            <p className="text" style={{textAlign:'left', textIndent: '3vw'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

        <Login />

        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fund 1</h5>
                <p className="card-text">Fund description</p>
                <a href="#/requests" className="btn btn-primary">Request</a>
                <a href="#/contribute" className="btn btn-success">Contribute</a>
              </div>
            </div>
          </div>
        </div>
    </div>

    );
  }
}

export default App;
