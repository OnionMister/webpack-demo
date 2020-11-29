/**
 * 使用url-loader对样式中的html进行处理，url-loader依赖于file-loader
 * 下载：url-loader 和 file-loader
 * 使用html-loader对html中的img标签进行处理
 * 下载：html-loader
 */
const {
    resolve
} = require('path'); // 使用resolve()处理绝路径
// html-webpack-plugin版本4 和 webpack5有兼容性问题，报错查看：https://blog.csdn.net/Kindergarten_Sir/article/details/110083041
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包html文件
module.exports = {
    // 入口文件
    entry: "/src/index.js",
    output: {
        // 输出文件名
        filename: "bundle.js",
        // 输出路径，__dirname是当前文件的绝对路径，输出到绝对路径下的dist文件夹下
        path: resolve(__dirname, 'dist'),
        // 给打包后资源引入的路径前缀，静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
        publicPath: "./"
    },
    module: {
        rules: [
            // loader配置
            {
                // 匹配以样式结尾的文件
                test: /\.less$/,
                // use中的多个loader是自底向上或自右向左运行的
                use: [
                    // 在index.html文件的head中创建style标签，并将js中的样式字符串插入
                    'style-loader',
                    // 将css文件变成common.js的字符串加入到输出的js中
                    'css-loader',
                    // less-loader将less译成css
                    // 需要安装less和less-loader
                    'less-loader'
                ]
            },
            {
                // 对样式中引入的图片文件进行转译，不处理img标签
                test: /\.(jpg|png|gif)$/,
                // 下载：url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片小于10kB，会将图片传换成base64编码处理，
                    // 目的是为了将小图转为编码减少请求数量减轻服务器压力，
                    // 会导致图片体积增大，即base64编码比原图体积大（建议对小于12kB的图做编码处理，大图不处理）
                    limit: 10 * 1024,
                    // 关闭es6模块化处理，避免与html-loader的common.js规范冲突，发生冲突会导致路径变成“[object Module]”
                    // 新版本已经没有这个问题了 可以不关闭。
                    esModule: false,
                    // 默认图片命名为chunk的hash值，太长了
                    // [hash:10]为hash值前十位，[ext]表示文件原有扩展名
                    name:'[hash:10].[ext]'
                }
            },
            {
                // 对img标签路径进行处理
                test: /\.html$/,
                // html-loader使用common.js规范对img标签路径进行处理
                loader: 'html-loader'
            }
        ]
    },
    // 插件配置
    plugins: [
        // HtmlwebpackPlugin默认功能为创建空的html（body为空）并引入打包输出的js文件
        // template配置是将指定的html文件的body内容加入到创建的html文件中
        // html-webpack-plugin版本4 和 webpack5有兼容性问题，报错查看：https://blog.csdn.net/Kindergarten_Sir/article/details/110083041
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development", // 开发环境
    // mode: "production", // 生产环境
}