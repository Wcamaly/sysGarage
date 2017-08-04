'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();
const bodyParser  = require('body-parser');
const path = require('path');
const errorHandler = require('strong-error-handler');

app.use(bodyParser.urlencoded());

// Parsin to be able to handle json in the answers
app.use(bodyParser.json());

app.use(loopback.token());

// managment Errors
app.use(errorHandler({
  debug: app.get('env') === 'development',
  log: true,
}));


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
