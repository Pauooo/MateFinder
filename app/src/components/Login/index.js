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

import Field from 'src/containers/Field';
import LeftPanel from 'src/components/LeftPanel';
import RightPanel from 'src/components/RightPanel';
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
    if (login.username === '' || login.password === '') {
      const message = 'Merci de bien remplir tous les champs';
      this.props.setErrorMessage(message);
    }
    else {
      this.props.sendCredential();
    }
  }

  handleErrorMessages = () => {
    this.props.emptyErrorMessages();
  }

  render() {
    const { errorMessages, loggedIn } = this.props;
    if (!loggedIn) {
      return (
        <div className="main-container">
          <LeftPanel />
          <div id="login" className="box">
            <div>
              <h3 className="text-description">Trouve des partenaires de jeu en ligne et joue <span className="text-yellow">maintenant</span>.</h3>
              <h2 className="title">Se connecter</h2>
            </div>
            <Link
              id="go-to-signup"
              onClick={this.handleErrorMessages}
              to="/signup"
            >
             Je n'ai pas encore de compte,<span className="text-yellow"> enregistrez-moi</span> !
            </Link>
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
            {/* <Link
              id="password-link"
              to="/password"
            >
              J'ai oublié mon mot de passe
            </Link> */}
          </div>
          <RightPanel />
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
