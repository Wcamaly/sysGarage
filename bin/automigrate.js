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
 * Create Role Table
 * @param  String 'Role' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('role', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations your created Table extendRole')
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
/**
 * Create Table actions
 * @param  String 'actions' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('actions', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table Actions')
  db.disconnect()
})
/**
 * Create Table permissions
 * @param  String 'permissions' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('permissions', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table Permissions')
  db.disconnect()
})
/**
 * Create Table ActionMapping
 * @param  String 'ActionMapping' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('ActionMapping', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table ActionMapping')
  db.disconnect()
})
/**
 * Create Table CreateRolePermissions
 * @param  String 'CreateRolePermissions' Name for Model
 * @param  function (err)  callback to promises
 */
db.automigrate('CreateRolePermissions', (err) => {
  if (err) throw new Error(err)
  console.log('Congratulations you created table ActionMapping')
  db.disconnect()
})
