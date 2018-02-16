/*
 * Initial State
 */
const initialState = {};


const SOMETHING_DO = 'SOMETHING_DO';

/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SOMETHING_DO:
      return {
        ...state,
      };

    default:
      return state;
  }
};

/*
 * Action creators
 */
export const doSomething = () => ({
  type: SOMETHING_DO,
});
