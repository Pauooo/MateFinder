/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Local import
 */
import Landing from 'src/components/Landing';
import Login from 'src/containers/Login';
import SignUp from 'src/containers/SignUp';
import Password from 'src/components/Password';
import MatchingForm from 'src/containers/MatchingForm';
import MatchingSearch from 'src/containers/MatchingSearch';
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
    <Route
      path="/matching"
      exact
      component={MatchingForm}
    />
    <Route
      path="/loading"
      exact
      component={MatchingSearch}
    />
  </div>
);

/**
 * Export
 */
export default App;
