/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import datas from 'src/datas';
import Form from 'src/components/Form';


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
export default connect(mapStateToProps, mapDispatchToProps)(Form);
