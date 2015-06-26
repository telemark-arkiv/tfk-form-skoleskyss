'use strict';

var routes = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist'
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
      directory: {
        path: 'dist/fonts'
      }
    }
  }
];

module.exports = routes;