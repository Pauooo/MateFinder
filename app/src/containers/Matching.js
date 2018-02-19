/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Matching from 'src/components/Matching';

// Action creators
import { changeMatchingSelect, changeTeamStatus, changeTeamCount } from 'src/store/reducer';

/**
 * Code
 */
// State
// 2 paramètres (state, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// `const mapStateToProps = null;`
const mapStateToProps = state => ({
  game: state.selectsMatching.game,
  lang: state.selectsMatching.lang,
  format: state.selectsMatching.format,
  team: state.team,
  teamCount: state.teamCount,
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
});

/*
 * Container
 */
const MatchingContainer = connect(mapStateToProps, mapDispatchToProps)(Matching);


/**
 * Export
 */
export default MatchingContainer;
