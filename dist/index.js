const makeStorage = require('make-storage')
const makeMixin = require('make-mixin')

const install = (Vue, schema, dataKey = 'localStorage') => {
  const storage = makeStorage(schema)
  Vue.mixin(makeMixin(storage, dataKey))
}

module.exports = { install }
