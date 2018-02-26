/*
 * Npm import
 */
import { connect } from 'react-redux';

/*
 * Local import
 */
import SignUp from 'src/components/SignUp';
import { createAccount } from 'src/store/socket';
import { setErrorMessage } from 'src/store/reducer';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  userAccountCreated: state.userAccountCreated,
  signup: state.signup,
  errorMessages: state.errorMessages,
});
// Actions
const mapDispatchToProps = dispatch => ({
  createAccount: () => {
    dispatch(createAccount());
  },
  setErrorMessage: (message) => {
    dispatch(setErrorMessage(message));
  },
  // actions: bindActionCreators({
  //   createAccount,
  //   setErrorMessage,
  // }, dispatch),
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
