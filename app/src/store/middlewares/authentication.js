/*
 * Npm import
 */
import axios from 'axios';

/*
 * Local import
 */
import { setErrorMessage, changeUserLoggedInStatus, changeuserAccountCreatedStatus, signupToLogin, emptyFields } from 'src/store/reducers/auth';
import { startIO } from 'src/store/middlewares/socket';
/*
 * Code
 */
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
const LOGOUT = 'LOGOUT';
const urlSignUp = 'http://localhost:3000/signup';
const urlLogIn = 'http://localhost:3000/login';


const createMiddleware = store => next => (action) => {
  // Je vérifie ce qui m'intéresse
  switch (action.type) {
    case CREATE_ACCOUNT: {
      const state = store.getState();
      axios
        .post(urlSignUp, {
          username: state.auth.signup.username,
          password: state.auth.signup.password,
          email: state.auth.signup.email,
        })
        .then((resp) => {
          console.log(resp.data);
          store.dispatch(changeuserAccountCreatedStatus());
          store.dispatch(changeUserLoggedInStatus());
          store.dispatch(startIO(resp.data.Newtoken));
          sessionStorage.setItem('mytoken', resp.data.Newtoken);
          store.dispatch(signupToLogin());
        })
        .catch((err) => {
          const error = err.response;
          console.log(error);
          if (error.data === 'WrongEmail') {
            const message = 'Cet email est déjà utilisé.';
            store.dispatch(setErrorMessage(message));
          }
          if (error.data === 'UsernameUsed') {
            const message = 'Ce pseudo est déjà utilisé.';
            store.dispatch(setErrorMessage(message));
          }
        });
      break;
    }
    case SEND_CREDENTIAL: {
      const state = store.getState();

      axios({
        method: 'post',
        url: urlLogIn,
        data: {
          username: state.auth.login.username,
          password: state.auth.login.password,
          token: action.token,
        },
      })
        .then((resp) => {
          store.dispatch(changeUserLoggedInStatus());
          store.dispatch(startIO(resp.data.Newtoken));
          sessionStorage.setItem('mytoken', resp.data.Newtoken);
        })
        .catch((err) => {
          const error = err.response;
          console.log(error);
          if (error.status === 401 && error.data === 'WrongUser') {
            const message = 'Ce nom d\'utilisateur n\'existe pas.';
            store.dispatch(setErrorMessage(message));
          }
          if (error.status === 401 && error.data === 'WrongPassword') {
            const message = 'Tu as saisi un mauvais mot de passe.';
            store.dispatch(setErrorMessage(message));
          }
        });
      break;
    }
    case LOGOUT: {
      store.dispatch(changeUserLoggedInStatus());
      store.dispatch(emptyFields());
      sessionStorage.removeItem('mytoken');
      break;
    }
    default:
  }

  // Go to the next
  next(action);
};

export const createAccount = () => ({
  type: CREATE_ACCOUNT,
});

export const sendCredential = (token = false) => ({
  type: SEND_CREDENTIAL,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});
/*
 * Export default
 */
export default createMiddleware;
