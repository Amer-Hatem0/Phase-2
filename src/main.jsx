import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient.js';
import { BrowserRouter } from 'react-router-dom';
import './output.css';
// import './styles/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
