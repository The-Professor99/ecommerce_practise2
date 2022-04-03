const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less|\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader' ,
                    'less-loader' 
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        }),
    ]
}
)

        
