/*
 * NPM import
 */
import io from 'socket.io-client';

/*
 * Local import
 */
// Reducer
import { MATCH_START, changeMatchingLoadingStatus, changeMatchingFoundStatus, updateNumberOfAcceptedUsers, changeMatchingAcceptedStatus } from 'src/store/reducer';

const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const MATCH_ACCEPTED = 'MATCH_ACCEPTED';
const MATCH_REFUSE = 'MATCH_REFUSE';

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
    default:
  }
  // On passe au voisin
  next(action);
};

export const wsConnect = () => ({
  type: WEBSOCKET_CONNECT,
});

export const matchAccepted = () => ({
  type: MATCH_ACCEPTED,
});

export const matchRefuse = () => ({
  type: MATCH_REFUSE,
});
