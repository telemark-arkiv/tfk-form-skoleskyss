'use strict';

function fodselsnummerIsValid( fodselsnummer ) {

  if( fodselsnummer.length !== 11 ) {
    return false;
  }

  var day = fodselsnummer.substr(0,2);
  var month = fodselsnummer.substr(2,2);
  var year = fodselsnummer.substr(4,2);
  var ind = fodselsnummer.substr(6,3);
  var c1 = parseInt(fodselsnummer.substr(9,1), 10);
  var c2 = parseInt(fodselsnummer.substr(10,1), 10);
  var yearno = parseInt(year, 10);

  if ( ind > 0 && ind < 500 ) {
    yearno += 1900;
  } else if ( ind > 499 && ind < 750 && year > 55 && year < 100) {
    yearno += 1800;
  } else if ( ind > 499 && ind < 999 && year >= 0 && year < 40) {
    yearno += 2000;
  } else if ( ind > 899 && ind < 999 && year > 39 && year < 100) {
    yearno += 1900;
  } else {
    return false;
  }

  var d1 = parseInt(day.substr(0,1), 10);
  var d2 = parseInt(day.substr(1,1), 10);
  var m1 = parseInt(month.substr(0,1), 10);
  var m2 = parseInt(month.substr(1,1), 10);
  var a1 = parseInt(year.substr(0,1), 10);
  var a2 = parseInt(year.substr(1,1), 10);
  var i1 = parseInt(ind.substr(0,1), 10);
  var i2 = parseInt(ind.substr(1,1), 10);
  var i3 = parseInt(ind.substr(2,1), 10);

  var c1calc = 11 - (((3*d1) + (7*d2) + (6*m1) + m2 + (8*a1) + (9*a2) + (4*i1) + (5*i2) + (2*i3)) % 11);
  if ( c1calc === 11 ) {
    c1calc = 0;
  }
  if ( c1calc === 10 ) {
    return false;
  }
  if ( c1 !== c1calc ) {
    return false;
  }

  var c2calc = 11 - (((5*d1) + (4*d2) + (3*m1) + (2*m2) + (7*a1) + (6*a2) + (5*i1) + (4*i2) + (3*i3) + (2*c1calc)) % 11);
  if ( c2calc === 11 ) {
    c2calc = 0;
  }
  if ( c2calc === 10 ) {
    return false;
  }
  if ( c2 !== c2calc ) {
    return false;
  }

  return true;
}

module.exports = fodselsnummerIsValid;