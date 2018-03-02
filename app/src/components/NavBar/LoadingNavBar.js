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
class LoadingNavBar extends React.Component {
  static propTypes = {
    matchRefuse: PropTypes.func.isRequired,
  }

  state = {}

  render() {
    const { matchRefuse } = this.props;
    return (
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
        <button className="loadingbutton" onClick={matchRefuse}>Annuler</button>
      </div>
    );
  }
}

/**
 * Export
 */
export default LoadingNavBar;
