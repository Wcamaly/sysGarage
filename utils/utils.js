/**
 * Function utils
 */
const app = require('../server/server')
const message = require('../const/strings')
const _  = require('lodash')
/**
 * [Utils description]
 * @type {Object}
 */
const Utils = {
  primeNumber,
  createRole,
  relationMapingRole,
  createAction,
  createPermission,
  relationActionsMapingRole,
  asignRolePermCreate
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
  let respon = []
  let crear = []
  Role.find({}, (err, req) => {
    if (err) throw err
    if (req.length > 0) {
      obj.forEach((val, i) => {
        let exist = _.findIndex(req, function(o) { return o.name ==  val.name})
        if (exist !== -1) {
          respon.push(req[exist])
        } else {
          crear.push(val)
        }
      })
    } else {
      crear = _.concat(crear, obj)
    }
    Role.create(crear, (err, roles) => {
      if (err) throw err
      cb(null, _.concat(respon, roles))
    })
  })





  Role.find({where: {name: obj.name}}, (err, data) => {
    if (err) {
      throw err
    }
    if (data.length === 0) {

    } else {
      cb(data[0])
    }
  })
}
/**
 * [relationMapingRole description]
 * @param  {[type]}   obj [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
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
/**
 * [relationActionsMapingRole description]
 * @param  {[type]}   obj [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
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
/**
 * [createAction description]
 * @param  {[type]}   obj [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function createAction (obj, cb) {
  console.log('llego hasta aca soy un grande')
  let Actions = app.models.actions

  Actions.create(obj, (err, action) => {

    if (err) throw err
    cb(action)
  })
}
/**
 * [createPermission description]
 * @param  {[type]}   userId [description]
 * @param  {[type]}   obj    [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
function createPermission(userId, obj, cb) {
  let Perm = app.models.permissions
  let aCrear = []
  Perm.find({where: {userId: userId}}, (err, permis) => {
    if (err) cb(err)
    if (permis.length > 0){
      obj.forEach((val, i) => {
        let exist = _.findIndex(permis, function(o) { return o.actionId ==  val.actionId})
        if (exist !== -1) {
          permis[exist].status = val.status
          permis[exist].save();
        } else {
             aCrear.push(val)
        }
      })
    } else {
         aCrear = _.concat(aCrear,obj);
    }
    console.log(`${JSON.stringify(aCrear)}`)
    if (aCrear.length > 0) {
       Perm.create(aCrear, (err, perm) => {
        if (err) cb(err, null)
        cb(null, {status: message.statusSussesfull})
      })
    } else {
      cb(null, {status: message.statusSussesfull})
    }
  })
}
function asignRolePermCreate (listperm, cb) {
  let croleperm = app.models.CreateRolePermissions

  listperm.listIds.forEach((val, i, arr) => {
    croleperm.findOne({
      roleId: listperm.roleId,
      createRoleId: val
    }, (err, req) => {
      if (err) throw err
      if (!req) {
        croleperm.create({
          roleId: listperm.roleId,
          createRoleId: val
        }, (err, res) => {
          if (err) throw err
        })
      }
    })
  })
  cb()

}
module.exports = Utils
