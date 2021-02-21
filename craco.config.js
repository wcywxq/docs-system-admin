const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },
};
