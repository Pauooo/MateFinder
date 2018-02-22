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
class Password extends React.Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  render() {
    return (
      <div id="password" className="box">
        <Headline data={data.password} />
        <form className="form" onSubmit={this.handleSubmit}>
          {data.password.fields.map(field => <Field key={field.name} {...field} />)}
          <button
            id="password-submit"
            className={data.password.submit.className}
          >
            {data.password.submit.label}
          </button>
        </form>
        <Link
          to="/login"
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
export default Password;
