const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const plugins = [
        new CleanWebpackPlugin(),
    ];

    if (isProduction) {
        plugins.push(
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
            })
        );
    }

    const optimizationConfig = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        drop_console: isProduction,
                    },
                    mangle: isProduction,
                },
                extractComments: false,
            }),
        ],
        splitChunks: {
            chunks: 'async',
        },
    };

    return {
        mode: 'production',
        entry: './src/index.js',
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'public'),
        },
        optimization: optimizationConfig,
        plugins,
    };
};
