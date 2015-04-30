'use strict';

var http = require('http');
var querystring = require('querystring');

function getReiseRute(options, callback){

  var apiEndpoint = 'http://reisapi.ruter.no/Travel/GetTravels';
  var body = '';
  var url = apiEndpoint + '?';
  var now = new Date().toISOString();

  options.proposals = '1';
  options.isafter = now.substr(8,10) + now.substr(5,7) + now.substr(0,4);

  url = url + querystring.stringify(options);

  http.get(url, function(res) {

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

function sjekkOvergang(data){
  var overgang = '';

  if (data.Stages.length > 1) {
    overgang = data.Stages[0].ArrivalStop.Name;
  }

  return overgang;
}

function getReiseInfo(options, callback){
  getReiseRute(options, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      var overgang = sjekkOvergang(data.TravelProposals[0]);
      var output = {
        overgang: overgang,
        fullReise: data.TravelProposals[0]
      };

      return callback(null, output);
    }
  })
}

module.exports = getReiseInfo;