/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
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
  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  render() {
    return (
      <div id="login">
        <Headline data={data.login} />
        <form className="form" onSubmit={this.handleSubmit}>
          {data.login.fields.map(field => <Field key={field.name} {...field} />)}
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
