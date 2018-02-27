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
/**
 * Code
 */
class Login extends React.Component {
  static propTypes = {
    sendCredential: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.sendCredential();
  }

  render() {
    const { errorMessages } = this.props;
    return (
      <div id="login" className="box">
        <Headline data={data.login} />
        <form className="form" onSubmit={this.handleSubmit}>
          {data.login.fields.map(field => <Field key={field.name} {...field} />)}
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
}

/**
 * Export
 */
export default Login;
