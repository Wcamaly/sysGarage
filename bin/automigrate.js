/**
 *
 * Create Tables in data base
 *
 */

// APP SERVER
const app = require('../server/server.js')
// Instance db
const db = app.dataSources.mysqlDb

// List to Models

/**
 * Create Role Table
 * @param  String 'Role' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('Role', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations your created Table Roles')
  db.disconnect()
})
/**
 * Create Table Role Mapping
 * @param  String 'RoleMapping' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('RoleMapping', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table RoleMapping')
  db.disconnect()
})
/**
 * Create Table AccessToken
 * @param  String 'AccessToken' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('AccessToken', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations your created  table AccessToken')
  db.disconnect()
})
/**
 * Create Table ACL
 * @param  String 'ACL' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('ACL', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table ACL')
  db.disconnect()
})
/**
 * Create Table User
 * @param  String 'User' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('user', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table User')
  db.disconnect()
})
