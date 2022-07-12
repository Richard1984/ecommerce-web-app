const sassResourcesLoader = require("craco-sass-resources-loader");
const webpack = require("webpack");

module.exports = async (options) => {
  const development = options.env === "development";

  return {
    devServer: {
      hot: true,
      port: 3001,
      // proxy: [
      //   {
      //     context: ["/api/**"],
      //     target: `http${options.tls ? "s" : ""}://localhost:3000`,
      //     secure: false,
      //     changeOrigin: options.tls,
      //     pathRewrite: { "^/api": "/" },
      //   },
      // ],
      https: options.tls,
      historyApiFallback: true,
    },
    webpack: {
      plugins: {
        add: [
          new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(development),
            VERSION: JSON.stringify(
              process.env.hasOwnProperty("APP_VERSION")
                ? process.env.APP_VERSION
                : "DEV"
            ),
          }),
          //     {
          //       plugin: sassResourcesLoader,
          //       options: {
          //         resources: "./src/assets/index.scss",
          //       },
          //     },
        ],
      },
    },
  };
};
