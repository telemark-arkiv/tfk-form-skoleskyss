'use strict';

var https = require('https');
var querystring = require('querystring');
var config = require('../config');


function getReiseRute(options, callback){

  var apiEndpoint = config.TRAVEL_API;
  var body = '';
  var url = apiEndpoint + '?';

  url = url + querystring.stringify(options);

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

function sjekkOvergang(stages){
  var overgang = '';

  if (stages.length > 1) {
    overgang = stages[0].ArrivalStop.Name;
  }

  return overgang;
}

function sjekkHoldeplassHjem(stages){
  var holdeplass = '';

  holdeplass = stages[0].DepartureStop.Name;

  return holdeplass;
}

function sjekkHoldeplassSkole(stages){
  var holdeplass = '';

  holdeplass = stages[stages.length - 1].ArrivalStop.Name;

  return holdeplass;
}

function cleanUpStages(data) {
  var stages = [];

  for(var num in data.Stages){
    if (data.Stages[num].ArrivalStop) {
      stages.push(data.Stages[num]);
    }
  }

  return stages;
}

function getReiseInfo(options, callback){
  getReiseRute(options, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      var stages = cleanUpStages(data.TravelProposals[0]);
      var overgang = sjekkOvergang(stages);
      var holdeplassHjem = sjekkHoldeplassHjem(stages);
      var holdeplassSkole = sjekkHoldeplassSkole(stages);
      var output = {
        overgang: overgang,
        holdeplassHjem: holdeplassHjem,
        holdeplassSkole: holdeplassSkole,
        fullReise: data.TravelProposals[0]
      };

      return callback(null, output);
    }
  })
}

module.exports = getReiseInfo;