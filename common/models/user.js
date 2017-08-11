'use strict'
const Utils = require('../../utils/utils')
const message = require('../../const/strings')
module.exports = (User) => {
  /**
   * [message description]
   * @type {String}
   */
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
        principalId: user.id
      }, (err, req) => {
        if (err) {
          User.destroyById(user.id)
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
    let accesToken = context.result.id
    context.res.setAccesToken(accesToken)

    User.findById(context.result.userId, {
      fields: {'username': true, 'email': false, 'id': true},
      include: [{
        relation: 'role',
        scope: {
          fields: ['id', 'name', 'description']
        }
      },
      {
        relation: 'permission',
        scope: {
          fileds: ['actionId', 'status']
        }
      }]
    }, (err, res) => {
      try {
        if (err) throw err
        context.res.json(res)
      } catch (e) {
        let error = new Error(message.errorTryAgainLater)
        context.res.send(error)
      }
    })
  })

 /**
   * List users less yourself
   * @param  String 'listUsers'   method to after ejectute
   * @param  callback continue ejecute
   *
   * @return Object   user
   */
  User.listUsers = (userId, cb) => {
    User.find({
      where: {id: {nin: [userId]}},
      fields: {'username': true, 'email': true, 'id': true},
      include: [{
        relation: 'role',
        scope: {
          fields: ['id', 'name', 'description']
        }
      },
      {
        relation: 'permission',
        scope: {
          fileds: ['actionId', 'status']
        }
      }]
    }, (err, req) => {
      if (err) cb(err)
      cb(null, req)
    })
  }
  User.remoteMethod('listUsers', {
    accepts: {arg: 'userId', type: 'number'},
    returns: {arg: 'Users', type: 'array', root: true},
    http: {path: '/listUsers', verb: 'post'}
  })
  /**
   * permite setear permisos para usuarios especificos menos para si mismo
   * @param  Obj   user    User for at create permissions
   * @param  Obj  actions Acction at blocked or desbloked
   * @param  {Function} cb      callback continue
   * @return {[type]}           message succesfull operation
   */
  User.managmentPermission = (user, actions, cb) => {
    let create = [ ]
    actions.forEach((val, i) => {
      create.push({
        userId: user.id,
        actionId: val.id,
        status: val.status
      })
    })
    Utils.createPermission(user.id, create, (err, req) => {
      if (err) cb(err)
      cb(null, req)
    })
  }
  User.remoteMethod('managmentPermission', {
    accepts: [{arg: 'user', type: 'Object'},
              {arg: 'actions', type: 'Object'}],
    returns: {arg: 'data', type: 'Object', root: true},
    http: {path: '/managmentPermission', verb: 'post'}
  })
}
