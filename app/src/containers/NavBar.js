/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import NavBar from 'src/components/NavBar';

// Action creators
// import { matchRefuse, matchAccepted } from '../store/middlewares/socket';

/**
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  username: state.auth.login.username,
  matchingFound: state.matching.matchingFound,
  matchingLoading: state.matching.matchingLoading,
  matchingAccepted: state.matching.matchingAccepted,
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
