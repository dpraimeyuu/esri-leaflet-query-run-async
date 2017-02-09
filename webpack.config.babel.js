import webpack from "webpack";
import path from "path";

export default {
  debug: false,
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: './build',
    filename: 'esri-leaflet-query-run-async.js',
    library: 'esri-leaflet-query-run-async',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './test')
      ],
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }
}