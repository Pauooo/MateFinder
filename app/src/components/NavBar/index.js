/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

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
    matchRefuse: PropTypes.func.isRequired,
  }
  state = {}

  render() {
    const {
      loggedIn, username, matchingLoading, matchRefuse,
    } = this.props;
    if (loggedIn) {
      return (
        <nav id="mainnav">
          <div>
            <p>Bienvenue</p>
            <p id="username">{username}</p>
            <NavLink
              exact
              to="/profil"
              data-tip="Pas maintenant !"
              onClick={evt => evt.preventDefault()}
              id="go-to-profil"
            >
              Compte
            </NavLink>
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
              <div>
                <ReactTooltip place="bottom" />
                <LoadingNavBar matchRefuse={matchRefuse} />
              </div>
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
