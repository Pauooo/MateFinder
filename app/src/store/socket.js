/*
  // done is a callback, you
 * NPM import
 */
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import React from 'react';

/*
 * Local import
 */

// Reducer
import { MATCH_START, setErrorMessage, changeUserLoggedInStatus, changeuserAccountCreatedStatus, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus, signupToLogin } from 'src/store/reducer';


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
const socket = io('http://localhost:3000', { query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTk1NTI4YzhiOWY1Njc0YThlZDZiYTMiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZX0.Tt6ae1ePoGalP90UzNOO6Gxbj-RBASN3bVPUzDMg20M' });

/*
{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "sub": "5a95528c8b9f5674a8ed6ba3",
  "name": "John Doe",
  "admin": true
}
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
*/

let timerMatchAccept = null;
const timerMaxMatching = null;

export default store => next => (action) => {
  // Code
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      socket.on('success', (data) => {
        console.log(data);
      });
      socket.on('RoomFound', () => {
        const msg = (
          <div>
            <h1>Rejoins ton/tes mate(s) !</h1>
            <button onClick={() => store.dispatch(matchAccepted())}>Accepter</button>
            <button onClick={() => store.dispatch(matchRefuse())}>Annuler</button>
          </div>
        );
        toast(msg, {
          autoClose: 10000,
          closeButton: false,
          type: toast.TYPE.SUCCESS,
        });
        clearTimeout(timerMaxMatching);
        store.dispatch(changeMatchingFoundStatus());
        timerMatchAccept = setTimeout(() => {
          store.dispatch(matchRefuse());
        }, 10000);
      });
      socket.on('UserRoomNotAccepted', () => {
        toast('La recherche échouée', {
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
        store.dispatch(changeMatchingFoundStatus());
        if (store.getState().matchingAccepted) {
          store.dispatch(changeMatchingAcceptedStatus());
        }
      });

      socket.on('updateUserAccepted', (data) => {
        store.dispatch(updateNumberOfAcceptedUsers(data));
      });

      socket.on('accountCreated', () => {
        // On affiche la confirmation
        store.dispatch(changeuserAccountCreatedStatus());
        // On le loggedin => state.loggedIn = true
        store.dispatch(changeUserLoggedInStatus());
        store.dispatch(signupToLogin());
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
      // timerMaxMatching = setTimeout(() => {
      //   store.dispatch(matchRefuse());
      //   toast('La recherche échouée', {
      //     autoClose: 5000,
      //     type: toast.TYPE.ERROR,
      //   });
      // }, 40000);
      break;
    }
    case MATCH_ACCEPTED: {
      socket.emit('accepted_match');
      clearTimeout(timerMatchAccept);
      store.dispatch(changeMatchingAcceptedStatus());
      break;
    }
    case MATCH_REFUSE: {
      const { matchingFound, matchingLoading } = store.getState();
      socket.emit('refuse_match', matchingFound);
      clearTimeout(timerMaxMatching);
      clearTimeout(timerMatchAccept);
      if (matchingLoading) store.dispatch(changeMatchingLoadingStatus());
      if (matchingFound) store.dispatch(changeMatchingFoundStatus());
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
