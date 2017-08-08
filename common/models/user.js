'use strict'
const Utils = require('../../utils/utils')
const app = require('../../server/server')
module.exports = (User) => {
  User.validatesUniquenessOf('email', {message: 'This user already exists'})
  User.validatesUniquenessOf('name', {message: 'This user already exists'})
 /**
   * Redefine login
   * @param  String 'login'   method to after ejectute
   * @param  callback
   *         @pram Object context   context to instance
   *         @param Object user   User return ejecute
   *         @param Object next callback next function
   *
   * @return Object   user
   */
  User.afterRemote('create', (context, user, next) => {
    user.userType = user.userType || 'client'
    delete user.password // Password is deleted by security
    if (user.userType) {
      Utils.relationMapingRole({
        name: user.userType,
        userId: user.id
      }, (err, req) => {
        if (err) {
          let error = new Error()
          error.status = 400
          error.message = err
          next(error)
        }
        next()
      })
    } else {
      next()
    }
  })
  /**
   * Redefine login
   * @param  String 'login'   method to after ejectute
   * @param  callback
   *         @pram Object context   context to instance
   *         @param Object user   User return ejecute
   *         @param Object next callback next function
   *
   * @return Object   user     user is session
   */
  User.afterRemote('login', (context, next) => {
    let RoleMapping = app.models.RoleMapping
    let Role = app.models.Role
    let accesToken = context.result.id
    context.res.setAccesToken(accesToken)
    console.log('user remote logi')
    User.findById(context.result.userId, {fields: {'username': true, 'email': true, 'id': true}}, (err, req) => {
      if (err) next(err)
      RoleMapping.findOne({where: {principalId: req.id}}, (err, mapping) => {
        if (err) throw err
        Role.findById(mapping.roleId, (err, role) => {
          if (err) throw err
          req.role = role.name
          context.res.json(req)
        })
      })
    })
  })

  User.listUsers = (userId, cb) => {
    User.find({
      fields: {'username': true, 'email': true, 'id': true},
      where: {id: {nin: [userId]}}
    }, (err, req) => {
      if (err) throw err
      cb(null, req)
    })
  }
  User.remoteMethod('listUsers', {
    accepts: {arg: 'userId', type: 'number'},
    returns: {arg: 'Users', type: 'array'},
    http: {path: '/listUsers', verb: 'post'}
  })

  User.managmentPermission = (obj, cb) => {
    let perm = app.models.permissions
    obj.actions.forEach((val, i) => {
      perm.findOne({where: {
          userId: obj.user.id,
          actionId: val.actionId
      }},
      (err, res) => {
        if (err) return cb(err)
        if (res) {
          res.satus = val.status
          res.save()
        } else {
          Utils.createPermission({
            userId: obj.user.id,
            actionId: val.actionId,
            status: val.status
          },
          (err, res) => {
            if (err) return cb(err)
            return cb(null, {
              satus: "Succesfull"
            })
          })
        }
      })
    })
  }
  User.remoteMethod('managmentPermission', {
    accepts: {arg: 'obj', type: 'object'},
    returns: {arg: 'status', type: 'string'},
    http: {path: '/managmentPermission', verb: 'post'}
  })

}
