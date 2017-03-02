const store = require('store')

module.exports = schema => {
  // console.log(schema)
  const local = store.getAll()
  const storage = Object.keys(schema).reduce((acc, key) => {
    const value = local[key] || new schema[key]()
    return Object.assign({ [key]: value }, acc)
  }, {})
  // console.log(storage)
  return storage
}
