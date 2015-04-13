'use strict';

var https = require('https');

function getLatLngFromAddress(address, callback){
  var apiEndpoint = 'https://api.t-fk.no/geocode/';

  var body = '';
  var url = apiEndpoint + address;

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

function getUTMFromLatLng(options, callback){
  var apiEndpoint = 'https://api.t-fk.no/geocode/convert/LLtoUTM';

  var body = '';
  var url = apiEndpoint + '?lat=' + options.lat + '&lng=' + options.lng;

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

function getClosestStage(options, callback){
  var apiEndpoint = 'https://api.t-fk.no/stages/closest';

  var body = '';
  var url = apiEndpoint + '?x=' + options.x + '&y=' + options.y;

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

function getClosestStop(address, callback) {
  getLatLngFromAddress(address, function(err, data){
    if (err) {
      return callback(err, null);
    } else {

      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      getUTMFromLatLng({lat:lat, lng:lng}, function(error, position){
        if (error) {
          callback(error, null);
        } else {
          var x = position.geometry.coordinates[0];
          var y = position.geometry.coordinates[1];
          getClosestStage({x:x, y:y}, function(er, stage){
            if (er) {
              return callback(er, null);
            } else {
              return callback(null, stage);
            }
          });
        }
      })
    }
  });
}

module.exports = getClosestStop;