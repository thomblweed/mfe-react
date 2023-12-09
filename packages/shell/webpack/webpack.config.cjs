const path = require("path");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("../package.json").dependencies;

const baseConfig = require("../../../webpack.base.cjs");

module.exports = merge(baseConfig, {
  entry: {
    index: path.resolve(__dirname, "../src/index.ts"),
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      title: "shell app",
      inject: "body",
      template: path.resolve(__dirname, "./template/index.html"),
    }),
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
});
