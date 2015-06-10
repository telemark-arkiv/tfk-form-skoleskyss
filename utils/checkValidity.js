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