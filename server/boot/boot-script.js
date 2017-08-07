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
      Utils.createRole(val, (req) => {
        console.log(`Se creo el Role ${req.name}`)
      })
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
        if (!req) {
          let options = {
            method: 'POST',
            url: `${app.get('url')}/api/users/`,
            json: true,
            body: val
          }
          request(options)
        }
      })
    })
  })
}
