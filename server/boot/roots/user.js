/**
 * Route for de users 
 */

const app = require('../../server.js');
const Routers = app.loopback.Router();


Routers.post('/signUpAdmin', (req, res) => {
  res.send(JSON.stringify({sss:'ss'}))
});
Routers.post('/getPrimeNumber', (req, res) => {
  
})
Routers.post('/managmentPermit', (req, res) => {
  
})
Routers.post('/getUsers', (req, res) => {
  
})
Routers.post('/getListNumbers', (req, res) => {
  
})


module.exports = Routers


