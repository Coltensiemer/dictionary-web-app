/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#A445ED',
        'red-primary': '#FF5252',
        'grey-primary': '#757575',
        'grey-medium': '#E9E9E9',
        'grey-light':'#f4f4f4',
        'grey-2d': '#2d2d2d',
        'black-primary': '#050505',
        'black-secondary': '#1F1F1F'
      }, 
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "",
  },
  
}

