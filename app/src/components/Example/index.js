/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */


/**
 * Code
 */
const Example = ({ name, doSomething }) => (
  <div id="example" onClick={doSomething}>Ceci est un exemple qui récupère une prop name : {name}</div>
);
Example.propTypes = {
  name: PropTypes.string.isRequired,
  doSomething: PropTypes.func.isRequired,
};
/**
 * Export
 */
export default Example;
