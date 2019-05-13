const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
        ]
    },
    plugins: [
        /* 自动引入输出文件到index.html  配置参数 https://github.com/jantimon/html-webpack-plugin  */
        new (require('html-webpack-plugin'))({
            title: '网页Title',
            hash: true,
            template:'./public/index.html',
            filename: 'index.html',
            meta:{
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            }
        }),
        /* 每次编译清理输出文件夹 */
        new (require('clean-webpack-plugin'))(),
    ]
}
