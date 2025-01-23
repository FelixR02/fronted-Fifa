/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{vue,js}",
      "./pages/**/*.vue",
      "./layouts/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      extend: {
        colors: {
        },
      },
    },
    plugins: [],
  };