/*
 * Initial State
 */
const initialState = {
};


const INPUT_CHANGE = 'INPUT_CHANGE';
/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

/*
 * Action creators
 */

export const changeInput = ({ name, value }) => ({
  type: INPUT_CHANGE,
  value,
  name,
});
