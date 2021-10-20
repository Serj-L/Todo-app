import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { store } from './store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReduxStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
