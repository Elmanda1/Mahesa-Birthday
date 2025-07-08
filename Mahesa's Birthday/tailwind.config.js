/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'birthday-pink': '#FF6B9D',
        'birthday-blue': '#4ECDC4',
        'birthday-yellow': '#FFE66D',
        'birthday-purple': '#A8E6CF',
      },
      fontFamily: {
        'party': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [],
}