/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import MatchingSearch from 'src/components/MatchingSearch';

// Action creators
// import { changeMatchingAcceptedStatus } from 'src/store/reducer';
import { matchAccepted, matchRefuse } from 'src/store/middlewares/socket';

/**
 * Code
 */
// State
// 2 paramètres (state, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// `const mapStateToProps = null;`
const mapStateToProps = state => ({
  matchingFound: state.matching.matchingFound,
  matchingAccepted: state.matching.matchingAccepted,
  matchingLoading: state.matching.matchingLoading,
  selectsMatching: state.matching.selectsMatching,
  listnews: state.matching.news,
  inRoom: state.matching.inRoom,
});

// Actions
// 2 paramètres (dispatch, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// const mapDispatchToProps = {};
const mapDispatchToProps = dispatch => ({
  matchAccepted: () => {
    dispatch(matchAccepted());
  },
  matchRefuse: () => {
    dispatch(matchRefuse());
  },
});

/*
 * Container
 */
const MatchingSearchContainer = connect(mapStateToProps, mapDispatchToProps)(MatchingSearch);


/**
 * Export
 */
export default MatchingSearchContainer;
