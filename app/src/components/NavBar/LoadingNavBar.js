/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */


/**
 * Code
 */
const LoadingNavBar = ({ matchRefuse }) => (
  <div id="go-to-matching">
    <p>Recherche en cours</p>
    <div className="cssload-bell">
      <div className="cssload-circle">
        <div className="cssload-inner" />
      </div>
      <div className="cssload-circle">
        <div className="cssload-inner" />
      </div>
      <div className="cssload-circle">
        <div className="cssload-inner" />
      </div>
      <div className="cssload-circle">
        <div className="cssload-inner" />
      </div>
      <div className="cssload-circle">
        <div className="cssload-inner" />
      </div>
    </div>
    <button id="cancel-match" onClick={matchRefuse}>Annuler</button>
  </div>
);

LoadingNavBar.propTypes = {
  matchRefuse: PropTypes.func.isRequired,
};

/**
 * Export
 */
export default LoadingNavBar;
