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
    let RoleMapping = app.models.RoleMapping
    let Role = app.models.role
    let accesToken = context.result.id
    context.res.setAccesToken(accesToken)
    console.log('user remote logi')

    User.findById(context.result.userId,{
      fields: {'username': true, 'email': true, 'id': true},
      include: {
        relation: 'role'
      }
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

  User.listUsers = (userId, cb) => {
    console.log(`primero aqui`)
    User.find({
      where: {id: {nin: [userId]}},
      fields: {'username': true, 'email': true, 'id': true},
      include: {
        relation: 'role', // include the owner object
        scope: { // further filter the owner object
          fields: {'name': true} // only show two fields
        }
      }
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

  User.managmentPermission = (user,actions, cb) => {
    let perm = app.models.permissions
    let create = []
    // actions.forEach((val, i) => {
    //   create.push({
    //     userId: user.id,
    //     actionId: val.actionId,
    //     status: val.status
    //   })
    // })
    //  Utils.createPermission(create,
    //   (err, res) => {
    //     console.log(`Erro --- ${JSON.stringify(res)}`)
    //     if (err) return cb(err)
    //     return cb(null, { satus: "Succesfull" })
    //   })


    actions.forEach((val, i) => {
      perm.findOne({where: {
          userId: user.id,
          actionId: val.actionId
      }},
      (err, res) => {
        if (err) return cb(err)
        if (res) {
          res.satus = val.status
          res.save()
          response.push(res)
        } else {
          Utils.createPermission({
            userId: user.id,
            actionId: val.actionId,
            status: val.status
          },
          (err, res) => {
            console.log(`Erro --- ${i}`)
            if (err) return cb(err)
            console.log('Creamos todo voy a continuar OK')
            response.push(res)

          })
        }


       if( i === actions.length-1){

       }
      })
    })




  }
  User.remoteMethod('managmentPermission', {
    accepts: [{arg: 'user', type: 'Object'},
              {arg: 'actions', type: 'Object'}],
    returns: {arg: 'data', type: 'Object'},
    http: {path: '/managmentPermission', verb: 'post'}
  })

}
