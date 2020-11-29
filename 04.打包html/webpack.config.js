/**
 * 压缩html需要插件：html-webpack=plugin
 * 插件使用方法：下载，引入，使用
 * loader使用方法：下载，使用
 *  html-webpack-plugin版本4 和 webpack5有兼容性问题，报错查看：https://blog.csdn.net/Kindergarten_Sir/article/details/110083041
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 导入插件
const {
  resolve
} = require('path'); // 使用resolve处理绝对地址

const config = {
  // 入口文件
  entry: './src/index.js',
  output: {
    // 输出文件名
    filename: 'bundle.js',
    // resolve处理绝对路径
    // __dirname代表当前文件的绝对路径，输出文件放到该路径的dist中
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loader 配置
    ]
  },
  plugins: [
    // HtmlWebpackPlugin默认功能为创建空的html文件，并引入输出的js文件
    // 通过配置template将指定文件的body内容加入到创建的html文件中
    // html-webpack-plugin版本4 和 webpack5有兼容性问题，报错查看：https://blog.csdn.net/Kindergarten_Sir/article/details/110083041
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 指定为开发模式
  mode: "development"
};

module.exports = config;