/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#3498db',
        'sub-green': '#2ecc71',
        'sub-red': '#e74c3c',
        'warning-yellow': '#f1c40f',
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['DIN Alternate', 'Consolas', 'monospace'],
      },
      width: {
        'preview': '1080px',
      },
    },
  },
  plugins: [],
}
