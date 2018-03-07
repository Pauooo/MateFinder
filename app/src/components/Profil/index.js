/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

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
    login: PropTypes.object.isRequired,
    setUserProfil: PropTypes.func.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
    saveUserPassword: PropTypes.func.isRequired,
    successedit: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  }
  state = {
    editPseudo: false,
    editEmail: false,
    editPassword: false,
  }

  handleClick = context => () => {
    this.setState({
      [context]: !this.state[context],
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
      toast('Pseudo modifié avec succès, reconnectes toi !', {
        autoClose: 5000,
        type: toast.TYPE.ERROR,
        bodyClassName: 'toast',
      });
      return;
    }
    else if (context === 'editPassword') {
      this.props.saveUserPassword();
      return;
    }
    this.props.saveUserInfo(this.props.username, this.props.email);
    toast('Email modifié avec succès', {
      autoClose: 5000,
      type: toast.TYPE.ERROR,
      bodyClassName: 'toast',
    });
  }

  render() {
    const {
      login, loggedIn, successedit, logout,
    } = this.props;
    if (!loggedIn) {
      return (
        <Redirect to="/" />
      );
    }
    if (successedit) {
      logout();
    }
    return (
      <div id="profil">
        <h1>Mon profil</h1>
        <div id="infos">
          <h2>Informations du compte</h2>
          <div className="editProfil">
            Pseudo :
            {!this.state.editPseudo && (
              <div>
                <span>{login.username}</span>
                <FontAwesomeIcon className="icons" onClick={this.handleClick('editPseudo')} icon="edit" />
              </div>
            )}
            {this.state.editPseudo && (
              <div>
                <Field context="profil" key="editPseudo" name="username" placeholder="Pseudo" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonSave('editPseudo')} icon="check" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonCancel('editPseudo')} icon="times" />
              </div>
            )}
          </div>
          <div className="editProfil">
            Adresse e-mail :
            {!this.state.editEmail && (
              <div>
                <span>{login.email}</span>
                <FontAwesomeIcon className="icons" onClick={this.handleClick('editEmail')} icon="edit" />
              </div>
            )}
            {this.state.editEmail && (
              <div>
                <Field context="profil" key="editEmail" name="email" placeholder="Adresse e-mail" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonSave('editEmail')} icon="check" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonCancel('editEmail')} icon="times" />
              </div>
            )}
          </div>
        </div>
        <div id="actions">
          <h2>Actions</h2>
          <div className="editProfil">
            {!this.state.editPassword && (
              <button id="editPassword" onClick={this.handleClick('editPassword')}>Modifier le mot de passe</button>
            )}
            {this.state.editPassword && (
              <div>
                <Field context="profil" key="editCurrentPassword" type="password" name="currentpassword" placeholder="Mot de passe actuel" />
                <Field context="profil" key="editPassword" type="password" name="password" placeholder="Nouveau mot de passe" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonSave('editPassword')} icon="check" />
                <FontAwesomeIcon className="icons" onClick={this.handleActionButtonCancel('editPassword')} icon="times" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */
export default Profil;
