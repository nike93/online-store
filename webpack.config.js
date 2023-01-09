const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");

const isDevelopment = process.env.NODE_ENV == "development";

const stylesHandler = isDevelopment
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const baseConfig = {
  entry: path.resolve(__dirname, "./src/index"),
  mode: "development",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "./src/img/favicon.ico"),
      template: path.resolve(__dirname, "./src/index.html"),      
      filename: "index.html",
      template: path.resolve(__dirname, "./src/404.html"),
      filename: "404.html",
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: "ts" }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
