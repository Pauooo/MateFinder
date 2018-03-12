/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Matching from 'src/components/MatchingForm';

// Action creators
import { changeMatchingSelect, changeTeamStatus, changeTeamCount, startMatch } from 'src/store/reducers/matching';

/**
 * Code
 */
// State
// 2 paramètres (state, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// `const mapStateToProps = null;`
const mapStateToProps = state => ({
  gameSelected: state.matching.selectsMatching.game,
  langSelected: state.matching.selectsMatching.lang,
  formatSelected: state.matching.selectsMatching.format,
  gameList: state.matching.gameList,
  langList: state.matching.langList,
  formatList: state.matching.formatList,
  team: state.matching.team,
  teamCount: state.matching.teamCount,
  matchingLoading: state.matching.matchingLoading,
  loggedIn: state.auth.loggedIn,
  inRoom: state.matching.inRoom,
});

// Actions
// 2 paramètres (dispatch, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// const mapDispatchToProps = {};
const mapDispatchToProps = dispatch => ({
  changeMatchingSelect: (select, value) => {
    dispatch(changeMatchingSelect(select, value));
  },
  changeTeamStatus: () => {
    dispatch(changeTeamStatus());
  },
  changeTeamCount: (value) => {
    dispatch(changeTeamCount(value));
  },
  startMatch: () => {
    dispatch(startMatch());
  },
});

/*
 * Container
 */
const MatchingContainer = connect(mapStateToProps, mapDispatchToProps)(Matching);


/**
 * Export
 */
export default MatchingContainer;
