/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

/**
 * Local import
 */
import Headline from 'src/components/Headline';
import Field from 'src/containers/Field';
import data from 'src/datas';
/**
 * Code
 */
class Login extends React.Component {
  static propTypes = {
    sendCredential: PropTypes.func.isRequired,
    emptyErrorMessages: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.object.isRequired,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { login } = this.props;
    this.props.emptyErrorMessages();
    console.log(login);
    if (login.username === '' || login.password === '') {
      const message = 'Merci de bien remplir tous les champs';
      this.props.setErrorMessage(message);
    }
    this.props.sendCredential();
  }

  render() {
    const { errorMessages, loggedIn } = this.props;
    if (!loggedIn) {
      return (
        <div id="login" className="box">
          <Headline data={data.login} />
          <form className="form" onSubmit={this.handleSubmit}>
            {data.login.fields.map(field => <Field context="login" key={field.name} {...field} />)}
            {errorMessages.map(message => <p className="error-message" key={message}>{message}</p>)}
            <button
              id="login-submit"
              className={data.login.submit.className}
            >
              {data.login.submit.label}
            </button>
          </form>
          <Link
            id="password-link"
            to="/password"
          >
            J'ai oublié mon mot de passe
          </Link>
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
      <Redirect to="/matching" />
    );
  }
}

/**
 * Export
 */
export default Login;
