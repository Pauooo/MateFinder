/*
 * Npm import
 */
import { connect } from 'react-redux';

/*
 * Local import
 */
import SignUp from 'src/components/SignUp';
import { createAccount } from 'src/store/middlewares/authentication';
import { setErrorMessage } from 'src/store/reducers/auth';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  userAccountCreated: state.auth.userAccountCreated,
  signup: state.auth.signup,
  errorMessages: state.auth.errorMessages,
});
// Actions
const mapDispatchToProps = dispatch => ({
  createAccount: () => {
    dispatch(createAccount());
  },
  setErrorMessage: (message) => {
    dispatch(setErrorMessage(message));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
