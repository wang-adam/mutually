import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {UserRegistration, UsernameValidation} from '../../services/RegistrationService';
import Message from '../App/Components/Message';
import Error from '../App/Components/Error';
import './style.css';

export default class Register extends Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      register: false,
      error: false,
    };
  }

  handleOnChangeUserName = e => {
    this.setState ({
      username: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };

  handleOnBlur = async e => {
    this.setState ({
      username: e.target.value,
    });
    const data = {
      username: this.state.username,
    };
    const isUsernameTaken = await UsernameValidation(data);

    isUsernameTaken === 204 ? this.setState ({usernameTaken: true}) : this.setState ({usernameTaken: false});
  };

  onSubmit = async e => {
    e.preventDefault ();
    const data = {
      username: this.state.username,
      password: this.state.password,
      haiku: []
    };

    const registerStatus = await UserRegistration (data);
    if (registerStatus === 200) {
      this.setState ({
        username: '',
        password: '',
        register: true,
        error: false,
      });
      location.replace('/');
    } else {
        this.setState ({
            error: true,
            register: false,
        });
    }
  };

  render() {
    const {register, error, usernameTaken} = this.state;
    return (
        <div className="Registration">
          <h1> Create New Account </h1>
          <form onSubmit={this.onSubmit}>
              <div>
                  <div className="fields">
                  <p> Username </p>
                  {' '}
                  <input
                      type="text"
                      className={classNames ({error: usernameTaken})}
                      value={this.state.username}
                      name="Username"
                      onBlur={this.handleOnBlur}
                      onChange={this.handleOnChangeUserName}
                      autoComplete="Username"
                      required
                  />
                  </div>
                  <div className="fields">
                  <p> Password </p>
                  {' '}
                  <input
                      type="password"
                      value={this.state.password}
                      name="Password"
                      onChange={this.handleOnChangePassword}
                      autoComplete="password"
                      required
                  />
                  </div>
                  <div className="buttons">
                  <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={usernameTaken}
                  >
                      {' '}Sign Up{' '}
                  </button>
                  {' '}
                  <Link to="/"> Cancel </Link>
                  <Link to="/login"> Already have an account? </Link>
                  {' '}
                  </div>{' '}
              </div>
          </form>
          {' '}
          {error && <Error message="There was an error registering your account." />}
          {' '}
          {register && <Message message="Your account has been registered successfully!" />}
          {' '}
        </div>
      );
  }
}