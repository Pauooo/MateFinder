/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import NavBar from 'src/components/NavBar';

// Action creators
import { logout } from '../store/middlewares/authentication';

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


const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

/*
 * Container
 */
const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);


/**
 * Export
 */
export default NavBarContainer;
