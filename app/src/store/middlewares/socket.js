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
import { MATCH_START, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus, setFoundToast, setNews, setUserInRoom } from 'src/store/reducers/matching';

import { setUserProfil, setLoginInfo, changeSuccessEdit, setChatroomMessages, setUserChatroom, changeInput } from 'src/store/reducers/auth';


// socket
const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const IO_START = 'IO_START';

// Matching
const MATCH_ACCEPTED = 'MATCH_ACCEPTED';
const MATCH_REFUSE = 'MATCH_REFUSE';

// Authentication
const SAVE_USER_INFO = 'SAVE_USER_INFO';
const SAVE_USER_PASSWORD = 'SAVE_USER_PASSWORD';

// Chatroom
const SEND_MESSAGE = 'SEND_MESSAGE';
const EXIT_CHATROOM = 'EXIT_CHATROOM';

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
      socket.on('update_room_messages', (data) => {
        store.dispatch(setChatroomMessages(data));
        const element = document.getElementById('messages');
        element.scrollTop = element.scrollHeight;
      });
      socket.on('news-api', (data) => {
        store.dispatch(setNews(data.body));
      });
      socket.on('response_save_password', (data) => {
        if (data) {
          store.dispatch(changeSuccessEdit());
          toast('Mot de passe modifié avec succès, reconnectes toi !', {
            autoClose: 5000,
            type: toast.TYPE.ERROR,
            bodyClassName: 'toast',
          });
        }
        else {
          toast('Le mot de passe actuel n\'est pas bon', {
            autoClose: 5000,
            type: toast.TYPE.ERROR,
            bodyClassName: 'toast',
          });
        }
      });
      socket.on('success', (data) => {
        store.dispatch(setUserProfil(data.user.username, data.user.email));
        store.dispatch(setLoginInfo(data.user.username, data.user.email));
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
        store.dispatch(updateNumberOfAcceptedUsers(0));
        store.dispatch(setFoundToast(foundToast));
        clearTimeout(timerMaxMatching);
        store.dispatch(changeMatchingFoundStatus());
        timerMatchAccept = setTimeout(() => {
          store.dispatch(matchRefuse());
        }, 10000);
      });
      socket.on('UserRoomNotAccepted', () => {
        if (!store.getState().matching.inRoom) {
          toast('La recherche a échoué', {
            autoClose: 5000,
            type: toast.TYPE.ERROR,
            bodyClassName: 'toast',
          });
          store.dispatch(changeMatchingFoundStatus());
          store.dispatch(updateNumberOfAcceptedUsers(-store.getState().matching.numberOfAcceptedUsers));
          if (store.getState().matching.matchingAccepted) {
            store.dispatch(changeMatchingAcceptedStatus());
          }
        }
        else {
          socket.emit('get_users_room_list');
        }
      });
      socket.on('updateUserAccepted', (data) => {
        console.log(data);
        if (store.getState().matching.inRoom) {
          store.dispatch(setUserChatroom(data.newusers));
          return;
        }
        else if (
          data.number !== 0 &&
          store.getState().matching.numberOfAcceptedUsers + data.number
          === parseInt(
            store.getState().matching.selectsMatching.format,
            10,
          )) {
          store.dispatch(changeMatchingLoadingStatus());
          store.dispatch(changeMatchingFoundStatus());
          store.dispatch(changeMatchingAcceptedStatus());
          store.dispatch(setUserInRoom());
          store.dispatch(setUserChatroom(data.users2));
        }
        store.dispatch(updateNumberOfAcceptedUsers(data.number));
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
        toast('La recherche a échoué', {
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
      const {
        matchingFound, matchingLoading, team, teamCount,
      } = store.getState().matching;
      socket.emit('refuse_match', { team, teamCount });
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
      socket = io('http://localhost:3000', { query: `auth_token=${action.token}` });
      store.dispatch(wsConnect());
      break;
    }
    case SAVE_USER_INFO: {
      socket.emit('save_user_info', { username: action.username, email: action.email });
      break;
    }
    case SAVE_USER_PASSWORD: {
      const { currentpassword, password } = store.getState().auth.profil;
      socket.emit('save_user_password', { currentpassword, password });
      break;
    }
    case SEND_MESSAGE: {
      const { inputMessage } = store.getState().auth.chatroom;
      socket.emit('send_message', { inputMessage });
      store.dispatch(changeInput({ name: 'inputMessage', value: '', context: 'chatroom' }));
      break;
    }
    case EXIT_CHATROOM: {
      socket.emit('user_exit_chatroom');
      store.dispatch(setUserInRoom());
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

export const saveUserInfo = (username, email) => ({
  type: SAVE_USER_INFO,
  username,
  email,
});

export const saveUserPassword = () => ({
  type: SAVE_USER_PASSWORD,
});

export const sendMessage = () => ({
  type: SEND_MESSAGE,
});

export const exitChatRoom = () => ({
  type: EXIT_CHATROOM,
});
