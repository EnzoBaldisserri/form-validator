const webpack = require('webpack');
const path = require('path');

const Uglify = webpack.optimize.UglifyJsPlugin;

const libraryName = 'FormValidator';
let outputFile;
const plugins = [];

module.exports = (env) => {
  if (env.production) {
    plugins.push(new Uglify({ minimize: true }));
    outputFile = `${libraryName}.min.js`;
  } else {
    outputFile = `${libraryName}.js`;
  }

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins,
  };
};
