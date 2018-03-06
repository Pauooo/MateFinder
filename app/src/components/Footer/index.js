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
const Footer = () => (
  <footer>
    <p>
      &copy; PaMaKa -
      <Link to={{
        pathname: '/mentions',
      }}
      >
        Mentions légales
      </Link>
      -
      <Link to={{
        pathname: '/contact',
      }}
      >
        Contact
      </Link>
    </p>
  </footer>
);

/**
 * Export
 */
export default Footer;
