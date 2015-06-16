'use strict';

var url = require('url');
var getSessionData = require('./getSessionData');

function cleanUpSession(session) {
  if (session.length === 1) {
    var cleanSession = {};
    var sess = session[0];
    cleanSession.gotSession = true;
    cleanSession.personnummer = sess.uid;
    return cleanSession;
  } else {
    return false;
  }
}

function parseSession(location, callback) {
  var urlObject = url.parse(location, true);
  var session = false;

  function handleResponse(error, session) {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, cleanUpSession(session))
    }
  }

  if (urlObject.query && urlObject.query.session) {
    var sessionKey = urlObject.query.session;
    getSessionData(sessionKey, handleResponse);
  } else {
    return callback(null, session)
  }

}

module.exports = parseSession;