/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Example from 'src/components/Example';

// Action creators
import { doSomething } from 'src/store/reducer';

/**
 * Code
 */
// State
// 2 paramètres (state, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// `const mapStateToProps = null;`
const mapStateToProps = (state, ownProps) => ({
  name: 'Nom d\'exemple',
});

// Actions
// 2 paramètres (dispatch, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// const mapDispatchToProps = {};
const mapDispatchToProps = (dispatch, ownProps) => ({
  doSomething: () => {
    console.log('Je dispatch doSomething()');
    dispatch(doSomething());
  },
});

/*
 * Container
 */
const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(Example);


/**
 * Export
 */
export default ExampleContainer;
