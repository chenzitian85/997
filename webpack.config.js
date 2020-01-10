const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        port: '8899',
        host: 'localhost',
        quiet: true, // 如果使用webpack-dev-server，需要设为true，禁止显示devServer的console信息
    },
    //other code 压缩 js 文件
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                parallel: 4
            })
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        // ... 优化控制台输出
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`项目运行中`],
            },
            clearConsole: true,
        }),
    ],
    //other code
    module: {
        rules: [
            {
                test: /\.less/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}