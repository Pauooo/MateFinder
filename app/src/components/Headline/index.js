/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';


/*
 * Local import
 */


/*
 * Code
 */
const Headline = ({ data }) => (
  <div id="headline">
    <h2 id="headline-title">{data.title}</h2>
    <div id="headline-desc">{data.desc}</div>
  </div>
);

Headline.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};


/*
 * Export default
 */
export default Headline;
