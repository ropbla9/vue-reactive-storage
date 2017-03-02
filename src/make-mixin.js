const store = require('store')

const makeWatchers = (storage, dataKey) => Object.keys((acc, key) => {
  const vueKey = `${dataKey}.${key}`
  // allow .bind
  const handler = function handler (value) {
    store.set(key, value)
    console.log(`${vueKey} watcher executed...`)
  }

  return Object.assign({ [vueKey]: { handler } }, acc)
}, {})

module.exports = (storage, dataKey) => ({
  data: () => ({
    [dataKey]: storage
  }),
  watch: makeWatchers(storage, dataKey)
})
