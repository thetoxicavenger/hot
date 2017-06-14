const {join} = require('path')
module.exports = (app) => {

  app.set('views', join(__dirname, '..', 'routes'));
  app.set('view engine', 'hbs');

  if (process.env.NODE_ENV === 'dev') {
    app.use(require('morgan')('short'));
    (function() { // why the closure?
      // Step 1: Create & configure a webpack compiler
      var webpack = require('webpack');
      var webpackConfig = require(join(__dirname, '..', '..', 'webpack.config'));
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
    return app
  }
}
