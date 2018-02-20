/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Local import
 */


/**
 * Code
 */
const Landing = () => (
  <div id="landing">
    <Link
      to="/login"
      exact
    >
      Log in
    </Link>
    <Link
      to="/signup"
      exact
    >
      Sign up
    </Link>
  </div>
);

/**
 * Export
 */
export default Landing;
