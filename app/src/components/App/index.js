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
/**
 * Code
 */
const App = () => (
  <div id="app">
    <h1>MateFinder</h1>
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

  </div>
);

/**
 * Export
 */
export default App;
