import 'babel-polyfill';
import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Context from './context/auth-context';
import reducer from './reducer';
import './index.scss';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <App />
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
