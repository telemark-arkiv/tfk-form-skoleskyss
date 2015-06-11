'use strict';

var fodselsnummerIsValid = require('./fodselsnummerIsValid');

var requiredFields = [
  'navn',
  'personnummer',
  'epost',
  'skole',
  'klassetrinn',
  'sokegrunnlag',
  'busskortstatus',
  'folkeregistrertAdresseBosted'
];

var requiredBooleans = [
  'termsAccepted'
];

function checkValidity(state){
  var results = {
    formIsValid: true,
    formErrorMessage: '',
    showFormErrorMessage: false,
    invalidFields: [],
    invalidBooleans: [],
    invalidFormats: []
  };

  // Special cases, only required under certain circumstances
  if (state.alternativAdresse !== '') {
    if (requiredFields.indexOf('alternativAdresseBosted') === -1) {
      requiredFields.push('alternativAdresseBosted');
    }
  } else {
    if (requiredFields.indexOf('alternativAdresseBosted') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseBosted'), 1);
    }
  }
  if (state.folkeregistrertAdresseBosted === 'Gateadresse') {
    if (requiredFields.indexOf('folkeregistrertAdresseAdresse') === -1) {
      requiredFields.push('folkeregistrertAdresseAdresse');
    }
  } else {
    if (requiredFields.indexOf('folkeregistrertAdresseAdresse') > -1) {
      requiredFields.splice(requiredFields.indexOf('folkeregistrertAdresseAdresse'), 1);
    }
  }
  if (state.folkeregistrertAdresseBosted === 'GnrBnr') {
    if (requiredFields.indexOf('folkeregistrertAdresseGnr') === -1) {
      requiredFields.push('folkeregistrertAdresseGnr');
    }
    if (requiredFields.indexOf('folkeregistrertAdresseBnr') === -1) {
      requiredFields.push('folkeregistrertAdresseBnr');
    }
    if (requiredFields.indexOf('folkeregistrertAdresseKommunenr') === -1) {
      requiredFields.push('folkeregistrertAdresseKommunenr');
    }
  } else {
    if (requiredFields.indexOf('folkeregistrertAdresseGnr') > -1) {
      requiredFields.splice(requiredFields.indexOf('folkeregistrertAdresseGnr'), 1);
    }
    if (requiredFields.indexOf('folkeregistrertAdresseBnr') > -1) {
      requiredFields.splice(requiredFields.indexOf('folkeregistrertAdresseBnr'), 1);
    }
    if (requiredFields.indexOf('folkeregistrertAdresseKommunenr') > -1) {
      requiredFields.splice(requiredFields.indexOf('folkeregistrertAdresseKommunenr'), 1);
    }
  }
  if (state.alternativAdresseBosted === 'Gateadresse') {
    if (requiredFields.indexOf('alternativAdresseAdresse') === -1) {
      requiredFields.push('alternativAdresseAdresse');
    }
  } else {
    if (requiredFields.indexOf('alternativAdresseAdresse') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseAdresse'), 1);
    }
  }
  if (state.alternativAdresseBosted === 'GnrBnr') {
    if (requiredFields.indexOf('alternativAdresseGnr') === -1) {
      requiredFields.push('alternativAdresseGnr');
    }
    if (requiredFields.indexOf('alternativAdresseBnr') === -1) {
      requiredFields.push('alternativAdresseBnr');
    }
    if (requiredFields.indexOf('alternativAdresseKommunenr') === -1) {
      requiredFields.push('alternativAdresseKommunenr');
    }
  } else {
    if (requiredFields.indexOf('alternativAdresseGnr') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseGnr'), 1);
    }
    if (requiredFields.indexOf('alternativAdresseBnr') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseBnr'), 1);
    }
    if (requiredFields.indexOf('alternativAdresseKommunenr') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseKommunenr'), 1);
    }
  }
  if (state.skole === 'Skole utenfor Telemark') {
    if (requiredFields.indexOf('eksternSkoleNavn') === -1) {
      requiredFields.push('eksternSkoleNavn');
    }
    if (requiredFields.indexOf('eksternSkoleAdresse') === -1) {
      requiredFields.push('eksternSkoleAdresse');
    }
  } else {
    if (requiredFields.indexOf('eksternSkoleNavn') > -1) {
      requiredFields.splice(requiredFields.indexOf('eksternSkoleNavn'), 1);
    }
    if (requiredFields.indexOf('eksternSkoleAdresse') > -1) {
      requiredFields.splice(requiredFields.indexOf('eksternSkoleAdresse'), 1);
    }
  }

  requiredFields.forEach(function(field){
    if (state[field] === '') {
      results.formIsValid = false;
      results.formErrorMessage = 'Du har ikke fyllt ut alle påkrevde felt. Vennligst se over skjemaet og prøv påny';
      results.showFormErrorMessage = true;
      results.invalidFields.push(field);
    }
  });

  requiredBooleans.forEach(function(field){
    if (state[field] !== true) {
      results.formIsValid = false;
      results.formErrorMessage = 'Du har ikke fyllt ut alle påkrevde felt. Vennligst se over skjemaet og prøv påny';
      results.showFormErrorMessage = true;
      results.invalidBooleans.push(field);
    }
  });

  if (!fodselsnummerIsValid(state.personnummer)) {
    results.formIsValid = false;
    results.formErrorMessage = 'Fødselsnummeret har galt format. Vennligst se over og prøv påny';
    results.showFormErrorMessage = true;
    results.invalidFormats.push('personnummer');
  }

  return results;
}

module.exports = checkValidity;