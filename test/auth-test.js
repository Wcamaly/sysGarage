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
        console.log('Started Server')
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
  // let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    Role.destroyAll({where: {name: 'testing'}}, (err) => {
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
      console.log(`info delete ${JSON.stringify(info)}`)
      resolve()
    })
  })
})

/**
 * SignUp sussesfull
 */
test('SignUp Client susseful', async (t) => {
  let user = fixtures.getUser()
  // let url = t.context.url
  let options = {
    method: 'POST',
    url: `${url}/auth/signUp`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }

  let res = await request(options)
  t.is(res.statusCode, 201)
  t.context.idUser = res.body.id
  t.is(res.body.username, user.username)
})

/**
 * Sign UP fail user repeat
 */
test('SignUp Client user repeat', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/auth/signUp`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }
  let res = await request(options)
  t.context.idUser = res.body.id
  let duplicate = await request(options)

  t.is(duplicate.statusCode, 200)
  t.deepEqual(duplicate.body.message, 'This user already exists')
})
/**
 * Sign UP fail user repeat
 */
test('SignUp Client user Role no exist', async (t) => {
  let user = fixtures.getUser()
  user.usertype = 'admin'
  let options = {
    method: 'POST',
    url: `${url}/auth/signUp`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }
  let res = await request(options)
  t.context.idUser = res.body.id

  t.is(res.statusCode, 500)
  t.deepEqual(res.body.message, 'Error at create relations')
})

/**
 * Login user
 */
test('Login User', async (t) => {
  let user = fixtures.getUser()
  let options = {
    method: 'POST',
    url: `${url}/auth/signUp`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }
  let res = await request(options)
  t.context.idUser = res.body.id
  let credential = {
    username: user.username,
    password: user.password
  }
  let optionsLogin = {
    method: 'POST',
    url: `${url}/auth/login`,
    json: true,
    body: credential,
  }

  let result = awai request(optionsLogin)
  t.is(result.statusCode, 200)
  consle.log(`${JSON.stringify(result)}`)





})
