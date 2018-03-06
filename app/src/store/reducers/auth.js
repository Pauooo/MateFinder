/*
 * Initial State
 */
const initialState = {
  // authentication
  userAccountCreated: false,
  loggedIn: false,
  signup: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
  login: {
    username: '',
    password: '',
  },
  errorMessages: [],
};


// authentication
const INPUT_CHANGE = 'INPUT_CHANGE';
const USER_ACCOUNT_CREATED_STATUS_CHANGE = 'USER_ACCOUNT_CREATED_STATUS_CHANGE';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const USER_LOGGED_IN_STATUS_CHANGE = 'USER_LOGGED_IN_STATUS_CHANGE';
const EMPTY_ERROR_MESSAGES = 'EMPTY_ERROR_MESSAGES';
const SIGNUP_TO_LOGIN = 'SIGNUP_TO_LOGIN';
const SET_USERNAME_PASSWORD = 'SET_USERNAME';
const EMPTY_FIELDS = 'EMPTY_FIELDS';

/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.context]: {
          ...state[action.context],
          [action.name]: action.value,
        },
      };

    case USER_ACCOUNT_CREATED_STATUS_CHANGE:
      return {
        ...state,
        userAccountCreated: !state.userAccountCreated,
      };
    case SET_ERROR_MESSAGE: {
      const errorMessages = [...state.errorMessages, action.message];
      return {
        ...state,
        errorMessages,
      };
    }
    case EMPTY_ERROR_MESSAGES: {
      return {
        ...state,
        errorMessages: [],
      };
    }
    case USER_LOGGED_IN_STATUS_CHANGE:
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    case SIGNUP_TO_LOGIN: {
      return {
        ...state,
        login: {
          username: state.signup.username,
          password: state.signup.password,
        },
      };
    }
    case SET_USERNAME_PASSWORD: {
      return {
        ...state,
        login: {
          username: action.username,
          password: action.password,
        },
      };
    }
    case EMPTY_FIELDS: {
      return {
        ...state,
        userAccountCreated: false,
        signup: {
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        },
        login: {
          username: '',
          password: '',
        },
      };
    }
    default:
      return state;
  }
};

/*
 * Action creators
 */

export const changeInput = ({ name, value, context }) => ({
  type: INPUT_CHANGE,
  value,
  name,
  context,
});

export const changeuserAccountCreatedStatus = () => ({
  type: USER_ACCOUNT_CREATED_STATUS_CHANGE,
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  message,
});

export const changeUserLoggedInStatus = () => ({
  type: USER_LOGGED_IN_STATUS_CHANGE,
});

export const emptyErrorMessages = () => ({
  type: EMPTY_ERROR_MESSAGES,
});

export const signupToLogin = () => ({
  type: SIGNUP_TO_LOGIN,
});

export const setUsernameAndPassword = (username, password) => ({
  type: SET_USERNAME_PASSWORD,
  username,
  password,
});

export const emptyFields = () => ({
  type: EMPTY_FIELDS,
});
