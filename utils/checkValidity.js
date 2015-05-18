'use strict';

var requiredFields = [
  'navn',
  'personnummer',
  'skole',
  'klassetrinn',
  'sokegrunnlag'
];

var requiredBooleans = [
  'termsAccepted'
];

function checkValidity(state){
  var results = {
    formIsValid: true,
    formErrorMessage: '',
    showFormErrorMessage: false
  };

  requiredFields.forEach(function(field){
    if (state[field] === '') {
      results.formIsValid = false;
      results.formErrorMessage = 'Du har ikke fyllt ut alle påkrevde felt. Vennligst se over skjemaet og prøv påny';
      results.showFormErrorMessage = true;
    }
  });

  requiredBooleans.forEach(function(field){
    if (state[field] !== true) {
      results.formIsValid = false;
      results.formErrorMessage = 'Du har ikke fyllt ut alle påkrevde felt. Vennligst se over skjemaet og prøv påny';
      results.showFormErrorMessage = true;
    }
  });

  return results;
}

module.exports = checkValidity;