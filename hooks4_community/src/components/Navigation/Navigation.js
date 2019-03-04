import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

const App = () => {
  return (
    <header className='Navigation'>
      <div className='main-navigation__logo'>
        <h1>
          <NavLink to='/'>Holy Workingday</NavLink>
        </h1>
      </div>
      <nav className='Navigation__items'>
        <ul>
          <li>
            <NavLink to='/auth'>Authenticate</NavLink>
          </li>
          <li>
            <NavLink to='/chatroom'>Chatroom</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default App;
