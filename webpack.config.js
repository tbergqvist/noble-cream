const path = require('path');

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "./dist/bundle.js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // Handle .ts and .tsx file via ts-loader.
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
  },
};