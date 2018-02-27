/*
 * NPM import
 */
import io from 'socket.io-client';

/*
 * Local import
 */

// Reducer
import { MATCH_START, setErrorMessage, changeUserLoggedInStatus, changeuserAccountCreatedStatus, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus } from 'src/store/reducer';

// socket
const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';

// Matching
const MATCH_ACCEPTED = 'MATCH_ACCEPTED';
const MATCH_REFUSE = 'MATCH_REFUSE';

// auhtentication
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
/*
 * Middleware
 */
const socket = io('http://localhost:3000');

export default store => next => (action) => {
  // Code
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      socket.on('RoomFound', () => {
        console.log('Une room a été trouvée');
        store.dispatch(changeMatchingFoundStatus());
      });

      socket.on('updateUserAccepted', (data) => {
        store.dispatch(updateNumberOfAcceptedUsers(data));
      });

      socket.on('accountCreated', () => {
        // On affiche la confirmation
        store.dispatch(changeuserAccountCreatedStatus());
        // On le loggedin => state.loggedIn = true
        store.dispatch(changeUserLoggedInStatus());
      });

      socket.on('creatingAccountError', (message) => {
        store.dispatch(setErrorMessage(message));
      });

      socket.on('creatingAccountError', (message) => {
        store.dispatch(setErrorMessage(message));
      });

      socket.on('signInError', (message) => {
        store.dispatch(setErrorMessage(message));
      });

      socket.on('signIn', () => {
        store.dispatch(changeUserLoggedInStatus());
      });
      break;
    }
    case MATCH_START: {
      const { selectsMatching, team, teamCount } = store.getState();
      socket.emit('start_match', { ...selectsMatching, team, teamCount });
      store.dispatch(changeMatchingLoadingStatus());
      break;
    }
    case MATCH_ACCEPTED: {
      socket.emit('accepted_match');
      store.dispatch(changeMatchingAcceptedStatus());
      break;
    }
    case MATCH_REFUSE: {
      socket.emit('refuse_match', store.getState().matchingFound);
      store.dispatch(changeMatchingLoadingStatus());
      break;
    }
    case CREATE_ACCOUNT: {
      const { signup } = store.getState();
      console.log(signup);
      // On envoie
      socket.emit('createAccount', signup);
      break;
    }
    case SEND_CREDENTIAL: {
      const { login } = store.getState();
      console.log(login);
      // On envoie
      socket.emit('sendCredential', login);
      break;
    }
    default:
  }
  // On passe au voisin
  next(action);
};

/*
 * Action Creator
 */
export const wsConnect = () => ({
  type: WEBSOCKET_CONNECT,
});

export const matchAccepted = () => ({
  type: MATCH_ACCEPTED,
});

export const matchRefuse = () => ({
  type: MATCH_REFUSE,
});

export const createAccount = () => ({
  type: CREATE_ACCOUNT,
});

export const sendCredential = () => ({
  type: SEND_CREDENTIAL,
});
