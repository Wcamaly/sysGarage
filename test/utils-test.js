/**
 * Testing for utils
 */
const test = require('ava')
const Utils = require('../utils/utils')
const app = require('../server/server')
const fixtures = require('./fixtures/')
const Promise = require('bluebird')
/**
 * Started APP
 */
test.before('Start app', async (t) => {
  if (!app.status) {
    app.start()
    await new Promise((resolve) => {
      app.on('started', () => {
        console.log('Started Server')
        resolve()
      })
    })
  }
  t.is(typeof Utils.createRole, 'function')
  let role = [fixtures.getRole()]
  let result = await new Promise((resolve) => {
    Utils.createRole(role, (err, req) => {
      if (err) throw err // Faild Get database not Test this cases
      resolve(req)
    })
  })

  t.is(result[0]['name'], role[0].name)
})
/**
 * Delete Elements for test
 */
test.after('delete Elements', async (t) => {
  console.log('delete Elements')
  let Role = app.models.role
  let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    Role.destroyAll({where: {name: 'testing'}}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    RoleMapping.destroyAll({where: {principalId: '123'}}, (err) => {
      if (err) throw err
      resolve()
    })
  })
})
/**
 * [description]
 * @param  {[type]} 'Test Is            Primo' [description]
 * @param  {[type]} (t    [description]
 * @return {[type]}       [description]
 */
test('Test Is Primo', (t) => {
  console.log('Test Is Primo')
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
/**
 * [description]
 * @param  {[type]}   'asign relation      Role          and id' [description]
 * @param  {Function} async  (t)           [description]
 * @param  {[type]}   (err,  res           [description]
 * @return {[type]}          [description]
 */
test('asign relation Role and id', async (t) => {
  t.is(typeof Utils.relationMapingRole, 'function')
  let role = fixtures.getRole()

  let result = await new Promise((resolve, reject) => {
    Utils.relationMapingRole({
      name: role.name,
      principalId: 123
    }, (err, res) => {
      if (err) reject(new Error(err))
      resolve(res)
    })
  })

  t.is(result.principalId, '123')
})
/**
 * [description]
 * @param  {[type]}   'asign relation      Role          and id error' [description]
 * @param  {Function} async  (t)           [description]
 * @param  {[type]}   (err,  res           [description]
 * @return {[type]}          [description]
 */
test('asign relation Role and id error', async (t) => {
  console.log('asign relation Role and id error')
  let result = new Promise((resolve, reject) => {
    Utils.relationMapingRole({
      name: 'testindErrror',
      principalId: 123
    }, (err, res) => {
      if (err) reject(new Error(err))
      resolve(res)
    })
  })
  await t.throws(result, /Error at create relations/)
})

test('relationActionsMapingRole', async (t) => {
  t.is(typeof Utils.relationActionsMapingRole, 'function')

})
