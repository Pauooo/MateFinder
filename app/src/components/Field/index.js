/*
* Npm import
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validateEmail from 'validate-email';


/*
* Local import
*/


/*
* Code
*/


/*
* Component
*/
export default class Field extends React.Component {
/*
 * PropTypes
 */
static propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'tel']),
}

static defaultProps = {
  value: '',
  type: 'text',
}

state = {
  error: false,
}


/**
 * Handle change event
 * @param {Event} evt objet d'evement
 */
handleChange = (evt) => {
  // Modifier le state de <App />
  const { value } = evt.target;
  this.props.onChange(value);

  // On vérifie l'email
  if (this.props.type === 'email') {
    const error = !validateEmail(value);
    this.setState({ error });
  }
}


/*
 * Render
 */
render() {
  const { error } = this.state;
  const {
    name, placeholder, value, type,
  } = this.props;
  const id = `field-${name}`;
  return (
    <div
      className={classNames(
        'field',
        { 'field--has-value': value !== '' },
        { 'field--has-error': error },
      )}
    >
      <input
        /* HTML */
        type={type}
        className="field-input"
        id={id}
        name={name}
        placeholder={placeholder}

        /* React */
        value={value}
        onChange={this.handleChange}
      />
      {/* <label
        className="field-label"
        htmlFor={id}
      >
        {placeholder}
      </label> */}
    </div>
  );
}
}
