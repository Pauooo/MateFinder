/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import NavBar from 'src/components/NavBar';

// Action creators
// import { changeMatchingSelect, changeTeamStatus, changeTeamCount, startMatch } from 'src/store/reducer';

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
// const mapDispatchToProps = dispatch => ({
//   changeMatchingSelect: (select, value) => {
//     dispatch(changeMatchingSelect(select, value));
//   },
//   changeTeamStatus: () => {
//     dispatch(changeTeamStatus());
//   },
//   changeTeamCount: (value) => {
//     dispatch(changeTeamCount(value));
//   },
//   startMatch: () => {
//     dispatch(startMatch());
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
