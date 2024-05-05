const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = (webpackConfigEnv, argv) => {
  return merge(common(webpackConfigEnv, argv), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/",
      },
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true,
      },
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.jpg/,
          type: "asset/resource",
        },
      ],
    },
  });
};
