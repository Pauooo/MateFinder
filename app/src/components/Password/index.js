/**
 * Npm import
 */
import React from 'react';
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
      <div id="login">
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
        <a>Annuler</a>
      </div>
    );
  }
}

/**
 * Export
 */
export default Password;
