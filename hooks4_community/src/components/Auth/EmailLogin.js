import React, { useState, useRef } from 'react';

import './EmailLogin.scss';

const EmailAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const checkPasswordRef = useRef('');
  const switchModeHandler = () => setIsLogin(!isLogin);
  const submitHandler = e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const checkPassword = checkPasswordRef.current.value;

    console.log(email, password, checkPassword);
  };

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' ref={emailRef} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={passwordRef} />
      </div>
      {!isLogin ? (
        <>
          <div className='form-control'>
            <label htmlFor='password'>Check password</label>
            <input type='password' id='password' ref={checkPasswordRef} />
          </div>
        </>
      ) : null}
      <div className='form-actions'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={switchModeHandler}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default EmailAuth;
