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
 * Delete Role
 */
test.after('Delete Role', async (t) => {
  let Role = app.models.role
  await new Promise((resolve) => {
    Role.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
})
/**
 * Delete Elements for test
 */
test.afterEach('delete Elements', async (t) => {
  let RoleMapping = app.models.RoleMapping
  await new Promise((resolve) => {
    RoleMapping.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    let Mapping = app.models.ActionMapping
    Mapping.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    let Actions = app.models.actions
    Actions.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    let Perm = app.models.permissions
    Perm.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    let croleperm = app.models.CreateRolePermissions
    croleperm.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
  await new Promise((resolve) => {
    let User = app.models.user
    User.destroyAll({}, (err) => {
      if (err) throw err
      resolve()
    })
  })
})
/**
 * Test if prime number
 */
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
/**
 * Asign Role for Id
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
 * Test Error Asign Role user
 */
test('asign relation Role and id error', async (t) => {
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
/**
 * Test Relation Action whit Role
 */
test('relationActionsMapingRole', async (t) => {
  t.is(typeof Utils.relationActionsMapingRole, 'function')
  let ejem = {
    name: 'testing',
    principalId: 1
  }
  let result = await new Promise((resolve) => {
    Utils.relationActionsMapingRole(ejem, (err, res) => {
      if (err) throw err
      resolve(res)
    })
  })
  t.is(result.actionsId, ejem.principalId)
})
/*
* Creat Action
 */
test('createAction', async (t) => {
  t.is(typeof Utils.createAction, 'function')
  let data = [{
    actionName: 'createTesting',
    description: 'Create User testing'
  }]
  await new Promise((resolve) => {
    Utils.createAction(data, (resp) => {
      t.is(resp[0].actionName, data[0].actionName)
      resolve()
    })
  })
})
/**
* Test Create permission
 */
test('createPermission', async (t) => {
  t.is(typeof Utils.createPermission, 'function')
  let us = fixtures.getUser()
  let User = app.models.user
  await new Promise((resolve) => {
    User.create(us, (err, user) => {
      if (err) throw err
      let data = {
        actionId: 1,
        status: true,
        userId: user.id
      }
      t.context.userId = user.id
      Utils.createPermission(user.id, data, (err, resp) => {
        if (err) throw err
        t.is(resp.status, 'Ok')
        resolve()
      })
    })
  })
})

test.serial(t => {
  t.pass()
})
