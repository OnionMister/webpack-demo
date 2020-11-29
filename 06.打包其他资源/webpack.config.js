/**
 * loader 安装后，可直接使用
 * plugins（插件） 安装后，先引入后使用
 * 安装loader和plugins：cnpm install html-webpack-plugin css-loader style-loader file-loader -D
 * webpack安装：cnpm install webpack webpack-cli -D
 */
const {
    resolve
} = require('path'); // resolve用于处理绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入处理html的插件
module.exports = {
    // 入口文件
    entry: './src/index.js',
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径，__dirname是当前文件的绝对路径，输出到该路径的dist下
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // loader配置，use执行顺序是从下向上，从左向右的
            {
                // 处理样式的loader
                test: /\.css/, // 匹配css文件
                use: [
                    // 将输出到js中的样式字符串提取到style标签并插入到html的head中
                    'style-loader',
                    // 将css以commonjs字符串的形式打包到输出的js文件中
                    'css-loader'
                ]
            },
            {
                // 处理其他资源，采用exclude排除以处理的资源，如：js，html，css等
                exclude: /\.(css|js|html|less|sass|jpg|png|gif|)$/, // 排除
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash:10].[ext]', // [hash:10]表示文件名为10为hash，[ext]表示原本的扩展名
                    }
                }]
            }
        ]
    },
    plugins: [
        // 插件配置
        // HtmlWebpackPlugin的作用是创建空body的html文件
        // template配置用于将指定的html文件的body内容复制到创建html文件中
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development', // 开发环境
    mode: 'production', // 生产环境
}