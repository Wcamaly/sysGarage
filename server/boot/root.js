'use strict'

/**
 * Export module routing
 * @param  @Objec server Instance to server app
 */
module.exports = (server) => {
  // Install a `/` route that returns server status
  let router = server.loopback.Router()
  // router.get('/', server.loopback.status());
  server.use(router)
}
