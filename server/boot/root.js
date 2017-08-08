'use strict'

/**
 * Export module routing
 * @param  @Objec server Instance to server app
 */
module.exports = (server) => {
  let Role = server.models.role
  // Install a `/` route that returns server status
  let router = server.loopback.Router()
  // router.get('/', server.loopback.status());
  router.post('/getDefaultRoleActions', (req, res, next) => {
    Role.find({include: {relation: 'actions'}}, (err, response) => {
      if (err) next(err)
      res.status(200).json(response)
    })
  })
  server.use(router)
}
