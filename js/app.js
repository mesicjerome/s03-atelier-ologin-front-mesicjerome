let app = {

  inputValidation: {
    username: false,
    password: false
  },

  errorElement: document.querySelector('#errors'),

  init: function () {
    console.log('app.init');

    let arrayInput = document.querySelectorAll('.field-input');
    for (let key = 0; key < arrayInput.length; key++) {
      arrayInput[key].addEventListener('blur', app.borderColor);
    }

    let formSubmit = document.querySelector('#login-form');
    formSubmit.addEventListener('submit', app.validation);

  },

  borderColor: function (evt) {

    if (evt.target.value.length >= 3) {
      app.borderColorModifier(true, evt.target);
      app.inputValidation[evt.target.name] = true;
    } else {
      app.borderColorModifier(false, evt.target);
      app.inputValidation[evt.target.name] = false;
    }
  },

  borderColorModifier: function (titi, inputaModifier) {

    if (titi === true) {
      inputaModifier.classList.add('field-input--valid');
      inputaModifier.classList.remove('field-input--error');
    } else {
      inputaModifier.classList.add('field-input--error');
      inputaModifier.classList.remove('field-input--valid');
    }
  },

  validation: function (evt) {

    if (app.inputValidation.username === false || app.inputValidation.password === false) {
      evt.preventDefault();

      while (app.errorElement.hasChildNodes()) {
        app.errorElement.removeChild(app.errorElement.lastChild);
      }

      if (app.inputValidation.username === false) {
        app.addElement('Identifiant');
        app.borderColorModifier(false, document.getElementById('field-username'));
      }
      if (app.inputValidation.password === false) {
        app.addElement('Mot de passe');
        app.borderColorModifier(false, document.getElementById('field-password'));
      }

    }
  },

  addElement: function (toto) {

    let newDivMessage = document.createElement("div");
    newDivMessage.classList.add('errors_message');

    let newMessageContent = document.createTextNode(toto + ' doit contenir au moins 3 caractères');

    newDivMessage.appendChild(newMessageContent);

    app.errorElement.appendChild(newDivMessage);
  }
};

document.addEventListener('DOMContentLoaded', app.init);