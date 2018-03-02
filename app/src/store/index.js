/*
 * Npm import
 */
import { createStore, compose, applyMiddleware } from 'redux';

/*
 * Local import
 */
// Reducer
import reducer from 'src/store/reducers';

// Middleware

import socketMiddleware from './middlewares/socket';
import authentication from './middlewares/authentication';
/*
 * Code
 */
// DevTools
const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

// Middleware vers Enhancers
const authenticationEnhancer = applyMiddleware(authentication);
const socketEnhancer = applyMiddleware(socketMiddleware);
const enhancers = compose(authenticationEnhancer, socketEnhancer, ...devTools);

// createStore
const store = createStore(reducer, enhancers);

/*
 * Export
 */
export default store;
