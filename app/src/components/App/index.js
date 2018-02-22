/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';
/**
 * Local import
 */
import Landing from 'src/components/Landing';
import Login from 'src/components/Login';
import SignUp from 'src/components/SignUp';
import Password from 'src/components/Password';
/**
 * Code
 */
const App = () => (
  <div id="app">
    <img src="/img/title.png" alt="title" />
    <Route
      path="/"
      exact
      component={Landing}
    />
    <Route
      path="/signup"
      exact
      component={SignUp}
    />
    <Route
      path="/login"
      exact
      component={Login}
    />
    <Route
      path="/password"
      exact
      component={Password}
    />
  </div>
);

/**
 * Export
 */
export default App;
