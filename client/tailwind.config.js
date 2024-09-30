/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'purple':'#4d11b5',
        'orange':'#f5530f',
        'lightorange':'#f78f2b',
        'white':'#e0c7d0',
        'ligthpurple':'#853e8a'
      }
    },
  },
  plugins: [],
}

