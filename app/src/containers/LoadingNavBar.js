/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import LoadingNavBar from 'src/components/NavBar/LoadingNavBar';

// Action creators
import { matchRefuse } from '../store/middlewares/socket';

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
});

/*
 * Container
 */
const LoadingNavBarContainer = connect(mapStateToProps, mapDispatchToProps)(LoadingNavBar);


/**
 * Export
 */
export default LoadingNavBarContainer;
