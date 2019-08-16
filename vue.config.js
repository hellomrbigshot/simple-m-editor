const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
        .loader('text-loader')
        .end()
  },
  configureWebpack: () => {
    let configNew = {};
    if (process.env.NODE_ENV === 'production') {
      configNew.plugins = [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }
    return configNew;
  }
}