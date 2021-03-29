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
        muted: "#909399"
      },
      zIndex: {
        1: 1,
        1000: 1000
      },
      boxShadow: {
        DEFAULT: "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)"
      },
      animation: {
        "fade-in-left": "fadeInLeft 1s ease-in-out",
        "fade-in-right": "fadeInRight 1s ease-in-out",
      },
      keyframes: {
        "fadeInLeft": {
          "0%": { opacity: 0, transform: "translateX(-800px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
        "fadeInRight": {
          "0%": { opacity: 0, transform: "translateX(800px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
