/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Matching from 'src/components/MatchingForm';

// Action creators
import { changeMatchingSelect, changeTeamStatus, changeTeamCount, startMatch } from 'src/store/reducer';

/**
 * Code
 */
// State
// 2 paramètres (state, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// `const mapStateToProps = null;`
const mapStateToProps = state => ({
  gameSelected: state.selectsMatching.game,
  langSelected: state.selectsMatching.lang,
  formatSelected: state.selectsMatching.format,
  gameList: state.gameList,
  langList: state.langList,
  formatList: state.formatList,
  team: state.team,
  teamCount: state.teamCount,
  matchingLoading: state.matchingLoading,
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
