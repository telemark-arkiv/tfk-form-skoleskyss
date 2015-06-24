'use strict';

var fodselsnummerIsValid = require('./fodselsnummerIsValid');

var requiredFields = [
  'navn',
  'personnummer',
  'epost',
  'skole',
  'klassetrinn',
  'sokegrunnlag',
  'busskortstatus'
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
    if (requiredFields.indexOf('alternativAdresseAdresse') === -1) {
      requiredFields.push('alternativAdresseAdresse');
    }
    if (requiredFields.indexOf('alternativAdressePostnummer') === -1) {
      requiredFields.push('alternativAdressePostnummer');
    }
    if (requiredFields.indexOf('alternativAdressePoststed') === -1) {
      requiredFields.push('alternativAdressePoststed');
    }
  } else {
    if (requiredFields.indexOf('alternativAdresseAdresse') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdresseAdresse'), 1);
    }
    if (requiredFields.indexOf('alternativAdressePostnummer') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdressePostnummer'), 1);
    }
    if (requiredFields.indexOf('alternativAdressePoststed') > -1) {
      requiredFields.splice(requiredFields.indexOf('alternativAdressePoststed'), 1);
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