module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#409EFF",
        success: "#67C23A",
        warning: "#E6A23C",
        danger: "#F56C6C",
        info: "#17A2B8",
        muted: "#909399",
      },
      zIndex: {
        1: 1,
        1000: 1000,
      },
      boxShadow: {
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
