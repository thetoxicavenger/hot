var http = require('http');

var express = require('express');

var app = express();

app.use(require('morgan')('short'));

if (process.env.NODE_ENV === 'dev') {
  (function() { // why the closure?

    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
  })();
}

app.get("/", function(req, res) { // it'll be interesting to see if I can make this work with a view engine, but then again I may not need to - I can probably just use html partials.
// TODO: make the front end ask for just data AND data + markup
  res.sendFile(__dirname + '/client/index.html');
});

if (require.main === module) { // don't know if this is a development-only server or not, but either way I'm confused as to why this hot-reload module only works with creating a http server with the express app as the argument.
  var server = http.createServer(app);
  server.listen(process.env.PORT, function() {
    console.log("Listening on %j", server.address());
  });
}
