'use strict'

const loopback = require('loopback')
const boot = require('loopback-boot')
const at = require('./boot/middleware/accesToken')
const app = module.exports = loopback()
const bodyParser = require('body-parser')
const errorHandler = require('strong-error-handler')

app.use(bodyParser.urlencoded())

//  Parsing to be able to handle json in the answers
app.use(bodyParser.json())

app.use(loopback.token())

app.use(loopback.token({
  cookies: ['access_token'],
  headers: ['access_token', 'X-Access-Token'],
  params: ['access_token']
}))
app.use(at)

//  managment Errors
app.use(errorHandler({
  debug: app.get('env') === 'development',
  log: true
}))

app.start = () => {
  //  start the web server
  return app.listen(() => {
    var baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
    app.status = 'started'
    app.emit('started')
  })
}

//  Bootstrap the application, configure models, datasources and middleware.
//  Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err

  //  start the server if `$ node server.js`
  if (require.main === module) {
    app.start()
  }
})
