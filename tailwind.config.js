const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.js", "./src/components/*.js", "./src/components/**/*.js"],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        accent: '#db2777'
      }
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover', 'focus'],
    },
  },
};