/**
 * 
 * Create Tables in data base 
 * 
 */

// APP SERVER 
const app = require('../server/server.js');
// Instance db
const db = app.dataSources.mysqlDb;

// List to Models 
let models = ['User','AccessToken','ACL','RoleMapping','Role'];


db.automigrate(models, (err) => {
  if (err) throw new Error(err);
  console.log("Congratulations you created the tables successfully ");
  db.disconnect();
})

