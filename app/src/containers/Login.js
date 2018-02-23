/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Login from 'src/components/Login';
import { sendCredential } from 'src/store/reducer';


/*
 * Code
 */
// State
const mapStateToProps = null;

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
