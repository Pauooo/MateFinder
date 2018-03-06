/**
 * Npm import
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
/**
 * Local import
 */
import App from 'src/components/App';

import { setUsernameAndPassword } from 'src/store/reducers/auth';
import { sendCredential } from 'src/store/middlewares/authentication';

// Store = Gestionnaire de state externe
import store from 'src/store';
/**
 * Code
 */
document.addEventListener('DOMContentLoaded', () => {
  const rootComponent = (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  render(rootComponent, document.getElementById('root'));

  console.log(localStorage.getItem('mytoken'));

  if (localStorage.getItem('mytoken')) {
    const decoded = jwtDecode(localStorage.getItem('mytoken'));
    console.log(decoded);
    store.dispatch(setUsernameAndPassword(decoded.username, decoded.password));
    store.dispatch(sendCredential(true));
  }
});
