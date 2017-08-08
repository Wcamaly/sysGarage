/**
 * Create Role and user Base
 */
const Utils = require('../../utils/utils')  // eslint-disable-line
const request = require('request-promises')  // eslint-disable-line
module.exports = (app) => {
  app.on('started', () => {

    /**
     * Create Roles Admin
     */
    let croles = [{
      name: 'client',
      description: 'Is Role for client'
    }, {
      name: 'admin',
      description: 'Is Role for admin'
    }]
    croles.forEach((val, i) => {
      if (typeof Utils.createRole === 'function') {
        Utils.createRole(val, (req) => {
          console.log(`Se creo el Role ${req.name}`)
        })
      }
    })

    /**
     * Create User Admin
     */
    let createUsers = [{
      username: 'admin',
      email: 'admin@gmail.com',
      password: '1234',
      usertype: 'admin'
    },
    {
      username: 'client',
      email: 'client@gmail.com',
      password: 'client',
      usertype: 'client'
    }]
    createUsers.forEach((val, i) => {
      app.models.user.findOne({where: {
        username: val.username
      }}, (err, req) => {
        if (err) throw err
        console.log(`URL ${app.get('url')}`)
        if (!req) {
          let options = {
            method: 'POST',
            url: `${app.get('url')}api/users/`,
            json: true,
            body: val
          }
          request(options)
        }
      })
    })

    /**
     * Action Defaults
     */
    let actions = [{
      actionName: 'create',
      description: 'Create User Admin'
    },
    {
      actionName: 'calcPrime',
      description: 'Calculater if number is prime'
    },
    {
      actionName: 'managmentPermission',
      description: 'Managment permissions'
    },
    {
      actionName: 'listUsers',
      description: 'Get list User'
    }]

    app.models.ActionMapping.ACTIONS = 'ACTIONS'

    app.models.actions.findOne({where: {actionName: actions[0].actionName}}, (err, req) => {
      if (err) throw err
      if (!req) {
        Utils.createAction(actions, (req) => {
          /**
           * Create Action Relation Role
           */
          let actionsRole  = {
            'admin': ['create', 'managmentPermission', 'listUsers'],
            'client': ['calcPrime']
          }
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
