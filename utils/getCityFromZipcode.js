'use strict';

var https = require('https');
var config = require('../config');
var apiUrl = config.ZIPCODE_API;

function getCityFromZipcode(zipcode, callback){
  var url = apiUrl + '/' + zipcode;
  var body = '';

  https.get(url, function(res) {

    res.on('data', function(chunk) {
      body += chunk.toString();
    });

    res.on('end', function() {
      var json = JSON.parse(body);
      return callback(null, json[0]);
    });

  }).on('error', function(error) {
    return callback(error, null);
  });

}

module.exports = getCityFromZipcode;