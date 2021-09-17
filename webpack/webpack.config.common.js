const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rootDir = process.cwd();

module.exports = {
  entry: { index: './src/index.tsx' },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, url: true } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.wav/i,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      defaultStyles: path.resolve(rootDir, 'src/styles/module')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
