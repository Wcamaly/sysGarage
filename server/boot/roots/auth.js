/**
 * Route for Security
 */
const app = require('../../server.js')
const message = require('../../../const/strings')
const Utils = require('../../../utils/utils') // eslint-disable-line
const Routers = app.loopback.Router()
const User = app.models.user

Routers.post('/login', (req, res) => {
  User.login(req, (err, token) => {
    if (err) {
      let idUSer = token.getI
    }
  })
})
Routers.post('/logout', (req, res) => {})

Routers.post('/signUp', (req, res) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }
  if (!req.body.usertype) throw new Error(message.erroDataInvalid)
  User.create(newUser, (err, user) => {
    if (err) {
      if (String(err).indexOf('ValidationError') !== -1) {
        return res.status(200).send(JSON.stringify({message: message.errorUserExist}))
      } else throw err
    }

    let obj = {
      name: req.body.usertype,
      userId: user.id
    }
    Utils.relationMapingRole(obj, (err, req) => {
      if (err) {
        console.log(`ERRRORRRR ${err}`)
        User.destroyAll({where: {id: user.id}})
        return res.status(500).send({message: String(err)})
      }
      delete user.password
      delete user.email
      res.status(201).send(JSON.stringify(user))
    })
  })
})

module.exports = Routers
