/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Local import
 */
import MatchingForm from 'src/containers/MatchingForm';
import MatchingSearch from 'src/containers/MatchingSearch';

/**
 * Code
 */
const App = () => (
  <div id="app">
    <Route
      path="/"
      exact
      component={MatchingForm}
    />
    <Route
      path="/loading"
      exact
      component={MatchingSearch}
    />
    {/* <Route
      path="/loading"
      exact
      component={MatchingSearch}
    /> */}
  </div>
);

/**
 * Export
 */
export default App;
