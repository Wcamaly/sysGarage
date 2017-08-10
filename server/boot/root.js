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
    let role = req.body.role
    Role.find({
      where: {name : role},
      fields: {name: true, id: true, modified: false, created:false, description:false},
      include: {relation: 'actions'}
    }, (err, response) => {
      if (err) next(err)
      res.status(200).json(response)
    })
  })
  server.use(router)
}
