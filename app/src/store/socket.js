/*
 * NPM import
 */
import io from 'socket.io-client';

/*
 * Local import
 */
// Reducer
import { MATCH_START, changeMatchingStatus } from 'src/store/reducer';

/*
 * Middleware
 */
const socket = io('http://localhost:3000');

export default store => next => (action) => {
  // Code
  switch (action.type) {
    // case WEBSOCKET_CONNECT: {
    //   socket.on('send_message', (message) => {
    //     store.dispatch(receiveMessage(message));
    //   });
    //   break;
    // }
    case MATCH_START: {
      const { selectsMatching, team, teamCount } = store.getState();
      socket.emit('start_match', { ...selectsMatching, team, teamCount });
      store.dispatch(changeMatchingStatus());
      break;
    }
    default:
  }
  // On passe au voisin
  next(action);
};
