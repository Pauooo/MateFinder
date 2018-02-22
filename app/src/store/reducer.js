/*
 * Initial State
 */
const initialState = {
  // authentication
  loggedIn: false,
  signup: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
};


const INPUT_CHANGE = 'INPUT_CHANGE';
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        signup: {
          ...state.signup,
          [action.name]: action.value,
        },
      };

    case CREATE_ACCOUNT:
      return {
        ...state,
        signup: {
          username: state.username,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation,
        },
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

export const createAccount = () => ({
  type: CREATE_ACCOUNT,
});
