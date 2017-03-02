const store = require('store')

const addActions = storage => Object.assign({
  remove (key) {
    if (this[key] === undefined) {
      console.warn(`${key} not exist in storage`)
      return
    }

    this[key] = null
  },
  clear () {
    const blocked = ['clear', 'remove']
    const keys = Object.keys(this).filter(key => blocked.indexOf(key) === -1)
    keys.forEach(key => {
      this[key] = null
    })
  }
}, storage)

module.exports = schema => {
  const local = store.getAll()
  const storage = Object.keys(schema)
    .reduce((acc, key) => {
      const value = local[key] || new schema[key]()
      return Object.assign({ key: value }, acc)
    }, {})

  return addActions(storage)
}
