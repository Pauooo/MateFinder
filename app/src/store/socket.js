/*
 * NPM import
 */
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import React from 'react';

/*
 * Local import
 */

// Reducer
import { MATCH_START, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus, changeLoggedInStatus } from 'src/store/reducer';

// socket
const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';

// Matching
const MATCH_ACCEPTED = 'MATCH_ACCEPTED';
const MATCH_REFUSE = 'MATCH_REFUSE';

// auhtentication
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

/*
 * Middleware
 */
const socket = io('http://localhost:3000');

let timerMatchAccept = null;
let timerMaxMatching = null;

export default store => next => (action) => {
  // Code
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
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
      break;
    }
    case MATCH_START: {
      const { selectsMatching, team, teamCount } = store.getState();
      socket.emit('start_match', { ...selectsMatching, team, teamCount });
      store.dispatch(changeMatchingLoadingStatus());
      timerMaxMatching = setTimeout(() => {
        store.dispatch(matchRefuse());
        toast('La recherche échouée', {
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }, 40000);
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
      if (matchingLoading) store.dispatch(changeMatchingLoadingStatus());
      if (matchingFound) store.dispatch(changeMatchingFoundStatus());
      break;
    }
    case CREATE_ACCOUNT: {
      const { signup } = store.getState();
      console.log(signup);
      // On envoie
      socket.emit('createAccount', signup);
      store.dispatch(changeLoggedInStatus());
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
