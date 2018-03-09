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

const Contact = () => (
  <div id="mentionscontact">
    <Link
      to="/"
      className="escape-link"
    >
      <div><FontAwesomeIcon className="escape" icon="times" /></div>
    </Link>
    <h1>Contact</h1>
    <p>
      Envie de nous faire le retour de ton expérience ?
      Des suggestions pour l'evolution de ton site préféré ?
      Contacte-nous à <span className="yellow">matefinder@gmail.com</span> ou clique sur le bouton ci-dessous !
    </p>
    <a id="contactmail" href="mailto:matefinder@gmail.com">Envoyer un email</a>
  </div>
);

/**
 * Export
 */
export default Contact;
