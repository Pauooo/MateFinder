/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * Local import
 */
import LoadingNavBar from 'src/components/NavBar/LoadingNavBar';

/**
 * Code
 */
class NavBar extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    matchingLoading: PropTypes.bool.isRequired,
  }
  state = {}

  render() {
    const { loggedIn, username, matchingLoading } = this.props;
    if (loggedIn) {
      return (
        <nav id="mainnav">
          <div>
            <p>Bienvenue</p>
            <p id="username">{username}</p>
            <p>Compte</p>
            {!matchingLoading && (
              <NavLink
                exact
                to="/matching"
                id="go-to-matching"
              >
              Recherche
              </NavLink>
            )}
            {matchingLoading && (
              <LoadingNavBar />
            )}
          </div>
          <div>
            <p>Deconnexion</p>
          </div>
        </nav>
      );
    }
    return (
      <nav id="mainnav">
        <div id="leftnav">
          <p>Bienvenue</p>
        </div>
      </nav>
    );
  }
}

/**
 * Export
 */
export default NavBar;
