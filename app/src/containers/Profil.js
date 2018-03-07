/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Profil from 'src/components/Profil';
import { setUserProfil, setLoginInfo } from 'src/store/reducers/auth';
import { saveUserInfo, saveUserPassword } from 'src/store/middlewares/socket';
import { logout } from 'src/store/middlewares/authentication';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  username: state.auth.profil.username,
  email: state.auth.profil.email,
  login: state.auth.login,
  successedit: state.auth.profil.successedit,
});

// Actions
const mapDispatchToProps = dispatch => ({
  setUserProfil: (username, email) => {
    dispatch(setUserProfil(username, email));
  },
  saveUserInfo: (username, email) => {
    dispatch(saveUserInfo(username, email));
  },
  logout: () => {
    dispatch(logout());
  },
  saveUserPassword: (password) => {
    dispatch(saveUserPassword(password));
  },
  setLoginInfo: (email, password) => {
    dispatch(setLoginInfo(email, password));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Profil);
