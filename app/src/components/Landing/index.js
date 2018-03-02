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
      Se connecter
    </Link>
    <Link
      to="/signup"
    >
      S'enregistrer
    </Link>
  </div>
);

/**
 * Export
 */
export default Landing;
