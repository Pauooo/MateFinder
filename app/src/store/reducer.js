/*
 * Initial State
 */
const initialState = {
  team: false,
  teamCount: 2,
  selectsMatching: {
    game: 'CS:GO',
    lang: 'Français',
    format: 2,
  },
  gameList: [
    {
      name: 'CS:GO',
      playerMax: 5,
      formats: [
        {
          name: '2 vs 2',
          value: 2,
        },
        {
          name: '5 vs 5',
          value: 5,
        },
      ],
    },
    {
      name: 'Battlerite',
      playerMax: 3,
      formats: [
        {
          name: '2 vs 2',
          value: 2,
        },
        {
          name: '3 vs 3',
          value: 3,
        },
      ],
    },
    {
      name: 'League of Legends',
      playerMax: 5,
      formats: [
        {
          name: '5 vs 5',
          value: 5,
        },
      ],
    },
    {
      name: 'DOTA 2',
      playerMax: 5,
      formats: [
        {
          name: '5 vs 5',
          value: 5,
        },
      ],
    },
  ],
  langList: ['Français', 'English'],
  matchingLoading: false,
  matchingFound: false,
  matchingAccepted: false,
  numberOfAcceptedUsers: 0,
};


const SOMETHING_DO = 'SOMETHING_DO';

// Formulaire Matching
const SELECT_MATCHING_CHANGE = 'SELECT_MATCHING_CHANGE';
const TEAM_STATUS_CHANGE = 'TEAM_STATUS_CHANGE';
const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
const MATCHING_LOADING_STATUS_CHANGE = 'MATCHING_LOADING_STATUS_CHANGE';
const MATCHING_FOUND_STATUS_CHANGE = 'MATCHING_FOUND_STATUS_CHANGE';
const MATCHING_ACCEPTED_STATUS_CHANGE = 'MATCHING_ACCEPTED_STATUS_CHANGE';
const NUMBER_ACCEPTED_USER_UPDATE = 'NUMBER_ACCEPTED_USER_UPDATE';

// Socket
export const MATCH_START = 'MATCH_START';
export const MESSAGE_SEND = 'MESSAGE_SEND';

/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SOMETHING_DO:
      return {
        ...state,
      };
    case SELECT_MATCHING_CHANGE:
      return {
        ...state,
        selectsMatching: {
          ...state.selectsMatching,
          [action.select]: action.value,
        },
      };
    case TEAM_STATUS_CHANGE:
      return {
        ...state,
        team: !state.team,
      };
    case TEAM_COUNT_CHANGE:
      return {
        ...state,
        teamCount: parseInt(action.value, 0),
      };
    case MATCHING_LOADING_STATUS_CHANGE:
      return {
        ...state,
        matchingLoading: !state.matchingLoading,
      };
    case MATCHING_FOUND_STATUS_CHANGE:
      return {
        ...state,
        matchingFound: !state.matchingFound,
      };
    case MATCHING_ACCEPTED_STATUS_CHANGE:
      return {
        ...state,
        matchingAccepted: !state.matchingAccepted,
      };
    case NUMBER_ACCEPTED_USER_UPDATE:
      return {
        ...state,
        numberOfAcceptedUsers: state.numberOfAcceptedUsers + action.number,
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

export const changeMatchingSelect = (select, value) => ({
  type: SELECT_MATCHING_CHANGE,
  select,
  value,
});

export const changeTeamStatus = () => ({
  type: TEAM_STATUS_CHANGE,
});

export const changeTeamCount = value => ({
  type: TEAM_COUNT_CHANGE,
  value,
});

export const changeMatchingLoadingStatus = () => ({
  type: MATCHING_LOADING_STATUS_CHANGE,
});

export const changeMatchingFoundStatus = () => ({
  type: MATCHING_FOUND_STATUS_CHANGE,
});

export const changeMatchingAcceptedStatus = () => ({
  type: MATCHING_ACCEPTED_STATUS_CHANGE,
});

export const updateNumberOfAcceptedUsers = number => ({
  type: NUMBER_ACCEPTED_USER_UPDATE,
  number,
});

// Action Creators Socket
export const sendMessage = () => ({
  type: MESSAGE_SEND,
});

export const startMatch = () => ({
  type: MATCH_START,
});
