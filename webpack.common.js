const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "microsaas";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    output: {
      clean: true,
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      assetModuleFilename: "images/[name][ext]",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/presentation/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),
      new Dotenv({
        path: "./.env",
      }),
    ],
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        util: require.resolve("util"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
      },
      extensions: [".ts", ".js"],
      alias: { "@": path.resolve(__dirname, "src") },
    },
  });
};
