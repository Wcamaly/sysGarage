'use strict'
const Utils = require('../../utils/utils')
const app = require('../../server/server')
const _  = require('lodash')
module.exports = (User) => {
  /**
   * [message description]
   * @type {String}
   */
  User.validatesUniquenessOf('email', {message: 'This user already exists'})
  User.validatesUniquenessOf('name', {message: 'This user already exists'})

  User.beforeRemote( 'create', function( context, user, next) {
    let typeUserCreate = String(context.args.data.userType).toLowerCase()
    let userId = context.req.accessToken ? context.req.accessToken.userId : null
    let perRoleCre = app.models.CreateRolePermissions

    // Define is posible Error
    let error = new Error()
    error.status = 401
    error.message = 'Authorization Required'
    error.code = 'AUTHORIZATION_REQUIRED'

    perRoleCre.find({
      include: [{
        relation:'role',
        scope:{
          fields: ['name','id']
        }
      },{
        relation:'createRole',
        scope:{
          where: {name: typeUserCreate},
          fields: ['name','id']
        }
      }]
    }, (err, res) => {

      try {
        if (err) throw err
        console.log(`first if ${res.createRole && userId}`)
      console.log(`!userId}`)

        if (res.createRole && userId) {
          User.findById(userId,{
            fields: {'username': false, 'email': false, 'id': true},
            include: {
              relation: 'role',
              fields: {'id': true, 'name': true, 'description': false, 'created': false, 'modified': false},
            }
          }, (err, res) => {
            if (err) throw err
            let roleId = res.role[0].id  // Is thought for if a user has more than one role but as is not the example is placed 0
            let auths = []
            auths =  _.find(res, (o) => { return o.role.id === roleId})
            if (auths.length > 0) {
             return next()
            } else throw error
          })
        } else if (res.createRole) throw error

        next()
      } catch (e) {
        console.log(e.message)
        next(e)
      }
    })
  })


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
        principalId: user.id,
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
    console.log('After Login')
    let RoleMapping = app.models.RoleMapping
    let Role = app.models.role
    let accesToken = context.result.id
    context.res.setAccesToken(accesToken)

    User.findById(context.result.userId,{
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
        }
      ]
    }, (err, res) => {
      try {
        console.log(`${err}`)
        if (err) throw err
        context.res.json(res)
      } catch (e) {
        let error = new Error('If an error occurred, please try again later')
        context.res.send(error)
      }

    })
  })
  /**
   * [description]
   * @param  {[type]}   userId [description]
   * @param  {Function} cb     [description]
   * @return {[type]}          [description]
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
        }
      ]
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
  /**
   * [description]
   * @param  {[type]}   user    [description]
   * @param  {[type]}   actions [description]
   * @param  {Function} cb      [description]
   * @return {[type]}           [description]
   */
  User.managmentPermission = (user,actions, cb) => {
    let perm = app.models.permissions
    let create = []
    actions.forEach((val, i) => {
      create.push({
        userId: user.id,
        actionId: val.id,
        status: val.status
      })
    })

    Utils.createPermission(user.id, create, (err, req) =>{
      if (err) cb(err)
      cb(null, req)
    })
  }
  User.remoteMethod('managmentPermission', {
    accepts: [{arg: 'user', type: 'Object'},
              {arg: 'actions', type: 'Object'}],
    returns: {arg: 'data', type: 'Object'},
    http: {path: '/managmentPermission', verb: 'post'}
  })
}
