/*
 * Npm import
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


/*
 * Local import
 */
import App from 'src/components/App';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

// Actions


/*
 * Export default
 */
export default withRouter(connect(mapStateToProps)(App));
