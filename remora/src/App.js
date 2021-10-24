import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Remora</h1>
        <Login />
        <div id="about">
          <div
            style={{ backgroundColor:'rgb(62, 139, 255)', textAlign:'center', padding:'1% 5%', textAlign: 'justify' }}>
            <p className="title" style={{textAlign:'center'}}>Remora</p>
            <p className="text" style={{textAlign:'left', textIndent: '3vw'}}>
              Description here
            </p>
          </div>
        </div>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fund 1</h5>
                <p className="card-text">Fund description</p>
                <a href="#/request" className="btn btn-primary">Request</a>
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
