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
import { MATCH_START, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus, setFoundToast, setNews } from 'src/store/reducers/matching';


// socket
const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const IO_START = 'IO_START';

// Matching
const MATCH_ACCEPTED = 'MATCH_ACCEPTED';
const MATCH_REFUSE = 'MATCH_REFUSE';
/*
 * Middleware
 */
let socket = null;
let timerMatchAccept = null;
let timerMaxMatching = null;

export default store => next => (action) => {
  // Code
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      socket.on('news-api', (data) => {
        store.dispatch(setNews(data.body));
      });
      socket.on('success', (data) => {
        console.log(data);
      });
      socket.on('RoomFound', () => {
        if (!('Notification' in window)) {
          console.log('This browser does not support desktop notification');
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === 'granted') {
          // If it's okay let's create a notification
          const notification = new Notification('Reviens vite ! Nous avons trouvé !');
        }

        else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
          Notification.requestPermission((permission) => {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              const notification = new Notification('Reviens vite ! Nous avons trouvé !');
            }
          });
        }
        const msg = (
          <div>
            <h1>Hey ! Rejoins ta team !</h1>
            <div className="button-toast">
              <button className="accepter" onClick={() => store.dispatch(matchAccepted())}>Accepter</button>
              <button onClick={() => store.dispatch(matchRefuse())}>Refuser</button>
            </div>
          </div>
        );
        const foundToast = toast(msg, {
          autoClose: false,
          closeButton: false,
          bodyClassName: 'toast',
        });
        store.dispatch(setFoundToast(foundToast));
        clearTimeout(timerMaxMatching);
        store.dispatch(changeMatchingFoundStatus());
        timerMatchAccept = setTimeout(() => {
          store.dispatch(matchRefuse());
        }, 10000);
      });
      socket.on('UserRoomNotAccepted', () => {
        toast('La recherche a échouée', {
          autoClose: 5000,
          bodyClassName: 'toast',
        });
        store.dispatch(changeMatchingFoundStatus());
        store.dispatch(updateNumberOfAcceptedUsers(-store.getState().matching.numberOfAcceptedUsers));
        if (store.getState().matching.matchingAccepted) {
          store.dispatch(changeMatchingAcceptedStatus());
        }
      });

      socket.on('updateUserAccepted', (data) => {
        store.dispatch(updateNumberOfAcceptedUsers(data));
      });
      break;
    }
    case MATCH_START: {
      const {
        selectsMatching,
        team,
        teamCount,
        gameList,
      } = store.getState().matching;
      const searchname = gameList.filter((game) => {
        if (game.name === selectsMatching.game) return true;
        return false;
      });
      socket.emit('start_match', {
        ...selectsMatching, team, teamCount, searchname: searchname[0].searchname,
      });
      store.dispatch(changeMatchingLoadingStatus());
      timerMaxMatching = setTimeout(() => {
        store.dispatch(matchRefuse());
        toast('La recherche a échouée', {
          autoClose: 5000,
          type: toast.TYPE.ERROR,
          bodyClassName: 'toast',
        });
      }, 40000);
      break;
    }
    case MATCH_ACCEPTED: {
      socket.emit('accepted_match');
      clearTimeout(timerMatchAccept);
      if (toast.isActive(store.getState().matching.foundToast)) {
        toast.dismiss(store.getState().matching.foundToast);
      }
      store.dispatch(changeMatchingAcceptedStatus());
      break;
    }
    case MATCH_REFUSE: {
      const { matchingFound, matchingLoading } = store.getState().matching;
      socket.emit('refuse_match', matchingFound);
      clearTimeout(timerMaxMatching);
      clearTimeout(timerMatchAccept);
      store.dispatch(updateNumberOfAcceptedUsers(-store.getState().matching.numberOfAcceptedUsers));
      if (toast.isActive(store.getState().matching.foundToast)) {
        toast.dismiss(store.getState().matching.foundToast);
      }
      if (matchingLoading) store.dispatch(changeMatchingLoadingStatus());
      if (matchingFound) store.dispatch(changeMatchingFoundStatus());
      break;
    }
    case IO_START: {
      console.log(action.token);
      socket = io('http://localhost:3000', { query: `auth_token=${action.token}` });
      store.dispatch(wsConnect());
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

export const startIO = token => ({
  type: IO_START,
  token,
});
