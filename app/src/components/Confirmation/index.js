/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
/**
 * Local import
 */

/**
 * Code
 */
const Confirmation = () => (
  <div id="confirmation" className="box">
    <h3 className="text-description" id="text-confirmation">Ton <span className="text-yellow">compte</span> a bien été créé.</h3>
    <FontAwesomeIcon className="fly" rotate="10" size="2x" icon="paper-plane" />
    <Link
      to="/matching"
      className="text-description"
    >
     Lance ta première <span className="text-yellow" id="underline">recherche</span>  !
    </Link>
  </div>
);

/**
* Export
*/
export default Confirmation;
