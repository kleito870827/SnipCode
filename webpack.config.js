const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');
const webpack = require('webpack');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
             loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
       'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
       'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
       'process.env.DATA_BASE_URL': JSON.stringify(process.env.DATA_BASE_URL),
       'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
       'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
       'process.env.MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  }
}
