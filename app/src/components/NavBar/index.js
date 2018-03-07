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
import LoadingNavBar from 'src/containers/LoadingNavBar';
import FindingNavBar from 'src/containers/FindingNavBar';
import AcceptedNavBar from 'src/containers/AcceptedNavBar';

/**
 * Code
 */
class NavBar extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    matchingLoading: PropTypes.bool.isRequired,
    matchingFound: PropTypes.bool.isRequired,
    matchingAccepted: PropTypes.bool.isRequired,
  }
  state = {}
  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const {
      loggedIn, username, matchingLoading, matchingFound, matchingAccepted,
    } = this.props;
    if (loggedIn) {
      return (
        <nav id="mainnav">
          <div>
            <p id="username">Bienvenue {username}</p>
            {(!matchingLoading) && (
              <NavLink
                exact
                to="/profil"
                id="go-to-profil"
              >
                Mon profil
              </NavLink>
            )}
            {(matchingLoading) && (
              <NavLink
                exact
                to="/profil"
                data-tip="Pas maintenant !"
                onClick={evt => evt.preventDefault()}
                id="go-to-profil"
              >
                Mon profil
              </NavLink>
            )}
            {!matchingLoading && (
              <NavLink
                exact
                to="/matching"
                id="go-to-matching"
              >
              Recherche
              </NavLink>
            )}
            {(matchingLoading && !matchingFound) && (
              <div>
                <ReactTooltip place="bottom" />
                <LoadingNavBar />
              </div>
            )}
            {(matchingFound && !matchingAccepted) && (
              <div>
                <ReactTooltip place="bottom" />
                <FindingNavBar />
              </div>
            )}
            {matchingAccepted && (
              <div>
                <ReactTooltip place="bottom" />
                <AcceptedNavBar />
              </div>
            )}
          </div>
          <div>
            <NavLink
              exact
              to="/"
              onClick={this.handleLogout}
              id="go-to-profil"
            >
              Déconnexion
            </NavLink>
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
