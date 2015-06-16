'use strict';

var url = require('url');

function parseSession(location, callback) {
  var urlObject = url.parse(location, true);
  var session = false;
  if (urlObject.query && urlObject.query.session) {
    session = urlObject.query.session;
    return callback(null, session)
  } else {
    return callback(null, session)
  }
}

module.exports = parseSession;