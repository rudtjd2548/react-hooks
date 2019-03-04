import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';

import Context from '../../context/auth-context';
import { BASE_URL } from '../../client';
import { ME_QUERY } from '../../graphql/queries';

const GoogleAuth = () => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);
      console.log({ me });

      dispatch({ type: 'LOGIN_USER', payload: me });
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error('Error logging in', err);
    dispatch({ type: 'IS_LOGGED_IN', payload: false });
  };

  return (
    <div>
      <GoogleLogin
        clientId='203657272501-4j7uefd25uim49mc05q1et7h58bns9o8.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText='Login with Google'
        theme='dark'
      />
    </div>
  );
};

export default GoogleAuth;
