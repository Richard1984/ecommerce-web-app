const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = async (options) => {
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
      // plugins: {
      //   add: [
      //     {
      //       plugin: sassResourcesLoader,
      //       options: {
      //         resources: "./src/assets/index.scss",
      //       },
      //     },
      //   ],
      // },
    },
  };
};
