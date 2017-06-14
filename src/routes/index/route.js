const {join} = require('path')
const Handlebars = require('handlebars')
const fs = require('fs')
const index = join(__dirname, 'client', 'index.hbs')
const getData = require(join(__dirname, '..', '..', 'helpers', 'data'))

module.exports = (req, res) => {
  // this should be done for all of them automatically
  getData(req.query.data, data => {
    if (req.query.markup) {
      fs.readFile(index, 'utf8', (err, markup) => {
        if (err) return res.status(500).send('Error.')
        else {
          const template = Handlebars.compile(markup)
          const result = template(data);
          res.send(result)
        }
      })
    } else {
      res.send(data)
    }
  })
}
