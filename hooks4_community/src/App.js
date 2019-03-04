import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import UserMap from './pages/mainPage/Map/Map';
import AuthPage from './pages/Auth/Auth';
import MainNavigation from './components/Navigation/Navigation';
import './App.scss';
import Context from './context/auth-context';

const App = () => {
  const { state } = useContext(Context);
  console.log(state.isAuth);
  return (
    <>
      <div className='App'>
        <MainNavigation />
        <main>
          <Switch>
            <Route path='/auth' component={AuthPage} exact />
            <Route path='/' component={UserMap} />
          </Switch>
        </main>
      </div>
    </>
  );
};

export default App;
