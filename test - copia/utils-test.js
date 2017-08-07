/**
 * Testing for utils
 */
const test = require('ava')
const Utils = require('../utils/utils')
const app = require('../server/server')
const fixtures = require('./fixtures/')
// const Promise = require('bluebird')

test.before('Start Sever', (t) => {
  app.start()
  // serverStart = new Promise((resolve) => {
  //   console.log('serverStart')
  //   app.on('started', () => {
  //     console.log('session')
  //     return resolve(true)
  //   })
  // })
})

test.afterEach('delete Role', (t) => {
  let Role = app.models.Role
  let RoleMapping = app.models.RoleMapping
  if (t.context.idRole) {
    Role.destroyAll({where: {id: t.context.idRole}}, (err) => {
      if (err) throw err
      console.log('delete role')
    })
  }
  if (t.context.idUser) {
    RoleMapping.destroyAll({where: {principalId: t.context.idUser}}, (err) => {
      if (err) throw err
      console.log('delete MApping')
    })
  }
})

test('Test Is Primo', (t) => {
  t.is(typeof Utils.primeNumber, 'function')

  let n0 = 7
  let n1 = 102881
  let n3 = 2
  let n4 = 90
  let n5 = 1000

  t.true(Utils.primeNumber(n0))
  t.true(Utils.primeNumber(n1))
  t.true(Utils.primeNumber(n3))
  t.false(Utils.primeNumber(n4))
  t.false(Utils.primeNumber(n5))
})

test('Create Role', (t) => {
  t.is(typeof Utils.createRole, 'function')
  let role = fixtures.getRole()

  app.on('started', () => {
    console.log('0')
    Utils.createRole(role, (req) => {
      console.log(`JSON.stringify(req)`)
      t.context.idRole = req.id
      t.is(req.name, role.name)
    })
  })
})
test('asign relation Role and id', (t) => {
  t.is(typeof Utils.relationMapingRole, 'function')

  let role = fixtures.getRole()
  app.on('started', () => {
    console.log('1')
    Utils.createRole(role, (req) => {
      app.models.Role.find({where: {id: req.id}}, (err, data) => { console.log(`Error ${err} ---- data ${JSON.stringify(data)}`) })
      // t.context.idRole = r.id
      console.log(`${JSON.stringify(req)}`)
      Utils.relationMapingRole({name: req.name, userId: 123}, (result) => {
        t.context.idUser = 123
        t.true(result)
      })
    })
  })
})

// test('asign relation Role and id error', async (t) => {
//   await serverStart
//   t.context.idUser = 123
//   t.throws(Utils.relationMapingRole('rolenovalid', 123), 'Error at create relations')
// })
