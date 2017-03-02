const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist')
  },
  externals: {
    store: 'store'
  }
}
