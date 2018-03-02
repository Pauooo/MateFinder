/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import FindingNavBar from 'src/components/NavBar/FindingNavBar';

// Action creators
import { matchRefuse, matchAccepted } from '../store/socket';

/**
 * Code
 */
// State
const mapStateToProps = null;

// Actions
const mapDispatchToProps = dispatch => ({
  matchRefuse: () => {
    dispatch(matchRefuse());
  },
  matchAccepted: () => {
    dispatch(matchAccepted());
  },
});

/*
 * Container
 */
const FindingNavBarContainer = connect(mapStateToProps, mapDispatchToProps)(FindingNavBar);


/**
 * Export
 */
export default FindingNavBarContainer;
