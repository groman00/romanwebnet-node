const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production';
const plugins = [
    new ExtractTextPlugin('css/style.[chunkhash].css'),
    new CopyWebpackPlugin([
        {
            from: './static'
        }
    ]),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/templates/index.html',
        minify: {
            collapseWhitespace: isProd
        }
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, './dist')], {})
];

if (isProd) {
    plugins.push(new UglifyJsPlugin());
}

/**
 * TODO: add asset manifest
 */
module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProd,
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            })
        }]
    },
    plugins
};
