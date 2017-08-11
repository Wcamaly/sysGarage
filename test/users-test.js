/**
 * Testin Authorization
 */

const test = require('ava')
const app = require('../server/server')
const request = require('request-promises')
const fixtures = require('./fixtures/')
const listen = require('test-listen')
const Utils = require('../utils/utils')
const Promise = require('bluebird')
const _ = require('lodash')
let url
/**
 * Start App
 */
test.before('Start app', async (t) => {
  if (!app.status) {
    let srv = app.start()
    await new Promise((resolve) => {
      app.on('started', () => {
        resolve()
      })
    })
    url = await listen(srv)
    let role = [fixtures.getRole()]
    await new Promise((resolve) => {
      Utils.createRole(role, (req) => {
        resolve(req)
      })
    })
  }
})
/**
 * Delete Elements
 */
test.after('delete Elements', async (t) => {
  let Role = app.models.role
  let RoleMapping = app.models.RoleMapping
  // let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    Role.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    RoleMapping.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
})
/**
 * [description]
 * @param  {[type]}   'delete Users'        [description]
 * @param  {Function} async   (t)           [description]
 * @param  {[type]}   (err,   info          [description]
 * @return {[type]}           [description]
 */
test.afterEach('delete Users', async (t) => {
  let User = app.models.user
  // let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    User.destroyAll({}, (err, info) => {
      if (err) throw err
      resolve()
    })
  })
})
/**
 * SignUp sussesfull
 */
test('Create user susseful', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/api/users`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }

  let res = await request(options)

  t.context.idUser = res.body.data.id
  t.is(res.statusCode, 200)
  t.deepEqual(res.body.data.username, user.username)
})
/**
 * Sign UP fail role no exist
 */
test('SignUp Client user Role no exist', async (t) => {
  let user = fixtures.getUser()
  user.userType = 'error'
  let options = {
    method: 'POST',
    url: `${url}/api/users`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }
  let res = await request(options)
  t.context.idUser = res.body.id

  t.is(res.statusCode, 400)
  t.deepEqual(res.body.error.message, 'Error at create relations')
})
/**
 * Login user
 */
test('Login User', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/api/users`,
    json: true,
    body: user
  }
  let res = await request(options)
  t.context.idUser = res.body.id

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

  let result = await request(optionsLogin)
  t.is(result.statusCode, 200)
  t.is(result.body.username, user.username)
})
/**
 * Login user
 */
test('Login User error credential', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/api/users`,
    json: true,
    body: user
  }
  let res = await request(options)
  t.context.idUser = res.body.id

  let credential = {
    email: user.email,
    password: 'passwordEror'
  }
  let optionsLogin = {
    method: 'POST',
    url: `${url}/api/users/login`,
    json: true,
    body: credential,
    resolveWithFullResponse: true
  }

  let result = await request(optionsLogin)

  t.is(result.statusCode, 401)
  t.is(result.body.error.name, 'Error')
})
/**
 * List user
 */
test('List User', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/api/users`,
    json: true,
    body: user
  }
  let res = await request(options)
  t.context.idUser = res.body.id

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
    url: `${url}/api/users/listUsers?access_token=${accessToken}`,
    json: true,
    body: {
      userId: response.body.id
    },
    resolveWithFullResponse: true
  }

  let result = await request(optionsListUser)

  t.is(result.statusCode, 200)
  let ind = _.find(result.body.data, (o) => { return o.id === response.body.id })
  t.is(ind, undefined)
})
test.serial(t => {
  t.pass()
})
