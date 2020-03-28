const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack (config) {
    config.resolve.alias
      .set('@v', resolve('./src/views'))
      .set('@a', resolve('./src/assets'))
      .set('@c', resolve('./src/components'))
  }
}