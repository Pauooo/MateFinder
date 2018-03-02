/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Field from 'src/components/Field';
import { changeInput } from 'src/store/reducers/auth';


/*
 * Code
 */
// State
const mapStateToProps = (state, ownProps) => ({
  value: state.auth[ownProps.context][ownProps.name],
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
