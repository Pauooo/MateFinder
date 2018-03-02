/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Local import
 */

/**
 * Code
 */
const Confirmation = () => (
  <div id="confirmation" className="box">
    <h2>Votre compte a bien été créé.</h2>
    <Link
      to="/matching"
      id="go-to-match"
    >
     Lancez votre première recherche !
    </Link>
  </div>
);

/**
* Export
*/
export default Confirmation;
