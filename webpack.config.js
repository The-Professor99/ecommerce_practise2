var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less|\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|ico)(\?[a-z0-9=.]+)?$/,
                use: [
                    { loader: 'url-loader',
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
              },
        ]
    },
    resolve: {
        mainFiles: ['index', 'Index'],
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        publicPath: '/'
    }), 
        new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    })
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}
