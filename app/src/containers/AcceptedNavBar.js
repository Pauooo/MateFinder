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
  numberOfAcceptedUsers: state.matching.numberOfAcceptedUsers,
  format: state.matching.selectsMatching.format,
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
