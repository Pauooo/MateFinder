/*
 * Npm import
 */
import io from 'socket.io-client';

/*
 * Local import
 */
// import { CREATE_ACCOUNT } from 'src/store/reducer';


/*
 * Types
 */

const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

/*
 * Code
 */
const socket = io('http://localhost:3000');

const createMiddleware = store => next => (action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
    // on = le client reçoit une info du serveur
      socket.on('connect', () => {
        console.log('ouioui');
      });
      break;

    case CREATE_ACCOUNT: {
      const { signup } = store.getState();
      console.log(signup);
      // On envoie
      socket.emit('createAccount', signup);
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

export const createAccount = () => ({
  type: CREATE_ACCOUNT,
});
/*
 * Export default
 */
export default createMiddleware;
