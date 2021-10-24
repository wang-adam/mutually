import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Login from './Components/Login';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="about"
          style={{backgroundColor:'rgb(62, 139, 255)', textAlign:'center', padding:'1% 5%', textAlign: 'justify' }}>
          <div className="box"></div>
          <p className="title" style={{textAlign:'center'}}>mutu  ally</p>
        <p className="moto" style={{ textAlign: 'center' }}>The democratic mutual aid platform for all.</p>
          <p className="text" style={{ textAlign: 'left'}}>
            Beneficiaries - In need of financial assistance? Mutually is the mutual aid platform where you can receive funding directly right from the community.
             Simply fill out a request with your needs.
          </p>
          <p className="text" style={{ textAlign: 'left', marginTop: "4vh" }}>
            Contributors - We believe you should have a voice in where your donations go. Each fund has a tiered voting system based on the amount you contribute. The more you contribute, the more your voice counts. Each contributor can vote on whether they would like to support a beneficiary's request or not.
          </p>
          
        
        <div style={{ textAlign: 'center' }}> <Login /> </div>
        </div>


        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <p className="explore-funds" style={{marginTop: '30px'}}>About the Fund</p>
        <p className="fund-text" style={{marginLeft: '125px', marginRight: '125px', marginBottom: '50px'}}>We are currently developing funds catered to specific issues, but our primary fund aims to connect people to the community resources they need: for the purposes of advancing social equity, healthcare equity, and diversity and inclusion.</p> 
        <Link to="/requests">
          <button className="button" style={{ backgroundColor: "rgb(62, 139, 255)"}}>Request</button>
        </Link>
        <Link to="/contribute">
          <button className="button" style={{ backgroundColor: "#52D452" }}>Contribute</button>
        </Link>
        <Link to="/vote">
          <button className="button" style={{ backgroundColor: "#58941b" }}>Vote</button>
        </Link>
      </div>
    );
  }
}

export default App;
