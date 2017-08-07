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
      //  Utils.createRole(val)
    })

    /**
     * Create User Admin
     */
    // let createUsers = [{
    //   username: 'admin',
    //   email: 'wall@gmail.com',
    //   password: '1234',
    //   usertype: 'admin'
    // },
    // {
    //   username: 'client',
    //   email: 'jane@gmail.com',
    //   password: 'admin',
    //   usertype: 'client'
    // }]
    // createUsers.forEach((val, i) => {
    //   let options = {
    //     method: 'POST',
    //     url: `app.get('url')/auth/signUp`,
    //     json: true,
    //     body: val
    //   }
    //   request(options)
    // })
  })
}
