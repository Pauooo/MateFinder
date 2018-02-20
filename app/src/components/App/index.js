/**
 * Npm import
 */
import React from 'react';

/**
 * Local import
 */

import Login from 'src/components/Login';
import Password from 'src/components/Password';
import SignUp from 'src/components/SignUp';
/**
 * Code
 */
const App = () => (
  <div id="app">
    <Login />
    <Password />
    <SignUp />
  </div>
);

/**
 * Export
 */
export default App;
