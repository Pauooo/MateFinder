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
    email: '',
  },
  profil: {
    username: '',
    email: '',
    password: '',
    successedit: false,
  },
  chatroom: {
    inputMessage: '',
    Messages: [],
    users: [],
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
const SET_USER_PROFIL = 'SET_USER_PROFIL';
const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
const CHANGE_SUCCESS_EDIT = 'CHANGE_SUCCESS_EDIT';
const SET_CHATROOM_MESSAGES = 'SET_CHATROOM_MESSAGES';
const SET_USERS_CHATROOM = 'SET_USERS_CHATROOM';
const ADD_EMOJI = 'ADD_EMOJI';

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
    case SET_USER_PROFIL: {
      return {
        ...state,
        profil: {
          ...state.profil,
          username: action.username,
          email: action.email,
        },
      };
    }
    case SET_LOGIN_INFO: {
      return {
        ...state,
        login: {
          username: action.username,
          email: action.email,
        },
      };
    }
    case CHANGE_SUCCESS_EDIT: {
      return {
        ...state,
        profil: {
          ...state.profil,
          successedit: !state.profil.successedit,
        },
      };
    }
    case SET_CHATROOM_MESSAGES: {
      return {
        ...state,
        chatroom: {
          ...state.chatroom,
          Messages: action.messages,
        },
      };
    }
    case SET_USERS_CHATROOM: {
      return {
        ...state,
        chatroom: {
          ...state.chatroom,
          users: action.users,
        },
      };
    }
    case ADD_EMOJI: {
      return {
        ...state,
        chatroom: {
          ...state.chatroom,
          inputMessage: `${state.chatroom.inputMessage} ${action.emoji} `,
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

export const setUserProfil = (username, email) => ({
  type: SET_USER_PROFIL,
  username,
  email,
});

export const setLoginInfo = (username, email) => ({
  type: SET_LOGIN_INFO,
  username,
  email,
});

export const changeSuccessEdit = () => ({
  type: CHANGE_SUCCESS_EDIT,
});

export const setChatroomMessages = messages => ({
  type: SET_CHATROOM_MESSAGES,
  messages,
});

export const setUserChatroom = users => ({
  type: SET_USERS_CHATROOM,
  users,
});

export const addEmoji = emoji => ({
  type: ADD_EMOJI,
  emoji,
});
