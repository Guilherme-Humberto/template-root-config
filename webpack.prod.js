const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = (webpackConfigEnv, argv) => {
  return merge(common(webpackConfigEnv, argv), {
    mode: "production",
    plugins: [new MiniCssExtractPlugin({ filename: "main-[contenthash].css" })],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.jpg/,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), "..."],
    },
  });
};
