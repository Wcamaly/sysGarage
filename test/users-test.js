/**
 * Testin Authorization
 */

const test = require('ava') // eslint-disable-line
const app = require('../server/server') // eslint-disable-line
const request = require('request-promises') // eslint-disable-line
const fixtures = require('./fixtures/') // eslint-disable-line
const listen = require('test-listen') // eslint-disable-line
const Utils = require('../utils/utils') // eslint-disable-line
const Promise = require('bluebird')
let url

test.before('Start app', async (t) => {
  if (!app.status) {
    let srv = app.start()
    await new Promise((resolve) => {
      app.on('started', () => {
        resolve()
      })
    })
    url = await listen(srv)
  }

  let role = fixtures.getRole()
  await new Promise((resolve) => {
    Utils.createRole(role, (req) => {
      resolve(req)
    })
  })
})

// test.beforeEach('instance URL', async (t) => {
//   t.context.url = await listen(srv)
// })

test.after('delete Elements', async (t) => {
  let Role = app.models.Role
  let RoleMapping = app.models.RoleMapping
  // let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    Role.destroyAll({where: {name: 'testing'}}, (err) => {
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
test.afterEach('delete Users', async (t) => {
  let User = app.models.user
  // let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    User.destroyAll({where: {id: t.context.idUser}}, (err, info) => {
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
  t.context.idUser = res.body.id
  t.is(res.statusCode, 200)
  t.deepEqual(res.body.username, user.username)
})
/**
 * Sign UP fail user repeat
 */
// test('SignUp Client user repeat', async (t) => {
//   let user = fixtures.getUser()
//   let options = {
//     method: 'POST',
//     url: `${url}/api/users`,
//     json: true,
//     body: user,
//     resolveWithFullResponse: true
//   }
//   let res = await request(options)
//   t.context.idUser = res.body.id
//   let duplicate = await
//   t.throw(request(options), /ValidationError/)
//   t.is(duplicate.statusCode, 422)
//   t.deepEqual(duplicate.body.error.name, 'ValidationError')
// })
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
  t.is(result.body.error.message, 'el inicio de sesión ha fallado')
})
/**
 * List user
 */
test('List User', async (t) => {
  let user = fixtures.getUser()
  user.userType = 'admin'
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
  result.body.Users.forEach((val, i) => {
    t.false(val.id === response.body.id)
  })
})
