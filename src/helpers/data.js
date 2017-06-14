module.exports = (query, cb) => {
  cb({ "name": "Alan", "hometown": "Somewhere, TX",
               "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]})
}
