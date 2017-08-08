/**
 * Function utils
 */
const app = require('../server/server')
const message = require('../const/strings')

const Utils = {
  primeNumber,
  createRole,
  relationMapingRole,
  createAction,
  createPermission,
  relationActionsMapingRole
}
/**
 * primeNumber  Calculator is prime num
 * @param  Number num is number
 * @return Boolean     Response
 */
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
/**
 * [createRole Create Role by obj]
 * @param  Array/object   obj Cotains the roles at create
 * @param  {Function} cb  callback to ejecuter finished created
 * @return Array/object       roles created
 */
function createRole (obj, cb) {
  let Role = app.models.role
  Role.find({where: {name: obj.name}}, (err, data) => {
    if (err) {
      throw err
    }
    if (data.length === 0) {
      Role.create([{
        name: obj.name,
        description: obj.description
      }], (err, role) => {
        if (err) {
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
  let Role = app.models.role
  let Mapping = app.models.RoleMapping

  Role.findOne({
    where: {
      name: obj.name
    }
  }, (err, role) => {
    if (err || role === null) {

      return cb(message.errorCreateRoleMapping, null)
    } else {
      role.principals.create({
        principalType: Mapping.USER,
        principalId: obj.principalId
      }, (err, principal) => {
        if (err) throw err
        return cb(null, principal)
      })
    }
  })
}

function relationActionsMapingRole (obj, cb) {
  let Role = app.models.role
  let Mapping = app.models.ActionMapping

  Role.findOne({
    where: {
      name: obj.name
    }
  }, (err, role) => {
    if (err || role === null) {
      return cb(message.errorCreateRoleMapping, null)
    } else {
      Mapping.create({
        principalType: Mapping.ACTIONS,
        actionsId: obj.principalId,
        roleId: role.id
      }, (err, mapping) => {
        if (err) throw err
        return cb(null, mapping)
      })
    }
  })
}

function createAction (obj, cb) {
  console.log('llego hasta aca soy un grande')
  let Actions = app.models.actions

  Actions.create(obj, (err, action) => {

    if (err) throw err
    cb(action)
  })
}

function createPermission(obj, cb) {
  let Perm = app.models.permissions
  Perm.upsert(obj, (err, perm) => {
     console.log(`ERROR ${err} -- ${JSON.stringify(perm)}`)
    if (err) cb(err, null)
    cb(null,perm)
  })
}

module.exports = Utils
