import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import UserMap from './pages/mainPage/Map/Map';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Route path='/' component={UserMap} />
      </>
    </BrowserRouter>
  );
};

export default App;
