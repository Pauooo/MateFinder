/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import AcceptedNavBar from 'src/components/NavBar/AcceptedNavBar';

// Action creators

/**
 * Code
 */
// State
const mapStateToProps = state => ({
  numberOfAcceptedUsers: state.numberOfAcceptedUsers,
  format: state.selectsMatching.format,
});

// Actions


/*
 * Container
 */
const AcceptedNavBarContainer = connect(mapStateToProps)(AcceptedNavBar);


/**
 * Export
 */
export default AcceptedNavBarContainer;
