/**
 * 
 * Create Tables in data base 
 * 
 */

// APP SERVER 
const app = require('../server/server.js');
// Instance db
const db = app.dataSources.mysqlDb;
const User = app.models.User;
const Role = app.models.Role;

// List to Models 
let models = ['User','AccessToken','ACL','RoleMapping','Role'];


db.automigrate(models, (err) => {
  if (err) throw new Error(err);
  console.log("Congratulations you created the tables successfully ");
  //Create User Admin if not exist 
  User.create([
    {"username": "clientes", "email": "johns@doe.com", "password": "1234"},
    {username: 'admin', email: 'jane@doe.com', password: 'admin'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    console.log(err)
    if (err) throw err;

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        cb(err);
      });
    });
  });

  db.disconnect();
})

