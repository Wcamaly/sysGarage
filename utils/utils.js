/**
 * Function utils
 */
const app = require('../server/server')
const message = require('../const/strings')

const Utils = {
  primeNumber,
  createRole,
  relationMapingRole
}

function primeNumber (num) {
  let prime = true
  if (num === 1 || num === 2) {
    return prime
  } else {
    let i = 2
    let front = Math.sqrt(num)
    while (i <= front && prime) {
      if ((num % i) !== 0) {
        i++
      } else {
        prime = false
      }
    }
  }
  return prime
}

function createRole (obj, cb) {
  let Role = app.models.Role
  Role.find({where: {name: obj.name}}, (err, data) => {
    if (err) {
      console.log('error 1')
      throw err
    }
    if (data.length === 0) {
      Role.create([{
        name: obj.name,
        description: obj.description
      }], (err, role) => {
        if (err) {
          console.log('error 2')
          throw err
        }
        cb(role[0])
      })
    } else {
      cb(data[0])
    }
  })
}

function relationMapingRole (obj, cb) {
  let Role = app.models.Role
  let RoleMapping = app.models.RoleMapping
  Role.findOne({
    where: {
      name: obj.name
    }
  }, (err, role) => {
    if (err || role === null) {
      return cb(message.errorCreateRoleMapping, null)
    } else {
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: obj.userId
      }, (err, principal) => {
        if (err) throw err
        return cb(null, principal)
      })
    }
  })
}

module.exports = Utils
