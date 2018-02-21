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
    >
      Log in
    </Link>
    <Link
      to="/signup"
    >
      Sign up
    </Link>
  </div>
);

/**
 * Export
 */
export default Landing;