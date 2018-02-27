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
  context: PropTypes.string.isRequired,
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
    name, context, placeholder, value, type,
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
        context={context}
        value={value}
        onChange={this.handleChange}
      />
    </div>
  );
}
}
