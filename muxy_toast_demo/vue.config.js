const webpack = require("webpack");
const path = require("path");
const Dotenv = require('dotenv-webpack');

function resolve(dir) {
  return path.resolve(__dirname, '.', dir);
}

module.exports = {
  baseUrl: './',
  pages: {
    config: './src/config/main.js',
    live: './src/live/main.js',
    overlay: './src/overlay/main.js'
  },
  configureWebpack: {
    resolve: {
      alias: {
        globals$: resolve('src/shared/js/globals.ts'),
        libs: resolve('libs'),
        shared: resolve('src/shared'),
        static: resolve('src/shared/static')
      }
    },

    plugins: [
      new Dotenv()
    ]
  }
};
