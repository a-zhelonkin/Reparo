const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcDirectory = path.resolve(__dirname, "src");
const buildDirectory = path.resolve(__dirname, "dist");
const publicDirectory = path.resolve(__dirname, "public");

module.exports = {
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: buildDirectory,
    publicPath: "/",
    filename: "[name].[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].chunk.js",
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: srcDirectory,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.s[ca]ss$/,
        include: srcDirectory,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [srcDirectory],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|gif)$/,
        include: srcDirectory,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(publicDirectory, "template.html"),
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: "[name].[chunkhash].bundle.css",
      chunkFilename: "[name].[chunkhash].chunk.css",
    }),
  ],
};
