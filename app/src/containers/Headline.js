/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import datas from 'src/datas';
import Headline from 'src/components/Headline';


/*
 * Code
 */
// State
const mapStateToProps = state => ({
  data: datas[state.view],
});

// Actions
const mapDispatchToProps = {};


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Headline);
