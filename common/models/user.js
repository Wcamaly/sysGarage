'use strict'

module.exports = (User) => {
  User.validatesUniquenessOf('email', {message: 'This user already exists'})
  User.validatesUniquenessOf('name', {message: 'This user already exists'})

  User.listUsers = (cb) => {
  }
  User.remoteMethod('listUsers', {
    returns: {arg: 'Users', type: 'array'},
    http: {path: '/listUsers', verb: 'get'}
  })
}
