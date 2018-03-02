/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import NavBar from 'src/components/NavBar';

// Action creators
// import { matchRefuse, matchAccepted } from '../store/socket';

/**
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  username: state.login.username,
  matchingFound: state.matchingFound,
  matchingLoading: state.matchingLoading,
  matchingAccepted: state.matchingAccepted,
});

// Actions
// const mapDispatchToProps = dispatch => ({
//   matchRefuse: () => {
//     dispatch(matchRefuse());
//   },
//   matchAccepted: () => {
//     dispatch(matchAccepted());
//   },
// });

/*
 * Container
 */
const NavBarContainer = connect(mapStateToProps)(NavBar);


/**
 * Export
 */
export default NavBarContainer;
