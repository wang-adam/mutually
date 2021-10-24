import React, { Component } from 'react';
import './style.css';
import Login from '../App/Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        {/* <h1>Remora</h1>               */}
        <div id="about">
          <div
            style="background-color:rgb(62, 139, 255); text-align:center; padding:1% 5%; text-align: justify;">
            <p class="title" style="text-align:center;">Remora</p>
            <p class="text" style=" text-align:left; text-indent: 3vw;">
              Description here
            </p>
          </div>
        </div>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <div class="row">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Fund 1</h5>
                <p class="card-text">Fund description</p>
                <a href="#" class="btn btn-primary">Donate</a>
                <a href="#" class="btn btn-success">Request</a>
              </div>
            </div>
          </div>
        </div>
    </div>

    );
  }
}

export default App;