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
class FindingNavBar extends React.Component {
  static propTypes = {
    matchRefuse: PropTypes.func.isRequired,
    matchAccepted: PropTypes.func.isRequired,
  }

  state = {}

  render() {
    const { matchAccepted, matchRefuse } = this.props;
    return (
      <div id="go-to-matching">
        <p>On a trouvé ce que tu cherches !</p>
        <button className="loadingbutton" onClick={matchAccepted}>Accepter</button>
        <button className="loadingbutton" onClick={matchRefuse}>Refuser</button>
      </div>
    );
  }
}

/**
 * Export
 */
export default FindingNavBar;
