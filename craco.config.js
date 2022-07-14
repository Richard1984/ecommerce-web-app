const webpack = require("webpack");
require("react-scripts/config/env");

module.exports = async (options) => {
  const development = options.env === "development";

  return {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
          @import "src/assets/styles/index.scss";
        `,
        },
      },
    },
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
            STRIPE_PUB_KEY: JSON.stringify(
              process.env.REACT_APP_STRIPE_PUB_KEY
            ),
          }),
        ],
      },
    },
  };
};
