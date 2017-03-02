const { resolve, join } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  externals: {
    store: 'store'
  },
  module: {
    rules: [{
      test: /.js$/,
      loaders: 'buble-loader',
      include: join(__dirname, 'src'),
      query: {
        objectAssign: 'Object.assign'
      }
    }]
  }
}
