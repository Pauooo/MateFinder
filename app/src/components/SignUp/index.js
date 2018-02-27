/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * Local import
 */


import Headline from 'src/components/Headline';
import Field from 'src/containers/Field';
import data from 'src/datas';
import Confirmation from 'src/components/Confirmation';
/**
 * Code
 */
class SignUp extends React.Component {
  static propTypes = {
    userAccountCreated: PropTypes.bool.isRequired,
    createAccount: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    signup: PropTypes.object.isRequired,
    errorMessages: PropTypes.array.isRequired,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // le formulaire ne peut pas être envoyé si
    // 1) les champs sont vides
    const { signup } = this.props;

    if (signup.username === '' || signup.email === '' || signup.password === '' || signup.passwordConfirmation === '') {
      const message = 'Merci de bien remplir tous les champs';
      this.props.setErrorMessage(message);
      console.log(message);
    }
    // 2) password != passwordConfimation
    else if (signup.password !== signup.passwordConfirmation) {
      const message = 'il faut que le mot de passe et la confirmation de mot de passe soient identiques';
      this.props.setErrorMessage(message);
      console.log(message);
    }
    else {
      this.props.createAccount();
    }
  }
  render() {
    const { userAccountCreated, errorMessages } = this.props;
    if (!userAccountCreated) {
      return (
        <div id="signup" className="box">
          <Headline data={data.signup} />
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
            className="cancel"
          >
          Annuler
          </Link>
        </div>
      );
    }
    return (
      <Confirmation />
    );
  }
}

/**
* Export
*/
export default SignUp;
