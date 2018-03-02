/*
 * Npm import
 */
import { combineReducers } from 'redux';


/*
 * Local import
 */
import matching from './matching';
import auth from './auth';

/*
 * Code
 */
const reducer = combineReducers({
  matching,
  auth,
});


/*
 * Export default
 */
export default reducer;
