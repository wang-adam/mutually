import React, { Component } from 'react';
import './style.css';
import HaikuForm from './Components/HaikuForm';
import LogoutButton from './Components/LogoutButton';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/login">Log In</Link>
        <br></br>
        <Link to="/register">Sign Up</Link>
        <br></br>
        <LogoutButton />
        <br></br>
        <Link to="/me">Profile</Link>
        <br></br>
        <HaikuForm />
      </div>
    );
  }
}

export default App;