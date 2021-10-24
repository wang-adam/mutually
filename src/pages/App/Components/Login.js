import React from 'react';

// this code was sourced from https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = `${process.env.OAUTH_CLIENT_ID}`;

function Login() {
  const onSuccess = (res) => {
    console.log('Login success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully. Welcome ${res.profileObj.name}! \n`
    );
    refreshTokenSetup(res);
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
    </div>
  );
}

export default Login;
