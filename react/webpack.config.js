const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app/index.js'),
    build: path.join(__dirname, 'dist'),
};

const cssLoaders = [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [autoprefixer];
            },
        },
    },
];

module.exports = {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        PATHS.app,
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.[hash:6].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: /node_modules/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
            {
                test: /\.(jpg|png|svg|ttf|eot|json)$/,
                loader: 'file-loader',
                query: {
                    name: 'img/[hash].[ext]',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.scss$/,
                use: cssLoaders.concat([
                    'sass-loader',
                ]),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Calculator(React)',
            filename: 'index.html',
            template: './index.html',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CaseSensitivePathsPlugin(),
    ],
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        // turn off auto-refresh
        inline: false,
    },
};
