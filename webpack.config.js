const path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, 'src', 'index.ts')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        inline: true,
        port: 8080,
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
};
