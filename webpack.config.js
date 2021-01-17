const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("Copy-Webpack-Plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    entry: {
      main: path.join(__dirname, "src/index.js"),
      form: path.join(__dirname, "src/form/form.js"),
      topbar: path.join(__dirname, "src/form/form.js")
    },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: './src/assets/img/*',
                to: './assets/img',
                flatten: true,
            },
        ],

    }),
    new HtmlWebpackPlugin({
      filename: "index.html",  
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar"]
    }),
    new HtmlWebpackPlugin({
        filename: "form.html",
        template: path.join(__dirname, "./src/form/form.html"),
        chunks: ["form", "topbar"]
      })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    inline: true,
    port: 4000
  }
};