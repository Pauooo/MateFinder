/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import classNames from 'classnames';

/**
 * Local import
 */

/**
 * Code
 */
class MatchingSearch extends React.Component {
  static propTypes = {
    matchingFound: PropTypes.bool.isRequired,
    matchingAccepted: PropTypes.bool.isRequired,
    matchAccepted: PropTypes.func.isRequired,
    matchRefuse: PropTypes.func.isRequired,
    numberOfAcceptedUsers: PropTypes.number.isRequired,
    format: PropTypes.number.isRequired,
    matchingLoading: PropTypes.bool.isRequired,
  }

  state = {}

  render() {
    const {
      matchingFound, matchingAccepted, matchAccepted, matchRefuse, numberOfAcceptedUsers, format, matchingLoading,
    } = this.props;
    if (!matchingLoading) {
      return (
        <Redirect to="/" />
      );
    }
    if (matchingFound) {
      return (
        <div id="matchingloading" >
          <h1>Une partie a été trouvée !</h1>
          {(!matchingAccepted &&
            <div>
              <button onClick={matchAccepted}>Accepter</button>
              <button onClick={matchRefuse}>Annuler</button>
            </div>
          )}
          {(matchingAccepted && <h1>{`${numberOfAcceptedUsers}/${format}`}</h1>)}
        </div>
      );
    }
    return (
      <div id="matchingloading" >
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
        <div className="typewriter">
          <h1>Recherche en cours</h1>
        </div>
        <button onClick={matchRefuse}>Annuler</button>
      </div>
    );
  }
}

/**
 * Export
 */
export default MatchingSearch;
