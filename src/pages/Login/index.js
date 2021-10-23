import React, { Component } from 'react';
import { Link } from 'react-router';
import LoginService from '../../services/LoginService';
import Message from '../App/Components/Message';
import Error from '../App/Components/Error';
import './style.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const loginResult = await LoginService(data);
    if (loginResult !== 200) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else {
      this.setState({
        loginSuccess: true,
        error: false,
      });
      location.replace('/');
    }  
  };

  render() {
    const { loginSuccess, error } = this.state;

    return (
      <div className="Login">
        <h1> Login </h1> {' '}
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p> Username </p>    {' '}
              <input
                type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div>{' '}
            {' '}
            <div className="fields">
              {' '}
              <p> Password </p>    {' '}
              <input
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />{' '}
                  {' '}
            </div>{' '}
            {' '}
            <div className="buttons">
              {' '}
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
              >
                {' '}
                  Log In    {' '}
              </button>{' '}
                  <Link to="/"> Cancel </Link>
                  <Link to="/register"> Register </Link>  {' '}
               {' '}
            </div>{' '}
               {' '}
          </div>{' '}
           {' '}
        </form>{' '}
        {loginSuccess && <Message message="Successfully logged in!" />}    {' '}
        {error && <Error message="Username or password was incorrect." />}    {' '}
      </div>
    );
  }
}