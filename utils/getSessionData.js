'use strict';

var https = require('https');
var config = require('../config');
var apiUrl = config.SESSION_API;

function getSessionData(sessionKey, callback){
  var url = apiUrl + '/' + sessionKey;
  var body = '';

  https.get(url, function(res) {

    res.on('data', function(chunk) {
      body += chunk.toString();
    });

    res.on('end', function() {
      var json = JSON.parse(body);
      return callback(null, json);
    });

  }).on('error', function(error) {
    return callback(error, null);
  });

}

module.exports = getSessionData;