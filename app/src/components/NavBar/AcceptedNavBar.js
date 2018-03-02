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
class AcceptedNavBar extends React.Component {
  static propTypes = {
    numberOfAcceptedUsers: PropTypes.number.isRequired,
    format: PropTypes.number.isRequired,
  }

  state = {}

  render() {
    const { numberOfAcceptedUsers, format } = this.props;
    return (
      <div id="go-to-matching">
        <p>Création de la chatroom</p>
        <p>{`${numberOfAcceptedUsers}/${format}`}</p>
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
      </div>
    );
  }
}

/**
 * Export
 */
export default AcceptedNavBar;
