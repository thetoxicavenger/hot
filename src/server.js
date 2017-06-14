
var http = require('http');
var express = require('express');
const {join} = require('path')

const middleware = require(join(__dirname, 'middleware', 'middleware'))

const app = express();

middleware(app)

// routes
const index = require(join(__dirname, 'routes', 'index', 'route'))
const next = require(join(__dirname, 'routes', 'next', 'route'))
app.get('/', index)
app.get('/next', next)

if (require.main === module) { // don't know if this is a development-only server or not, but either way I'm confused as to why this hot-reload module only works with creating a http server with the express app as the argument.
  var server = http.createServer(app);
  server.listen(process.env.PORT, function() {
    console.log("Listening on %j", server.address());
  });
}
