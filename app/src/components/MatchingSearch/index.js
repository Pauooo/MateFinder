/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
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
    numberOfAcceptedUsers: PropTypes.number.isRequired,
    format: PropTypes.number.isRequired,
  }

  state = {}

  render() {
    const {
      matchingFound, matchingAccepted, matchAccepted, numberOfAcceptedUsers, format,
    } = this.props;
    if (matchingFound) {
      return (
        <div id="matchingloading" >
          <h1>Une partie a été trouvée !</h1>
          {(!matchingAccepted && <button onClick={matchAccepted}>Accepter</button>)}
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
      </div>
    );
  }
}

/**
 * Export
 */
export default MatchingSearch;
