'use strict';

var validChoices = [
  '3950',
  '3770',
  '3780',
  '3781',
  '3783',
  '3788'
];

function showBoatOrFerry(state) {
  var className = 'hidden';

  validChoices.forEach(function(zip){
    if(state.indexOf(zip) > -1){
      className = '';
    }
  });

  return className;
}

module.exports = showBoatOrFerry;