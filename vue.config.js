const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
	publicPath: './',
	assetsDir: 'pack',
  outputDir: 'dist/my-vue-admin',

  chainWebpack (config) {
    config.resolve.alias
      .set('@v', resolve('./src/views'))
      .set('@a', resolve('./src/assets'))
      .set('@c', resolve('./src/components'))
      .set('@s', resolve('./src/config'))
      .set('@u', resolve('./src/utils'))
  }
}