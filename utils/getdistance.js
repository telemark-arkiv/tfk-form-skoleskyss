'use strict';

var https = require('https');
var apiEndpoint = 'https://api.t-fk.no/distance/'

function getDistance(options, callback) {
  var body = '';
  var url = apiEndpoint + options.origin + '/' + options.destination;

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
  })
}

module.exports = getDistance;