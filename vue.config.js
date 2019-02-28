const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },
  devServer: {
    port: 23333,
    public: '0.0.0.0:23333',
    proxy: {
      '/api': {
        target: 'http://10.42.0.1:3333',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  productionSourceMap: false
}
