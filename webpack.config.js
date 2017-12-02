'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.css$/,
                use: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style',
                    'css',
                    'group-css-media-queries',
                    'sass'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                exclude: [
                    path.resolve(__dirname, 'assets', 'svg')
                ],
                use: ['file']
            },
        ]
    },

    // Where to resolve our loaders
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')],
        moduleExtensions: ['-loader'],
    },

    resolve: {
        // Directories that contain our modules
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        descriptionFiles: ['package.json'],
        moduleExtensions: ['-loader'],
        // Extensions used to resolve modules
        extensions: ['.js', '.scss', '.css']
    },

    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]

};
