/*
 * Npm import
 */
import { createStore, compose, applyMiddleware } from 'redux';

/*
 * Local import
 */
// Reducer
import reducer from 'src/store/reducer';

// Middleware
import exampleMiddleware from './exampleMiddleware';

/*
 * Code
 */
// DevTools
const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

// Middleware vers Enhancers
const exampleEnhancer = applyMiddleware(exampleMiddleware);
const enhancers = compose(exampleEnhancer, ...devTools);

// createStore
const store = createStore(reducer, enhancers);

/*
 * Export
 */
export default store;
