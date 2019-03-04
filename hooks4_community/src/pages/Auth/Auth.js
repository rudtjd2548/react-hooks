import React from 'react';

import EmailLogin from '../../components/Auth/EmailLogin';
import GoogleLogin from '../../components/Auth/GoogleLogin';
import './Auth.scss';

const AuthPage = () => (
  <div className='root'>
    <EmailLogin />
    <GoogleLogin />
  </div>
);

export default AuthPage;
