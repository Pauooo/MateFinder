/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import NavBar from 'src/components/NavBar';

// Action creators
import { matchRefuse } from '../store/socket';

/**
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  username: state.login.username,
  matchingLoading: state.matchingLoading,
});

// Actions
const mapDispatchToProps = dispatch => ({
  matchRefuse: () => {
    dispatch(matchRefuse());
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
