import React from 'react';

export default React.createContext({
  //E-mail auth
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  //Google auth
  currentUser: null,
  isAuth: false
});
