export default {
  login: {
    title: 'Se connecter',
    link: 'Mot de passe oublié ?',
    fields: [
      {
        type: 'text',
        name: 'username',
        placeholder: 'Pseudo',
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Mot de passe',
      },
    ],
    submit: {
      className: 'form-submit--login',
      label: 'Connexion',
    },
  },
  signup: {
    title: 'Création de compte',
    desc: 'Renseignez les champs ci-dessous afin de créer votre compte',
    link: 'Annuler',
    fields: [
      {
        type: 'text',
        name: 'username',
        placeholder: 'Pseudo',
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'Adresse e-mail',
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Mot de passe',
      },
      {
        type: 'password',
        name: 'passwordConfirmation',
        placeholder: 'Confirmation du mot de passe',
      },
    ],
    submit: {
      className: 'form-submit--login',
      label: 'Je m\'inscris',
    },
  },
  password: {
    title: 'Mot de passe oublié',
    desc: 'Renseignez votre adresse e-mail et nous vous envoyons un nouveau mot de passe tout beau tout neuf',
    link: 'Annuler',
    fields: [
      {
        type: 'email',
        name: 'email',
        placeholder: 'Adresse e-mail',
      },
    ],
    submit: {
      label: 'Regénérer mot de passe',
    },
  },
};
