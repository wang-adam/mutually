import React from 'react';
// this code was sourced from https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

function Login() {
  const onSuccess = (res) => {
    console.log('Login success: currentUser:', res.profileObj);
    let id = res.profileObj.googleId;
    let token = res.tokenId
    let url = 'http://127.0.0.1:8000/users'
    fetch(url + "/" + id).then(response => {
        if (response.status === 404) {
            console.log("creating user with token: " + token);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/JSON');
            xhr.send(JSON.stringify({
                auth_token: token
            }));
        }
    })
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

class LoginInfo extends React.Component{
  render(){
    console.log("login called");
    return Login();
  }
}

export default Login;
