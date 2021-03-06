/*
 * Initial State
 */
const initialState = {
  team: false,
  teamCount: 2,
  selectsMatching: {
    game: 'Counter-Strike: Global Offensive',
    lang: 'Fr',
    format: '2',
  },
  gameList: [
    {
      name: 'Counter-Strike: Global Offensive',
      searchname: 'csgo',
      playerMax: 5,
      formats: [
        {
          name: '2 vs 2',
          value: '2',
        },
        {
          name: '5 vs 5',
          value: '5',
        },
      ],
    },
    {
      name: 'Battlerite',
      searchname: 'battlerite',
      playerMax: 3,
      formats: [
        {
          name: '2 vs 2',
          value: '2',
        },
        {
          name: '3 vs 3',
          value: '3',
        },
      ],
    },
    {
      name: 'League of Legends',
      searchname: 'leagueoflegends',
      playerMax: 5,
      formats: [
        {
          name: '5 vs 5',
          value: '5',
        },
      ],
    },
    {
      name: 'DOTA 2',
      searchname: 'dota2',
      playerMax: 5,
      formats: [
        {
          name: '5 vs 5',
          value: '5',
        },
      ],
    },
  ],
  langList: ['Fr', 'En'],
  matchingLoading: false,
  matchingFound: false,
  matchingAccepted: false,
  numberOfAcceptedUsers: 0,
  foundToast: null,
  news: [],
  inRoom: false,
};


// Formulaire Matching
const SELECT_MATCHING_CHANGE = 'SELECT_MATCHING_CHANGE';
const TEAM_STATUS_CHANGE = 'TEAM_STATUS_CHANGE';
const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
const MATCHING_LOADING_STATUS_CHANGE = 'MATCHING_LOADING_STATUS_CHANGE';
const MATCHING_FOUND_STATUS_CHANGE = 'MATCHING_FOUND_STATUS_CHANGE';
const MATCHING_ACCEPTED_STATUS_CHANGE = 'MATCHING_ACCEPTED_STATUS_CHANGE';
const NUMBER_ACCEPTED_USER_UPDATE = 'NUMBER_ACCEPTED_USER_UPDATE';
const FOUND_TOAST_SET = 'FOUND_TOAST_SET';
const SET_NEWS = 'SET_NEWS';
const SET_USER_IN_ROOM = 'SET_USER_IN_ROOM';

// Socket
export const MATCH_START = 'MATCH_START';


/*
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_MATCHING_CHANGE:
      if (action.select === 'game') {
        return {
          ...state,
          selectsMatching: {
            ...state.selectsMatching,
            [action.select]: action.value,
            format: (state.team) ? state.gameList.filter(game => game.name === action.value)[0].formats.filter(frm => parseInt(frm.value, 10) > state.teamCount)[0].value : state.gameList.filter(game => game.name === action.value)[0].formats[0].value,
          },
        };
      }
      return {
        ...state,
        selectsMatching: {
          ...state.selectsMatching,
          format: (state.team) ? state.gameList.filter(game => game.name === state.selectsMatching.game)[0].formats.filter(frm => parseInt(frm.value, 10) > state.teamCount)[0].value : state.gameList.filter(game => game.name === state.selectsMatching.game)[0].formats[0].value,
          [action.select]: action.value,
        },
      };
    case TEAM_STATUS_CHANGE:
      if (!state.team) {
        return {
          ...state,
          team: !state.team,
          selectsMatching: {
            ...state.selectsMatching,
            format: state.gameList.filter(game => game.name === state.selectsMatching.game)[0].formats.filter(frm => parseInt(frm.value, 10) > state.teamCount)[0].value,
          },
        };
      }
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
    case NUMBER_ACCEPTED_USER_UPDATE: {
      if (state.numberOfAcceptedUsers + action.number === state.selectsMatching.format) {
        return {
          ...state,
          inRoom: true,
          numberOfAcceptedUsers: state.numberOfAcceptedUsers + action.number,
        };
      }
      return {
        ...state,
        numberOfAcceptedUsers: state.numberOfAcceptedUsers + action.number,
      };
    }
    case FOUND_TOAST_SET:
      return {
        ...state,
        foundToast: action.foundToast,
      };
    case SET_NEWS: {
      return {
        ...state,
        news: action.news,
      };
    }
    case SET_USER_IN_ROOM: {
      return {
        ...state,
        inRoom: action.status,
      };
    }
    default:
      return state;
  }
};

/*
 * Action creators
 */

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

export const setFoundToast = foundToast => ({
  type: FOUND_TOAST_SET,
  foundToast,
});

export const setNews = news => ({
  type: SET_NEWS,
  news,
});

export const setUserInRoom = status => ({
  type: SET_USER_IN_ROOM,
  status,
});

// Action Creators Socket

export const startMatch = () => ({
  type: MATCH_START,
});
