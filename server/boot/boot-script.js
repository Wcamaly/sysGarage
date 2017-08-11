/**
 * description
 */
const Utils = require('../../utils/utils')  // eslint-disable-line
const request = require('request-promises')  // eslint-disable-line
const _ = require('lodash')
const defaults = require('../../const/defaults')
module.exports = (app) => {
  app.on('started', () => {
    /**
     * We assign that role you can create users with whom you role
     * @message congratulation
     */
    function createRolesPermission (roles) {
      let asignRolePermitionCreate = defaults.asignRolePermitionCreateDefault
      _.forEach(roles, (val, i) => {
        let ind = _.findIndex(asignRolePermitionCreate, (o) => { return o.role === val.name })
        if (ind !== -1) {
          let listId = []
          asignRolePermitionCreate[ind].crole.forEach((val, i) => {
            let index = _.findIndex(roles, (o) => { return o.name === val })
            listId.push(roles[index].id)
          })
          Utils.asignRolePermCreate({
            roleId: val.id,
            listIds: listId
          }, (err, res) => {
            if (err) throw err
            console.log(`Congratulations to created role assignment you can create user with role`)
          })
        }
      })
    }
    /**
     * Create User Admin
     */
    function createUsers (cb, cbParam) {
      let createUsers = defaults.userDefault
      createUsers.forEach((val, i) => {
        app.models.user.findOne({where: {
          username: val.username
        }}, (err, req) => {
          if (err) throw err
          if (!req) {
            let options = {
              method: 'POST',
              url: `${app.get('url')}api/users/`,
              json: true,
              body: val
            }
            request(options).then(() => {
              cb(cbParam)
            })
          }
        })
      })
    }
    /**
     * Create Roles Admin
     */
    let croles = defaults.rolesDefault

    if (typeof Utils.createRole === 'function') {
      Utils.createRole(croles, (err, roles) => {
        if (err) throw err
        createUsers(createRolesPermission, roles)
      })
    }

    /**
     * Action Defaults
     */
    let actions = defaults.actionsDefault
    /**
     * [ACTIONS description]
     * @type {String}
     */
    app.models.ActionMapping.ACTIONS = 'ACTIONS'
    /**
     * [description]
     * @param  {[type]}   options.where: {actionName: actions[0].actionName} [description]
     * @param  {Function} (err,          req)          [description]
     * @param  {[type]}   (err,          req           [description]
     * @return {[type]}                  [description]
     */
    app.models.actions.findOne({where: {actionName: actions[0].actionName}}, (err, req) => {
      if (err) throw err
      if (!req) {
        Utils.createAction(actions, (req) => {
          /**
           * Create Action Relation Role
           */
          let actionsRole = defaults.actionsRoleDefault
          req.forEach((val, i) => {
            if (actionsRole.admin.indexOf(val.actionName) > -1) {
              Utils.relationActionsMapingRole({
                name: 'admin',
                principalId: val.id
              }, (err, req) => {
                if (err) throw new Error(err)
                console.log('excelten create relation Actions')
              })
            }
            if (actionsRole.client.indexOf(val.actionName) > -1) {
              Utils.relationActionsMapingRole({
                name: 'client',
                principalId: val.id
              }, (err, req) => {
                if (err) throw new Error(err)
                console.log('excelten create relation Actions')
              })
            }
          })
        })
      }
    })
  })
}
