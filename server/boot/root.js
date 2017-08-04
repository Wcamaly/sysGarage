'use strict';
const routeUser = require('./roots/user');
const routeSecurity = require('./roots/security');
const middlewareSession = require('../middleware/middlewareSession');
const path = require('path');

/**
 * Export module routing
 * @param  @Objec server Instance to server app
 */
module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // Return index.html
  
  //Routing security
  server.use('/security',routeSecurity);

  // Add middelware Session
  server.use('/user', middlewareSession);
  // Routing users
  server.use('/user', routeUser);

  
};
