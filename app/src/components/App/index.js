/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Local import
 */
import MatchingForm from 'src/containers/MatchingForm';

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
  </div>
);

/**
 * Export
 */
export default App;
