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
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.createAccount();
  }
  render() {
    const { userAccountCreated } = this.props;
    if (!userAccountCreated) {
      return (
        <div id="signup" className="box">
          <Headline data={data.signup} />
          <form className="form" onSubmit={this.handleSubmit}>
            {data.signup.fields.map(field => <Field key={field.name} {...field} />)}
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
