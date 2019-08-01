const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  lintOnSave: false,
  css: {
    extract: true
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