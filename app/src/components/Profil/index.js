/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

/**
 * Local import
 */
import Field from 'src/containers/Field';

/**
 * Code
 */

class Profil extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    login: PropTypes.object.isRequired,
    setUserProfil: PropTypes.func.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
    saveUserPassword: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }
  state = {
    editPseudo: false,
    editEmail: false,
    editPassword: false,
  }

  handleClick = (evt) => {
    this.setState({
      [evt.target.id]: !this.state[evt.target.id],
    });
  }

  handleActionButtonCancel = context => () => {
    this.setState({
      [context]: !this.state[context],
    });
    if (context !== 'editPassword') {
      this.props.setUserProfil(this.props.login.username, this.props.login.email);
    }
  }

  handleActionButtonSave = context => () => {
    this.setState({
      [context]: !this.state[context],
    });
    if (context === 'editPseudo') {
      this.props.logout();
    }
    else if (context === 'editPassword') {
      this.props.saveUserPassword(this.props.password);
      this.props.logout();
    }
    this.props.saveUserInfo(this.props.username, this.props.email);
  }

  render() {
    const { login, loggedIn } = this.props;
    if (!loggedIn) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div id="profil">
        <h1>Ton profil</h1>
        <div id="infos">
          <h2>Informations du compte</h2>
          <p>Pseudo : {login.username}</p>
          <p>Adresse e-mail : {login.email}</p>
        </div>
        <div id="actions">
          <h2>Actions</h2>
          <button id="editPseudo" onClick={this.handleClick}>Modifier le pseudo</button>
          {this.state.editPseudo && (
            <div className="actionsbutton">
              <Field context="profil" key="editPseudo" name="username" placeholder="Pseudo" />
              <button onClick={this.handleActionButtonSave('editPseudo')}><i className="fas fa-check" /></button>
              <button onClick={this.handleActionButtonCancel('editPseudo')}><i className="fas fa-times" /></button>
            </div>
          )}
          <button id="editEmail" onClick={this.handleClick}>Modifier l'adresse e-mail</button>
          {this.state.editEmail && (
            <div className="actionsbutton">
              <Field context="profil" key="editEmail" name="email" placeholder="Adresse e-mail" />
              <button onClick={this.handleActionButtonSave('editEmail')}><i className="fas fa-check" /></button>
              <button onClick={this.handleActionButtonCancel('editEmail')}><i className="fas fa-times" /></button>
            </div>
          )}
          <button id="editPassword" onClick={this.handleClick}>Modifier le mot de passe</button>
          {this.state.editPassword && (
            <div className="actionsbutton">
              <Field context="profil" key="editPassword" name="password" placeholder="Nouveau mot de passe" />
              {/* <Field context="profil" key="editConfirmPassword" name="email" placeholder="Adresse e-mail" /> */}
              <button onClick={this.handleActionButtonSave('editPassword')}><i className="fas fa-check" /></button>
              <button onClick={this.handleActionButtonCancel('editPassword')}><i className="fas fa-times" /></button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Export
 */
export default Profil;
