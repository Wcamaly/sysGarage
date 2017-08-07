'use strict'
const routeUser = require('./roots/user')
const routeSecurity = require('./roots/auth')
const middlewareSession = require('../middleware/middlewareSession')

/**
 * Export module routing
 * @param  @Objec server Instance to server app
 */
module.exports = (server) => {
  //  Routing auth
  server.use('/auth', routeSecurity)

  //  Add middelware Session
  server.use('/user', middlewareSession)
  //  Routing users
  server.use('/user', routeUser)
}
