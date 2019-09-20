const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const srcPath = "./Vue/src/";
const exportPath = "../Qmulus.Kamernet.StaticResources/";
process.env.NODE_ENV == "development";

module.exports = {
  entry: { messages: path.resolve(srcPath, "messages.js") },
  output: {
    path: path.resolve(exportPath, "Scripts/Vue/"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        extractComments: false
      })
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.min.js",
      "~": path.resolve(srcPath),
      "@Components": path.resolve(srcPath, "Components")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: `@import "~/Global/variables.scss";`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "../../Content/css/Vue/app.css" }),
    new VueLoaderPlugin()
  ]
};
