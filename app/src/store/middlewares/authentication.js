/*
 * Npm import
 */
import axios from 'axios';
import jwtDecode from 'jwt-decode';

/*
 * Local import
 */
import { setErrorMessage, changeUserLoggedInStatus, changeuserAccountCreatedStatus } from 'src/store/reducers/auth';
/*
 * Code
 */
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
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
          console.log(resp);
          store.dispatch(changeuserAccountCreatedStatus());
          store.dispatch(changeUserLoggedInStatus());
        })
        .catch((err) => {
          const error = err.response.status;
          console.log(error);
          if (error === 403) {
            const message = 'Cet email est déjà utilisé';
            store.dispatch(setErrorMessage(message));
          }
          if (error === 404) {
            const message = 'Ce pseudo est déjà utilisé';
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
        },
      })
        .then((resp) => {
          console.log(resp);
          store.dispatch(changeUserLoggedInStatus());
        })
        .catch((err) => {
          const error = err.response.status;
          console.log(error);
          if (error === 400) {
            const message = 'Ce nom d\'utilisateur n\'existe pas';
            store.dispatch(setErrorMessage(message));
          }
          if (error === 401) {
            const message = 'Vous avez saisi un mauvais mot de passe';
            store.dispatch(setErrorMessage(message));
          }
        });
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

export const sendCredential = () => ({
  type: SEND_CREDENTIAL,
});
/*
 * Export default
 */
export default createMiddleware;
