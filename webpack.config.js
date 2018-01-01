const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV === 'production';
const plugins = [
    new ExtractTextPlugin('css/style.css'),
    new CopyWebpackPlugin([
        {
            from: './static'
        }
    ])
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
        filename: 'js/bundle.js',
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
