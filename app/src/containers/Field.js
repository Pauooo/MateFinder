/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Field from 'src/components/Field';
import { changeInput } from 'src/store/reducer';


/*
 * Code
 */
// State
const mapStateToProps = (state, ownProps) => ({
  value: state[ownProps.context][ownProps.name],
});

// Actions
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value) => {
    dispatch(changeInput({
      name: ownProps.name,
      value,
      context: ownProps.context,
    }));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Field);
