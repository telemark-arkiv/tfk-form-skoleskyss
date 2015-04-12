'use strict';

var https = require('https');
var config = require('../config');

function submitForm(payload, callback){

  var payloadString = JSON.stringify(payload);

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': payloadString.length
  };

  var options = {
    host: config.API_POST_HOST,
    path: config.API_POST_PATH,
    method: 'POST',
    headers: headers
  };

  var req = https.request(options, function(res) {

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
      return callback(null, resultObject);

    });
  });

  req.on('error', function(err) {
    return callback(err, null);
  });

  req.write(payloadString, 'utf8');
  req.end();

}

module.exports = submitForm;