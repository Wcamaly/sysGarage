/**
 * Testin Authorization
 */

const test = require('ava')
const app = require('../server/server')
const request = require('request-promises')
const fixtures = require('./fixtures/')
const listen = require('test-listen')
const Promise = require('bluebird')
const Utils = require('../utils/utils')
let url
/**
 * Initialize Sever
 */
test.before('Start app', async (t) => {
  try {
    if (!app.status) {
      let srv = app.start()
      await new Promise((resolve) => {
        app.on('started', () => {
          resolve()
        })
      })
      url = await listen(srv)
    }
    let role = [fixtures.getRole()]
    await new Promise((resolve, reject) => {
      Utils.createRole(role, (err, req) => {
        if (err) reject(err)
        resolve(req)
      })
    })
    let user = fixtures.getUser()
    let options = {
      method: 'POST',
      url: `${url}/api/users`,
      json: true,
      body: user
    }
    await request(options)
  } catch (e) { console.log(e) }
})
/**
 * Delete All Element
 */
test.after('delete Users', async (t) => {
  let User = app.models.user
  let Role = app.models.role
  let RoleMapping = app.models.RoleMapping
  try {
    await new Promise((resolve, reject) => {
      User.destroyAll({}, (err, info) => {
        if (err) reject(err)
        resolve()
      })
    })
    await new Promise((resolve, reject) => {
      Role.destroyAll({where: {name: 'testing'}}, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
    await new Promise((resolve, reject) => {
      RoleMapping.destroyAll({}, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  } catch (e) {
    console.log(e)
  }
})
/**
 * SignUp sussesfull
 */
test('Calculator if prime number', async (t) => {
    let user = fixtures.getUser()
    let credential = {
      email: user.email,
      password: user.password
    }
    let optionsLogin = {
      method: 'POST',
      url: `${url}/api/users/login`,
      json: true,
      body: credential,
      resolveWithFullResponse: true
    }

    let response = await request(optionsLogin)
    let auth = String(response.headers['x-access-token'])

    let i = auth.indexOf(':') + 1
    let accessToken = auth.substr(i, auth.length).replace(/ /g, '')

    let optionsListUser = {
      method: 'POST',
      url: `${url}/api/PrimeNumbers/calcPrime?access_token=${accessToken}`,
      json: true,
      body: {
        number: 3
      }
    }
    let result = await request(optionsListUser)
    t.true(result.body.data.prime)
})
