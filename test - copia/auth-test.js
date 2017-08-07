/**
 * Testin Authorization
 */

const test = require('ava') // eslint-disable-line
const app = require('../server/server') // eslint-disable-line
const request = require('request-promises') // eslint-disable-line
const fixture = require('./fixtures/') // eslint-disable-line
const listen = require('test-listen') // eslint-disable-line
const Utils = require('../utils/utils') // eslint-disable-line

test.todo('genereate')

// test.beforeEach('Create Server listener', async (t) => {
//   let srv = await app.start()
//   let role = fixture.getRole()
//   let resRole = await Utils.createRole(role)
//   t.context.idRole = resRole.id
//   t.context.url = await listen(srv)
// })
// test.afterEach('delete user', async (t) => {
//   let User = app.models.user
//   let Role = app.models.Role
//   let RoleMapping = app.models.RoleMapping
//   await Role.destroyAll({where: {principalId: t.context.idRole}}, (err) => {
//     if (err) throw err
//     console.log('delete Role')
//   })
//   await RoleMapping.destroyAll({where: {principalId: t.context.idUser}}, (err) => {
//     if (err) throw err
//     console.log('delete MApping')
//   })
//   await User.destroyAll({where: {id: t.context.idUser}}, (err) => {
//     if (err) throw err
//     console.log(`delete user ${t.context.idUser}`)
//   })
// })
/**
 * SignUp sussesfull
 */
// test('SignUp Client susseful', async (t) => {
//   let user = fixture.getUser()
//   let url = t.context.url
//   console.log(`URL - ${url}/auth/signUp`)
//   let options = {
//     method: 'POST',
//     url: `${url}/auth/signUp`,
//     json: true,
//     body: user,
//     resolveWithFullResponse: true
//   }

//   let res = await request(options)
//   t.is(res.statusCode, 201)
//   t.context.idUser = res.body.id
//   t.is(res.body.username, user.username)
// })
/**
 * Sign UP fail user repeat
 */
// test('SignUp Client user repeat', async (t) => {
//   let user = fixture.getUser()
//   let url = t.context.url
//   let options = {
//     method: 'POST',
//     url: `${url}/auth/signUp`,
//     json: true,
//     body: user,
//     resolveWithFullResponse: true
//   }
//   let res = await request(options)
//   t.context.idUser = res.body.id
//   let duplicate = await request(options)

//   t.is(duplicate.statusCode, 200)
//   t.deepEqual(duplicate.body.menssage, 'This user already exists')
// })
