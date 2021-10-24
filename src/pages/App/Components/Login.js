import React from 'react';
import ReactDOM from 'react-dom';

// this code was sourced from https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = `${process.env.OAUTH_CLIENT_ID}`;

function LoginTest(){
  const i = 10;

  return (
    <div>
      <h1>fdadfa</h1>
    </div>
  );
}

function Login() {
  const onSuccess = (res) => {
    console.log('Login success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully. Welcome ${res.profileObj.name}! \n`
    );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
      <h1>testsetstst</h1>
    </div>
    
  );
}

class LoginInfo extends React.Component{
  render(){
    console.log("login called");
    return Login();
  }
}

// export default Login;
const domContainer = document.querySelector('#root');
ReactDOM.render(<h1>testsetsts</h1>, domContainer);

