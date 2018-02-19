/*
 * Initial State
 */
const initialState = {
  team: false,
  teamCount: 2,
  selectsMatching: {
    game: 'test',
    lang: 'test',
    format: 'test',
  },
};


const SOMETHING_DO = 'SOMETHING_DO';

// Formulaire Matching
const SELECT_MATCHING_CHANGE = 'SELECT_MATCHING_CHANGE';
const TEAM_STATUS_CHANGE = 'TEAM_STATUS_CHANGE';
const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';

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
