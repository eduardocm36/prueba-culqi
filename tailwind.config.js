/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "principal": [ "Manrope", "sans-serif" ]
      },

      colors: {
        "primario": "#111827"
      }
    },
  },
  plugins: [],
}

