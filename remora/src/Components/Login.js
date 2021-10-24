import React, {Component} from 'react';
// this code was sourced from https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

export default class Login extends Component {
  onSuccess(res) {
    console.log('Login success: currentUser:', res.profileObj);
  };

  onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  renderButton = (res) => {
    window.gapi.signin2.render('myGoogleButton',
      {
        'scope': 'profile email',
        'width': 240,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess(res),
        'onfailure': this.onFailure(res)
      });
  }

  componentDidMount = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({ client_id: clientId }).then((res) => {

          // DO NOT ATTEMPT TO RENDER BUTTON UNTIL THE 'Init' PROMISE RETURNS
          this.renderButton(res);

      });
    });
  }

  render() {
    return (
      <div id="myGoogleButton">
        {/* <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        /> */}
      </div>
    );
  }
}

// class LoginInfo extends React.Component{
//   render(){
//     console.log("login called");
//     return Login();
//   }
// }

// export default Login;
