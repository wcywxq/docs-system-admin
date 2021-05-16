const path = require("path");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@": path.resolve(__dirname, "./src/Hoc")
    }
  },
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#215fff",
          "@border-radius-base": "4px"
        }
      }
    }
  ],
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()]
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
