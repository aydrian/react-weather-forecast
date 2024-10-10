const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.js", "./src/styles/main.scss"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      exclude: "/node_modules/"
    })
  ]
};
