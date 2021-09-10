module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
        .loader('text-loader')
        .end()
  }
}