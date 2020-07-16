const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
	publicPath: './',
	assetsDir: 'pack',
  outputDir: 'dist/my-vue-admin',
  productionSourceMap: false,
  lintOnSave: false,
  assetsDir: 'pack',

  devServer: {
    open: false, // 项目构建成功后是否自动打开浏览器
    port: 8080,
    https: false,
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
      })
    ]
  },

  chainWebpack (config) {
    config.resolve.alias
      .set('@v', resolve('./src/views'))
      .set('@a', resolve('./src/assets'))
      .set('@c', resolve('./src/components'))
      .set('@s', resolve('./src/config'))
      .set('@u', resolve('./src/utils'))
  }
}