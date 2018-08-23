const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
        'production-dependencies': ['phaser']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'index.html'),
                to: path.resolve(__dirname, 'build')
            },
            {
                from: path.resolve(__dirname, 'assets', '**', '*'),
                to: path.resolve(__dirname, 'build')
            }
        ]),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
    }
};