/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Login from 'src/components/Login';
import { sendCredential } from 'src/store/middlewares/authentication';
import { setErrorMessage, emptyErrorMessages } from 'src/store/reducers/auth';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  login: state.auth.login,
  errorMessages: state.auth.errorMessages,
});

// Actions
const mapDispatchToProps = dispatch => ({
  sendCredential: () => {
    dispatch(sendCredential());
  },
  emptyErrorMessages: () => {
    dispatch(emptyErrorMessages());
  },
  setErrorMessage: (message) => {
    dispatch(setErrorMessage(message));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
