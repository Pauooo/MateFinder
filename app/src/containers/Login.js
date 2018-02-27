/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Login from 'src/components/Login';
import { sendCredential } from 'src/store/socket';


/*
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  login: state.login,
  errorMessages: state.errorMessages,
});

// Actions
const mapDispatchToProps = dispatch => ({
  sendCredential: () => {
    dispatch(sendCredential());
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
