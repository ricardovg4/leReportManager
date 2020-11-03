const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve('./src/index.js'),

    devServer: {
        contentBase: './dist'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                            // options...
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            // injects bundle.js to our new index.html
            inject: true,
            //copies the content of the existing index.html to the new ./builds index.html
            template: path.resolve('./public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/mystyles.css'
        })
    ]
};
