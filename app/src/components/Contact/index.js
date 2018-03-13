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
    <h1 className="title">Contact</h1>
    <p>
      Envie de nous faire le retour de ton expérience ?
      Des suggestions pour l'evolution de ton site préféré ?
      Contacte-nous à <span className="yellow">matefinder@gmail.com</span> ou clique sur le bouton ci-dessous !
    </p>
    <a id="contactmail" href="mailto:matefinder@gmail.com">Envoyer un email</a>
    <p>
      Tu as rencontré des problèmes ou tu as des idées pour améliorer cette application ? N'hésite pas à nous laisser une issue sur <a target="_blank" className="yellow" href="https://github.com/Pauooo/MateFinder/issues">Github</a>.
    </p>
  </div>
);

/**
 * Export
 */
export default Contact;
