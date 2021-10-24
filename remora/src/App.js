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
          <div className="box"></div>
          <p className="title" style={{textAlign:'center'}}>mutu  ally</p>
        <p className="moto" style={{ textAlign: 'center' }}>a democratic mutual aid platform for everyone</p>
          <p className="text" style={{ textAlign: 'left', textIndent: '3vw'}}>
            Beneficiaries: In need of a donation? Mutually is the platform for you, where you can get financial aid right from the community.
             Simply fill out a request with your needs. Best of luck!
          </p>
          <p className="text" style={{ textAlign: 'left', textIndent: '3vw', marginTop: "4vh" }}>
          Contributors: We believe you should have a voice in where your donations go. Each fund has a tiered voting system based on the amount you contribute. The more you contribute, the more your voice counts. Each donor can vote whether they want to support a Beneficiaries request or not.
          </p>
          
        
        <div style={{ textAlign: 'center' }}> <Login /> </div>
        </div>


        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <p className="explore-funds">about the fund</p>
        <p className="fund-text">the primary fund for Mutually, aimed to provide accessible financial assistance to those in need, given to those in the community.</p> 
        <button href="#/contribute" className="button " style={{ backgroundColor: "#52D452" }}>Contribute</button>
        <button href="#/request" className="button" style={{ backgroundColor: "rgb(62, 139, 255)"}}>Request</button>
      </div>
    );
  }
}

export default App;
