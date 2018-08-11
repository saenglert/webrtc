const path = require('path');

module.exports = {
  entry: {
    client: path.resolve(__dirname, 'src', 'client', 'index.ts'),
  },
  output: {
    filename: '[name].js',
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
      { test: /\.css?/, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
};
