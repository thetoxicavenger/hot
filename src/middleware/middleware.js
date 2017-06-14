const {join} = require('path')
const express = require('express')
module.exports = (app) => {

  if (process.env.NODE_ENV === 'dev') {
    app.use(require('morgan')('short'));
    app.use(express.static(join(__dirname, '..', 'static')))
    return app
  }
}
