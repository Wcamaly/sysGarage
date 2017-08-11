const _ = require('lodash')
const message = require('../../const/strings')

module.exports = (app) => {
  /**
   * [description]
   * @param  {[type]} role    [description]
   * @param  {[type]} context [description]
   * @return {[type]}         [description]
   */
  app.on('started', () => {
    let Role = app.models.role
    Role.find({}, (err, roles) => {
      if (err) throw err
      roles.forEach((val, i) => {
        Role.registerResolver(val.name, (role, context, cb) => {
          roleReolve(val.name, role, context, cb)
        })
      })
    })
  })
  /**
   * Eval if User have permission
   * @param  {[String]}   nameRole Name the role
   * @param  {[Object]}   role     Objet if Role
   * @param  {[context]}   context  Context this petion
   * @param  {Function} cb       callback next
   * @return boolean  validation if have permission
   */
  function roleReolve (nameRole, role, context, cb) {
    let perm = app.models.permissions
    let userId = context.accessToken.userId
    // We defined possible error

    if (!userId) {
      return process.nextTick(() => cb(null, false))
    }
    /**
     * Evaluates that the user who wants to create does not have to be created by some specific role
     */
    if (context.method.toString() === 'create') {
      let req = context.remotingContext.req.body

      let typeUserCreate = String(req.userType).toLowerCase()
      let perRoleCre = app.models.CreateRolePermissions
      let User = app.models.user
      // Define is posible Error
      let error = new Error()
      error.status = 401
      error.message = message.erroBlockCreateUse
      error.code = message.erroAuth

      // We find that role can create role
      perRoleCre.find({
        include: [{
          relation: 'role',
          scope: {
            fields: ['name', 'id']
          }
        }, {
          relation: 'createRole',
          scope: {
            where: {'name': typeUserCreate},
            fields: ['name', 'id']
          }
        }]
      }, (err, res) => {
        // As loopback does not have join between table we remove all the options that do not have the role that we want to create
        let rolePerm = _.find(res, (o) => {
          o = JSON.parse(JSON.stringify(o)) // Parse JSon
          return o.createRole !== undefined
        })
        try {
          if (err) throw err
          if (rolePerm && userId) { // eval if exist bloked for role and session
            User.findById(userId, {
              fields: {'username': false, 'email': false, 'id': true},
              include: {
                relation: 'role',
                fields: {'id': true, 'name': true, 'description': false, 'created': false, 'modified': false}
              }
            }, (err, us) => {
              if (err) throw err
              us = JSON.parse(JSON.stringify(us))
              let roleId = us.role[0].id  // Is thought for if a user has more than one role but as is not the example is placed 0
              let auths = []
              auths = _.find(rolePerm, (o) => { return o.role.id === roleId })
              if (!auths) {
                console.log(`no esta autorizado`)
                cb(error, false)
              }
            })
          } else if (rolePerm) throw error // IF no have session
        } catch (e) {
          cb(e, false)
        }
      })
    }

    /**
     * Evaluate if they blocked any action
     */
    let errorPermission = new Error()
    errorPermission.status = 401
    errorPermission.message = message.erroBlockedUser
    errorPermission.code = message.erroAuth

    perm.find({
      where: {userId: userId},
      include: {
        relation: 'actions'
      }
    }, (err, res) => {
      if (err) return cb(err)
      if (res.length === 0) {
        return cb(null, true)
      } else {
        let property = context.method.toString()
        let ind = _.findIndex(res, (o) => {
          let as = JSON.parse(JSON.stringify(o))
          return as.actions.actionName === property
        })
        if (ind !== -1) return res[ind].status ? cb(null, res[ind].status) : cb(errorPermission, res[ind].status)
        cb(null, true)
      }
    })
  }
}
