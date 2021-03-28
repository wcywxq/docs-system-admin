const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  plugins: [
    {
        plugin: CracoAntDesignPlugin,
        options: {
            customizeTheme: {
                "@primary-color": "#215fff",
                "@border-radius-base": "6px"
            }
        }
    }
  ],
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
