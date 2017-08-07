/**
 * Route for de users
 */

const app = require('../../server.js')
const Routers = app.loopback.Router()

Routers.post('/signUpAdmin', (req, res) => {
})
Routers.post('/getPrimeNumber', (req, res) => {
})
Routers.post('/managmentPermit', (req, res) => {
})
Routers.post('/getUsers', (req, res) => {
})
Routers.post('/getListNumbers', (req, res) => {
})
Routers.post('/isPrimeNumber', (req, res) => {
})

module.exports = Routers
