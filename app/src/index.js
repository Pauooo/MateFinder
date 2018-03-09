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
import App from 'src/containers/App';

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
  // On vérifie s'il existe un token dans la session locale.
  // et on vérifie que ce token corespond bien à un utilisateur
  // si c'est le cas, on le connecte
  if (sessionStorage.getItem('mytoken')) {
    const decoded = jwtDecode(sessionStorage.getItem('mytoken'));
    store.dispatch(setUsernameAndPassword(decoded.username, decoded.password));
    store.dispatch(sendCredential(true));
  }
});
