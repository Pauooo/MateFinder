/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import SignUp from 'src/components/SignUp';
import { createAccount } from 'src/store/socket';


/*
 * Code
 */
// State
const mapStateToProps = null;
// Actions
const mapDispatchToProps = dispatch => ({
  createAccount: () => {
    dispatch(createAccount());
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
