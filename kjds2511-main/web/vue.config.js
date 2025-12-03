// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8081

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    host: '0.0.0.0', // 允许外部访问，方便手机调试
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端 API 地址，根据实际情况修改
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 生产环境移除console
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true
        args[0].terserOptions.compress.drop_debugger = true
        return args
      })
    }
  }
}

