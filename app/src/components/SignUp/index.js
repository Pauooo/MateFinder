/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Local import
 */


import Field from 'src/containers/Field';
import data from 'src/datas';
import Confirmation from 'src/components/Confirmation';
import LeftPanel from 'src/components/LeftPanel';
import RightPanel from 'src/components/RightPanel';
/**
 * Code
 */
class SignUp extends React.Component {
  static propTypes = {
    userAccountCreated: PropTypes.bool.isRequired,
    createAccount: PropTypes.func.isRequired,
    emptyErrorMessages: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    signup: PropTypes.object.isRequired,
    errorMessages: PropTypes.array.isRequired,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // le formulaire ne peut pas être envoyé si
    // 1) les champs sont vides
    const { signup } = this.props;
    this.props.emptyErrorMessages();
    if (signup.username === '' || signup.email === '' || signup.password === '' || signup.passwordConfirmation === '') {
      const message = 'Pour commencer, c\'est bien de remplir tous les champs.';
      this.props.setErrorMessage(message);
    }
    // 2) password != passwordConfimation
    else if (signup.password !== signup.passwordConfirmation) {
      const message = 'il faut que le mot de passe et sa confirmation soient identiques.';
      this.props.setErrorMessage(message);
    }
    else {
      this.props.createAccount();
    }
  }

  handleErrorMessages = () => {
    this.props.emptyErrorMessages();
  }

  render() {
    const { userAccountCreated, errorMessages } = this.props;
    if (!userAccountCreated) {
      return (
        <div className="main-container">
          <LeftPanel />
          <div id="signup" className="box">
            <div>
              <h3 className="text-description">Rassure-toi, tu n'es plus qu'à un clic du <span className="text-yellow">bonheur</span>.</h3>
              <h2 className="title">S'enregistrer</h2>
            </div>
            <form className="form" onSubmit={this.handleSubmit}>
              {data.signup.fields.map(field => <Field context="signup" key={field.name} {...field} />)}
              {errorMessages.map(message => <p className="error-message" key={message}>{message}</p>)}
              <button
                id="signup-submit"
                className={data.signup.submit.className}
              >
                {data.signup.submit.label}
              </button>
            </form>
            <Link
              to="/"
              onClick={this.handleErrorMessages}
              className="cancel"
            >
            Annuler
            </Link>
          </div>
          <RightPanel />
        </div>
      );
    }
    return (
      <div className="main-container">
        <LeftPanel />
        <Confirmation />
        <RightPanel />
      </div>
    );
  }
}

/**
* Export
*/
export default SignUp;
